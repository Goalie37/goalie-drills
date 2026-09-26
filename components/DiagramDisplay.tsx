"use client";

import { useEffect, useState } from "react";
import { CreaseDiagram } from "@/types";
import { InZoneCanvas } from "./RinkCanvas";
import { DiagramElements } from "./DiagramElements";

interface DiagramDisplayProps {
  diagram: CreaseDiagram;
  drillId?: string;
}

export default function DiagramDisplay({ diagram, drillId }: DiagramDisplayProps) {
  const [customDiagram, setCustomDiagram] = useState<CreaseDiagram | null>(null);

  useEffect(() => {
    if (drillId && typeof window !== "undefined") {
      const saved = localStorage.getItem("drill-diagrams");
      if (saved) {
        const diagrams = JSON.parse(saved);
        if (diagrams[drillId]) {
          setCustomDiagram(diagrams[drillId]);
        }
      }
    }
  }, [drillId]);

  const activeDiagram = customDiagram || diagram;
  const elements =
    activeDiagram.canvasType === "dual"
      ? activeDiagram.elements.filter((element) => element.canvas !== "right")
      : activeDiagram.elements;

  return (
    <div className="bg-white inline-block">
      <InZoneCanvas width={600}>
        <DiagramElements elements={elements} paths={activeDiagram.paths} />
      </InZoneCanvas>
    </div>
  );
}
