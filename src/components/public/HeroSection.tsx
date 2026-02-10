import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { ArrowRight } from 'lucide-react'

export default function HeroSection () {
  return (
    <section className="relative min-h-[calc(100dvh-88px)]
                        bg-gradient-to-t lg:bg-radial-[at_50%_90%] from-light-blue from-3% to-dark-blue to-80% lg:to-70%
                        px-2 flex flex-col items-center pt-20 lg:pt-28">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-light-blue animate-pulse" />
            <span className="text-sm font-medium text-background">
              Le suivi d&apos;entraînement nouvelle génération
            </span>
        </div>
        <h1 className="font-calsans text-background mx-auto max-w-5xl text-center text-3xl lg:text-7xl"><span>Calitrack</span>, tes objectifs,<br />Ta discipline ton app</h1>
        <p className="text-background mt-8 max-w-3xl mx-auto text-center text-lg lg:text-xl">Suis tes progrès, planifie tes séances et avance pas à pas vers tes objectifs en calisthenie.</p>
        <div className="mt-5 pb-20 flex flex-wrap justify-center items-center gap-4">
          <Link href="https://forms.gle/vBnbwfF6Rv28xgtL8" aria-label="Télécharger l'application" className="btn-primary hover:bg-inherit hover:text-background">Commencer gratuitement <ArrowRight className="ml-2 h-5 w-5" /></Link>
          <Link href="/features" aria-label="Découvrir les fonctionnalités" className="btn-quartenary">En savoir plus</Link>
        </div>

        <div className='absolute bottom-8 left-1/2 -translate-x-1/2'>
          <Link href="#features" className='text-background font-sora font-semibold flex flex-col items-center justify-center gap-1 transition-transform duration-300 hover:translate-y-2'>
            <span>En savoir plus</span>
            <FaChevronDown size={ 32 } className='text-background' />
          </Link>
        </div>
      </section>
  )
}