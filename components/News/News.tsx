import { useTheme } from '@mui/material'
import { Box, Link, Paper, Typography } from '@mui/material'
import { type ReactElement } from 'react'

export default function News({
  title,
  description,
  topic,
  date,
  img
}: {
  title: string
  description: string
  topic?: string
  date?: Date | string
  img?: string
}): ReactElement {
  const theme = useTheme()

  return (
    <Link
      sx={{
        color: 'text.primary',
        textDecoration: 'none',
        ':hover': { cursor: 'pointer' }
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'box-shadow 0.2s ease-in-out',
          ':hover': {
            boxShadow: theme.shadows[8]
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            height: { xs: 'auto', sm: '180px', md: '200px' }
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '100%', sm: '200px', md: '240px', lg: '280px' },
              height: { xs: '180px', sm: '100%' },
              bgcolor: 'grey.400',
              backgroundImage: img ? `url(${img})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 2.5, lg: 3 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              minWidth: 0
            }}
          >
            <Box sx={{ overflow: 'hidden' }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  mb: 0.5,
                  display: 'block',
                  fontWeight: 500
                }}
              >
                {topic}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem', lg: '1.25rem' },
                  lineHeight: 1.3,
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
                  wordWrap: 'break-word',
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 3, sm: 2, md: 3 },
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {description}
              </Typography>
            </Box>
            <Box sx={{ flexShrink: 0, mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {date?.toString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Link>
  )
}
