export type DiagramElementType =
  | "goalie"
  | "cone"
  | "shooter"
  | "puck"
  | "path"
  | "arrow"
  | "label"
  | "screen";

export interface DiagramElement {
  type: DiagramElementType;
  x?: number;
  y?: number;
  rotation?: number;
  label?: string;
  pathPoints?: { x: number; y: number }[];
  size?: number;
}

export interface CreaseDiagram {
  elements: DiagramElement[];
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
