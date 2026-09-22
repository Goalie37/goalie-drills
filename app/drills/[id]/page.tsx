import { drills } from "@/lib/drills";
import Link from "next/link";
import { notFound } from "next/navigation";
import DiagramDisplay from "@/components/DiagramDisplay";

export default async function DrillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drill = drills.find((d) => d.id === id);

  if (!drill) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/drills"
          className="inline-block text-sm uppercase tracking-wider mb-8 hover:text-gray-600 transition-colors"
        >
          ← Back to Drills
        </Link>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-5xl font-bold tracking-tight">
                {drill.name}
                {drill.id.startsWith("custom-") && (
                  <span className="ml-4 text-xl border-2 border-black px-3 py-1">CUSTOM</span>
                )}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg border border-black px-4 py-2">
                {drill.duration} min
              </span>
              <Link
                href={`/create/${drill.id}`}
                className="px-6 py-3 border-2 border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Edit
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {drill.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs uppercase tracking-wider border border-black px-3 py-2"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="text-lg mb-2">
            <span className="uppercase tracking-wider font-bold">
              {drill.difficulty}
            </span>
          </div>
        </div>

        {/* Drill Diagram */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider">Drill Setup</h2>
          </div>
          <DiagramDisplay diagram={drill.diagram} drillId={drill.id} />
        </div>

        <div className="border-t border-black pt-8 space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {drill.description}
            </p>
          </div>

          {drill.equipment.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Equipment</h2>
              <ul className="space-y-2">
                {drill.equipment.map((item, index) => (
                  <li key={index} className="text-lg text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-4">Coaching Cues</h2>
            <ul className="space-y-3">
              {drill.coachingCues.map((cue, index) => (
                <li
                  key={index}
                  className="text-lg text-gray-700 border-l-2 border-black pl-4"
                >
                  {cue}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black">
          <Link
            href="/practice-plans"
            className="inline-block px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Add to Practice Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
