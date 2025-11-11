'use client'

import { Github, Linkedin, FileText } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import gsap from 'gsap'

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !headerRef.current) return
    
    gsap.set(headerRef.current, { opacity: 0, y: -20 })
    gsap.to(headerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['skillset', 'experience', 'projects', 'about', 'contact']
      const scrollPosition = window.scrollY + 150

      // Check if we're at the top of the page
      if (window.scrollY < 100) {
        setActiveSection('')
        return
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'skillset', label: 'SKILLSET' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'contact', label: 'CONTACT' },
  ]

  return (
      <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-6 md:py-8 pointer-events-none"
    >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 relative md:justify-center">
          {/* Logo */}
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shrink-0 pointer-events-auto cursor-pointer hover:scale-110 transition-transform duration-200 order-1 md:order-1 md:absolute md:left-0">
            <span className="text-black font-bold text-base md:text-lg">KG</span>
          </div>

          {/* Glassmorphism Navigation Bar - Centered */}
          <nav className="relative w-full md:w-auto pointer-events-auto order-3 md:order-2 md:mx-auto">
            <div className={clsx(
              "relative bg-black/60 backdrop-blur-2xl border border-gray-800/50 rounded-full px-5 md:px-8 lg:px-12 py-2.5 md:py-3.5 shadow-2xl ring-1 ring-white/5 transition-all duration-300",
              scrolled && "bg-black/70 shadow-2xl"
            )}
            style={{
              boxShadow: '0 0 20px rgba(255, 119, 0, 0.3), 0 0 40px rgba(255, 119, 0, 0.2), 0 0 60px rgba(255, 119, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            >
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-white/3 to-transparent pointer-events-none opacity-40"></div>
              <div className="relative flex flex-wrap items-center justify-center gap-3 md:gap-5 lg:gap-7 xl:gap-9 overflow-x-auto scrollbar-hide">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={clsx(
                      "relative px-2 md:px-3 py-1.5 text-white text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-black/60 rounded",
                      activeSection === item.id
                        ? 'text-white font-bold'
                        : 'text-white/90 hover:text-orange transition-colors'
                    )}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                    <Transition
                      show={activeSection === item.id}
                      enter="transition-all duration-300"
                      enterFrom="opacity-0 scale-x-0"
                      enterTo="opacity-100 scale-x-100"
                      leave="transition-all duration-200"
                      leaveFrom="opacity-100 scale-x-100"
                      leaveTo="opacity-0 scale-x-0"
                    >
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-orange rounded-full shadow-sm shadow-orange/50"></span>
                    </Transition>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-3 md:gap-4 pointer-events-auto order-2 md:order-3 md:absolute md:right-0">
            {[
              { href: 'https://github.com/THEFLASH10002', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/kennedy-gregg-52543128a/', icon: Linkedin, label: 'LinkedIn' },
              { href: '/resume.pdf', icon: FileText, label: 'Resume', download: true },
            ].map(({ href, icon: Icon, label, download }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                download={download ? 'Kennedy_Gregg_Resume.pdf' : undefined}
                className="text-white hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-black/60 rounded p-1"
                aria-label={label}
              >
                <Icon size={20} className="md:w-6 md:h-6" />
              </a>
            ))}
          </div>
        </div>
      </header>
  )
}

