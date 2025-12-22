'use client'

import { ProfileHeader, ProfilePosts } from '@/components'
import { useGetUserMutation } from '@/features/user'
import { ProfileHeaderSkeleton, ProfilePostsSkeleton } from '@/layout/skeletons'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, type ReactElement, useState } from 'react'
import { type User } from '@/types'
import { GridView, Bookmark, FavoriteBorder } from '@mui/icons-material'

export default function ProfilePage({ id }: { id: string }): ReactElement {
  const [getUser, { isLoading }] = useGetUserMutation()
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    ;(async () => {
      const response: any = await getUser(id ?? '')
      setUser(response.data)
    })()
  }, [getUser, id])

  const obj = {}

  const tabs = [
    { label: 'Posts', icon: <GridView sx={{ fontSize: 20 }} /> },
    { label: 'Salvos', icon: <Bookmark sx={{ fontSize: 20 }} /> },
    { label: 'Curtidos', icon: <FavoriteBorder sx={{ fontSize: 20 }} /> }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 }
        }}
      >
        {isLoading ? (
          <Box display="flex" flexDirection="column" gap={3}>
            <ProfileHeaderSkeleton />
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(103, 58, 183, 0.08)'
              }}
            >
              <Box display="flex" gap={3} justifyContent="center">
                {tabs.map((tab, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      bgcolor: index === 0 ? 'primary.main' : 'transparent'
                    }}
                  >
                    <Box sx={{ width: 60, height: 16, bgcolor: 'grey.300', borderRadius: 1 }} />
                  </Box>
                ))}
              </Box>
            </Box>
            <ProfilePostsSkeleton />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            <ProfileHeader user={user ?? (obj as User)} />

            {/* Tabs Section */}
            <Box
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(103, 58, 183, 0.08)',
                overflow: 'hidden'
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                variant="fullWidth"
                sx={{
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)'
                  },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: 'text.secondary',
                    py: 2,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      color: 'primary.main'
                    },
                    '&:hover': {
                      bgcolor: 'rgba(103, 58, 183, 0.04)'
                    }
                  }
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    icon={tab.icon}
                    iconPosition="start"
                    label={tab.label}
                  />
                ))}
              </Tabs>
            </Box>

            {/* Content based on active tab */}
            {activeTab === 0 && <ProfilePosts user={user ?? (obj as User)} />}
            {activeTab === 1 && (
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
                <Bookmark sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                  Nenhum item salvo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Posts que você salvar aparecerão aqui
                </Typography>
              </Box>
            )}
            {activeTab === 2 && (
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
                <FavoriteBorder sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                  Nenhum item curtido
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Posts que você curtir aparecerão aqui
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  )
}
