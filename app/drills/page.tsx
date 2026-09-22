"use client";

import { useState, useMemo } from "react";
import { drills } from "@/lib/drills";
import Link from "next/link";

export default function DrillsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    drills.forEach((drill) => {
      drill.categories.forEach((cat) => categories.add(cat));
    });
    return ["All", ...Array.from(categories).sort()];
  }, []);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Elite"];

  const filteredDrills = useMemo(() => {
    return drills.filter((drill) => {
      const matchesSearch =
        searchTerm === "" ||
        drill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drill.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        drill.categories.includes(selectedCategory);

      const matchesDifficulty =
        selectedDifficulty === "All" ||
        drill.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Drill Library
          </h1>
          <p className="text-gray-700 text-lg">
            {drills.length} curated goalie drills
          </p>
        </div>

        <div className="mb-12 space-y-4">
          <input
            type="text"
            placeholder="Search drills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 border border-black focus:outline-none focus:ring-2 focus:ring-black text-lg"
          />

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredDrills.map((drill) => (
            <Link
              key={drill.id}
              href={`/drills/${drill.id}`}
              className="block border border-black p-6 hover:bg-black hover:text-white transition-colors group"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold">{drill.name}</h2>
                <span className="text-sm border border-current px-3 py-1 group-hover:border-white">
                  {drill.duration} min
                </span>
              </div>
              <p className="text-gray-700 group-hover:text-gray-300 mb-4 leading-relaxed">
                {drill.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {drill.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs uppercase tracking-wider border border-current px-2 py-1 group-hover:border-white"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <span className="uppercase tracking-wider">
                  {drill.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredDrills.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-600 text-lg">
              No drills found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
