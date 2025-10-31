import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <Header />

      {/* Content */}
      <motion.main
        className="pt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  )
}

export default MainLayout
