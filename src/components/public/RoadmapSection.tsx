'use client'

import Link from "next/link";
import Roadmap from "./Roadmap";
import milestones from "@/data/public/milestones.json";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RoadmapSection () {
  const titleRef = useRef( null );
  const subtitleRef = useRef( null );
  const roadmapRef = useRef( null );
  const ctaRef = useRef( null );

  useEffect( () => {
    const ctx = gsap.context( () => {
      // Animation du titre
      gsap.from( titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation du sous-titre
      gsap.from( subtitleRef.current, {
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation de la roadmap
      gsap.from( roadmapRef.current, {
        scrollTrigger: {
          trigger: roadmapRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        clearProps: "all",
      } );

      // Animation du CTA
      gsap.from( ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      } );
    } );

    return () => ctx.revert();
  }, [] );

  return (
    <section className="section-wrapper isolate">
      <h2
        ref={ titleRef }
        className='title-section mb-2 text-center font-calsans'
      >
        Ce qui arrive bientôt
      </h2>
      <p
        ref={ subtitleRef }
        className='text-center mb-10 text-lg'
      >
        Tout comme votre progression en calisthenics, Calitrack avance pas à pas.
      </p>
      <div ref={ roadmapRef }>
        <Roadmap milestones={ milestones } />
      </div>
      <div
        ref={ ctaRef }
        className='mt-8 flex flex-col justify-center items-center gap-4'
      >
        <p className='font-semibold'>Tu as quelques choses à proposer ? N&apos;hésite pas à me le partager !</p>
        <Link href="/contact" aria-label="Contactez Calitrack" className='btn-secondary'>Me contacter</Link>
      </div>
    </section>
  )
}