'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'
import StarField from './StarField'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  shortDescription: string
  description: string
  technologies: string[]
  demoUrl?: string
  video?: string
  image?: string | null
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const projects: Project[] = [
    {
      title: 'Eido',
      shortDescription: 'Full-stack AI learning platform with interactive 3D knowledge graph',
      description: 'Built and deployed a full-stack AI learning platform with JWT authentication, pgvector embeddings, and OpenAI integration. Created an interactive 3D knowledge graph using Three.js for visualizing learning connections.',
      technologies: ['FastAPI', 'Next.js', 'Supabase', 'OpenAI', 'Three.js', 'PostgreSQL'],
      demoUrl: 'https://www.loom.com/share/99480c7998724b5384d7e94962d6e119',
      video: '/videos/eido.mp4',
      image: null,
    },
    {
      title: 'VR AI Assistant',
      shortDescription: 'NVIDIA hackathon VR environment that dynamically changes through voice interaction',
      description: 'Built for an NVIDIA 2-hour hackathon using Nemotron and NIM in a VR environment. The immersive experience dynamically changes when speaking to an AI bot, featuring real-time voice interaction and responsive environment manipulation. Integrated OpenAI Whisper for speech recognition and NVIDIA Nemotron-Nano 9B for AI responses.',
      technologies: ['Unity', 'C#', 'VR/XR', 'Flask', 'OpenAI Whisper', 'NVIDIA Nemotron', 'NIM', 'FFmpeg', 'Oculus/OpenXR', 'ElevenLabs'],
      video: '/videos/vr-demo.mp4',
      image: null,
    },
    {
      title: 'Machine Learning Project',
      shortDescription: 'Learning AI for obstacle avoidance and 2v2 soccer matches',
      description: 'Developed a learning AI using Python, C++, C#, and ML-Agents to complete tasks like obstacle avoidance and 2v2 soccer matches against AI opponents. Logged brain states every 5000ms to measure learning progress.',
      technologies: ['Python', 'C++', 'C#', 'ML-Agents'],
      video: '/videos/ml-agents.mp4',
      image: null,
    },
  ]

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states and animate heading
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

      // Set initial state and animate description
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 20 })
        gsap.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Set initial states for cards
      cardsRef.current.forEach(card => {
        if (card) gsap.set(card, { opacity: 0, y: 50, scale: 0.95 })
      })

      // Animate cards with stagger
      if (cardsRef.current.length > 0 && sectionRef.current) {
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Set initial state and animate button
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 0, y: 20 })
        gsap.to(buttonRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="projects" ref={sectionRef} className="bg-black relative">
      <StarField count={60} />
      <Container size="xl" className="relative z-10">
        <Heading ref={headingRef} size="lg" className="mb-4">
          Projects
        </Heading>
        <p ref={descRef} className="text-white/80 text-base md:text-lg mb-8 md:mb-12 max-w-3xl">
          Here are some of the projects I have worked on.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 mb-8 max-w-7xl mx-auto px-4 md:px-6">
          {/* Left side - Single project in middle */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start lg:self-center">
            <Card 
              ref={(el) => {
                if (el) cardsRef.current[0] = el
              }}
              hover 
              className="p-0 w-full flex flex-col overflow-hidden group relative aspect-video max-w-full"
            >
              {/* Video, Image or Placeholder - Horizontal rectangle */}
              <div className="w-full h-full bg-black overflow-hidden relative flex items-center justify-center">
                {projects[0].video ? (
                  <video
                    src={projects[0].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : projects[0].image ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={projects[0].image}
                      alt={projects[0].title}
                      width={800}
                      height={600}
                      className="object-contain max-h-full max-w-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                    <span className="text-white/40 text-xl md:text-2xl font-semibold uppercase tracking-wider">{projects[0].title}</span>
                  </div>
                )}
                
                {/* Hover Overlay - Shows on large screens only (lg and above) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end justify-center p-6 lg:p-8">
                  <div className="text-center w-full transform translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                      {projects[0].title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto">
                      {projects[0].shortDescription || projects[0].description.split('.').slice(0, 1).join('.') + '.'}
                    </p>
                    {projects[0].demoUrl && (
                      <a
                        href={projects[0].demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-orange hover:text-orange-light text-sm font-medium transition-colors border border-orange/30 hover:border-orange/50 px-4 py-2 rounded-lg"
                        aria-label={`View ${projects[0].title} demo`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Mobile/Tablet Info - Always visible on small screens, hidden on large */}
              <div className="p-5 md:p-6 flex flex-col flex-1 lg:hidden">
                <div className="flex items-start justify-between mb-3">
                  <Heading as="h3" size="sm" className="flex-1">
                    {projects[0].title}
                  </Heading>
                  {projects[0].demoUrl && (
                    <a
                      href={projects[0].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange hover:text-orange-light text-xs ml-2 flex-shrink-0"
                      aria-label={`View ${projects[0].title} demo`}
                    >
                      Demo →
                    </a>
                  )}
                </div>
                <p className="text-white/70 text-sm md:text-base mb-4 leading-relaxed flex-1">
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[0].technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right side - Two projects stacked */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-12 lg:gap-16">
            {projects.slice(1).map((project, index) => (
              <Card 
                key={index + 1}
                ref={(el) => {
                  if (el) cardsRef.current[index + 1] = el
                }}
                hover 
                className="p-0 w-full flex flex-col overflow-hidden group relative aspect-video"
              >
                {/* Video, Image or Placeholder - Horizontal rectangle */}
                <div className="w-full h-full bg-black overflow-hidden relative flex items-center justify-center">
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
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="object-contain max-h-full max-w-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                      <span className="text-white/40 text-xl md:text-2xl font-semibold uppercase tracking-wider">{project.title}</span>
                    </div>
                  )}
                  
                  {/* Hover Overlay - Shows on large screens only (lg and above) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-end justify-center p-6 lg:p-8">
                    <div className="text-center w-full transform translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4 max-w-md mx-auto">
                        {project.shortDescription || project.description.split('.').slice(0, 1).join('.') + '.'}
                      </p>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-orange hover:text-orange-light text-sm font-medium transition-colors border border-orange/30 hover:border-orange/50 px-4 py-2 rounded-lg"
                          aria-label={`View ${project.title} demo`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Demo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Mobile/Tablet Info - Always visible on small screens, hidden on large */}
                <div className="p-5 md:p-6 flex flex-col flex-1 lg:hidden">
                  <div className="flex items-start justify-between mb-3">
                    <Heading as="h3" size="sm" className="flex-1">
                      {project.title}
                    </Heading>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange hover:text-orange-light text-xs ml-2 flex-shrink-0"
                        aria-label={`View ${project.title} demo`}
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                  <p className="text-white/70 text-sm md:text-base mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Link ref={buttonRef} href="/projects" className="inline-block">
          <Button variant="ghost" className="group text-orange hover:text-orange-light border-orange/30 hover:border-orange/50">
            <span>Explore more</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </Container>
    </Section>
  )
}


