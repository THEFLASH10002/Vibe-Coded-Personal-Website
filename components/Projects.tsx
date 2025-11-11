'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Card from './ui/Card'
import Badge from './ui/Badge'
import Button from './ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)

  const projects = [
    {
      title: 'Eido',
      description: 'Built and deployed a full-stack AI learning platform with JWT authentication, pgvector embeddings, and OpenAI integration. Created an interactive 3D knowledge graph using Three.js for visualizing learning connections.',
      technologies: ['FastAPI', 'Next.js', 'Supabase', 'OpenAI', 'Three.js', 'PostgreSQL'],
      demoUrl: 'https://www.loom.com/share/99480c7998724b5384d7e94962d6e119',
      video: '/videos/eido.mp4',
    },
    {
      title: 'Vocalytics',
      description: 'Developed a Raspberry Pi-powered tool using Python, OpenCV, and Media Pipe to track speech patterns and posture in real-time, providing feedback for communication skill improvement. Placed 2nd overall at Morgan Hacks Hackathon.',
      technologies: ['Python', 'Flask', 'SQLite', 'OpenCV', 'Media Pipe', 'Gemini AI'],
    },
    {
      title: 'Machine Learning Project',
      description: 'Developed a learning AI using Python, C++, C#, and ML-Agents to complete tasks like obstacle avoidance and 2v2 soccer matches against AI opponents. Logged brain states every 5000ms to measure learning progress.',
      technologies: ['Python', 'C++', 'C#', 'ML-Agents'],
      video: '/videos/ml-agents.mp4',
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
    <Section id="projects" ref={sectionRef} className="bg-black">
      <Container size="xl">
        <Heading ref={headingRef} size="lg" className="mb-4">
          Projects
        </Heading>
        <p ref={descRef} className="text-white/80 text-base md:text-lg mb-8 md:mb-12 max-w-3xl">
          Here are some of the projects I have worked on.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              hover 
              className="p-0 h-full flex flex-col overflow-hidden"
            >
              {/* Video or Content */}
              {project.video ? (
                <div className="w-full h-40 md:h-48 bg-black overflow-hidden">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
              
              <div className="p-5 md:p-6 flex flex-col flex-1">
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


