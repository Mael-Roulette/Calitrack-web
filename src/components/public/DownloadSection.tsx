import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface DownloadSectionProps {
  background?: "none" | "bg"
}

export default function DownloadSection ( { background = "none" } : DownloadSectionProps ) {
  return (
      <section className={ `${background === "bg" && "bg-secondary/12"}` }>
        <div className="section-wrapper">
          <h2 className="title-section font-calsans text-center mb-2 lg:mb-4">Prêt à passer le cap ?</h2>
          <p className='text-center'>N&apos;attends pas plus et essaye la bêta !</p>
          <div className='flex flex-wrap gap-x-5 gap-y-3 justify-center items-center mt-5'>
            <Link href="https://forms.gle/vBnbwfF6Rv28xgtL8" aria-label="Télécharger l'application" className='btn-primary'>Commencer gratuitement <ArrowRight className="ml-2 h-5 w-5" /></Link>
            <Link href="/features" aria-label="En découvrir plus sur l'application" className='btn-secondary'>En savoir plus</Link>
          </div>
        </div>
      </section>
  )
}