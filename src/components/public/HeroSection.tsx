import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function HeroSection () {
  return (
    <section className="relative min-h-[calc(100dvh-88px)] bg-gradient-to-t lg:bg-radial-[at_50%_90%] from-[#4E63D7] from-3% to-foreground to-80% lg:to-70% px-2">
        <h1 className="font-calsans text-background pt-16 lg:pt-24 mx-auto max-w-5xl text-center text-3xl lg:text-7xl"><span>Calitrack</span>, tes objectifs,<br />Ta discipline ton app</h1>
        <p className="text-background mt-8 max-w-3xl mx-auto text-center text-lg lg:text-xl">Suis tes progrès, planifie tes séances et avance pas à pas vers tes objectifs en calisthenie.</p>
        <div className="mt-5 pb-20 flex flex-wrap justify-center items-center gap-4">
          <Link href="https://forms.gle/vBnbwfF6Rv28xgtL8" aria-label="Télécharger l'application" className="btn-primary">Tester la bêta</Link>
          <Link href="/features" aria-label="Découvrir les fonctionnalités" className="btn-secondary">En savoir plus</Link>
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