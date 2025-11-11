'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import UnicornStudioBackground from './UnicornStudioBackground'
import Button from './ui/Button'
import Heading from './ui/Heading'
import Container from './ui/Container'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
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

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const elements = [headingRef.current, titleRef.current, descRef.current, buttonRef.current].filter(Boolean)
    
    // Set initial states only if refs are available
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 0, y: 30 })
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 50 })
    if (descRef.current) gsap.set(descRef.current, { opacity: 0, y: 30 })
    if (buttonRef.current) gsap.set(buttonRef.current, { opacity: 0, y: 20, scale: 0.95 })

    const tl = gsap.timeline({ delay: 0.1 })

    if (headingRef.current) {
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }
    if (titleRef.current) {
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4')
    }
    if (descRef.current) {
      tl.to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
    }
    if (buttonRef.current) {
      tl.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.4')
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        <UnicornStudioBackground
          className="absolute inset-0 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '100vh'
          }}
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10" />
      </div>
      
      {/* Main Content */}
      <Container size="lg" className="relative z-20 flex flex-col items-center justify-center text-center">
        <Heading 
          ref={headingRef}
          as="h1" 
          size="xl" 
          className="font-bold mb-3 md:mb-4 text-white"
        >
          I'm Kennedy Gregg
        </Heading>
        
        <h2 
          ref={titleRef}
          className="mb-5 md:mb-6 font-bold text-6xl md:text-7xl lg:text-8xl text-center"
          style={{ lineHeight: '1.15', paddingBottom: '0.3em', overflow: 'visible' }}
        >
          <span className="text-gradient-orange">
            Software Engineer.
          </span>
        </h2>
        
        <p 
          ref={descRef}
          className="text-base md:text-lg lg:text-xl text-white mb-10 md:mb-12 max-w-3xl leading-relaxed"
        >
          I craft immersive web interfaces and interactive 3D experiences using Three.js and modern creative tech.
        </p>
        
        <Button 
          ref={buttonRef}
          onClick={scrollToProjects}
          variant="primary" 
          size="lg" 
          className="group !bg-white hover:!bg-[#FF7700] !text-black border-white hover:border-[#FF7700] transition-colors duration-200"
        >
          <span>Explore my work</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transform rotate-[-15deg] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
        </Button>
      </Container>
    </section>
  )
}

