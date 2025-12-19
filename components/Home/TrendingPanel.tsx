'use client'

import { type ReactElement } from 'react'
import { Box, Typography, Card } from '@mui/material'
import { LocalFireDepartment } from '@mui/icons-material'

interface TrendingItem {
  tag: string
  posts: number
}

interface TrendingPanelProps {
  items?: TrendingItem[]
}

const defaultTrending: TrendingItem[] = [
  { tag: '#tecnologia', posts: 1200 },
  { tag: '#design', posts: 800 },
  { tag: '#programação', posts: 500 },
  { tag: '#educação', posts: 350 },
  { tag: '#inovação', posts: 280 }
]

export default function TrendingPanel({
  items = defaultTrending
}: TrendingPanelProps): ReactElement {
  const formatPosts = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <Card
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        p: 2.5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <LocalFireDepartment sx={{ color: 'warning.main' }} />
        <Typography variant="subtitle2" fontWeight={600}>
          Em Alta
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {items.map(item => (
          <Box
            key={item.tag}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.5,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'primary.main',
                backgroundColor: 'rgba(103, 58, 183, 0.04)',
                '& .tag-text': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <Typography
              className="tag-text"
              variant="body2"
              fontWeight={500}
              sx={{ transition: 'color 0.2s' }}
            >
              {item.tag}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatPosts(item.posts)} posts
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}
