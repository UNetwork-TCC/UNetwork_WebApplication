'use client'

import { type ReactElement } from 'react'
import {
  Box,
  Typography,
  Chip,
  IconButton,
  useTheme
} from '@mui/material'
import {
  AccessTime,
  Visibility,
  BookmarkBorder,
  Share
} from '@mui/icons-material'
import { getOverlay, getGradient } from '@/themes'

interface NewsArticleCardProps {
  title: string
  description: string
  category: string
  image?: string
  author?: string
  date?: string | Date
  views?: number
  readTime?: string
  featured?: boolean
  onShare?: () => void
  onBookmark?: () => void
  onClick?: () => void
}

const getCategoryColor = (category: string): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    'Tecnologia': { bg: 'rgba(33, 150, 243, 0.15)', text: '#2196f3' },
    'Carreira': { bg: 'rgba(76, 175, 80, 0.15)', text: '#4caf50' },
    'Design': { bg: 'rgba(156, 39, 176, 0.15)', text: '#9c27b0' },
    'Mercado': { bg: 'rgba(255, 152, 0, 0.15)', text: '#ff9800' },
    'Saúde': { bg: 'rgba(233, 30, 99, 0.15)', text: '#e91e63' },
    'Escola': { bg: 'rgba(103, 58, 183, 0.15)', text: '#673ab7' },
    'Eventos': { bg: 'rgba(0, 188, 212, 0.15)', text: '#00bcd4' }
  }
  return colors[category] || { bg: 'rgba(158, 158, 158, 0.15)', text: '#9e9e9e' }
}

const formatDate = (date?: string | Date): string => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function NewsArticleCard({
  title,
  description,
  category,
  image,
  author,
  date,
  views,
  readTime,
  featured = false,
  onShare,
  onBookmark,
  onClick
}: NewsArticleCardProps): ReactElement {
  const theme = useTheme()
  const mode = theme.palette.mode
  const categoryColor = getCategoryColor(category)

  if (featured) {
    return (
      <Box
        onClick={onClick}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          background: getGradient(mode, 'card'),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${getOverlay(mode, 'cardBorder')}`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 20px 40px ${getOverlay(mode, 'primaryStrong')}`,
            transform: 'translateY(-4px)',
            '& .featured-image': {
              transform: 'scale(1.15)'
            },
            '& .featured-title': {
              color: 'primary.main'
            }
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          {/* Image */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '45%' },
              height: { xs: 200, md: 220 },
              flexShrink: 0,
              overflow: 'hidden'
            }}
          >
            <Box
              className="featured-image"
              sx={{
                width: '100%',
                height: '100%',
                bgcolor: 'grey.300',
                backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.4s ease'
              }}
            />
          </Box>

          {/* Content */}
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0
            }}
          >
            <Chip
              label={category}
              size="small"
              sx={{
                alignSelf: 'flex-start',
                mb: 1.5,
                bgcolor: categoryColor.bg,
                color: categoryColor.text,
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 24,
                border: `1px solid ${categoryColor.text}30`
              }}
            />
            <Typography
              className="featured-title"
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.3,
                transition: 'color 0.3s ease',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                flex: 1
              }}
            >
              {description}
            </Typography>

            {/* Footer */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 1.5 }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
                    {readTime || '5 min'}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Visibility sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
                    {views ?? 0}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onBookmark?.() }}
                  sx={{
                    width: 28,
                    height: 28,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(103, 58, 183, 0.1)',
                      color: 'primary.main',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <BookmarkBorder sx={{ fontSize: 16 }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onShare?.() }}
                  sx={{
                    width: 28,
                    height: 28,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(103, 58, 183, 0.1)',
                      color: 'primary.main',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <Share sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  // Regular card
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        background: getGradient(mode, 'card'),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${getOverlay(mode, 'cardBorder')}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: `0 15px 30px ${getOverlay(mode, 'primaryMedium')}`,
          transform: 'translateY(-3px)',
          '& .card-image': {
            transform: 'scale(1.2)'
          },
          '& .card-title': {
            color: 'primary.main'
          }
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'stretch' }
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: 180 },
            height: { xs: 140, md: 'auto' },
            minHeight: { md: 120 },
            flexShrink: 0,
            overflow: 'hidden'
          }}
        >
          <Box
            className="card-image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'grey.300',
              backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.4s ease'
            }}
          />
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={0.75}>
            <Chip
              label={category}
              size="small"
              sx={{
                bgcolor: categoryColor.bg,
                color: categoryColor.text,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
                border: `1px solid ${categoryColor.text}30`
              }}
            />
            {date && (
              <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                {formatDate(date)}
              </Typography>
            )}
          </Box>

          <Typography
            className="card-title"
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 0.5,
              fontSize: '0.9rem',
              lineHeight: 1.3,
              transition: 'color 0.3s ease',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.78rem',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 0.75
            }}
          >
            {description}
          </Typography>

          {/* Footer */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 'auto' }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <AccessTime sx={{ fontSize: 12, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" fontSize="0.68rem">
                  {readTime || '5 min'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Visibility sx={{ fontSize: 12, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" fontSize="0.68rem">
                  {views ?? 0}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onBookmark?.() }}
                sx={{
                  width: 24,
                  height: 24,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(103, 58, 183, 0.1)',
                    color: 'primary.main',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <BookmarkBorder sx={{ fontSize: 14 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onShare?.() }}
                sx={{
                  width: 24,
                  height: 24,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(103, 58, 183, 0.1)',
                    color: 'primary.main',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Share sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
