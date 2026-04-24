"use client";

import { useEffect, useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, RuleEditorial } from "@/components/ui/editorial";
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
import { useLocale } from "@/lib/i18n";

type StaffUser = (typeof MOCK_ADMIN_USERS)[number];

type TabId = "analytics" | "data" | "upload" | "users";

function canAccessTab(role: string, tab: TabId): boolean {
  if (role === "Admin") return true;
  if (role === "Uploader") return tab !== "users";
  if (role === "Editor") return tab === "analytics" || tab === "data" || tab === "users";
  if (role === "Viewer") return tab === "analytics" || tab === "users";
  return false;
}

export default function AdminPage() {
  const { t, locale } = useLocale();
  const [signedIn, setSignedIn] = useState<StaffUser | null>(null);
  const [tab, setTab] = useState<TabId>("analytics");
  const [refreshing, setRefreshing] = useState<string | null>(null);
  const [refreshed, setRefreshed] = useState<Set<string>>(new Set());
  const [uploadScope, setUploadScope] = useState<string>("chronic-disease");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("kane-admin-user") : null;
    if (saved) {
      const user = MOCK_ADMIN_USERS.find((u) => u.id === saved);
      if (user) setSignedIn(user);
    }
  }, []);

  const handleSignIn = (user: StaffUser) => {
    setSignedIn(user);
    localStorage.setItem("kane-admin-user", user.id);
    // Redirect to a tab the user can actually access
    if (!canAccessTab(user.role, tab)) setTab("analytics");
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

  const roleLabel = (r: string) =>
    t.admin.roles[r.toLowerCase() as keyof typeof t.admin.roles] ?? r;

  if (!signedIn) {
    return (
      <div>
        <PageHeader eyebrow={t.admin.eyebrowWorkspace} title={t.admin.signInTitle} lede={t.admin.signInLede} />
        <section className="bg-paper py-10">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <Eyebrow>{t.admin.directoryEyebrow}</Eyebrow>
                <h2 className="mt-2 font-display text-2xl text-kane-blue-ink mb-6">
                  {t.admin.directoryTitle}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pickBalancedRoles(MOCK_ADMIN_USERS).map((u) => (
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
                        <RoleBadge role={u.role} label={roleLabel(u.role)} />
                      </div>
                      <div className="mt-3 pt-3 border-t border-rule flex items-center justify-between">
                        <span className="font-mono text-[10px] text-ink-soft/70">
                          {u.uploadScopes.length === 0
                            ? t.admin.noUploadScope
                            : u.uploadScopes[0] === "*"
                              ? t.admin.fullUploadScope
                              : t.admin.uploadScopeCount(u.uploadScopes.length)}
                        </span>
                        <LogIn
                          size={14}
                          className="text-kane-blue-deep opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
                <Eyebrow>{t.admin.demoNoteEyebrow}</Eyebrow>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.admin.demoNoteBody}</p>
                <div className="mt-6 p-4 bg-kane-blue-ink text-white">
                  <Shield className="text-kane-amber" size={20} />
                  <p className="mt-3 text-sm text-white/80 leading-relaxed">
                    {t.admin.demoShieldNote}
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
              <Eyebrow className="text-kane-amber">{t.admin.eyebrowWorkspace}</Eyebrow>
              <p className="mt-0.5 font-display text-xl text-paper leading-tight">
                {t.admin.signedInAs} {signedIn.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 mt-0.5">
                {signedIn.department} · {roleLabel(signedIn.role)}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 border border-white/30 text-white/90 px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] hover:bg-white/10"
          >
            <LogOut size={14} /> {t.admin.signOut}
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-rule sticky top-20 z-30">
        <div className="container mx-auto flex flex-wrap gap-0">
          {(
            [
              { id: "analytics" as TabId, label: t.admin.tabAnalytics, Icon: TrendingUp },
              { id: "data" as TabId, label: t.admin.tabData, Icon: RefreshCw },
              { id: "upload" as TabId, label: t.admin.tabUpload, Icon: Upload },
              { id: "users" as TabId, label: t.admin.tabUsers, Icon: Users },
            ]
          ).filter((t) => canAccessTab(signedIn.role, t.id)).map(({ id, label, Icon }) => (
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
          {signedIn.role !== "Admin" && (
            <div className="ml-auto flex items-center gap-2 px-4 py-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                {locale === "es"
                  ? "Acceso"
                  : locale === "pl"
                    ? "Dostęp"
                    : "Access"}
              </span>
              <RoleBadge role={signedIn.role} label={roleLabel(signedIn.role)} />
              {(signedIn.role === "Viewer" || signedIn.role === "Editor") && (
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                  ·{" "}
                  {locale === "es"
                    ? "solo lectura"
                    : locale === "pl"
                      ? "tylko do odczytu"
                      : "read-only"}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="container mx-auto py-10">
        {/* Role-aware notice */}
        {signedIn.role === "Viewer" && (
          <div className="mb-8 border-l-4 border-kane-blue-deep bg-white p-4 flex items-start gap-3">
            <Shield size={18} className="text-kane-blue-deep shrink-0 mt-0.5" />
            <div>
              <Eyebrow>
                {locale === "es"
                  ? "Perfil Viewer · solo lectura"
                  : locale === "pl"
                    ? "Profil Viewer · tylko do odczytu"
                    : "Viewer profile · read-only"}
              </Eyebrow>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">
                {locale === "es"
                  ? "Puede revisar la analítica de uso y el directorio de personal, pero no puede activar actualizaciones ni cargar datos. Contacte con un Administrador para cambios."
                  : locale === "pl"
                    ? "Możesz przeglądać analitykę użycia i katalog personelu, ale nie możesz uruchamiać odświeżeń ani przesyłać danych. Skontaktuj się z Administratorem w sprawie zmian."
                    : "You can review usage analytics and the staff directory, but you cannot trigger data refreshes or upload. Contact an Admin for changes."}
              </p>
            </div>
          </div>
        )}
        {signedIn.role === "Editor" && (
          <div className="mb-8 border-l-4 border-kane-amber bg-white p-4 flex items-start gap-3">
            <Shield size={18} className="text-kane-amber shrink-0 mt-0.5" />
            <div>
              <Eyebrow>
                {locale === "es"
                  ? "Perfil Editor · sin permisos de carga"
                  : locale === "pl"
                    ? "Profil Editor · bez uprawnień przesyłania"
                    : "Editor profile · no upload rights"}
              </Eyebrow>
              <p className="mt-1 text-sm text-ink-soft leading-relaxed">
                {locale === "es"
                  ? "Puede gestionar fuentes de datos y editar contenido cualitativo, pero no cargar nuevos conjuntos de datos."
                  : locale === "pl"
                    ? "Możesz zarządzać źródłami danych i edytować treści jakościowe, ale nie możesz przesyłać nowych zbiorów danych."
                    : "You can manage data sources and edit qualitative content, but not upload new datasets."}
              </p>
            </div>
          </div>
        )}

        {/* Analytics */}
        {tab === "analytics" && (
          <div>
            <div className="mb-8">
              <Eyebrow>{t.admin.analyticsSection}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">
                {t.admin.analyticsTitle}
              </h2>
            </div>
            <RuleEditorial className="mb-8" />

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {[
                { label: t.admin.today, value: MOCK_USAGE.activeUsers.today, delta: "+12%" },
                { label: t.admin.week, value: MOCK_USAGE.activeUsers.week, delta: "+8%" },
                { label: t.admin.month, value: MOCK_USAGE.activeUsers.month, delta: "+21%" },
              ].map((s) => (
                <EditorialCard key={s.label} className="p-5">
                  <Eyebrow>
                    {t.admin.activeUsers} · {s.label}
                  </Eyebrow>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display tnum text-4xl text-kane-blue-ink">
                      {s.value.toLocaleString(locale === "pl" ? "pl-PL" : locale === "es" ? "es-US" : "en-US")}
                    </span>
                    <span className="font-mono text-[11px] text-positive">{s.delta}</span>
                  </div>
                </EditorialCard>
              ))}
            </div>

            <div className="grid md:grid-cols-12 gap-6">
              <EditorialCard className="md:col-span-5 p-6">
                <Eyebrow>{t.admin.topPages}</Eyebrow>
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
                <Eyebrow>{t.admin.topSearches}</Eyebrow>
                <ul className="mt-4 space-y-2">
                  {MOCK_USAGE.topSearches.map((s, i) => (
                    <li
                      key={s.q}
                      className="flex items-baseline justify-between border-b border-rule pb-2"
                    >
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
                <Eyebrow>{t.admin.recentDownloads}</Eyebrow>
                <ul className="mt-4 space-y-4">
                  {MOCK_USAGE.recentDownloads.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm border-b border-rule pb-3 last:border-0"
                    >
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
              <Eyebrow>{t.admin.dataSection}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">{t.admin.dataTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
                {t.admin.dataLede}
              </p>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="border border-rule bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-paper-deep border-b border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    <th className="text-left p-4">{t.admin.sourceCol}</th>
                    <th className="text-left p-4">{t.admin.freqCol}</th>
                    <th className="text-left p-4">{t.admin.lastRefreshCol}</th>
                    <th className="text-left p-4">{t.admin.statusCol}</th>
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
                          {wasRefreshed
                            ? locale === "es"
                              ? "Justo ahora"
                              : locale === "pl"
                                ? "Przed chwilą"
                                : "Just now"
                            : s.lastRefresh}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-positive">
                            <CheckCircle2 size={12} /> {t.admin.healthy}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleRefresh(s.id)}
                            disabled={isRefreshing || signedIn.role === "Viewer"}
                            className={cn(
                              "inline-flex items-center gap-1.5 border px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] transition-colors",
                              isRefreshing
                                ? "border-rule text-ink-soft/50 cursor-wait"
                                : wasRefreshed
                                  ? "border-positive text-positive"
                                  : "border-kane-blue-ink text-kane-blue-ink hover:bg-kane-blue-ink hover:text-white"
                            )}
                          >
                            <RefreshCw
                              size={12}
                              className={isRefreshing ? "animate-spin" : ""}
                            />
                            {isRefreshing
                              ? t.admin.refreshing
                              : wasRefreshed
                                ? t.admin.refreshed
                                : t.admin.refresh}
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
              <Eyebrow>{t.admin.uploadSection}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">{t.admin.uploadTitle}</h2>
            </div>
            <RuleEditorial className="mb-8" />

            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <EditorialCard>
                  <Eyebrow>{t.admin.permissionsEyebrow}</Eyebrow>
                  <div className="mt-3 flex items-start gap-3">
                    <Shield size={18} className="text-kane-amber shrink-0 mt-0.5" />
                    <p className="text-sm text-ink-soft leading-relaxed">
                      {signedIn.uploadScopes.length === 0
                        ? t.admin.permissionsNone
                        : signedIn.uploadScopes[0] === "*"
                          ? t.admin.permissionsFull
                          : t.admin.permissionsSome}
                    </p>
                  </div>
                  {signedIn.uploadScopes[0] !== "*" && signedIn.uploadScopes.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {signedIn.uploadScopes.map((scope) => {
                        const cat = IPLAN_CATEGORIES.find((c) => c.id === scope);
                        const name =
                          locale === "es"
                            ? cat?.nameEs
                            : locale === "pl"
                              ? cat?.namePl
                              : cat?.name;
                        return (
                          <li
                            key={scope}
                            className="flex items-center gap-2 border-b border-rule pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-kane-blue-ink"
                          >
                            <CheckCircle2 size={12} className="text-positive" />
                            {name ?? scope}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <p className="mt-4 pt-4 border-t border-rule text-[11px] text-ink-soft/70 leading-snug">
                    {t.admin.rowLevelNote}
                  </p>
                </EditorialCard>
              </div>

              <div className="md:col-span-8">
                <EditorialCard>
                  <Eyebrow>{t.admin.newUploadEyebrow}</Eyebrow>
                  <h3 className="mt-2 font-display text-xl text-kane-blue-ink">
                    {t.admin.newUploadTitle}
                  </h3>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                        {t.admin.scopeLabel}
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
                        ).map((c) => {
                          const name =
                            locale === "es" ? c.nameEs : locale === "pl" ? c.namePl : c.name;
                          return (
                            <option key={c.id} value={c.id}>
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                        {t.admin.indicatorNameLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={t.admin.indicatorNamePlaceholder}
                        className="mt-1 w-full border border-rule bg-white px-3 py-2 text-sm focus:border-kane-blue-ink focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                        {t.admin.dataFileLabel}
                      </label>
                      <div className="mt-1 border-2 border-dashed border-rule bg-paper-deep/40 p-8 text-center">
                        <Upload size={24} className="mx-auto text-ink-soft/60" />
                        <p className="mt-2 font-display text-base text-ink-soft">
                          {t.admin.dropCsv}
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/60">
                          {t.admin.dropCsvHint}
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
                          {t.admin.submitUpload}
                        </>
                      )}
                      {uploadStatus === "uploading" && (
                        <>
                          <Clock size={14} className="animate-pulse" /> {t.admin.uploading}
                        </>
                      )}
                      {uploadStatus === "success" && (
                        <>
                          <CheckCircle2 size={14} /> {t.admin.uploaded}
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
              <Eyebrow>{t.admin.usersSection}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">{t.admin.usersTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
                {t.admin.usersLede}
              </p>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="border border-rule bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-paper-deep border-b border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    <th className="text-left p-3">{t.admin.nameCol}</th>
                    <th className="text-left p-3">{t.admin.deptCol}</th>
                    <th className="text-left p-3">{t.admin.roleCol}</th>
                    <th className="text-left p-3">{t.admin.uploadScopeCol}</th>
                    <th className="text-left p-3">{t.admin.emailCol}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ADMIN_USERS.map((u) => (
                    <tr key={u.id} className="border-b border-rule last:border-0 hover:bg-paper-deep/40">
                      <td className="p-3 font-display text-kane-blue-ink">{u.name}</td>
                      <td className="p-3 text-ink-soft">{u.department}</td>
                      <td className="p-3">
                        <RoleBadge role={u.role} label={roleLabel(u.role)} />
                      </td>
                      <td className="p-3 text-[11px] font-mono text-ink-soft">
                        {u.uploadScopes.length === 0
                          ? "—"
                          : u.uploadScopes[0] === "*"
                            ? t.admin.allScopes
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

function pickBalancedRoles(users: readonly StaffUser[]) {
  const buckets: Record<string, StaffUser[]> = { Admin: [], Uploader: [], Editor: [], Viewer: [] };
  users.forEach((u) => buckets[u.role]?.push(u));
  // 2 admins, 2 uploaders, 2 editors, 2 viewers (fall back to whatever exists)
  const out: StaffUser[] = [];
  ["Admin", "Uploader", "Editor", "Viewer"].forEach((role) => {
    out.push(...(buckets[role] ?? []).slice(0, 2));
  });
  return out.slice(0, 8);
}

function RoleBadge({ role, label }: { role: string; label: string }) {
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
      {label}
    </span>
  );
}
