import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export interface SidebarItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: number
}

interface SidebarProps {
  items: SidebarItem[]
  isOpen: boolean
  onClose?: () => void
  mobileOnly?: boolean
}

const Sidebar = ({ items, isOpen, onClose, mobileOnly = false }: SidebarProps) => {
  const location = useLocation()

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const sidebarContent = (
    <motion.div
      className="w-64 bg-dark-surface/95 backdrop-blur-md border-r border-dark-border h-full flex flex-col"
      variants={sidebarVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
    >
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-dark-border">
        <h2 className="text-lg font-bold gradient-text">Menu</h2>
        {mobileOnly && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-surfaceLight rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {items.map((item, index) => {
          const isActive = location.pathname === item.href
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.href}
                onClick={() => mobileOnly && onClose?.()}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-400 shadow-glow-blue'
                    : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surfaceLight'
                }`}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span className="flex-1 font-medium text-sm">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-dark-border text-xs text-dark-textSecondary text-center">
        <p>© 2024 Identeefi</p>
      </div>
    </motion.div>
  )

  if (mobileOnly) {
    return (
      <>
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <div className="fixed left-0 top-0 h-screen z-50 md:hidden">{sidebarContent}</div>
      </>
    )
  }

  return sidebarContent
}

export default Sidebar
