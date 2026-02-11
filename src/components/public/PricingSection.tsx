import { Check, Zap } from 'lucide-react'
import Link from 'next/link'
import plans from "@/data/public/pricing.json"

export function PricingSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-foreground via-light-blue to-foreground">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,53,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-background mb-4">
            Les tarifs coachs
          </h2>
          <p className="text-lg text-background/70 max-w-4xl mx-auto">
            Choisissez le plan qui correspond à votre activité. Changez ou
            annulez à tout moment.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-b from-secondary/35 to-transparent border-secondary/50 shadow-xl shadow-secondary/20'
                  : 'bg-background/5 border-background/10 hover:bg-background/10 hover:border-background/20'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-secondary to-orange-600 text-background text-sm font-semibold shadow-lg">
                    <Zap className="h-4 w-4" />
                    Plus populaire
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-2xl font-bold text-background mb-2">
                {plan.name}
              </h3>
              <p className="text-background/70 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {plan.period ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-background">
                      {plan.price}€
                    </span>
                    <span className="text-background/70">/ {plan.period}</span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-background">
                    {plan.price}
                  </div>
                )}
              </div>

              {/* CTA button */}
              <Link href="/authentication" className={`mb-8 w-full ${ plan.popular ? "btn-primary" : "btn-secondary"}`}>
                {plan.cta}
              </Link>

              {/* Features list */}
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check
                      className={`h-6 w-6 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-secondary' : 'text-foreground'
                      }`}
                    />
                    <span className="text-background">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-background/70 mt-12">
          Tous les plans incluent 14 jours d'essai gratuit. Aucune carte
          bancaire requise.
        </p>
      </div>
    </section>
  )
}