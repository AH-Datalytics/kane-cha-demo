import { notFound } from "next/navigation";
import { PRIORITY_AREAS } from "@/lib/data";
import { PriorityAreaView } from "./priority-area-view";

export function generateStaticParams() {
  return PRIORITY_AREAS.map((p) => ({ slug: p.slug }));
}

export default function PriorityAreaPage({ params }: { params: { slug: string } }) {
  const exists = PRIORITY_AREAS.find((p) => p.slug === params.slug);
  if (!exists) return notFound();
  return <PriorityAreaView slug={params.slug} />;
}
