import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goalie Drills",
  description: "Sleek directory of ice hockey goalie drills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold tracking-tight">
                GOALIE DRILLS
              </Link>
              <div className="flex space-x-8">
                <Link
                  href="/drills"
                  className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  Drills
                </Link>
                <Link
                  href="/practice-plans"
                  className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  Practice Plans
                </Link>
                <Link
                  href="/season-plans"
                  className="text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                >
                  Season Plans
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-black mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-sm text-gray-600">
              A directory for goalie coaches and players
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
