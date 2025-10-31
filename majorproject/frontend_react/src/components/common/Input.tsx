import React, { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'date'
type InputState = 'default' | 'focus' | 'error' | 'success' | 'disabled'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  icon?: ReactNode
  type?: InputType
  textarea?: boolean
  rows?: number
  helpText?: string
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      icon,
      type = 'text',
      textarea = false,
      rows = 4,
      helpText,
      className = '',
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const baseStyles =
      'w-full px-4 py-2.5 rounded-lg bg-dark-surface border-2 transition-all duration-300 font-sans'

    const borderStyles = error
      ? 'border-error focus:border-error focus:shadow-glow-pink'
      : success
        ? 'border-success focus:border-success focus:shadow-glow-cyan'
        : 'border-dark-border focus:border-primary-500 focus:shadow-glow-blue'

    const disabledStyles = disabled
      ? 'bg-dark-surfaceLight opacity-50 cursor-not-allowed'
      : ''

    const textColorStyles = 'text-dark-text placeholder-dark-textSecondary'

    const combinedClassName = `${baseStyles} ${borderStyles} ${disabledStyles} ${textColorStyles} ${className}`

    const inputComponent = textarea ? (
      <textarea
        ref={ref as any}
        className={combinedClassName}
        disabled={disabled}
        required={required}
        rows={rows}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...(props as any)}
      />
    ) : (
      <input
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    )

    return (
      <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {label && (
          <label className="block text-sm font-medium text-dark-text mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {inputComponent}

          {icon && <div className="absolute right-3 top-3 text-dark-textSecondary">{icon}</div>}

          {error && (
            <motion.div
              className="absolute right-3 top-3 text-error"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✕
            </motion.div>
          )}

          {success && (
            <motion.div
              className="absolute right-3 top-3 text-success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✓
            </motion.div>
          )}
        </div>

        {error && <p className="text-error text-xs mt-1">{error}</p>}
        {helpText && !error && (
          <p className="text-dark-textSecondary text-xs mt-1">{helpText}</p>
        )}
      </motion.div>
    )
  }
)

Input.displayName = 'Input'

export default Input
