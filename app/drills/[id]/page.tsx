import { drills } from "@/lib/drills";
import Link from "next/link";
import { notFound } from "next/navigation";
import CreaseDiagram from "@/components/CreaseDiagram";

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/drills"
          className="inline-block text-sm uppercase tracking-wider mb-8 hover:text-gray-600 transition-colors"
        >
          ← Back to Drills
        </Link>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-5xl font-bold tracking-tight">{drill.name}</h1>
            <span className="text-lg border border-black px-4 py-2">
              {drill.duration} min
            </span>
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

        {/* Crease Diagram - Hero Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">Drill Setup</h2>
          <CreaseDiagram diagram={drill.diagram} width={600} height={450} />
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
