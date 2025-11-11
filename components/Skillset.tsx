'use client'

import { useEffect, useRef, useState } from 'react'
import { Code, Brain, Database, Wrench } from 'lucide-react'
import { 
  SiPython,
  SiCplusplus,
  SiJavascript, 
  SiHtml5, 
  SiCss3,
  SiFlask,
  SiDjango,
  SiFastapi,
  SiNextdotjs,
  SiOpencv,
  SiSqlite,
  SiGoogle,
  SiOpenai,
  SiSupabase,
  SiThreedotjs,
  SiPostgresql,
  SiGit,
  SiRaspberrypi,
  SiVercel,
  SiGooglecloud,
} from 'react-icons/si'
import { 
  DiMysql,
} from 'react-icons/di'
import { IconType } from 'react-icons'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Card from './ui/Card'
import Badge from './ui/Badge'

gsap.registerPlugin(ScrollTrigger)

export default function Skillset() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const descRef = useRef<HTMLParagraphElement>(null)
  const glowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mousePositions, setMousePositions] = useState<{ x: number; y: number }[]>([])
  const glowAnimations = useRef<(gsap.core.Tween | null)[]>([])

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

      // Set initial states for cards
      cardsRef.current.forEach(card => {
        if (card) gsap.set(card, { opacity: 0, y: 40 })
      })

      // Animate cards with stagger
      if (cardsRef.current.length > 0 && sectionRef.current) {
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smoothly animate glow positions
  useEffect(() => {
    mousePositions.forEach((pos, index) => {
      // Check if pos exists and has x and y properties
      if (!pos || typeof pos.x !== 'number' || typeof pos.y !== 'number') {
        return
      }
      const glowEl = glowRefs.current[index]
      if (glowEl) {
        // Kill existing animation for this glow
        const existingAnimation = glowAnimations.current[index]
        if (existingAnimation) {
          existingAnimation.kill()
        }
        // Create smooth animation to new position
        glowAnimations.current[index] = gsap.to(glowEl, {
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    })
  }, [mousePositions])
  // Icon mapping for technologies
  const getTechIcon = (tech: string): IconType | null => {
    const iconMap: Record<string, IconType> = {
      'Python': SiPython,
      'C++': SiCplusplus,
      'JavaScript': SiJavascript,
      'SQL': DiMysql,
      'HTML': SiHtml5,
      'CSS': SiCss3,
      'Flask': SiFlask,
      'Django': SiDjango,
      'FastAPI': SiFastapi,
      'Next.js': SiNextdotjs,
      'OpenCV': SiOpencv,
      'Media Pipe': SiGooglecloud, // Using Google Cloud icon as fallback for Media Pipe (Google product)
      'SQLite': SiSqlite,
      'Gemini AI': SiGoogle,
      'OpenAI': SiOpenai,
      'Supabase': SiSupabase,
      'Three.js': SiThreedotjs,
      'PostgreSQL': SiPostgresql,
      'Git': SiGit,
      'Raspberry Pi': SiRaspberrypi,
      'Vercel': SiVercel,
    }
    return iconMap[tech] || null
  }

  const skills = [
    {
      title: 'Languages',
      description: 'Proficient in multiple programming languages for both frontend and backend development, with expertise in Python for AI/ML and web development.',
      technologies: ['Python', 'C++', 'C#', 'JavaScript', 'SQL', 'HTML', 'CSS'],
      icon: Code,
    },
    {
      title: 'Frameworks & Libraries',
      description: 'Experience building scalable web applications and interactive 3D visualizations using modern frameworks and libraries.',
      technologies: ['Flask', 'Django', 'FastAPI', 'Next.js', 'OpenCV', 'Media Pipe', 'Three.js'],
      icon: Wrench,
    },
    {
      title: 'AI & Machine Learning',
      description: 'Specialized in AI/ML development with experience in LLM systems, speech recognition, and machine learning agents.',
      technologies: ['OpenAI', 'Gemini AI', 'Machine Learning'],
      icon: Brain,
    },
    {
      title: 'Databases & Tools',
      description: 'Expertise in database design and management, along with development tools and platforms for deployment.',
      technologies: ['PostgreSQL', 'SQLite', 'Supabase', 'Git', 'Raspberry Pi', 'Vercel'],
      icon: Database,
    },
  ]

  return (
    <>
      <Section 
        id="skillset" 
        ref={sectionRef} 
        className="bg-dark-charcoal relative"
        style={{
          borderTopLeftRadius: '50% 80px',
          borderTopRightRadius: '50% 80px',
          marginTop: '-80px',
          paddingTop: '100px'
        }}
      >
        <Container size="xl">
        <Heading ref={headingRef} size="lg" className="mb-12 md:mb-16 text-center">
          Skillset
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            const mousePos = mousePositions[index] || { x: 50, y: 50 }
            
            return (
              <Card 
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                hover 
                className="p-6 md:p-8 relative overflow-hidden group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width) * 100
                  const y = ((e.clientY - rect.top) / rect.height) * 100
                  setMousePositions(prev => {
                    const newPositions = [...prev]
                    newPositions[index] = { x, y }
                    return newPositions
                  })
                }}
                onMouseLeave={() => {
                  setMousePositions(prev => {
                    const newPositions = [...prev]
                    newPositions[index] = { x: 50, y: 50 }
                    return newPositions
                  })
                }}
              >
                {/* Orange glow effect that follows mouse */}
                <div
                  ref={(el) => {
                    glowRefs.current[index] = el
                  }}
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
                <div className="flex flex-col relative z-10">
                  <div className="flex flex-col items-center mb-6">
                    {/* Technology Icons Grid */}
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-4">
                      {skill.technologies.map((tech, techIndex) => {
                        const TechIcon = getTechIcon(tech)
                        if (TechIcon) {
                          return (
                            <div 
                              key={techIndex}
                              className="flex items-center justify-center"
                              style={{ fontSize: '32px' }}
                              title={tech}
                            >
                              <TechIcon />
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                    <Heading as="h3" size="md" className="text-center mb-3">
                      {skill.title}
                    </Heading>
                  </div>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 text-center">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skill.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
        <p ref={descRef} className="mt-12 text-white/80 text-base md:text-lg leading-relaxed max-w-4xl mx-auto text-center">
          My experience spans across languages, frameworks, AI/ML, and database technologies, giving me a well-rounded perspective on the entire development process. This allows me to effectively plan and implement system architectures that meet project needs from AI-powered solutions to full-stack applications.
        </p>
      </Container>
      </Section>
    </>
  )
}

