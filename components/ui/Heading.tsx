'use client'

import { HTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Component = 'h2', size = 'lg', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(
          'font-bold text-white',
          {
            'text-2xl': size === 'xs',
            'text-3xl md:text-4xl': size === 'sm',
            'text-4xl md:text-5xl': size === 'md',
            'text-4xl md:text-5xl lg:text-6xl': size === 'lg',
            'text-5xl md:text-6xl lg:text-7xl': size === 'xl',
            'text-6xl md:text-7xl lg:text-8xl': size === '2xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

export default Heading

