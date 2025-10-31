import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold gradient-text mb-2">Identeefi</h1>
          </Link>
          {title && <h2 className="text-2xl font-semibold text-dark-text mb-2">{title}</h2>}
          {subtitle && <p className="text-dark-textSecondary">{subtitle}</p>}
        </div>

        {/* Content Card */}
        <motion.div
          className="bg-dark-surface/80 backdrop-blur-md border border-primary-500/30 rounded-2xl p-8 shadow-2xl shadow-primary-500/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-dark-textSecondary">
          <p>
            © 2024 Identeefi. All rights reserved.{' '}
            <Link to="/" className="text-primary-400 hover:text-primary-300 transition-colors">
              Learn more
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout
