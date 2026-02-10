import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-calsans text-[120px] md:text-[180px] lg:text-[220px] leading-none text-secondary drop-shadow-lg">
            401
          </h1>
        </div>

        <h2 className="title-section font-calsans mb-4">
          Vous n&apos;avez pas le droit d&apos;être ici !
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/authentication"
            className="btn-primary inline-flex items-center gap-2"
          >
            Connexion
          </Link>
          <Link
            href="/"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}