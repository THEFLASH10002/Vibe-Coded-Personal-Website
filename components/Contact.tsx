'use client'

import { useEffect, useRef } from 'react'
import { Github, Linkedin, FileText, Mail } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from './ui/Section'
import Container from './ui/Container'
import Heading from './ui/Heading'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import Button from './ui/Button'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

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

      // Set initial state and animate form
      if (formRef.current) {
        gsap.set(formRef.current, { opacity: 0, y: 30 })
        gsap.to(formRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Set initial state and animate contact info
      if (contactInfoRef.current) {
        gsap.set(contactInfoRef.current, { opacity: 0, y: 20 })
        gsap.to(contactInfoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Set initial state and animate footer
      if (footerRef.current) {
        gsap.set(footerRef.current, { opacity: 0 })
        gsap.to(footerRef.current, {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section id="contact" ref={sectionRef} className="bg-black">
      <Container size="md">
        <Heading ref={headingRef} size="lg" className="mb-6 md:mb-8">
          Keep in touch.
        </Heading>
        <p ref={descRef} className="text-white/80 text-base md:text-lg mb-12 md:mb-16 leading-relaxed">
          I'm a Software Engineer passionate about creating impactful solutions. Feel free to get in touch.
        </p>
        
        <div className="space-y-6 md:space-y-8">
          {/* Contact Form */}
          <form ref={formRef} className="space-y-4 md:space-y-6">
            <Input
              type="email"
              placeholder="Your email"
              aria-label="Your email"
            />
            <Textarea
              rows={6}
              placeholder="Your message"
              aria-label="Your message"
            />
            <Button type="submit" variant="primary" size="md" className="bg-orange hover:bg-orange-light text-black border-orange">
              Send →
            </Button>
          </form>

          {/* Contact Info */}
          <div ref={contactInfoRef} className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-5 h-5" />
                <a 
                  href="mailto:contact@kennedygregg.com" 
                  className="hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-black rounded"
                >
                  contact@kennedygregg.com
                </a>
              </div>
              <div className="flex gap-4">
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
                    className="text-white/80 hover:text-orange transition-colors focus:outline-none focus:ring-2 focus:ring-orange/50 focus:ring-offset-2 focus:ring-offset-black rounded p-1"
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div ref={footerRef} className="pt-8 text-center text-white/60 text-sm">
            <p>© 2025 - Designed & Developed by Kennedy Gregg.</p>
            <p className="mt-2">Built with Next.js and Tailwind CSS. Hosted on Vercel.</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}


