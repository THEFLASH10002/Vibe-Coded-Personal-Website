'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Card from './ui/Card'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [imagesPerView, setImagesPerView] = useState(3) // Number of images to show at once

  // Update imagesPerView based on screen size
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateImagesPerView = () => {
      const width = window.innerWidth
      let newImagesPerView = 3
      if (width < 768) {
        newImagesPerView = 1 // Mobile: 1 image
      } else if (width < 1024) {
        newImagesPerView = 2 // Tablet: 2 images
      } else {
        newImagesPerView = 3 // Desktop: 3 images
      }
      setImagesPerView(newImagesPerView)
      
      // Clamp currentIndex to valid range when imagesPerView changes
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, images.length - newImagesPerView)
        return Math.min(prev, maxIndex)
      })
    }

    updateImagesPerView()
    window.addEventListener('resize', updateImagesPerView)
    return () => window.removeEventListener('resize', updateImagesPerView)
  }, [images.length])

  // Carousel auto-scroll with pause on hover
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isPaused = false
    
    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => {
            // Scroll by one image at a time
            // Maximum index is (images.length - imagesPerView) to show the last set of images
            const maxIndex = Math.max(0, images.length - imagesPerView)
            const next = prev + 1
            // Loop back to start if we've reached the end
            return next > maxIndex ? 0 : next
          })
        }
      }, 3000) // Change image every 3 seconds
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
  }, [imagesPerView])

  // Carousel animation with GSAP
  useEffect(() => {
    if (typeof window === 'undefined' || !carouselRef.current || !carouselContainerRef.current) return

    const carousel = carouselRef.current
    const container = carouselContainerRef.current
    if (!container) return

    // Calculate translateX based on container width and images per view
    const updatePosition = () => {
      // Use a small delay to ensure container is fully rendered
      setTimeout(() => {
        const containerWidth = container.offsetWidth
        if (containerWidth === 0) {
          // Retry if container not ready
          requestAnimationFrame(updatePosition)
          return
        }
        
        // Get all image slot elements
        const imageSlots = carousel.children
        if (!imageSlots || imageSlots.length === 0) {
          requestAnimationFrame(updatePosition)
          return
        }
        
        // Calculate slide width using the actual rendered positions
        // This ensures perfect alignment when scrolling
        const firstImageSlot = imageSlots[0] as HTMLElement
        const secondImageSlot = imageSlots[1] as HTMLElement
        
        if (!firstImageSlot) {
          requestAnimationFrame(updatePosition)
          return
        }
        
        // Calculate slide width by measuring the actual distance between images
        // This ensures perfect alignment when scrolling
        let slideWidth = firstImageSlot.offsetWidth
        
        if (secondImageSlot) {
          // Measure the actual distance from the left edge of first image to left edge of second image
          // This automatically accounts for the gap
          const firstRect = firstImageSlot.getBoundingClientRect()
          const secondRect = secondImageSlot.getBoundingClientRect()
          const carouselRect = carousel.getBoundingClientRect()
          
          // Calculate positions relative to the carousel container
          const firstLeft = firstRect.left - carouselRect.left
          const secondLeft = secondRect.left - carouselRect.left
          
          // The slide width is the distance between the start of consecutive images
          slideWidth = secondLeft - firstLeft
        }
        
        // Translate by currentIndex to align perfectly with images
        // This ensures each scroll moves exactly one image slot (including gap)
        const translateX = -currentIndex * slideWidth
        
        gsap.to(carousel, {
          x: translateX,
          duration: 0.8,
          ease: 'power2.inOut',
        })
      }, 100)
    }

    // Use requestAnimationFrame to ensure container is sized
    const rafId = requestAnimationFrame(() => {
      updatePosition()
    })

    // Update on window resize
    const handleResize = () => {
      updatePosition()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [currentIndex, imagesPerView])

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, images.length - imagesPerView)
      const next = prev - 1
      // Loop to the end if we go before the start
      return next < 0 ? maxIndex : next
    })
    // Reset auto-scroll timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, images.length - imagesPerView)
        const next = prev + 1
        return next > maxIndex ? 0 : next
      })
    }, 3000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, images.length - imagesPerView)
      const next = prev + 1
      // Loop back to start if we've reached the end
      return next > maxIndex ? 0 : next
    })
    // Reset auto-scroll timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, images.length - imagesPerView)
        const next = prev + 1
        return next > maxIndex ? 0 : next
      })
    }, 3000)
  }

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

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, images.length - imagesPerView)
    // Clamp index to valid range
    const clampedIndex = Math.min(index, maxIndex)
    setCurrentIndex(clampedIndex)
    // Reset auto-scroll timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, images.length - imagesPerView)
        const next = prev + 1
        return next > maxIndex ? 0 : next
      })
    }, 3000)
  }

  return (
    <Section id="about" ref={sectionRef} className="bg-dark-charcoal">
      <Container size="xl">
        <Heading ref={headingRef} size="lg" className="mb-12 md:mb-16">
          About Me
        </Heading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12">
          <div ref={textRef} className="">
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
              I am a Software Engineer passionate about creating impactful solutions. When I'm not coding, I enjoy photography, sports, and creative hobbies.
            </p>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              I also like to explore new technologies and work on personal projects that push the boundaries of web development and 3D experiences.
            </p>
          </div>
          <Card ref={cardRef} className="p-6 md:p-8">
            <Heading as="h3" size="sm" className="mb-4">
              Interests
            </Heading>
            <ul className="space-y-2 text-white/80 text-base md:text-lg">
              <li>• Currently doing esports at Howard University</li>
              <li>• I love to cook</li>
              <li>• Doing fun projects, coding projects</li>
              <li>• Running</li>
            </ul>
          </Card>
        </div>

        {/* Image Carousel */}
        <div ref={carouselContainerRef} className="relative w-full max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-xl" style={{ padding: '0' }}>
            {/* Left Navigation Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Right Navigation Button */}
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 border border-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div
              ref={carouselRef}
              className="flex items-center"
              style={{ 
                width: `calc(100% * ${images.length} / ${imagesPerView} + ${(images.length - imagesPerView) * 0.375}rem)`,
                willChange: 'transform',
                gap: '0.375rem'
              }}
            >
              {images.map((image, index) => {
                // Each image container takes up exactly (100% / imagesPerView) of the visible container
                const imageWidthPercent = 100 / imagesPerView
                return (
                  <div
                    key={index}
                    className="relative flex-shrink-0 flex items-center justify-center"
                    style={{ 
                      width: `calc(${imageWidthPercent}% - 0.375rem * ${(imagesPerView - 1) / imagesPerView})`
                    }}
                  >
                    <Image
                      src={image}
                      alt={`About me image ${index + 1}`}
                      width={500}
                      height={350}
                      className="max-h-[250px] md:max-h-[350px] rounded-xl border-2 border-white/30 shadow-2xl w-full h-auto"
                      style={{ 
                        objectFit: 'contain',
                        display: 'block'
                      }}
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 32vw"
                      priority={index < imagesPerView}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange w-8'
                    : 'bg-white/30 w-2 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}


