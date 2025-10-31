import React, { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-glow-blue enabled:hover:from-primary-600 enabled:hover:to-secondary-600',
  secondary:
    'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 enabled:hover:shadow-glow-blue',
  ghost: 'text-primary-400 hover:text-primary-300 hover:bg-primary-500/10',
  danger:
    'bg-error text-white hover:bg-red-600 enabled:hover:shadow-glow-pink hover:shadow-glow-pink',
}

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500/50'

    const variantStyles = buttonVariants[variant]
    const sizeStyles = buttonSizes[size]
    const widthStyles = fullWidth ? 'w-full' : ''

    const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`

    return (
      <motion.button
        ref={ref}
        className={combinedClassName}
        whileHover={{ scale: !disabled ? 1.05 : 1 }}
        whileTap={{ scale: !disabled ? 0.98 : 1 }}
        transition={{ duration: 0.2 }}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin-smooth h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
