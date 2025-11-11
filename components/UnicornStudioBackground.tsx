'use client'

import { useEffect, useRef } from 'react'

interface UnicornStudioBackgroundProps {
  projectId?: string
  className?: string
  style?: React.CSSProperties
}

export default function UnicornStudioBackground({ 
  projectId = 'CXxy717ia2iGenzLoTVH',
  className = '',
  style = {}
}: UnicornStudioBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Execute the exact embedding code pattern as an IIFE
    ;(function() {
      if (!window.UnicornStudio) {
        window.UnicornStudio = { isInitialized: false }
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.34/dist/unicornStudio.umd.js'
        script.onload = function() {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            if (!window.UnicornStudio?.isInitialized) {
              if (typeof UnicornStudio !== 'undefined' && UnicornStudio.init) {
                UnicornStudio.init()
                if (window.UnicornStudio) {
                  window.UnicornStudio.isInitialized = true
                }
              }
            } else if (typeof UnicornStudio !== 'undefined' && UnicornStudio.init) {
              // Re-initialize to pick up new elements
              UnicornStudio.init()
            }
          }, 100)
        }
        ;(document.head || document.body).appendChild(script)
      } else {
        // Script already loaded
        if (typeof UnicornStudio !== 'undefined' && UnicornStudio.init) {
          // Re-initialize to pick up any new elements
          setTimeout(() => {
            UnicornStudio.init()
          }, 100)
        }
      }
    })()
  }, [projectId])

  return (
    <div 
      ref={containerRef}
      data-us-project={projectId}
      className={className}
      style={style}
    />
  )
}

