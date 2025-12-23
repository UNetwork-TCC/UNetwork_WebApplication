'use client'

import { type Message as MessageInterface } from '@/types'
import { useTheme, alpha } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { type ReactElement } from 'react'
import { DoneAll } from '@mui/icons-material'

export default function Message({
  text,
  messageFrom = 'me',
  sendedAt = '00:00'
}: {
  text: string
  messageFrom?: 'me' | 'him'
  sendedAt?: string | 'Agora há pouco'
  messageInfo: MessageInterface
}): ReactElement {
  const theme = useTheme()
  const isMe = messageFrom === 'me'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        width: '100%',
        mb: 0.5
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '85%', sm: '75%', md: '65%' },
          minWidth: '80px',
          bgcolor: isMe
            ? theme.palette.primary.main
            : theme.palette.mode === 'dark'
              ? alpha(theme.palette.common.white, 0.08)
              : theme.palette.grey[100],
          color: isMe ? 'white' : 'text.primary',
          borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          px: 2,
          py: 1.25,
          boxShadow: theme.shadows[1],
          position: 'relative',
          wordBreak: 'break-word'
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '0.9rem', md: '0.95rem' },
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap'
          }}
        >
          {text}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 0.5,
            mt: 0.5
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.65rem',
              color: isMe ? 'rgba(255,255,255,0.7)' : 'text.secondary'
            }}
          >
            {sendedAt}
          </Typography>
          {isMe && (
            <DoneAll
              sx={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.7)'
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
