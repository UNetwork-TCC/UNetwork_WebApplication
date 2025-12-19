'use client'

import { type ReactElement } from 'react'
import { Box, Typography, Button, Avatar, keyframes } from '@mui/material'
import { Folder, Add } from '@mui/icons-material'

interface EmptyStateProps {
  onAddFolder: () => void
}

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export function EmptyState({ onAddFolder }: EmptyStateProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        animation: `${fadeIn} 0.5s ease-out`
      }}
    >
      {/* Animated folder icon */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        {/* Glow effect */}
        <Box
          sx={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(103, 58, 183, 0.2) 0%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        <Avatar
          sx={{
            position: 'relative',
            width: 96,
            height: 96,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #673ab7 0%, #e91e63 100%)',
            boxShadow: '0 8px 32px rgba(103, 58, 183, 0.3)',
            animation: `${float} 3s ease-in-out infinite`
          }}
        >
          <Folder sx={{ fontSize: 48 }} />
        </Avatar>
      </Box>

      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        mb={1}
        sx={{ animation: `${fadeIn} 0.5s ease-out 0.1s both` }}
      >
        Nenhuma pasta ainda
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        maxWidth={360}
        mb={4}
        sx={{ animation: `${fadeIn} 0.5s ease-out 0.2s both` }}
      >
        Comece criando sua primeira pasta para organizar seus arquivos de forma simples
        e eficiente.
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onAddFolder}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: '0 4px 16px rgba(103, 58, 183, 0.3)',
          animation: `${fadeIn} 0.5s ease-out 0.3s both`,
          '&:hover': {
            boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        Criar primeira pasta
      </Button>
    </Box>
  )
}

export default EmptyState
