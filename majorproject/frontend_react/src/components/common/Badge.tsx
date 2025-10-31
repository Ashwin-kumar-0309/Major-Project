import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'pending'
  | 'approved'
  | 'rejected'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
  removable?: boolean
  onRemove?: () => void
  size?: 'sm' | 'md'
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-dark-surface text-dark-text border border-dark-border',
  success: 'bg-success/20 text-success border border-success/30',
  error: 'bg-error/20 text-error border border-error/30',
  warning: 'bg-warning/20 text-warning border border-warning/30',
  info: 'bg-info/20 text-info border border-info/30',
  pending: 'bg-warning/20 text-warning border border-warning/30',
  approved: 'bg-success/20 text-success border border-success/30',
  rejected: 'bg-error/20 text-error border border-error/30',
}

const sizeVariants = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      children,
      className = '',
      removable = false,
      onRemove,
      size = 'md',
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300'
    const variantStyles = badgeVariants[variant]
    const sizeStyles = sizeVariants[size]

    const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span>{children}</span>
        {removable && (
          <button
            onClick={onRemove}
            className="hover:opacity-70 transition-opacity ml-1"
          >
            ×
          </button>
        )}
      </motion.div>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
