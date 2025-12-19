'use client'

import { type ReactElement } from 'react'
import { Box, Typography, Button, Avatar, Card } from '@mui/material'

interface SuggestionUser {
  name: string
  username: string
  bio: string
  avatar?: string
}

interface SuggestionsPanelProps {
  suggestions?: SuggestionUser[]
}

const defaultSuggestions: SuggestionUser[] = [
  { name: 'Ana Oliveira', username: '@anaoliveira', bio: 'Designer UI/UX' },
  { name: 'Carlos Santos', username: '@carlossantos', bio: 'Dev Frontend' },
  { name: 'Beatriz Lima', username: '@bialima', bio: 'Product Manager' }
]

export default function SuggestionsPanel({
  suggestions = defaultSuggestions
}: SuggestionsPanelProps): ReactElement {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 2.5,
        mb: 2
      }}
    >
      <Typography variant="subtitle2" fontWeight={600} mb={2}>
        Sugestões para você
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {suggestions.map(user => (
          <Box
            key={user.username}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #673ab7 0%, #e91e63 100%)'
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} noWrap>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user.bio}
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '0.75rem',
                py: 0.5,
                px: 1.5,
                borderColor: 'primary.light',
                color: 'primary.main',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderColor: 'primary.main'
                }
              }}
            >
              Seguir
            </Button>
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        variant="text"
        sx={{
          mt: 2,
          textTransform: 'none',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.main',
            backgroundColor: 'rgba(103, 58, 183, 0.04)'
          }
        }}
      >
        Ver mais sugestões
      </Button>
    </Card>
  )
}
