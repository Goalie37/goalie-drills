import { drills } from "@/lib/drills";
import { notFound } from "next/navigation";
import DrillCreator from "@/components/DrillCreator";

export default async function EditDrillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Check seeded drills first
  let drill = drills.find((d) => d.id === id);
  
  // If not found, it might be a custom drill (will be loaded client-side)
  if (!drill && !id.startsWith("custom-")) {
    notFound();
  }

  return <DrillCreator initialDrill={drill} />;
}
