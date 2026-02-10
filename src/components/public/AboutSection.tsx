'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection () {
  const imageRef = useRef( null );
  const contentRef = useRef( null );
  const titleRef = useRef( null );
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const buttonsRef = useRef( null );

  useEffect( () => {
    const ctx = gsap.context( () => {
      // Animation de l'image
      gsap.from( imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation du titre
      gsap.from( titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation des paragraphes
      paragraphsRef.current.forEach( ( p, index ) => {
        if ( p ) {
          gsap.from( p, {
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
            },
            x: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            clearProps: "all",
          } );
        }
      } );

      // Animation des boutons
      gsap.from( buttonsRef.current, {
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      } );
    } );

    return () => ctx.revert();
  }, [] );

  return (
    <section className="bg-secondary/12 isolate">
      <div className="section-wrapper grid grid-cols-1 lg:grid-cols-[4fr_5fr] gap-x-10 gap-y-6">
        <div
          ref={ imageRef }
          className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '
        >
          <Image
            src={ '/images/home_mockup.webp' }
            alt='Page d&apos;acceuil de l&apos;application Calitrack'
            fill={ true }
            className='h-full w-full object-cover'
            sizes='100%'
          />
        </div>
        <div ref={ contentRef }>
          <h2
            ref={ titleRef }
            className='title-section font-calsans mb-4'
          >
            Progresser n&apos;a jamais été aussi <span>simple</span>
          </h2>
          <p
            ref={ ( el ) => { paragraphsRef.current[0] = el } }
            className='mb-3'
          >
            Calitrack est né d&apos;une idée simple : rendre l&apos;entraînement en calisthenics <strong>plus simple</strong> et <strong>plus accessible</strong> à tous. Quand on pratique ce sport, on se rend vite compte qu&apos;il est difficile de suivre ses progrès et de rester motivé sur le long terme. J&apos;ai donc voulu créer une appli pensée par un pratiquant, pour les pratiquants.
          </p>
          <p
            ref={ ( el ) => { paragraphsRef.current[1] = el } }
            className='mb-3'
          >
            Avec Calitrack, tu peux <strong>organiser tes entraînements</strong>, <strong>suivre tes objectifs</strong> et voir concrètement tes avancées au fil du temps.
          </p>
          <p
            ref={ ( el ) => { paragraphsRef.current[2] = el } }
            className='mb-3'
          >
            Le but est de proposer plus qu&apos;une simple appli de suivi : Calitrack a pour objectif de t&apos;accompagner dans tes entraînements et de t&apos;aider à rester motivé. Et ce n&apos;est que le début : de nouvelles fonctionnalités sont en préparation pour les pratiquants comme pour les coachs.
          </p>
          <p
            ref={ ( el ) => { paragraphsRef.current[3] = el } }
            className='font-semibold mb-6'
          >
            Ce n&apos;est que le début, l&apos;aventure Calitrack ne fait que commencer.
          </p>
          <div
            ref={ buttonsRef }
            className='flex flex-wrap gap-4'
          >
            <Link href="/about" aria-label="En découvrir plus sur l'application" className='btn-primary'>En savoir plus</Link>
            <Link href="https://forms.gle/vBnbwfF6Rv28xgtL8" aria-label="Télécharger l'application" className='btn-secondary'>Tester la bêta</Link>
          </div>
        </div>
      </div>
    </section>
  )
}