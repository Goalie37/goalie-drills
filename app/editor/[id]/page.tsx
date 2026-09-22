"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { drills } from "@/lib/drills";
import { storage } from "@/lib/storage";
import DiagramEditor from "@/components/DiagramEditor";
import { CreaseDiagram } from "@/types";

export default function DrillEditorPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [drill, setDrill] = useState(() => drills.find((d) => d.id === params.id));
  const [customDiagrams, setCustomDiagrams] = useState<Record<string, CreaseDiagram>>({});

  useEffect(() => {
    // Load custom diagrams from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("drill-diagrams");
      if (saved) {
        setCustomDiagrams(JSON.parse(saved));
      }
    }
  }, []);

  if (!drill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Drill not found</p>
      </div>
    );
  }

  // Use custom diagram if available, otherwise use default
  const currentDiagram = customDiagrams[drill.id] || drill.diagram;

  const handleSave = (diagram: CreaseDiagram) => {
    const updated = { ...customDiagrams, [drill.id]: diagram };
    setCustomDiagrams(updated);
    localStorage.setItem("drill-diagrams", JSON.stringify(updated));
    router.push(`/drills/${drill.id}`);
  };

  const handleCancel = () => {
    router.push(`/drills/${drill.id}`);
  };

  return (
    <DiagramEditor
      initialDiagram={currentDiagram}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
