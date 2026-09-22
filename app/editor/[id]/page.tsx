import { drills } from "@/lib/drills";
import { notFound } from "next/navigation";
import DrillEditorClient from "./DrillEditorClient";

export default async function DrillEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drill = drills.find((d) => d.id === id);

  if (!drill) {
    notFound();
  }

  return <DrillEditorClient drill={drill} />;
}
