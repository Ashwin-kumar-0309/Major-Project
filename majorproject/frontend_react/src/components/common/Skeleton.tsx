import React from 'react'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  count?: number
  className?: string
}

const Skeleton = ({
  variant = 'text',
  width = '100%',
  height = '1rem',
  count = 1,
  className = '',
}: SkeletonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
        return 'rounded-lg'
      case 'text':
      default:
        return 'rounded'
    }
  }

  const baseStyles = `${getVariantStyles()} bg-dark-surface animate-shimmer`

  const skeletons = Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={`${baseStyles} ${className} ${i > 0 ? 'mt-2' : ''}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  ))

  return <>{skeletons}</>
}

export default Skeleton
