import { Box, useTheme } from '@mui/material'
import { type ReactElement, type ReactNode } from 'react'

export default function ChatArea({
  children
}: {
  children: ReactNode
}): ReactElement {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
        [theme.breakpoints.down('md')]: {
          height: '100dvh'
        }
      }}
    >
      {children}
    </Box>
  )
}
