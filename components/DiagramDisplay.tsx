"use client";

import { useEffect, useState } from "react";
import { CreaseDiagram } from "@/types";
import { InZoneCanvas, CreaseCanvas, DualCanvas } from "./RinkCanvas";
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

  if (activeDiagram.canvasType === "dual") {
    const leftElements = activeDiagram.elements.filter((e) => e.canvas === "left");
    const rightElements = activeDiagram.elements.filter((e) => e.canvas === "right");

    return (
      <DualCanvas width={1000} height={500}
        leftChildren={
          <DiagramElements elements={leftElements} paths={activeDiagram.paths} />
        }
        rightChildren={
          <DiagramElements elements={rightElements} paths={[]} />
        }
      />
    );
  }

  if (activeDiagram.canvasType === "crease") {
    return (
      <div className="border-2 border-black p-4 bg-white inline-block">
        <CreaseCanvas width={600} height={600}>
          <DiagramElements elements={activeDiagram.elements} paths={activeDiagram.paths} />
        </CreaseCanvas>
      </div>
    );
  }

  return (
    <div className="border-2 border-black p-4 bg-white inline-block">
      <InZoneCanvas width={600} height={600}>
        <DiagramElements elements={activeDiagram.elements} paths={activeDiagram.paths} />
      </InZoneCanvas>
    </div>
  );
}
