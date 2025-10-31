import React, { ReactNode, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export interface TableColumn<T> {
  key: keyof T
  label: string
  render?: (value: any, row: T) => ReactNode
  sortable?: boolean
  width?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  keyField?: keyof T
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void
  isLoading?: boolean
  hover?: boolean
  className?: string
}

const Table = React.forwardRef<HTMLDivElement, TableProps<any>>(
  (
    {
      columns,
      data,
      keyField = 'id' as any,
      onSort,
      isLoading = false,
      hover = true,
      className = '',
    },
    ref
  ) => {
    const [sortConfig, setSortConfig] = useState<{
      column: keyof any | null
      direction: 'asc' | 'desc'
    }>({
      column: null,
      direction: 'asc',
    })

    const handleSort = (column: keyof any) => {
      const isAsc =
        sortConfig.column === column && sortConfig.direction === 'asc'
      const newDirection = isAsc ? 'desc' : 'asc'

      setSortConfig({ column, direction: newDirection })
      onSort?.(column, newDirection)
    }

    return (
      <motion.div
        ref={ref}
        className={`overflow-x-auto rounded-lg border border-dark-border ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-dark-border bg-dark-surfaceLight">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-3 text-left text-sm font-semibold text-dark-text sticky top-0 bg-dark-surfaceLight"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-primary-400 transition-colors"
                    >
                      {column.label}
                      <span className="text-xs">
                        {sortConfig.column === column.key &&
                          (sortConfig.direction === 'asc' ? '↑' : '↓')}
                      </span>
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <svg className="animate-spin-smooth h-6 w-6 text-primary-500">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-dark-textSecondary"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <motion.tr
                  key={String(row[keyField]) || rowIndex}
                  className={`border-b border-dark-border transition-colors ${
                    hover ? 'hover:bg-dark-surfaceLight' : ''
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className="px-6 py-4 text-sm text-dark-text"
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '-')}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    )
  }
)

Table.displayName = 'Table'

export default Table
