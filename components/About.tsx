'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Card from './ui/Card'
import StarField from './StarField'

gsap.registerPlugin(ScrollTrigger)

const images = [
  '/images/esportspic.jpg',
  '/images/image.jpg',
  '/images/kobe.jpg',
  '/images/me.jpg',
  '/images/morganhackpic.jpg',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(images.length) // Start in middle set
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const interestGlowRef = useRef<HTMLDivElement | null>(null)
  const [interestMousePosition, setInterestMousePosition] = useState({ x: 50, y: 50 })
  const interestGlowAnimation = useRef<gsap.core.Tween | null>(null)
  const imagesPerView = 3


  // Infinite carousel auto-scroll with pause on hover
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isPaused = false
    
    const goToNext = () => {
      setCurrentIndex((prev) => {
        // Always increment - we'll handle the loop in the animation
        const next = prev + 1
        // When we've scrolled through one full set, reset to start of middle set
        if (next >= images.length * 2) {
          return images.length
        }
        return next
      })
    }
    
    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          goToNext()
        }
      }, 3000) // Change every 3 seconds
    }

    startInterval()

    const carouselContainer = carouselContainerRef.current
    if (carouselContainer) {
      const handleMouseEnter = () => {
        isPaused = true
      }
      const handleMouseLeave = () => {
        isPaused = false
        startInterval()
      }

      carouselContainer.addEventListener('mouseenter', handleMouseEnter)
      carouselContainer.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        carouselContainer.removeEventListener('mouseenter', handleMouseEnter)
        carouselContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [images.length])

  // Horizontal carousel animation with GSAP - infinite loop
  useEffect(() => {
    if (typeof window === 'undefined' || !carouselRef.current || !carouselContainerRef.current) return

    const carousel = carouselRef.current
    const container = carouselContainerRef.current
    
    const updatePosition = () => {
      setTimeout(() => {
        const containerWidth = container.offsetWidth
        if (containerWidth === 0) {
          requestAnimationFrame(updatePosition)
          return
        }
        
        const imageSlots = carousel.children
        if (!imageSlots || imageSlots.length === 0) {
          requestAnimationFrame(updatePosition)
          return
        }
        
        const firstImageSlot = imageSlots[0] as HTMLElement
        if (!firstImageSlot) {
          requestAnimationFrame(updatePosition)
          return
        }
        
        // Calculate slide width (image width + gap)
        let slideWidth = firstImageSlot.offsetWidth
        
        if (imageSlots[1]) {
          const firstRect = firstImageSlot.getBoundingClientRect()
          const secondRect = (imageSlots[1] as HTMLElement).getBoundingClientRect()
          const carouselRect = carousel.getBoundingClientRect()
          
          const firstLeft = firstRect.left - carouselRect.left
          const secondLeft = secondRect.left - carouselRect.left
          
          slideWidth = secondLeft - firstLeft
        }
        
        // Calculate translateX - move carousel to show current set of images
        const translateX = -currentIndex * slideWidth
        
        if (animationRef.current) {
          animationRef.current.kill()
        }
        
        animationRef.current = gsap.to(carousel, {
          x: translateX,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            // When we reach the end of the second set, instantly jump back to start of middle set
            // This is invisible because the images are identical
            if (currentIndex >= images.length * 2) {
              gsap.set(carousel, { x: -images.length * slideWidth })
              setCurrentIndex(images.length)
            }
          }
        })
      }, 100)
    }

    const rafId = requestAnimationFrame(() => {
      updatePosition()
    })

    const handleResize = () => {
      updatePosition()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [currentIndex, images.length])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Set initial state and animate heading
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 30 })
        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Set initial state and animate text content
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, x: -30 })
        gsap.to(textRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Set initial state and animate card
      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: 0, x: 30 })
        gsap.to(cardRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Animate carousel container
      if (carouselRef.current) {
        gsap.set(carouselRef.current.parentElement, { opacity: 0, y: 30 })
        gsap.to(carouselRef.current.parentElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smoothly animate glow position for interest box
  useEffect(() => {
    const pos = interestMousePosition
    if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number') {
      return
    }
    const glowEl = interestGlowRef.current
    if (glowEl) {
      // Kill existing animation
      if (interestGlowAnimation.current) {
        interestGlowAnimation.current.kill()
      }
      // Create smooth animation to new position
      interestGlowAnimation.current = gsap.to(glowEl, {
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [interestMousePosition])


  return (
    <Section id="about" ref={sectionRef} className="bg-black relative">
      <StarField count={50} />
      <Container size="xl" className="relative z-10">
        <Heading ref={headingRef} size="lg" className="mb-12 md:mb-16">
          About Me
        </Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12">
          <div ref={textRef} className="">
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              Hey, I'm Kennedy Gregg a developer who loves turning ideas into code. Whether it's AI, web apps, or game projects, I'm always building something new that challenges me to think bigger.
            </p>
          </div>
          <Card 
            ref={cardRef} 
            className="p-6 md:p-8 relative overflow-hidden group"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              const y = ((e.clientY - rect.top) / rect.height) * 100
              setInterestMousePosition({ x, y })
            }}
            onMouseLeave={() => {
              setInterestMousePosition({ x: 50, y: 50 })
            }}
          >
            {/* Orange glow effect that follows mouse */}
            <div
              ref={interestGlowRef}
              className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255, 119, 0, 0.4) 0%, rgba(255, 119, 0, 0.2) 40%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />
            <div className="relative z-10">
              <Heading as="h3" size="sm" className="mb-4">
                Interests
              </Heading>
              <ul className="space-y-2 text-white/80 text-base md:text-lg">
                <li>• Currently doing esports at Howard University</li>
                <li>• I love to cook</li>
                <li>• Doing fun coding projects</li>
                <li>• Running</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Image Carousel - Horizontal Scrolling - Shows 3 images */}
        <div ref={carouselContainerRef} className="relative w-full max-w-5xl mx-auto">
          <div className="relative overflow-hidden" style={{ padding: '0', margin: '0' }}>
            <div
              ref={carouselRef}
              className="flex items-center"
              style={{ 
                willChange: 'transform',
                gap: '0.75rem'
              }}
            >
              {/* Render images with duplicates for seamless infinite loop */}
              {[...images, ...images, ...images].map((image, index) => {
                const actualIndex = index % images.length
                return (
                  <div
                    key={`${image}-${index}`}
                    className="relative flex-shrink-0 inline-block"
                    style={{ 
                      height: '250px',
                      lineHeight: '0'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`About me image ${actualIndex + 1}`}
                      width={500}
                      height={350}
                      className="h-full w-auto rounded-xl border-2 border-white/30 shadow-2xl"
                      style={{ 
                        objectFit: 'contain',
                        display: 'block',
                        maxHeight: '250px',
                        height: '250px'
                      }}
                      sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 350px"
                      priority={index < imagesPerView * 2}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}


