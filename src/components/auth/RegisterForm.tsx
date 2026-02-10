"use client";

import { useState } from "react";

interface RegisterFormProps {
  onSubmit: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation du mot de passe
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setPasswordError("");
    await onSubmit(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="register-name" className="block mb-1">
          Nom
        </label>
        <input
          id="register-name"
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-foreground/70 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="register-email" className="block mb-1">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          placeholder="exemple@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-foreground/70 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="register-password" className="block mb-1">
          Mot de passe
        </label>
        <input
          id="register-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          className="w-full px-4 py-2 border border-foreground/70 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          disabled={isLoading}
          minLength={8}
        />
      </div>

      <div>
        <label htmlFor="register-confirm-password" className="block mb-1">
          Confirmer le mot de passe
        </label>
        <input
          id="register-confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError("");
          }}
          className="w-full px-4 py-2 border border-foreground/70 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          required
          disabled={isLoading}
        />
      </div>

      {passwordError && (
        <div className="text-red-600 text-sm">
          {passwordError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !email || !password || !name || !confirmPassword}
        className="w-full btn-primary"
      >
        {isLoading ? "Inscription..." : "S'inscrire"}
      </button>
    </form>
  );
}