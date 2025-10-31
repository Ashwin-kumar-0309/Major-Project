import React, { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Sidebar, { SidebarItem } from './Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  sidebarItems: SidebarItem[]
  title?: string
  subtitle?: string
}

const DashboardLayout = ({
  children,
  sidebarItems,
  title,
  subtitle,
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-dark-bg">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed left-0 top-0 h-full z-20">
        <Sidebar items={sidebarItems} isOpen={true} mobileOnly={false} />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        mobileOnly={true}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          showMenuButton={true}
        />

        {/* Content */}
        <motion.main
          className="flex-1 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Title Section */}
            {(title || subtitle) && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {title && (
                  <h1 className="text-3xl sm:text-4xl font-bold text-dark-text mb-2">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-dark-textSecondary">{subtitle}</p>
                )}
              </motion.div>
            )}

            {/* Page Content */}
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default DashboardLayout
