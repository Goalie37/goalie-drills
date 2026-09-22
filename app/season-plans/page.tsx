"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import { SeasonPlan, PracticePlan } from "@/types";

export default function SeasonPlansPage() {
  const [seasonPlans, setSeasonPlans] = useState<SeasonPlan[]>([]);
  const [practicePlans, setPracticePlans] = useState<PracticePlan[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SeasonPlan | null>(null);

  useEffect(() => {
    setSeasonPlans(storage.getSeasonPlans());
    setPracticePlans(storage.getPracticePlans());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Delete this season plan?")) {
      storage.deleteSeasonPlan(id);
      setSeasonPlans(storage.getSeasonPlans());
    }
  };

  const startEdit = (plan: SeasonPlan) => {
    setEditingPlan(plan);
    setIsCreating(true);
  };

  const cancelEdit = () => {
    setEditingPlan(null);
    setIsCreating(false);
  };

  const savePlan = (plan: SeasonPlan) => {
    storage.saveSeasonPlan(plan);
    setSeasonPlans(storage.getSeasonPlans());
    setIsCreating(false);
    setEditingPlan(null);
  };

  const getPracticePlanName = (planId: string) => {
    const plan = practicePlans.find((p) => p.id === planId);
    return plan ? plan.name : "Unknown Plan";
  };

  if (isCreating || editingPlan) {
    return (
      <SeasonPlanEditor
        existingPlan={editingPlan}
        practicePlans={practicePlans}
        onSave={savePlan}
        onCancel={cancelEdit}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              Season Plans
            </h1>
            <p className="text-gray-700 text-lg">
              {seasonPlans.length}{" "}
              {seasonPlans.length === 1 ? "season" : "seasons"}
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Create Season
          </button>
        </div>

        {practicePlans.length === 0 && (
          <div className="mb-8 border border-black p-6 bg-gray-50">
            <p className="text-gray-700">
              <strong>Note:</strong> Create practice plans first to build your
              season schedule.
            </p>
          </div>
        )}

        {seasonPlans.length === 0 ? (
          <div className="text-center py-24 border border-black">
            <p className="text-gray-600 text-lg mb-6">No season plans yet</p>
            <button
              onClick={() => setIsCreating(true)}
              disabled={practicePlans.length === 0}
              className="px-8 py-4 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-30"
            >
              Create Your First Season
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {seasonPlans.map((plan) => (
              <div key={plan.id} className="border border-black p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                    <p className="text-gray-600">
                      {plan.weeks.length} weeks •{" "}
                      {new Date(plan.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => startEdit(plan)}
                      className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.weeks.map((week) => (
                    <div
                      key={week.weekNumber}
                      className="border-t border-gray-300 pt-4"
                    >
                      <div className="font-bold mb-1">
                        Week {week.weekNumber}: {week.theme}
                      </div>
                      {week.practicePlanIds.length > 0 ? (
                        <ul className="text-sm text-gray-700 ml-4">
                          {week.practicePlanIds.map((planId) => (
                            <li key={planId}>
                              • {getPracticePlanName(planId)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 ml-4">
                          No practice plans assigned
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SeasonPlanEditor({
  existingPlan,
  practicePlans,
  onSave,
  onCancel,
}: {
  existingPlan: SeasonPlan | null;
  practicePlans: PracticePlan[];
  onSave: (plan: SeasonPlan) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(existingPlan?.name || "");
  const [startDate, setStartDate] = useState(
    existingPlan?.startDate
      ? new Date(existingPlan.startDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [weeks, setWeeks] = useState<
    { weekNumber: number; theme: string; practicePlanIds: string[] }[]
  >(existingPlan?.weeks || []);

  const addWeek = () => {
    setWeeks([
      ...weeks,
      {
        weekNumber: weeks.length + 1,
        theme: "",
        practicePlanIds: [],
      },
    ]);
  };

  const removeWeek = (index: number) => {
    const updated = weeks.filter((_, i) => i !== index);
    setWeeks(
      updated.map((w, i) => ({
        ...w,
        weekNumber: i + 1,
      }))
    );
  };

  const updateWeekTheme = (index: number, theme: string) => {
    const updated = [...weeks];
    updated[index] = { ...updated[index], theme };
    setWeeks(updated);
  };

  const togglePracticePlan = (weekIndex: number, planId: string) => {
    const updated = [...weeks];
    const week = updated[weekIndex];
    if (week.practicePlanIds.includes(planId)) {
      week.practicePlanIds = week.practicePlanIds.filter((id) => id !== planId);
    } else {
      week.practicePlanIds.push(planId);
    }
    setWeeks(updated);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a season name");
      return;
    }

    if (weeks.length === 0) {
      alert("Please add at least one week");
      return;
    }

    const plan: SeasonPlan = {
      id: existingPlan?.id || Date.now().toString(),
      name: name.trim(),
      weeks,
      startDate,
      createdAt: existingPlan?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(plan);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            {existingPlan ? "Edit" : "Create"} Season Plan
          </h1>
        </div>

        <div className="space-y-8">
          <div className="border border-black p-6">
            <h2 className="text-2xl font-bold mb-6">Season Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm uppercase tracking-wider mb-2">
                  Season Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Fall 2026 Season"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-wider mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          <div className="border border-black p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Weekly Schedule</h2>
              <button
                onClick={addWeek}
                className="px-6 py-2 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Add Week
              </button>
            </div>

            {weeks.length === 0 ? (
              <p className="text-gray-600">
                No weeks added yet. Click "Add Week" to start building your
                season.
              </p>
            ) : (
              <div className="space-y-6">
                {weeks.map((week, index) => (
                  <div key={index} className="border border-gray-300 p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">Week {week.weekNumber}</h3>
                      <button
                        onClick={() => removeWeek(index)}
                        className="text-sm px-3 py-1 border border-black hover:bg-black hover:text-white transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">
                          Theme / Focus
                        </label>
                        <input
                          type="text"
                          value={week.theme}
                          onChange={(e) =>
                            updateWeekTheme(index, e.target.value)
                          }
                          placeholder="e.g., Butterfly Technique"
                          className="w-full px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div>
                        <label className="block text-sm uppercase tracking-wider mb-2">
                          Practice Plans
                        </label>
                        {practicePlans.length === 0 ? (
                          <p className="text-sm text-gray-600">
                            No practice plans available. Create practice plans
                            first.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {practicePlans.map((plan) => (
                              <label
                                key={plan.id}
                                className="flex items-center space-x-3 p-2 border border-gray-300 hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={week.practicePlanIds.includes(
                                    plan.id
                                  )}
                                  onChange={() =>
                                    togglePracticePlan(index, plan.id)
                                  }
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">{plan.name}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Save Season
            </button>
            <button
              onClick={onCancel}
              className="px-8 py-4 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
