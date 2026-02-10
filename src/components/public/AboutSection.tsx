import Link from "next/link";
import Image from "next/image";

export default function AboutSection () {
  return (
    <section className="bg-secondary/12">
        <div className="section-wrapper grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-x-10 gap-y-6">
          <div className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '>
            <Image
              src={ '/images/home_mockup.webp' }
              alt='Page d&apos;acceuil de l&apos;application Calitrack'
              fill={ true }
              className='h-full w-full object-cover'
              sizes='100%'
            />
          </div>
          <div>
            <h2 className='title-section font-calsans mb-4'>Progresser n&apos;a jamais été aussi <span>simple</span></h2>
            <p className='mb-3'>Calitrack est né d&apos;une idée simple : rendre l&apos;entraînement en calisthenics <strong>plus simple</strong> et <strong>plus accessible</strong> à tous. Quand on pratique ce sport, on se rend vite compte qu&apos;il est difficile de suivre ses progrès et de rester motivé sur le long terme. J&apos;ai donc voulu créer une appli pensée par un pratiquant, pour les pratiquants.</p>
            <p className='mb-3'>Avec Calitrack, tu peux <strong>organiser tes entraînements</strong>, <strong>suivre tes objectifs</strong> et voir concrètement tes avancées au fil du temps.</p>
            <p className='mb-3'>Le but est de proposer plus qu&apos;une simple appli de suivi : Calitrack a pour objectif de t&apos;accompagner dans tes entraînements et de t&apos;aider à rester motivé. Et ce n&apos;est que le début : de nouvelles fonctionnalités sont en préparation pour les pratiquants comme pour les coachs.</p>
            <p className='font-semibold mb-6'>Ce n&apos;est que le début, l&apos;aventure Calitrack ne fait que commencer.</p>
            <div className='flex flex-wrap gap-4'>
              <Link href="/about" aria-label="En découvrir plus sur l'application" className='btn-primary'>En savoir plus</Link>
              <Link href="https://forms.gle/vBnbwfF6Rv28xgtL8" aria-label="Télécharger l'application" className='btn-secondary'>Tester la bêta</Link>
            </div>
          </div>
        </div>
      </section>
  )
}