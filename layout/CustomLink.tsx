'use client'

import { Box, Typography, useTheme } from '@mui/material'
import { useStyles } from '../styles'
import { type ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getOverlay } from '@/themes'

export default function CustomLink({
  name,
  to
}: {
  name: string
  to: string
}): ReactElement {
  const theme = useTheme()
  const mode = theme.palette.mode
  const classes = useStyles(theme)
  const pathname = usePathname()

  const isActive = pathname.startsWith(to)

  return (
    <Link href={to} className={classes.headerLinks} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          px: { md: 1.5, lg: 2, xl: 2.5 },
          py: { md: 0.75, lg: 1, xl: 1.25 },
          borderRadius: 2,
          bgcolor: isActive ? getOverlay(mode, 'primaryMedium') : 'transparent',
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            bgcolor: isActive
              ? getOverlay(mode, 'primaryMedium')
              : getOverlay(mode, 'primarySoft')
          }
        }}
      >
        <Typography
          sx={{
            color: isActive ? 'primary.main' : 'text.primary',
            fontWeight: isActive ? 600 : 500,
            fontSize: { md: '0.875rem', lg: '0.9375rem', xl: '1rem' }
          }}
        >
          {name}
        </Typography>
      </Box>
    </Link>
  )
}
