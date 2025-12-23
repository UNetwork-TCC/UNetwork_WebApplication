'use client'

import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ContactsArea } from '@/components'
import { type ReactElement, useEffect, useState } from 'react'
import { useFindUserChatsMutation } from '@/features/chat'
import { useAppSelector } from '@/store'
import { type IChat } from '@/types'
import { ContactsAreaSkeleton } from '@/layout/skeletons'
import { Chat, Add, Search } from '@mui/icons-material'
import { getGradient, getOverlay } from '@/themes'

export default function ChatPage(): ReactElement {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const userId = useAppSelector(state => state.auth.user._id)

  const [findUserChats, { data: chats, isLoading }] = useFindUserChatsMutation()
  const [openNewChatModal, setOpenNewChatModal] = useState(false)

  useEffect(() => {
    if (userId) {
      console.log('[ChatPage] Buscando chats para userId:', userId)
      findUserChats(userId).then((result: any) => {
        console.log('[ChatPage] findUserChats result:', JSON.stringify(result, null, 2))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const hasChats = chats && Array.isArray(chats) && chats.length > 0

  const handleOpenNewChat = (): void => {
    setOpenNewChatModal(true)
  }

  const handleCloseNewChatModal = (): void => {
    setOpenNewChatModal(false)
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
      {isLoading ? (
        <ContactsAreaSkeleton />
      ) : (
        <>
          <ContactsArea
            userId={userId ?? ''}
            chats={chats ?? ([] as IChat[])}
            openNewChatModal={openNewChatModal}
            onCloseNewChatModal={handleCloseNewChatModal}
            sx={
              matches
                ? {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                : {}
            }
          />
          {!matches && (
            <>
              <Divider
                orientation="vertical"
                role="presentation"
                flexItem
                sx={{ height: '100%' }}
              />
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  gap={{ xs: 2, sm: 3, md: 4 }}
                  sx={{
                    animation: 'anim 3s ease-in-out infinite alternate',
                    '@keyframes anim': {
                      '0%': {
                        transform: 'translateY(-5%)'
                      },
                      '100%': {
                        transform: 'translateY(0)'
                      }
                    },
                    px: { xs: 2, sm: 4 },
                    maxWidth: '500px',
                    textAlign: 'center'
                  }}
                >
                  {hasChats ? (
                    <>
                      <img
                        src="/assets/svg/Chat/chatbg.svg"
                        style={{
                          height: '70%',
                          width: '70%',
                          maxWidth: '300px',
                          objectFit: 'contain'
                        }}
                        alt="Chat background"
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                          fontWeight: 600,
                          color: 'text.primary'
                        }}
                      >
                        Selecione uma conversa
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        Escolha uma conversa da lista ao lado para continuar
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${getOverlay(theme.palette.mode, 'primarySoft')} 0%, ${getOverlay(theme.palette.mode, 'primaryMedium')} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2
                        }}
                      >
                        <Chat sx={{ fontSize: 60, color: 'primary.main', opacity: 0.7 }} />
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                          fontWeight: 700,
                          color: 'text.primary'
                        }}
                      >
                        Nenhuma conversa ainda
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          mb: 2,
                          lineHeight: 1.6
                        }}
                      >
                        Comece a conversar com seus amigos! Busque por usuarios ou inicie uma nova conversa.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          startIcon={<Add />}
                          onClick={handleOpenNewChat}
                          sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1.2,
                            background: getGradient(theme.palette.mode, 'primary'),
                            boxShadow: `0 4px 15px ${getOverlay(theme.palette.mode, 'primaryStrong')}`,
                            '&:hover': {
                              background: getGradient(theme.palette.mode, 'primaryHover'),
                              boxShadow: `0 6px 20px ${getOverlay(theme.palette.mode, 'primaryStrong')}`
                            }
                          }}
                        >
                          Iniciar Nova Conversa
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Search />}
                          onClick={handleOpenNewChat}
                          sx={{
                            borderRadius: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            py: 1.2,
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            borderWidth: 2,
                            '&:hover': {
                              borderWidth: 2,
                              bgcolor: getOverlay(theme.palette.mode, 'primarySoft')
                            }
                          }}
                        >
                          Buscar Usuarios
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  )
}
