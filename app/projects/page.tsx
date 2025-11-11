'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Github, Linkedin, FileText } from 'lucide-react'
import gsap from 'gsap'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'
import UnicornStudioBackground from '@/components/UnicornStudioBackground'

export default function ProjectsPage() {
  const headerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const countRef = useRef<HTMLParagraphElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselContentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const projects = [
    {
      title: 'Eido',
      description: 'Built and deployed a full-stack AI learning platform with JWT authentication, pgvector embeddings, and OpenAI integration. Created an interactive 3D knowledge graph using Three.js for visualizing learning connections.',
      technologies: ['FastAPI', 'Next.js', 'Supabase', 'OpenAI', 'Three.js', 'PostgreSQL'],
      demoUrl: 'https://www.loom.com/share/99480c7998724b5384d7e94962d6e119',
      video: '/videos/eido.mp4',
      image: null,
    },
    {
      title: 'Vocalytics',
      description: 'Developed a Raspberry Pi-powered tool using Python, OpenCV, and Media Pipe to track speech patterns and posture in real-time, providing feedback for communication skill improvement. Placed 2nd overall at Morgan Hacks Hackathon.',
      technologies: ['Python', 'Flask', 'SQLite', 'OpenCV', 'Media Pipe', 'Gemini AI'],
      image: null,
    },
    {
      title: 'Machine Learning Project',
      description: 'Developed a learning AI using Python, C++, C#, and ML-Agents to complete tasks like obstacle avoidance and 2v2 soccer matches against AI opponents. Logged brain states every 5000ms to measure learning progress.',
      technologies: ['Python', 'C++', 'C#', 'ML-Agents'],
      video: '/videos/ml-agents.mp4',
      image: null,
    },
  ]

  // Duplicate projects for seamless loop
  const duplicatedProjects = [...projects, ...projects]

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Animate header
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -20 })
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
      })
    }

    const tl = gsap.timeline({ delay: 0.3 })
    
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    }
    
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    }
    
    if (countRef.current) {
      gsap.set(countRef.current, { opacity: 0 })
      tl.to(countRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
    }

    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 20 })
      tl.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    }

    // Carousel animation
    if (carouselContentRef.current && carouselRef.current) {
      let isPaused = false
      let cleanup: (() => void) | null = null
      let currentPosition = 0
      let animationStartTime = 0
      let rafId: number | null = null

      // Wait for cards to render to get accurate width
      const initCarousel = () => {
        const carousel = carouselContentRef.current
        if (!carousel) return

        const firstCard = carousel.children[0] as HTMLElement
        if (!firstCard || firstCard.offsetWidth === 0) {
          // Retry if cards aren't ready
          setTimeout(initCarousel, 100)
          return
        }

        // Calculate card width (card + gap)
        const cardWidth = firstCard.offsetWidth
        const gap = window.innerWidth >= 768 ? 24 : 16 // gap-4 (16px) on mobile, gap-6 (24px) on desktop
        const cardWidthWithGap = cardWidth + gap
        const totalWidth = cardWidthWithGap * projects.length
        const speed = totalWidth / 35 // pixels per second (35 seconds for one cycle - slightly slower for narrower cards)

        // Set initial position
        gsap.set(carousel, { x: 0 })
        currentPosition = 0

        const pauseAnimation = () => {
          if (isPaused) return
          isPaused = true
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }

        const resumeAnimation = () => {
          if (!isPaused) return
          isPaused = false
          
          // Adjust the start time to account for the pause duration
          // Calculate how much time should have elapsed to reach current position
          const timeOffset = Math.abs(currentPosition) / speed
          animationStartTime = performance.now() - (timeOffset * 1000)
          
          // Resume the animation loop
          animateLoop()
        }

        const animateLoop = () => {
          if (isPaused) {
            rafId = null
            return
          }

          const now = performance.now()
          const elapsed = (now - animationStartTime) / 1000 // Convert to seconds
          let newPosition = -speed * elapsed

          // Handle seamless loop - when we reach the end of one set, reset to start
          // Since projects are duplicated, this creates a seamless infinite loop
          if (newPosition <= -totalWidth) {
            // Reset position to start (looks seamless because projects are duplicated)
            newPosition = 0
            // Reset the start time to continue from the beginning
            animationStartTime = now
          }

          currentPosition = newPosition
          gsap.set(carousel, { x: currentPosition })

          rafId = requestAnimationFrame(animateLoop)
        }

        // Start the animation loop
        animationStartTime = performance.now()
        animateLoop()

        // Add pause/resume listeners to the carousel container
        const carouselContainer = carouselRef.current
        carouselContainer.addEventListener('mouseenter', pauseAnimation)
        carouselContainer.addEventListener('mouseleave', resumeAnimation)

        cleanup = () => {
          carouselContainer.removeEventListener('mouseenter', pauseAnimation)
          carouselContainer.removeEventListener('mouseleave', resumeAnimation)
          if (rafId !== null) {
            cancelAnimationFrame(rafId)
            rafId = null
          }
        }
      }

      // Initialize carousel
      initCarousel()

      // Cleanup on unmount
      return () => {
        if (cleanup) cleanup()
        if (animationRef.current) {
          animationRef.current.kill()
          animationRef.current = null
        }
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }
      }
    }
  }, [projects.length])

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Unicorn Studio Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <UnicornStudioBackground
          projectId="j5CcCgGa9bA2SQL4EOzd"
          className="absolute inset-0 w-full h-full"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '100vh'
          }}
        />
      </div>
      
      {/* Header with Logo and Social Icons */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-6 md:py-8 pointer-events-none opacity-0"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:scale-110 transition-transform duration-200 pointer-events-auto">
            <span className="text-black font-bold text-base md:text-lg">KG</span>
          </Link>

                {/* Social Icons */}
                <div className="flex gap-3 md:gap-4 pointer-events-auto">
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

      <div className="pt-32 relative z-10">
        <Section className="bg-black/60 backdrop-blur-[2px]">
          <Container size="xl">
            {/* Title and Subtitle */}
            <div className="text-center mb-12 md:mb-16">
              <Heading ref={titleRef} as="h1" size="xl" className="mb-4 opacity-0">
                My projects
              </Heading>
              <p ref={subtitleRef} className="text-white/80 text-base md:text-lg max-w-2xl mx-auto opacity-0">
                Here are some of my projects, feel free to explore them.
              </p>
            </div>

            {/* Project Count */}
            <p ref={countRef} className="text-white/60 text-sm md:text-base mb-8 text-center opacity-0">
              Showing {projects.length} projects
            </p>

            {/* Horizontal Scrolling Carousel */}
            <div 
              ref={carouselRef}
              className="mb-16 md:mb-20 overflow-hidden"
            >
              <div 
                ref={carouselContentRef}
                className="flex gap-4 md:gap-6"
                style={{ willChange: 'transform' }}
              >
                {duplicatedProjects.map((project, index) => (
                  <div
                    key={`${project.title}-${index}`}
                    className="w-[280px] md:w-[320px] max-w-[320px] flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-orange/30 hover:shadow-orange/10 transition-all overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    {/* Project Video or Image */}
                    <div className="w-full h-48 md:h-60 bg-black flex items-center justify-center overflow-hidden">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={420}
                          height={256}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white/20 text-xs uppercase tracking-wider">Project Preview</div>
                      )}
                    </div>

                    <div className="p-4 md:p-5 flex flex-col flex-1 min-h-[160px]">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white text-base md:text-lg font-semibold flex-1">
                          {project.title}
                        </h3>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange hover:text-orange-light text-xs ml-2 flex-shrink-0 font-medium transition-colors"
                            aria-label={`View ${project.title} demo`}
                          >
                            Demo →
                          </a>
                        )}
                      </div>
                      <p className="text-white/70 text-xs md:text-sm mb-3 leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="default">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center mt-8 md:mt-12">
              <Link ref={buttonRef} href="/" className="opacity-0 inline-block">
                <Button variant="ghost" className="group text-orange hover:text-orange-light border border-orange/30 hover:border-orange/50 rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                  <span>Back to home</span>
                </Button>
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    </main>
  )
}


