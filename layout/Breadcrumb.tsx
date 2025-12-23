'use client'

import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material'
import { Home, ChevronRight } from '@mui/icons-material'
import { useNavigate } from '@/hooks'
import { type ReactElement } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
}

export default function Breadcrumb({ items, showHome = true }: BreadcrumbProps): ReactElement {
  const navigate = useNavigate()
  const theme = useTheme()

  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/app', icon: <Home sx={{ fontSize: 18, mr: 0.5 }} /> }, ...items]
    : items

  return (
    <Box
      sx={{
        py: 1.5,
        px: 2,
        mb: 2,
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'light'
          ? 'rgba(103, 58, 183, 0.04)'
          : 'rgba(209, 196, 233, 0.08)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light'
          ? 'rgba(103, 58, 183, 0.1)'
          : 'rgba(209, 196, 233, 0.12)'
      }}
    >
      <Breadcrumbs
        separator={
          <ChevronRight
            sx={{
              fontSize: 18,
              color: 'text.disabled'
            }}
          />
        }
        aria-label="breadcrumb"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1

          if (isLast) {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {item.icon}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main'
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            )
          }

          return (
            <Link
              key={index}
              underline="hover"
              onClick={() => {
                if (item.onClick) {
                  item.onClick()
                } else if (item.href) {
                  navigate(item.href)
                }
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: item.href || item.onClick ? 'pointer' : 'default',
                color: 'text.secondary',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              {item.icon}
              <Typography variant="body2">{item.label}</Typography>
            </Link>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}
