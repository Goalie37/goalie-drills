import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Master your craft
          </h1>
          <p className="text-xl leading-relaxed mb-12 text-gray-700">
            A curated library of ice hockey goalie drills. Build practice plans,
            design your season, and elevate your game.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/drills"
              className="px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Browse Drills
            </Link>
            <Link
              href="/practice-plans"
              className="px-8 py-4 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Create Plan
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Drill Library</h3>
              <p className="text-gray-700 leading-relaxed">
                1 curated drill covering technique, positioning, conditioning,
                and game situations.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Practice Plans</h3>
              <p className="text-gray-700 leading-relaxed">
                Combine drills into structured practice sessions with timing and
                flow.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Season Plans</h3>
              <p className="text-gray-700 leading-relaxed">
                Map out your season with weekly themes and progressive training
                plans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
