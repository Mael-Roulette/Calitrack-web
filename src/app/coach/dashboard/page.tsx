"use client";

import { getCurrentUser } from "@/services/authService";
import { UserDoc } from "@/types/user";
import { useEffect, useState } from "react";

export default function CoachDashboard() {
  const [user, setUser] = useState<UserDoc | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Espace Coach</h1>
      {user && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <p>Bienvenue, <strong>{user.name}</strong></p>
          <p>Email: {user.email}</p>
          <p>Rôles: {user.roles.join(", ")}</p>
        </div>
      )}
      {/* Un bouton pour aller voir la vue utilisateur */}
      <button onClick={() => window.location.href='/user/dashboard'} className="mt-4 text-blue-500 underline">
        Voir ma vue athlète
      </button>
    </div>
  );
}