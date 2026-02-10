"use client";

import { useState } from "react";
import Image from "next/image";

export type UserRole = "student" | "coach" | "user";

interface RoleSelectionProps {
  onSelectRole: (role: UserRole[]) => Promise<void>;
  isLoading: boolean;
}

interface RoleOption {
  value: UserRole[];
  title: string;
  description: string;
  icon: string;
}

const roleOptions: RoleOption[] = [
  {
    value: ["user"],
    title: "Utilisateur",
    description: "Je veux suivre mes entraînements et progresser en calisthenics",
    icon: "💪",
  },
  {
    value: ["user", "coach"],
    title: "Coach",
    description: "Je veux gérer mes athlètes et créer des programmes d'entraînement",
    icon: "🎯",
  },
];

export default function RoleSelection({ onSelectRole, isLoading }: RoleSelectionProps) {
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);

  const handleSubmit = async () => {
    if (selectedRoles.length > 0) {
      await onSelectRole(selectedRoles);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bbg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              width={120}
              height={67}
              alt="Calitrack"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bienvenue sur Calitrack !
          </h1>
          <p className="text-lg text-foreground/70">
            Choisis ton profil pour commencer
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {roleOptions.map((option) => {
            const isSelected =
              selectedRoles.length === option.value.length &&
              option.value.every(role => selectedRoles.includes(role));

            return (
              <button
                key={option.title}
                onClick={() => setSelectedRoles(option.value)}
                disabled={isLoading}
                className={`
                  relative p-6 border-2 rounded-lg transition-all duration-200
                  ${isSelected
                    ? "border-4 border-secondary shadow-lg scale-105 hover:bg-secondary/10"
                    : "border-foreground hover:bg-foreground/10"
                  }
                  ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <div className="text-5xl mb-4 text-center">{option.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={selectedRoles.length === 0 || isLoading}
            className="btn-primary"
          >
            {isLoading ? "Chargement..." : "Continuer"}
          </button>
        </div>

        {/* Info message */}
        <div className="text-center">
          <p className="text-sm text-foreground/70">
            Tu pourras modifier ton profil plus tard dans les paramètres
          </p>
        </div>
      </div>
    </div>
  );
}