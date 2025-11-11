'use client'

import { HTMLAttributes, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  id?: string
  className?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, id, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={clsx('py-20 md:py-24 px-6 md:px-8 lg:px-12', className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section

