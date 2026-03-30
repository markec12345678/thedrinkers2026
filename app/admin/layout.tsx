import Link from "next/link";
import { requireAdminUser } from "@/lib/auth-utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUser("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Admin Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-white font-bold text-xl">
                🎸 Admin
              </Link>
              <nav className="hidden md:flex gap-4">
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/ai-generator"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>✨</span> AI Generator
                </Link>
                <Link
                  href="/admin/ai-batch-generator"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>🎨</span> Batch Generator
                </Link>
                <Link
                  href="/admin/analytics"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  📊 Analytics
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                ← Nazaj na stran
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
