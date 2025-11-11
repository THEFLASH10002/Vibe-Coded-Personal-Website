'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface StarFieldProps {
  count?: number
  className?: string
}

export default function StarField({ count = 50, className = '' }: StarFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shootingStarsRef = useRef<gsap.core.Tween[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const stars: HTMLDivElement[] = []
    const shootingStarCount = Math.min(8, Math.floor(count * 0.15)) // 15% of stars, max 8

    // Create regular stars
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      const size = Math.random() * 3 + 1 // Random size between 1-4px
      const x = Math.random() * 100 // Random x position (0-100%)
      const y = Math.random() * 100 // Random y position (0-100%)
      const opacity = Math.random() * 0.8 + 0.2 // Random opacity (0.2-1.0)
      
      star.style.position = 'absolute'
      star.style.left = `${x}%`
      star.style.top = `${y}%`
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.backgroundColor = 'white'
      star.style.borderRadius = '50%'
      star.style.opacity = `${opacity}`
      star.style.pointerEvents = 'none'
      star.style.zIndex = '1'
      
      container.appendChild(star)
      stars.push(star)
    }

    // Create shooting stars (animated)
    const createShootingStar = () => {
      const shootingStar = document.createElement('div')
      const startX = Math.random() * 100 // Random start x position
      const startY = Math.random() * 100 // Random start y position
      const direction = Math.random() * 360 // Random direction in degrees
      const distance = 25 + Math.random() * 35 // Travel distance (25-60%)
      const duration = 1.5 + Math.random() * 1.5 // Animation duration (1.5-3 seconds)
      
      // Calculate end position based on direction
      const radians = (direction * Math.PI) / 180
      const endX = startX + Math.cos(radians) * distance
      const endY = startY + Math.sin(radians) * distance
      
      shootingStar.style.position = 'absolute'
      shootingStar.style.left = `${startX}%`
      shootingStar.style.top = `${startY}%`
      shootingStar.style.width = '2px'
      shootingStar.style.height = '2px'
      shootingStar.style.backgroundColor = 'white'
      shootingStar.style.borderRadius = '50%'
      shootingStar.style.opacity = '0'
      shootingStar.style.pointerEvents = 'none'
      shootingStar.style.zIndex = '2'
      shootingStar.style.boxShadow = '0 0 3px 1px rgba(255, 255, 255, 0.7)'
      
      container.appendChild(shootingStar)
      
      // Animate shooting star
      const animation = gsap.to(shootingStar, {
        left: `${endX}%`,
        top: `${endY}%`,
        opacity: 0.85,
        duration: duration,
        ease: 'power2.out',
        onComplete: () => {
          // Remove and recreate for continuous effect
          if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar)
          }
          // Wait a bit before creating a new one
          setTimeout(() => {
            createShootingStar()
          }, 2000 + Math.random() * 3000) // Wait 2-5 seconds (more frequent)
        }
      })
      
      // Fade in at start
      gsap.fromTo(shootingStar, 
        { opacity: 0 },
        { opacity: 0.85, duration: 0.2 }
      )
      
      // Fade out at end
      gsap.to(shootingStar, {
        opacity: 0,
        duration: 0.4,
        delay: duration - 0.4
      })
      
      shootingStarsRef.current.push(animation)
    }

    // Create initial shooting stars
    for (let i = 0; i < shootingStarCount; i++) {
      setTimeout(() => {
        createShootingStar()
      }, i * 800) // Stagger their start times (more overlap)
    }

    return () => {
      stars.forEach(star => {
        if (star.parentNode) {
          star.parentNode.removeChild(star)
        }
      })
      shootingStarsRef.current.forEach(anim => {
        anim.kill()
      })
      shootingStarsRef.current = []
    }
  }, [count])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  )
}

