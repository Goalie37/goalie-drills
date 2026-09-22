export type DiagramCanvasType = "in-zone" | "crease" | "dual";

export type DiagramElementType =
  | "goalie"
  | "shooter"
  | "cone"
  | "puck"
  | "screen"
  | "label";

export type PathType = "solid" | "wavy" | "dashed";
export type PathColor = "black" | "green" | "orange";

export interface DiagramPath {
  type: PathType;
  points: { x: number; y: number }[];
  color?: PathColor;
  hasArrow?: boolean;
}

export interface DiagramElement {
  id: string;
  type: DiagramElementType;
  x: number;
  y: number;
  label?: string;
  canvas?: "left" | "right"; // For dual canvas
}

export interface CreaseDiagram {
  canvasType: DiagramCanvasType;
  elements: DiagramElement[];
  paths: DiagramPath[];
  notes?: string;
}

export interface Drill {
  id: string;
  name: string;
  description: string;
  categories: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Elite";
  duration: number;
  equipment: string[];
  coachingCues: string[];
  diagram: CreaseDiagram;
}

export interface PracticePlan {
  id: string;
  name: string;
  drills: {
    drillId: string;
    duration: number;
    order: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface SeasonPlan {
  id: string;
  name: string;
  weeks: {
    weekNumber: number;
    theme: string;
    practicePlanIds: string[];
  }[];
  startDate: string;
  createdAt: string;
  updatedAt: string;
}
