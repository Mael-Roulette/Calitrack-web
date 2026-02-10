'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

// Liens de navigation
const navigationLinks = [
  { href: '/about', label: 'À propos' },
  { href: '/features', label: 'Fonctionnalités' },
  // { href: '/pricing', label: 'Tarifs' },
  { href: '/contact', label: 'Contact' }
] as const;

// Configuration du logo
const LOGO_CONFIG = {
  src: '/images/logo.png',
  width: 72,
  height: 40,
  alt: 'Calitrack'
} as const;

export default function Header () {
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState( false );
  const [ isScrolled, setIsScrolled ] = useState( false );
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Gérer le scroll pour changer la couleur du header
  useEffect( () => {
    if ( !isHomePage ) return;

    const handleScroll = () => {
      // Hauteur de la hero section = 100vh - 88px (hauteur du header)
      const heroHeight = window.innerHeight - 88;
      setIsScrolled( window.scrollY > heroHeight );
    };

    window.addEventListener( 'scroll', handleScroll );
    return () => window.removeEventListener( 'scroll', handleScroll );
  }, [ isHomePage ] );

  const headerBgClass = isHomePage && !isScrolled ? 'bg-dark-blue' : 'bg-foreground';

  return (
    <header className={ `${headerBgClass} sticky top-0 left-0 w-full z-50 transition-colors duration-300` }>
      <nav
        aria-label="Navigation principale"
        className="mx-auto container flex items-center justify-between py-6 px-5"
      >
        {/* Logo */ }
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="rounded-lg"
            aria-label="Retour à l'accueil"
          >
            <Image
              src={ LOGO_CONFIG.src }
              width={ LOGO_CONFIG.width }
              height={ LOGO_CONFIG.height }
              alt={ LOGO_CONFIG.alt }
              priority
            />
          </Link>
        </div>

        {/* Bouton menu mobile */ }
        <button
          className="
            group
            z-100
            inline-flex w-12 h-12
            items-center justify-center
            rounded-xl
            bg-dark-blue backdrop-blur
            lg:hidden
            text-background
            transition
          "
          aria-pressed={ mobileMenuOpen }
          aria-label="Menu"
          onClick={ () => setMobileMenuOpen( ( v ) => !v ) }
        >
          <svg
            className="w-6 h-6 fill-current pointer-events-none"
            viewBox="0 0 16 16"
          >
            {/* Barre du haut */}
            <rect
              y="7.5"
              width="9"
              height="1"
              rx="0.5"
              className="
        origin-center
        -translate-y-[4px]
        translate-x-[7px]
        transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]
        group-aria-pressed:translate-x-0
        group-aria-pressed:translate-y-0
        group-aria-pressed:rotate-[315deg]
      "
            />

            {/* Barre centrale */}
            <rect
              y="7.5"
              width="16"
              height="1"
              rx="0.5"
              className="
        origin-center
        transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]
        group-aria-pressed:rotate-45
      "
            />

            {/* Barre du bas */}
            <rect
              y="7.5"
              width="9"
              height="1"
              rx="0.5"
              className="
        origin-center
        translate-y-[4px]
        transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]
        group-aria-pressed:translate-y-0
        group-aria-pressed:rotate-[135deg]
      "
            />
          </svg>

        </button>

        {/* Navigation desktop */ }
        <nav className={ `fixed top-0 right-0 transition-all ${ mobileMenuOpen ? "bg-foreground translate-x-0" : "translate-x-full"} lg:translate-x-0 w-full h-dvh lg:w-fit lg:h-full p-8 lg:p-0 z-10 lg:relative` } aria-label="Navigation principale">
          <ul className="flex flex-col gap-6 pt-16 lg:pt-0 lg:flex-row lg:justify-end lg:gap-12 h-full">
          { navigationLinks.map( ( { href, label } ) => (
            <li key={ href }>
              <Link
                href={ href }
                className={ `font-semibold leading-6 text-background hover:text-secondary rounded-lg px-2 py-1 transition-all ${pathname === href ? 'text-secondary' : ''}` }
              >
                { label }
              </Link>
            </li>
          ) ) }
          </ul>
        </nav>
      </nav>
    </header>
  )
}