'use client'

import { ArrowLeft, Home, Search } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="font-calsans text-[120px] md:text-[180px] lg:text-[220px] leading-none text-secondary drop-shadow-lg">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="title-section font-calsans mb-4">
          Oups ! <span>Page introuvable</span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground/80">
          On dirait que cette page a décidé de faire une pause... ou peut-être qu&apos;elle travaille sur son <strong>front lever</strong> ! 💪
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/features"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Découvrir les fonctionnalités
          </Link>
        </div>
      </div>
    </main>
  );
}