'use client'

import Link from "next/link";
import Faq from "./Faq";
import Image from "next/image";
import calitrackFaqs from '@/data/public/faq.json';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FaqSection () {
  const contentRef = useRef( null );
  const imageRef = useRef( null );
  const titleRef = useRef( null );
  const descriptionRef = useRef( null );
  const faqRef = useRef( null );
  const buttonRef = useRef( null );

  useEffect( () => {
    const ctx = gsap.context( () => {
      // Animation du titre
      gsap.from( titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation de la description
      gsap.from( descriptionRef.current, {
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation de la FAQ
      gsap.from( faqRef.current, {
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation du bouton
      gsap.from( buttonRef.current, {
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation de l'image
      gsap.from( imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      } );
    } );

    return () => ctx.revert();
  }, [] );

  return (
    <section className="bg-secondary/12 isolate">
      <div className="section-wrapper grid lg:grid-cols-[3fr_2fr] gap-y-6 gap-x-12">
        <div ref={ contentRef }>
          <h2
            ref={ titleRef }
            className="title-section font-calsans mb-2"
          >
            Des questions ?
          </h2>
          <p ref={ descriptionRef }>
            J&apos;ai regroupé ici les questions les plus courantes. Mais si tu as encore un doute, n&apos;hésite pas à me contacter !
          </p>
          <div ref={ faqRef }>
            <Faq
              faqs={ calitrackFaqs }
              allowMultipleOpen={ false }
            />
          </div>
          <div ref={ buttonRef }>
            <Link href="/contact" aria-label="Contactez Calitrack" className='btn-tertiary mt-6'>Contact-moi !</Link>
          </div>
        </div>
        <div
          ref={ imageRef }
          className='h-64 lg:h-full w-full relative rounded-lg overflow-hidden '
        >
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