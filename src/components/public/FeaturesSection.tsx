'use client'

import Link from "next/link"
import featuresInfos from "@/data/public/features.json";
import FeatureCard from "./FeaturesCard";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection () {
  const titleRef = useRef( null );
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const linkRef = useRef( null );

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
        clearProps: "all", // Nettoie les propriétés après l'animation
      } );

      // Animation des cartes avec un décalage
      cardsRef.current.forEach( ( card, index ) => {
        if ( card ) {
          gsap.from( card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            clearProps: "all",
          } );
        }
      } );

      // Animation du lien
      gsap.from( linkRef.current, {
        scrollTrigger: {
          trigger: linkRef.current,
          start: "top 90%",
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
    <section id='features' className="isolate">
      <h2
        ref={ titleRef }
        className="title-section font-calsans mt-8 mb-6 lg:mt-16 lg:mb-10 text-center"
      >
        Tout ce dont tu as besoin pour <span>progresser</span>
      </h2>

      <ul className="flex flex-row flex-wrap justify-center gap-x-5 gap-y-4 mb-8">
        { featuresInfos.map( ( { id, icon, title, description }, index ) => {
          return (
            <li
              key={ id }
              ref={ ( el ) => { cardsRef.current[index] = el } }
            >
              <FeatureCard id={ id } icon={ icon } title={ title } description={ description } />
            </li>
          )
        } ) }
      </ul>

      <div
        ref={ linkRef }
        className='flex justify-center items-center'
      >
        <Link
          href="/features"
          aria-label="Découvrir toutes les fonctionnalités"
          className="underline text-center mb-16"
        >
          Découvrir toutes les fonctionnalités
        </Link>
      </div>
    </section>
  )
}