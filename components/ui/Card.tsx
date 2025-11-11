'use client'

import { HTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-xl transition-all duration-200',
          {
            'bg-white/5 backdrop-blur-sm border border-white/10': variant === 'default',
            'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg': variant === 'elevated',
            'bg-transparent border-2 border-white/20': variant === 'outlined',
          },
          hover && 'hover:bg-white/10 hover:border-orange/30 hover:shadow-orange/10 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card

