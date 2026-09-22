export interface Drill {
  id: string;
  name: string;
  description: string;
  categories: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Elite";
  duration: number;
  equipment: string[];
  coachingCues: string[];
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
