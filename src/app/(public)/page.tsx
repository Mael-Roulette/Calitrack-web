import AboutSection from '@/components/public/AboutSection';
import DownloadSection from '@/components/public/DownloadSection';
import FaqSection from '@/components/public/FaqSection';
import FeaturesSection from '@/components/public/FeaturesSection';
import HeroSection from '@/components/public/HeroSection';
import { PricingSection } from '@/components/public/PricingSection';
import RoadmapSection from '@/components/public/RoadmapSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Calitrack - L'application qui t'accompagne en calisthenics",
  description: "Calitrack est l'application mobile qui te permet de suivre ta progression en te fixant des objectifs et en créant tes propres entraînements.",
  keywords: "calisthenics, application calisthenics, suivi progression, entraînement, street workout, objectifs sportifs",
  openGraph: {
    title: "Calitrack - L'application qui t'accompagne en calisthenics",
    description: "Suis tes progrès, planifie tes séances et avance vers tes objectifs en calisthenics",
    type: "website",
    locale: "fr_FR",
    images: [ '/images/og-image.jpg' ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calitrack - L'application calisthenics",
    description: "Suis ta progression en calisthenics",
  },
  alternates: {
    canonical: 'https://calitrack.fr'
  },
  authors: [ { name: "Calitrack" } ],
  category: "Sports & Fitness",
};


export default function Home () {
  return (
    <main className='overflow-x-hidden'>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <RoadmapSection />
      <PricingSection />
      <FaqSection />
      {/* <DownloadSection /> */}
    </main>
  );
}
