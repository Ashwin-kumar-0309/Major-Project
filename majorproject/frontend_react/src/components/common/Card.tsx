import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type CardVariant = 'elevated' | 'flat' | 'transparent'

interface CardProps {
  variant?: CardVariant
  children: ReactNode
  className?: string
  hoverable?: boolean
  onClick?: () => void
  padding?: 'sm' | 'md' | 'lg'
}

const cardVariants = {
  elevated:
    'bg-dark-surface/80 backdrop-blur-md border border-primary-500/30 shadow-glow-blue',
  flat: 'bg-dark-surface border border-white/10 hover:border-primary-500/50',
  transparent: 'bg-transparent border-0',
}

const paddingVariants = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      children,
      className = '',
      hoverable = false,
      onClick,
      padding = 'md',
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-300'
    const variantStyles = cardVariants[variant]
    const paddingStyles = paddingVariants[padding]
    const hoverStyles = hoverable
      ? 'cursor-pointer hover:shadow-glow-blue hover:-translate-y-1'
      : ''

    const combinedClassName = `${baseStyles} ${variantStyles} ${paddingStyles} ${hoverStyles} ${className}`

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        onClick={onClick}
        whileHover={hoverable ? { y: -4 } : {}}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card
