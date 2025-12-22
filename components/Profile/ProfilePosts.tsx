'use client'

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { type User } from '@/types'
import { type ReactElement } from 'react'
import UserAvatar from './UserAvatar'
import { useNavigate } from '@/hooks'
import { ImageNotSupported } from '@mui/icons-material'

export default function ProfilePosts({ user }: { user: User }): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (!user?.posts?.length) {
    return (
      <Box
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 3,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(103, 58, 183, 0.08)'
        }}
      >
        <ImageNotSupported sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
        <Typography variant="h6" color="text.secondary" fontWeight={600}>
          Nenhum post ainda
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Quando você publicar algo, aparecerá aqui
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)'
        },
        gap: { xs: 0.5, sm: 1 }
      }}
    >
      {user?.posts?.map(e => (
        <ProfilePost
          key={e?._id}
          user={user}
          image={e?.content?.picture}
          desc={e?.description}
          postId={e?._id ?? ''}
        />
      ))}
    </Box>
  )
}

function ProfilePost({
  image,
  user,
  postId,
  desc
}: {
  user: User
  postId: string
  image?: string
  desc?: string
}): ReactElement {
  const navigate = useNavigate()

  return (
    <Box
      onClick={() => navigate(`/app/post/${postId}`)}
      sx={{
        position: 'relative',
        paddingTop: '100%', // Aspect ratio 1:1
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: { xs: 1, sm: 2 },
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 25px rgba(103, 58, 183, 0.15)',
          '& .post-overlay': {
            opacity: 1
          },
          '& .post-image': {
            transform: 'scale(1.1)'
          }
        }
      }}
    >
      {image ? (
        <>
          <Box
            className="post-image"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.4s ease'
            }}
          />
          <Box
            className="post-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 500,
                px: 2,
                textAlign: 'center',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {desc && desc.length > 60 ? desc.slice(0, 60) + '...' : desc}
            </Typography>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <UserAvatar
            user={user}
            onClick={() => {}}
            sx={{
              width: 40,
              height: 40,
              mb: 1,
              border: '2px solid white'
            }}
          />
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              textAlign: 'center',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {desc && desc.length > 50 ? desc.slice(0, 50) + '...' : desc}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
