import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastProps extends Toast {
  onClose: (id: string) => void
}

const toastColors: Record<ToastType, { bg: string; text: string; icon: string }> = {
  success: {
    bg: 'bg-success/20',
    text: 'text-success',
    icon: '✓',
  },
  error: {
    bg: 'bg-error/20',
    text: 'text-error',
    icon: '✕',
  },
  warning: {
    bg: 'bg-warning/20',
    text: 'text-warning',
    icon: '!',
  },
  info: {
    bg: 'bg-info/20',
    text: 'text-info',
    icon: 'ℹ',
  },
}

const Toast = ({ id, type, message, duration = 4000, onClose }: ToastProps) => {
  const colors = toastColors[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <motion.div
      className={`${colors.bg} ${colors.text} border border-current/30 rounded-lg p-4 flex items-center gap-3 mb-3 max-w-sm`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      <span className="flex-shrink-0 text-lg font-bold">{colors.icon}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </motion.div>
  )
}

export default Toast

// Toast Container Component
interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <motion.div className="fixed bottom-6 right-6 z-50 flex flex-col">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
