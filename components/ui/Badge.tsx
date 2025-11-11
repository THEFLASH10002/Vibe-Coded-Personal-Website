'use client'

import { HTMLAttributes, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'subtle'
  icon?: ReactNode
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex flex-col items-center justify-center px-3 py-2.5 rounded-full text-xs md:text-sm font-medium transition-colors min-w-[70px]',
          {
            'bg-white/10 text-white/90 border border-white/20 hover:border-orange/50': variant === 'default',
            'bg-transparent text-white/80 border border-white/30 hover:border-orange/50': variant === 'outline',
            'bg-white/5 text-white/70 border border-white/10': variant === 'subtle',
          },
          className
        )}
        {...props}
      >
        {icon && (
          <span className="flex items-center justify-center mb-1" style={{ fontSize: '20px', lineHeight: '1' }}>
            {icon}
          </span>
        )}
        <span className="text-center leading-tight">{children}</span>
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge

