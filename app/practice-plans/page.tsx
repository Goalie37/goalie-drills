"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import { drills } from "@/lib/drills";
import { PracticePlan } from "@/types";
import Link from "next/link";

export default function PracticePlansPage() {
  const [plans, setPlans] = useState<PracticePlan[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PracticePlan | null>(null);

  useEffect(() => {
    setPlans(storage.getPracticePlans());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Delete this practice plan?")) {
      storage.deletePracticePlan(id);
      setPlans(storage.getPracticePlans());
    }
  };

  const startEdit = (plan: PracticePlan) => {
    setEditingPlan(plan);
    setIsCreating(true);
  };

  const cancelEdit = () => {
    setEditingPlan(null);
    setIsCreating(false);
  };

  const savePlan = (plan: PracticePlan) => {
    storage.savePracticePlan(plan);
    setPlans(storage.getPracticePlans());
    setIsCreating(false);
    setEditingPlan(null);
  };

  const getTotalDuration = (plan: PracticePlan) => {
    return plan.drills.reduce((sum, d) => sum + d.duration, 0);
  };

  const getDrillName = (drillId: string) => {
    const drill = drills.find((d) => d.id === drillId);
    return drill ? drill.name : "Unknown Drill";
  };

  if (isCreating || editingPlan) {
    return (
      <PracticePlanEditor
        existingPlan={editingPlan}
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
              Practice Plans
            </h1>
            <p className="text-gray-700 text-lg">
              {plans.length} {plans.length === 1 ? "plan" : "plans"}
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Create Plan
          </button>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-24 border border-black">
            <p className="text-gray-600 text-lg mb-6">
              No practice plans yet
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-8 py-4 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Create Your First Plan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {plans.map((plan) => (
              <div key={plan.id} className="border border-black p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                    <p className="text-gray-600">
                      {plan.drills.length} drills • {getTotalDuration(plan)}{" "}
                      minutes total
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
                <div className="space-y-2">
                  {plan.drills
                    .sort((a, b) => a.order - b.order)
                    .map((d, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center border-t border-gray-300 pt-2"
                      >
                        <span className="text-gray-700">
                          {index + 1}. {getDrillName(d.drillId)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {d.duration} min
                        </span>
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

function PracticePlanEditor({
  existingPlan,
  onSave,
  onCancel,
}: {
  existingPlan: PracticePlan | null;
  onSave: (plan: PracticePlan) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(existingPlan?.name || "");
  const [selectedDrills, setSelectedDrills] = useState<
    { drillId: string; duration: number; order: number }[]
  >(existingPlan?.drills || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrills = drills.filter((drill) =>
    drill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addDrill = (drillId: string) => {
    const drill = drills.find((d) => d.id === drillId);
    if (!drill) return;

    setSelectedDrills([
      ...selectedDrills,
      {
        drillId,
        duration: drill.duration,
        order: selectedDrills.length,
      },
    ]);
  };

  const removeDrill = (index: number) => {
    const updated = selectedDrills.filter((_, i) => i !== index);
    setSelectedDrills(
      updated.map((d, i) => ({
        ...d,
        order: i,
      }))
    );
  };

  const updateDuration = (index: number, duration: number) => {
    const updated = [...selectedDrills];
    updated[index] = { ...updated[index], duration };
    setSelectedDrills(updated);
  };

  const moveDrill = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === selectedDrills.length - 1)
    ) {
      return;
    }

    const updated = [...selectedDrills];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setSelectedDrills(
      updated.map((d, i) => ({
        ...d,
        order: i,
      }))
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a plan name");
      return;
    }

    if (selectedDrills.length === 0) {
      alert("Please add at least one drill");
      return;
    }

    const plan: PracticePlan = {
      id: existingPlan?.id || Date.now().toString(),
      name: name.trim(),
      drills: selectedDrills,
      createdAt: existingPlan?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(plan);
  };

  const totalDuration = selectedDrills.reduce(
    (sum, d) => sum + d.duration,
    0
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            {existingPlan ? "Edit" : "Create"} Practice Plan
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Plan Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm uppercase tracking-wider mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Monday Fundamentals"
                  className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="border-t border-black pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Selected Drills</h3>
                  <span className="text-sm">
                    Total: {totalDuration} minutes
                  </span>
                </div>

                {selectedDrills.length === 0 ? (
                  <p className="text-gray-600">
                    No drills added yet. Search and add drills from the library.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedDrills.map((drill, index) => {
                      const drillData = drills.find(
                        (d) => d.id === drill.drillId
                      );
                      return (
                        <div
                          key={index}
                          className="border border-black p-4"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="font-bold mb-1">
                                {index + 1}. {drillData?.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {drillData?.difficulty}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => moveDrill(index, "up")}
                                disabled={index === 0}
                                className="text-sm px-2 py-1 border border-black disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                              >
                                ↑
                              </button>
                              <button
                                onClick={() => moveDrill(index, "down")}
                                disabled={
                                  index === selectedDrills.length - 1
                                }
                                className="text-sm px-2 py-1 border border-black disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                              >
                                ↓
                              </button>
                              <button
                                onClick={() => removeDrill(index)}
                                className="text-sm px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <label className="text-sm uppercase tracking-wider">
                              Duration:
                            </label>
                            <input
                              type="number"
                              value={drill.duration}
                              onChange={(e) =>
                                updateDuration(
                                  index,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-20 px-2 py-1 border border-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <span className="text-sm">min</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  onClick={handleSave}
                  className="px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Save Plan
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

          <div>
            <h2 className="text-2xl font-bold mb-6">Add Drills</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drills..."
                className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredDrills.map((drill) => {
                  const isAdded = selectedDrills.some(
                    (d) => d.drillId === drill.id
                  );
                  return (
                    <div
                      key={drill.id}
                      className="border border-black p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{drill.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {drill.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span>{drill.difficulty}</span>
                            <span>{drill.duration} min</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => addDrill(drill.id)}
                        disabled={isAdded}
                        className="mt-3 w-full px-4 py-2 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
                      >
                        {isAdded ? "Added" : "Add to Plan"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
