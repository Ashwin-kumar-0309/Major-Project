import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  return (
    <motion.nav
      className={`flex items-center gap-2 text-sm text-dark-textSecondary ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-1 text-dark-border">/</span>}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-dark-text font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  )
}

export default Breadcrumbs
