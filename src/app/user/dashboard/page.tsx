"use client"

import { useUser } from "@/hooks/queries/useUserQuery";

export default function StudentDashboard() {
  const { data: user } = useUser();

  return (
    <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Athlète
              </h1>
              <p className="text-gray-600 mt-1">
                Bienvenue, <span className="font-semibold">{ user?.name }</span> 💪
              </p>
            </div>
          </div>
        </div>
    </main>
  );
}