"use client";

import { useEffect, useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, RuleEditorial, Tag } from "@/components/ui/editorial";
import { MOCK_ADMIN_USERS, MOCK_USAGE, DATA_SOURCES, IPLAN_CATEGORIES } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Shield,
  RefreshCw,
  Upload,
  Users,
  TrendingUp,
  LogIn,
  LogOut,
  CheckCircle2,
  Clock,
  FileDown,
} from "lucide-react";

type StaffUser = (typeof MOCK_ADMIN_USERS)[number];

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState<StaffUser | null>(null);
  const [tab, setTab] = useState<"analytics" | "data" | "upload" | "users">("analytics");
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [refreshed, setRefreshed] = useState<Set<string>>(new Set());
  const [uploadScope, setUploadScope] = useState<string>("chronic-disease");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");

  useEffect(() => {
    // persist session
    const saved = typeof window !== "undefined" ? localStorage.getItem("kane-admin-user") : null;
    if (saved) {
      const user = MOCK_ADMIN_USERS.find((u) => u.id === saved);
      if (user) setSignedIn(user);
    }
  }, []);

  const handleSignIn = (user: StaffUser) => {
    setSignedIn(user);
    localStorage.setItem("kane-admin-user", user.id);
  };
  const handleSignOut = () => {
    setSignedIn(null);
    localStorage.removeItem("kane-admin-user");
  };

  const handleRefresh = (id: string) => {
    setRefreshing(id);
    setTimeout(() => {
      setRefreshing(null);
      setRefreshed((prev) => new Set(prev).add(id));
    }, 1400);
  };

  const handleUpload = () => {
    setUploadStatus("uploading");
    setTimeout(() => setUploadStatus("success"), 1600);
    setTimeout(() => setUploadStatus("idle"), 4200);
  };

  if (!signedIn) {
    return (
      <div>
        <PageHeader
          eyebrow="KCHD staff workspace"
          title="Sign in to manage data, monitor usage, and upload indicators."
          lede="This area is restricted to Kane County Health Department staff. For the demo, pick any staff profile below — no password required — to see what each role sees."
        />
        <section className="bg-paper py-10">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <Eyebrow>Staff directory · 20 users</Eyebrow>
                <h2 className="mt-2 font-display text-2xl text-kane-blue-ink mb-6">
                  Choose a role to preview
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {MOCK_ADMIN_USERS.slice(0, 8).map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleSignIn(u)}
                      className="group text-left border border-rule bg-white p-4 hover:border-kane-blue-ink hover:shadow-editorial-lg transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-display text-base text-kane-blue-ink">{u.name}</div>
                          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                            {u.department}
                          </div>
                        </div>
                        <RoleBadge role={u.role} />
                      </div>
                      <div className="mt-3 pt-3 border-t border-rule flex items-center justify-between">
                        <span className="font-mono text-[10px] text-ink-soft/70">
                          {u.uploadScopes.length === 0
                            ? "No upload scope"
                            : u.uploadScopes[0] === "*"
                              ? "Full upload scope"
                              : `Upload: ${u.uploadScopes.length} scope${u.uploadScopes.length > 1 ? "s" : ""}`}
                        </span>
                        <LogIn size={14} className="text-kane-blue-deep opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
                <Eyebrow>Demo note</Eyebrow>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  In production, this workspace authenticates against KCHD’s identity provider
                  (Microsoft 365 tenant in the proposal). Row-level security limits each user
                  to their specific upload scope. Twenty users total; five with upload
                  permissions as specified in Addendum 3.
                </p>
                <div className="mt-6 p-4 bg-kane-blue-ink text-white">
                  <Shield className="text-kane-amber" size={20} />
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">
                    Sign-in is mocked for this demo. No real credentials are collected or stored.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Admin header */}
      <section className="bg-kane-blue-ink text-white">
        <div className="ribbon-kane h-[3px] w-full" aria-hidden />
        <div className="container mx-auto py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield size={22} className="text-kane-amber" />
            <div>
              <Eyebrow className="text-kane-amber">KCHD staff workspace</Eyebrow>
              <p className="mt-0.5 font-display text-xl text-paper leading-tight">
                Signed in as {signedIn.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 mt-0.5">
                {signedIn.department} · {signedIn.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-white/30 text-white/90 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] hover:bg-white/10"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-rule sticky top-20 z-30">
        <div className="container mx-auto flex flex-wrap gap-0">
          {(
            [
              { id: "analytics", label: "Usage analytics", Icon: TrendingUp },
              { id: "data", label: "Manage data sources", Icon: RefreshCw },
              { id: "upload", label: "Upload new data", Icon: Upload },
              { id: "users", label: "Users & permissions", Icon: Users },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-2 px-5 py-4 text-sm border-b-2 transition-colors",
                tab === id
                  ? "border-kane-amber text-kane-blue-ink font-medium"
                  : "border-transparent text-ink-soft hover:text-kane-blue-ink"
              )}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </section>

      <div className="container mx-auto py-10">
        {/* Analytics */}
        {tab === "analytics" && (
          <div>
            <div className="mb-8">
              <Eyebrow>Section · Usage analytics</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">
                Who is using the atlas, for what.
              </h2>
            </div>
            <RuleEditorial className="mb-8" />

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {[
                { label: "Today", value: MOCK_USAGE.activeUsers.today, delta: "+12%" },
                { label: "This week", value: MOCK_USAGE.activeUsers.week, delta: "+8%" },
                { label: "This month", value: MOCK_USAGE.activeUsers.month, delta: "+21%" },
              ].map((s) => (
                <EditorialCard key={s.label} className="p-5">
                  <Eyebrow>Active users · {s.label}</Eyebrow>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display tnum text-4xl text-kane-blue-ink">
                      {s.value.toLocaleString()}
                    </span>
                    <span className="font-mono text-[11px] text-positive">{s.delta}</span>
                  </div>
                </EditorialCard>
              ))}
            </div>

            <div className="grid md:grid-cols-12 gap-6">
              <EditorialCard className="md:col-span-5 p-6">
                <Eyebrow>Top pages · past 30 days</Eyebrow>
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="border-b border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                      <th className="text-left py-2">Page</th>
                      <th className="text-right py-2">Views</th>
                      <th className="text-right py-2">Δ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USAGE.topPages.map((p, i) => (
                      <tr key={p.page} className="border-b border-rule">
                        <td className="py-2.5">
                          <span className="font-mono text-[10px] text-ink-soft/60 mr-2">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {p.page}
                        </td>
                        <td className="py-2.5 text-right font-display tnum">
                          {p.views.toLocaleString()}
                        </td>
                        <td className="py-2.5 text-right font-mono text-[11px] text-positive">
                          +{p.delta.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </EditorialCard>

              <EditorialCard className="md:col-span-4 p-6">
                <Eyebrow>Top searches</Eyebrow>
                <ul className="mt-4 space-y-2">
                  {MOCK_USAGE.topSearches.map((s, i) => (
                    <li key={s.q} className="flex items-baseline justify-between border-b border-rule pb-2">
                      <span className="font-display text-sm text-kane-blue-ink">
                        <span className="font-mono text-[10px] text-ink-soft/60 mr-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        “{s.q}”
                      </span>
                      <span className="font-mono tnum text-xs text-ink-soft">{s.count}</span>
                    </li>
                  ))}
                </ul>
              </EditorialCard>

              <EditorialCard className="md:col-span-3 p-6">
                <Eyebrow>Recent downloads</Eyebrow>
                <ul className="mt-4 space-y-4">
                  {MOCK_USAGE.recentDownloads.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm border-b border-rule pb-3 last:border-0">
                      <FileDown size={14} className="mt-0.5 text-kane-blue-deep shrink-0" />
                      <div>
                        <div className="font-display text-kane-blue-ink leading-tight">
                          {d.report}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                          {d.when} · {d.user} · {d.type}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </EditorialCard>
            </div>
          </div>
        )}

        {/* Data management */}
        {tab === "data" && (
          <div>
            <div className="mb-8">
              <Eyebrow>Section · Manage data sources</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">
                Refresh timestamps and manual pulls.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
                Automated refresh runs on schedule for each source. Trigger a manual refresh
                here. Staff are alerted by email if any scheduled pull fails.
              </p>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="border border-rule bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-paper-deep border-b border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    <th className="text-left p-4">Source</th>
                    <th className="text-left p-4">Frequency</th>
                    <th className="text-left p-4">Last refresh</th>
                    <th className="text-left p-4">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_SOURCES.map((s) => {
                    const isRefreshing = refreshing === s.id;
                    const wasRefreshed = refreshed.has(s.id);
                    return (
                      <tr key={s.id} className="border-b border-rule last:border-0">
                        <td className="p-4">
                          <div className="font-display text-base text-kane-blue-ink">{s.name}</div>
                          <div className="mt-1 text-[11px] text-ink-soft/70">{s.description}</div>
                        </td>
                        <td className="p-4 font-mono text-xs text-ink-soft">{s.frequency}</td>
                        <td className="p-4 font-mono text-xs text-ink-soft">
                          {wasRefreshed ? "Just now" : s.lastRefresh}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-positive">
                            <CheckCircle2 size={12} /> Healthy
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRefresh(s.id)}
                            disabled={isRefreshing}
                            className={cn(
                              "inline-flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] transition-colors",
                              isRefreshing
                                ? "border-rule text-ink-soft/50 cursor-wait"
                                : wasRefreshed
                                  ? "border-positive text-positive"
                                  : "border-kane-blue-ink text-kane-blue-ink hover:bg-kane-blue-ink hover:text-white"
                            )}
                          >
                            <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
                            {isRefreshing ? "Refreshing" : wasRefreshed ? "Refreshed" : "Refresh"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload */}
        {tab === "upload" && (
          <div>
            <div className="mb-8">
              <Eyebrow>Section · Upload new data</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">
                Add indicator data within your permission scope.
              </h2>
            </div>
            <RuleEditorial className="mb-8" />

            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <EditorialCard>
                  <Eyebrow>Your upload permissions</Eyebrow>
                  <div className="mt-3 flex items-start gap-3">
                    <Shield size={18} className="text-kane-amber shrink-0 mt-0.5" />
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {signedIn.uploadScopes.length === 0
                        ? "You do not currently have upload permissions. Contact KCHD Data Systems to request scope."
                        : signedIn.uploadScopes[0] === "*"
                          ? "You have full upload permissions across every priority area."
                          : "You may upload to the following scopes only:"}
                    </p>
                  </div>
                  {signedIn.uploadScopes[0] !== "*" && signedIn.uploadScopes.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {signedIn.uploadScopes.map((scope) => {
                        const cat = IPLAN_CATEGORIES.find((c) => c.id === scope);
                        return (
                          <li
                            key={scope}
                            className="flex items-center gap-2 border-b border-rule pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-kane-blue-ink"
                          >
                            <CheckCircle2 size={12} className="text-positive" />
                            {cat?.name ?? scope}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <p className="mt-4 pt-4 border-t border-rule text-[11px] text-ink-soft/70 leading-snug">
                    Row-level security on the Supabase backend enforces these scopes. This demo
                    shows the permission rail; the production build blocks the upload server-side.
                  </p>
                </EditorialCard>
              </div>

              <div className="md:col-span-8">
                <EditorialCard>
                  <Eyebrow>New indicator upload</Eyebrow>
                  <h3 className="mt-2 font-display text-xl text-kane-blue-ink">
                    Upload an indicator dataset
                  </h3>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                        Scope (must be within your permissions)
                      </label>
                      <select
                        value={uploadScope}
                        onChange={(e) => setUploadScope(e.target.value)}
                        disabled={signedIn.uploadScopes.length === 0}
                        className="mt-1 w-full border border-rule bg-paper px-3 py-2 text-sm text-ink focus:border-kane-blue-ink focus:outline-none disabled:opacity-60"
                      >
                        {(signedIn.uploadScopes[0] === "*"
                          ? IPLAN_CATEGORIES
                          : IPLAN_CATEGORIES.filter((c) => signedIn.uploadScopes.includes(c.id))
                        ).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                        Indicator name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Adult asthma prevalence"
                        className="mt-1 w-full border border-rule bg-white px-3 py-2 text-sm focus:border-kane-blue-ink focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                        Data file (CSV · up to 25 MB)
                      </label>
                      <div className="mt-1 border-2 border-dashed border-rule bg-paper-deep/40 p-8 text-center">
                        <Upload size={24} className="mx-auto text-ink-soft/60" />
                        <p className="mt-2 font-display text-base text-ink-soft">
                          Drop a CSV here, or click to browse
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/60">
                          Expected columns: geoid, indicator_id, value, period, cv
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleUpload}
                      disabled={signedIn.uploadScopes.length === 0 || uploadStatus !== "idle"}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 border py-3 text-sm font-mono uppercase tracking-[0.14em] transition-colors",
                        uploadStatus === "success"
                          ? "border-positive text-positive"
                          : "border-kane-blue-ink text-kane-blue-ink hover:bg-kane-blue-ink hover:text-white disabled:opacity-40"
                      )}
                    >
                      {uploadStatus === "idle" && (
                        <>
                          <Upload size={14} />
                          Submit upload
                        </>
                      )}
                      {uploadStatus === "uploading" && (
                        <>
                          <Clock size={14} className="animate-pulse" /> Validating + writing
                        </>
                      )}
                      {uploadStatus === "success" && (
                        <>
                          <CheckCircle2 size={14} /> Upload queued · QA in progress
                        </>
                      )}
                    </button>
                  </div>
                </EditorialCard>
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div>
            <div className="mb-8">
              <Eyebrow>Section · Users & permissions</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">
                Twenty internal users. Five with upload scope.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
                Per Addendum 3, roughly 20 KCHD staff use this workspace. Row-level security
                restricts each user to their specified scope.
              </p>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="border border-rule bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-paper-deep border-b border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Department</th>
                    <th className="text-left p-3">Role</th>
                    <th className="text-left p-3">Upload scope</th>
                    <th className="text-left p-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ADMIN_USERS.map((u) => (
                    <tr key={u.id} className="border-b border-rule last:border-0 hover:bg-paper-deep/40">
                      <td className="p-3 font-display text-kane-blue-ink">{u.name}</td>
                      <td className="p-3 text-ink-soft">{u.department}</td>
                      <td className="p-3">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="p-3 text-[11px] font-mono text-ink-soft">
                        {u.uploadScopes.length === 0
                          ? "—"
                          : u.uploadScopes[0] === "*"
                            ? "All scopes"
                            : u.uploadScopes.join(", ")}
                      </td>
                      <td className="p-3 text-[11px] font-mono text-ink-soft/70">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    Admin: "bg-kane-blue-ink text-white",
    Uploader: "bg-kane-amber text-white",
    Editor: "bg-paper-deep text-kane-blue-ink border border-rule",
    Viewer: "bg-paper text-ink-soft border border-rule",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
        styles[role] ?? "bg-paper text-ink-soft"
      )}
    >
      {role}
    </span>
  );
}
