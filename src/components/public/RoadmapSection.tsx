import Link from "next/link";
import Roadmap from "./Roadmap";
import milestones from "@/data/public/milestones.json";

export default function RoadmapSection () {
  return (
    <section className="section-wrapper">
        <h2 className='title-section mb-2 text-center font-calsans'>Ce qui arrive bientôt</h2>
        <p className='text-center mb-10 text-lg'>Tout comme votre progression en calisthenics, Calitrack avance pas à pas.</p>
        <Roadmap milestones={ milestones } />
        <div className='mt-8 flex flex-col justify-center items-center gap-4'>
          <p className='font-semibold'>Tu as quelques choses à proposer ? N&apos;hésite pas à me le partager !</p>
          <Link href="/contact" aria-label="Contactez Calitrack" className='btn-secondary'>Me contacter</Link>
        </div>
      </section>
  )
}