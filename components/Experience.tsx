'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Badge from './ui/Badge'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceItemProps {
  exp: {
    company: string
    role: string
    location: string
    period: string
    duration: string
    workModel?: string
    logo?: string
    description: string[]
    technologies: string[]
  }
  index: number
}

function ExperienceItem({ exp, index }: ExperienceItemProps) {
  const [imageError, setImageError] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  
  const companyInitials = exp.company
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (itemRef.current && dotRef.current) {
      gsap.set([itemRef.current, dotRef.current], { opacity: 0, x: -50 })
      gsap.to([itemRef.current, dotRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, [])

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline Dot */}
      <div 
        ref={dotRef}
        className="absolute left-4 md:left-6 top-8 w-3 h-3 rounded-full bg-orange border-4 border-dark-charcoal z-10 hidden md:block transform -translate-x-1/2"
      ></div>
      
      <div className="ml-0 md:ml-16 pl-0 md:pl-6">
        <div className="bg-transparent border-0 p-0">
          <div className="flex gap-4 md:gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#1a1a1a' }}>
                {exp.logo && !imageError ? (
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain p-3"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xs md:text-sm font-bold px-2 text-center leading-tight">
                    {companyInitials}
                  </div>
                )}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-lg md:text-xl font-semibold mb-1.5">
                    {exp.company}
                  </p>
                  <p className="text-white text-base md:text-lg font-medium mb-1">
                    {exp.role}
                  </p>
                  <p className="text-white/70 text-sm md:text-base italic">
                    {exp.location}
                  </p>
                </div>
                <div className="text-left md:text-right flex-shrink-0">
                  <p className="text-white text-sm md:text-base font-medium mb-1">
                    {exp.period}
                  </p>
                  <p className="text-white/60 text-xs md:text-sm">
                    ({exp.duration})
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <ul className="space-y-1.5 mb-4">
                {exp.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white/80 text-sm md:text-base flex items-start gap-2">
                    <span className="text-white/50 mt-1.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const experiences = [
    {
      company: 'Booz Allen Hamilton',
      role: 'Incoming Software Developer Intern',
      location: 'Atlanta, Georgia, United States',
      period: 'Nov 2025 - Present',
      duration: '1 month',
      workModel: 'Hybrid',
      logo: '/logos/booz-allen.png',
      description: [
        'Software development internship focusing on building innovative solutions',
        'Collaborating with teams to deliver high-quality software products',
        'Gaining hands-on experience in enterprise software development',
      ],
      technologies: [],
    },
    {
      company: 'Howard University',
      role: 'Undergraduate Research - NAVY & AAVE',
      location: 'Washington, D.C.',
      period: 'Sep 2025 - Current',
      duration: '3 months',
      logo: '/logos/howard-university.png',
      description: [
        'Designing LLM-based systems that generate tactical decision recommendations for naval officers from vessel images and Navy documentation',
        'Conducting automated transcription research on African American Vernacular English (AAVE), focusing on regional variation and error patterns',
        'Improving accuracy and fairness in speech recognition models across dialects',
      ],
      technologies: ['Python', 'Machine Learning', 'LLM', 'Speech Recognition'],
    },
    {
      company: 'The Home Depot',
      role: 'AI Workforce Management Extern',
      location: 'Acworth, GA',
      period: 'Summer 2025',
      duration: '3 months',
      logo: '/logos/home-depot.jpg',
      description: [
        'Developed a final project proposal for an AI-powered scheduling tool that optimized workforce allocation',
        'Leveraged weather patterns, seasonal demand, and business trends to improve operational efficiency',
        'Collaborated with peers to design AI-driven solutions addressing workforce management challenges at scale',
        'Presented solution recommendations demonstrating how predictive analytics and machine learning could improve operations',
      ],
      technologies: ['Python', 'AI', 'Machine Learning', 'Predictive Analytics'],
    },
    {
      company: 'Code Ninjas',
      role: 'Code Sensei',
      location: 'Acworth, GA, Alexandria VA',
      period: 'August 2022 - Current',
      duration: '2+ years',
      logo: '/logos/codeninjas.png',
      description: [
        'Guided and instructed students from 2nd to 9th grade, teaching programming languages such as Java and C++',
        'Assisted with the first Black Belt Ninja (highest level) at this location, guiding the student in independently creating their own game using Unity',
        'Created and led the 3D development for the first Unity camp using Playmaker',
      ],
      technologies: ['Java', 'C++', 'Unity', 'Playmaker'],
    },
  ]

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

      // Set initial state and animate timeline line
      if (timelineRef.current) {
        gsap.set(timelineRef.current, { scaleY: 0, transformOrigin: 'top' })
        gsap.to(timelineRef.current, {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Section 
        id="experience" 
        ref={sectionRef} 
        className="bg-dark-charcoal relative"
      >
        <Container size="xl">
        <Heading ref={headingRef} size="lg" className="mb-12 md:mb-16">
          Experience
        </Heading>
        <div className="relative max-w-4xl">
          {/* Timeline Line */}
          <div 
            ref={timelineRef}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-white/20 hidden md:block"
          ></div>
          
          <div className="space-y-10 md:space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </Container>
      </Section>
      {/* Curved bottom border */}
      <div 
        className="bg-dark-charcoal relative"
        style={{
          height: '80px',
          borderBottomLeftRadius: '50% 80px',
          borderBottomRightRadius: '50% 80px',
          marginTop: '0'
        }}
      />
    </>
  )
}

