"use client";

import { drills } from "@/lib/drills";
import Link from "next/link";
import { useState } from "react";

export default function EditorPage() {
  const [filter, setFilter] = useState("");

  const filteredDrills = drills.filter((drill) =>
    drill.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Drill Diagram Editor
          </h1>
          <p className="text-gray-700 text-lg">
            Edit diagrams for all {drills.length} drills
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search drills..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-6 py-4 border border-black focus:outline-none focus:ring-2 focus:ring-black text-lg"
          />
        </div>

        <div className="space-y-4">
          {filteredDrills.map((drill) => (
            <div
              key={drill.id}
              className="border border-black p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{drill.name}</h2>
                  <p className="text-gray-600 mb-2">{drill.description}</p>
                  <div className="flex gap-2 text-sm">
                    <span className="uppercase tracking-wider">
                      {drill.difficulty}
                    </span>
                    <span>•</span>
                    <span>{drill.duration} min</span>
                    <span>•</span>
                    <span className="uppercase tracking-wider">
                      {drill.diagram?.canvasType || "No canvas"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/editor/${drill.id}`}
                  className="px-6 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Edit Diagram
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
