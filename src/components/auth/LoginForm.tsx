"use client";

import { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block mb-1">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          placeholder="exemple@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-foreground/70 rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block mb-1">
          Mot de passe
        </label>
        <input
          id="login-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-foreground/70 rounded focus:outline-none focus:ring-2 focus:ring-light-blue"
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className="btn-quartenary w-full"
      >
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}