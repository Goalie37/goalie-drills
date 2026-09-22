"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Drill, CreaseDiagram } from "@/types";
import { storage } from "@/lib/storage";
import DiagramEditor from "@/components/DiagramEditor";

export default function DrillEditorClient({ drill }: { drill: Drill }) {
  const router = useRouter();
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
