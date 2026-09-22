import { PracticePlan, SeasonPlan } from "@/types";

const PRACTICE_PLANS_KEY = "goalie-drills-practice-plans";
const SEASON_PLANS_KEY = "goalie-drills-season-plans";

export const storage = {
  // Practice Plans
  getPracticePlans: (): PracticePlan[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(PRACTICE_PLANS_KEY);
    return data ? JSON.parse(data) : [];
  },

  savePracticePlan: (plan: PracticePlan): void => {
    if (typeof window === "undefined") return;
    const plans = storage.getPracticePlans();
    const existingIndex = plans.findIndex((p) => p.id === plan.id);
    if (existingIndex >= 0) {
      plans[existingIndex] = plan;
    } else {
      plans.push(plan);
    }
    localStorage.setItem(PRACTICE_PLANS_KEY, JSON.stringify(plans));
  },

  deletePracticePlan: (id: string): void => {
    if (typeof window === "undefined") return;
    const plans = storage.getPracticePlans();
    const filtered = plans.filter((p) => p.id !== id);
    localStorage.setItem(PRACTICE_PLANS_KEY, JSON.stringify(filtered));
  },

  getPracticePlan: (id: string): PracticePlan | null => {
    const plans = storage.getPracticePlans();
    return plans.find((p) => p.id === id) || null;
  },

  // Season Plans
  getSeasonPlans: (): SeasonPlan[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(SEASON_PLANS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSeasonPlan: (plan: SeasonPlan): void => {
    if (typeof window === "undefined") return;
    const plans = storage.getSeasonPlans();
    const existingIndex = plans.findIndex((p) => p.id === plan.id);
    if (existingIndex >= 0) {
      plans[existingIndex] = plan;
    } else {
      plans.push(plan);
    }
    localStorage.setItem(SEASON_PLANS_KEY, JSON.stringify(plans));
  },

  deleteSeasonPlan: (id: string): void => {
    if (typeof window === "undefined") return;
    const plans = storage.getSeasonPlans();
    const filtered = plans.filter((p) => p.id !== id);
    localStorage.setItem(SEASON_PLANS_KEY, JSON.stringify(filtered));
  },

  getSeasonPlan: (id: string): SeasonPlan | null => {
    const plans = storage.getSeasonPlans();
    return plans.find((p) => p.id === id) || null;
  },
};
