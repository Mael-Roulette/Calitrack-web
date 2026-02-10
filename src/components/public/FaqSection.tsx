import Link from "next/link";
import Faq from "./Faq";
import Image from "next/image";
import calitrackFaqs from '@/data/public/faq.json';

export default function FaqSection () {
  return (
    <section className="bg-secondary/12">
        <div className="section-wrapper grid lg:grid-cols-[3fr_2fr] gap-y-6 gap-x-12">
          <div>
            <h2 className="title-section font-calsans mb-2">Des questions ?</h2>
            <p>J&apos;ai regroupé ici les questions les plus courantes. Mais si tu as encore un doute, n&apos;hésite pas à me contacter !</p>
            <Faq
              faqs={ calitrackFaqs }
              allowMultipleOpen={ false }
            />
            <Link href="/contact" aria-label="Contactez Calitrack" className='btn-tertiary mt-6'>Contact-moi !</Link>
          </div>
          <div className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '>
            <Image
              src={ '/images/general_mockup-3.webp' }
              alt='Calitrack, une application dédiée à la calisthenics'
              fill={ true }
              className='h-full w-full object-cover'
              sizes='100%'
            />
          </div>
        </div>
      </section>
  )
}