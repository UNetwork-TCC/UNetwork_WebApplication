'use client'

import { CustomInput } from '@/layout'
import { Add, Search, Settings, Close, Chat as ChatIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  SxProps,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  InputAdornment,
  CircularProgress,
  Divider
} from '@mui/material'
import { useState, type ReactElement, useEffect, useCallback, useMemo } from 'react'
import { Contact } from '@/components'
import { type Chat, type contact, type User } from '@/types'
import { useFetchUsersMutation, useFetchUsersByIdsMutation } from '@/features/user'
import { useSearchUsersMutation } from '@/features/search'
import { ContactSkeleton } from '@/layout/skeletons'
import { useSocket, useMessageNotifications } from '@/contexts'
import { useCreateChatMutation, setChatId } from '@/features/chat'
import { useAppDispatch } from '@/store'
import { useNavigate } from '@/hooks'
import { getOverlay, getGradient } from '@/themes'

export default function ContactsArea({
  chats,
  userId,
  sx,
  openNewChatModal = false,
  onCloseNewChatModal
}: {
  chats: Chat[]
  userId: string
  sx?: SxProps
  openNewChatModal?: boolean
  onCloseNewChatModal?: () => void
}): ReactElement {
  const theme = useTheme()
  const mode = theme.palette.mode
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [fetchUsers, { isLoading: isLoadingAllUsers, data: allUsers }] = useFetchUsersMutation()
  const [fetchUsersByIds, { isLoading: isLoadingChatUsers, data: chatUsers }] = useFetchUsersByIdsMutation()
  const [searchUsers, { isLoading: isSearching, data: searchedUsers }] = useSearchUsersMutation()
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation()
  const { onlineUsers } = useSocket()

  // Usar chatUsers (do batch) como fonte principal de usuários
  const users = chatUsers || allUsers
  const isLoading = isLoadingChatUsers || isLoadingAllUsers

  // Estado para contagem de mensagens não lidas por chat
  const [unreadCounts, setUnreadCounts] = useState<Map<string, number>>(
    new Map()
  )

  const usersChat = Array.isArray(chats)
    ? chats
        .map(chat => chat.users)
        .map(arr => arr.filter(id => id !== userId))
        .join()
        .split(',')
    : []

  const matches = useMediaQuery(theme.breakpoints.up('xl'))

  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [contactSearchText, setContactSearchText] = useState('')

  // Sincronizar com prop externa
  useEffect(() => {
    if (openNewChatModal) {
      setOpen(true)
      setSearchText('')
    }
  }, [openNewChatModal])

  const handleOpen = (): void => {
    setOpen(true)
    setSearchText('')
  }
  const handleClose = (): void => {
    setOpen(false)
    setSearchText('')
    onCloseNewChatModal?.()
  }

  // Buscar usuários quando digitar no modal de nova conversa
  useEffect(() => {
    if (searchText.length >= 2) {
      searchUsers(searchText)
    }
  }, [searchText, searchUsers])

  // Filtrar usuários pela busca (excluindo o próprio usuário e usuários com chat existente)
  const filteredUsers = useMemo(() => {
    // Se tem texto de busca >= 2 chars, usar resultados da API de busca
    // Caso contrário, usar lista de usuários (se disponível)
    const sourceUsers = searchText.length >= 2 ? searchedUsers : users

    if (!sourceUsers || !Array.isArray(sourceUsers)) return []

    return sourceUsers.filter((user: User) => {
      // Excluir o próprio usuário
      if (user._id === userId) return false

      // Verificar se já existe chat com este usuário
      const hasExistingChat = usersChat.includes(user._id || '')
      if (hasExistingChat) return false

      return true
    }).slice(0, 10) // Limitar a 10 resultados
  }, [users, searchedUsers, userId, usersChat, searchText])

  // Criar chat com usuário selecionado
  const handleCreateChat = async (selectedUserId: string): Promise<void> => {
    try {
      console.log('[ContactsArea] Criando chat com:', { userId, selectedUserId })

      const result: any = await createChat({
        users: [userId, selectedUserId]
      })

      console.log('[ContactsArea] createChat result completo:', JSON.stringify(result, null, 2))

      // Verificar se houve erro na resposta
      if (result.error) {
        console.error('[ContactsArea] Erro da API:', result.error)
        alert('Erro ao criar conversa: ' + (result.error.data?.message || result.error.message || 'Erro desconhecido'))
        return
      }

      // O resultado pode estar em result.data (RTK Query) ou result.data._id
      // Depois do transformResponse (extractData), deve estar em result.data diretamente
      const chatId = result.data?._id || result.data?.data?._id || result._id

      console.log('[ContactsArea] Chat ID extraído:', chatId)

      if (chatId) {
        dispatch(setChatId(chatId))
        handleClose()
        // Navegar para o chat ao invés de recarregar
        navigate('/app/chat')
      } else {
        console.error('[ContactsArea] Chat criado mas ID não encontrado. Estrutura:', {
          'result': result,
          'result.data': result.data,
          'result.data?._id': result.data?._id,
          'result.data?.data': result.data?.data
        })
        // NÃO recarregar - deixar o usuário ver o console
        alert('Veja o console do navegador (F12) para detalhes do erro')
      }
    } catch (error) {
      console.error('[ContactsArea] Erro ao criar chat:', error)
      alert('Erro ao criar conversa: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
    }
  }

  // Handler para notificações de novas mensagens
  const handleMessageNotification = useCallback(
    (data: { chatId: string; message: any; senderId: string }) => {
      // Incrementar contador de mensagens não lidas para este chat
      setUnreadCounts(prev => {
        const newMap = new Map(prev)
        const currentCount = newMap.get(data.chatId) || 0
        newMap.set(data.chatId, currentCount + 1)
        return newMap
      })
    },
    []
  )

  // Ouvir notificações de novas mensagens
  useMessageNotifications(handleMessageNotification)

  // Verificar se um usuário está online
  const isUserOnline = (odId: string): boolean => {
    return onlineUsers.has(odId)
  }

  // Buscar usuários dos chats quando chats mudar
  useEffect(() => {
    if (chats && Array.isArray(chats) && chats.length > 0) {
      // Extrair todos os IDs de usuários únicos dos chats (exceto o próprio usuário)
      const userIds = [...new Set(
        chats
          .flatMap(chat => chat.users)
          .filter(id => id && id !== userId && id !== 'null')
      )]

      if (userIds.length > 0) {
        console.log('[ContactsArea] Buscando usuários dos chats:', userIds)
        fetchUsersByIds(userIds)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, userId])

  return (
    <>
      <Box
        display="flex"
        position="sticky"
        alignItems="start"
        maxHeight="99%"
        width={{ xs: '100%', md: '35%' }}
        pt={{ xs: 1.5, md: 2 }}
        sx={{
          boxSizing: 'border-box',
          [theme.breakpoints.only('md')]: { pt: 2.5 },
          ...sx
        }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ width: '100%', height: '12.5%' }}>
            <Stack gap={2} sx={{ position: 'sticky', top: '0' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  gap: 1,
                  pr: 2,
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    pl: 3,
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                      lg: '1.75rem',
                      xl: '1.75rem',
                      '2xl': '2.25rem'
                    }
                  }}
                >
                  Conversas
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handleOpen}>
                    <Add />
                  </IconButton>
                  <IconButton>
                    <Settings />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ px: 2 }}>
                <CustomInput
                  bgcolor={theme.palette.mode === 'light' ? 'white' : undefined}
                  color="#673AB7"
                  iconColor={'white'}
                  placeholder="Procurar conversa..."
                  icon={<Search />}
                  value={contactSearchText}
                  onChange={(e) => setContactSearchText(e.target.value)}
                />
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              width: '100%',
              height: '87%',
              overflow: 'scroll',
              '::-webkit-scrollbar': { display: 'none' },
              mt: !matches ? 2 : 0
            }}
          >
            <Stack
              gap={1}
              sx={{
                mt: '10%',
                width: '100%',
                height: '100%',
                [theme.breakpoints.only('md')]: { mt: '20%' }
              }}
            >
              {!isLoading
                ? (() => {
                    const usersToChat = usersChat.map(
                      id => users?.filter((user: any) => user._id === id)[0]
                    )

                    return Array.isArray(usersToChat)
                      ? usersToChat
                          .map((user, index) => ({ user, chat: chats[index] }))
                          .filter(({ user, chat }) => user && chat)
                          .filter(({ user }) => {
                            // Filtrar por texto de busca
                            if (!contactSearchText || contactSearchText.length < 2) return true
                            const searchLower = contactSearchText.toLowerCase()
                            return (
                              user?.username?.toLowerCase().includes(searchLower) ||
                              user?.name?.toLowerCase().includes(searchLower)
                            )
                          })
                          .map(({ user, chat }) => {
                            const unreadCount = unreadCounts.get(chat._id!) || 0
                            const online = isUserOnline(user?._id || '')

                            return (
                              <Box key={chat._id} sx={{ position: 'relative' }}>
                                {/* Indicador de online */}
                                {online && (
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      left: '4.2rem',
                                      top: '2.2rem',
                                      width: 12,
                                      height: 12,
                                      bgcolor: '#4caf50',
                                      borderRadius: '50%',
                                      border: '2px solid',
                                      borderColor: 'background.paper',
                                      zIndex: 1
                                    }}
                                  />
                                )}
                                <Contact
                                  chat={chat}
                                  user={{
                                    username: user?.username,
                                    otherInfo: { avatar: user?.otherInfo?.avatar }
                                  }}
                                  notification={
                                    unreadCount > 0 ? unreadCount : undefined
                                  }
                                />
                              </Box>
                            )
                          })
                      : null
                  })()
                : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(e => (
                    <ContactSkeleton key={e} />
                  ))}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disableAutoFocus
      >
        <Box
          sx={{
            width: { xs: '90vw', sm: '400px', md: '450px' },
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: getGradient(mode, 'primary'),
              px: 3,
              py: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChatIcon sx={{ color: 'white', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                  Nova Conversa
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                  Busque e selecione um usuário
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Search */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <TextField
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar por nome ou @usuário..."
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: isLoading ? (
                  <CircularProgress size={20} />
                ) : null
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: getOverlay(mode, 'primarySoft')
                }
              }}
            />
          </Box>

          {/* Users List */}
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              p: 1,
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'primary.main',
                borderRadius: 3
              }
            }}
          >
            {isLoading || isSearching ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user: User) => (
                <Box
                  key={user._id}
                  onClick={() => !isCreatingChat && handleCreateChat(user._id || '')}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    cursor: isCreatingChat ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: getOverlay(mode, 'primarySoft')
                    }
                  }}
                >
                  <Avatar
                    src={user.otherInfo?.avatar?.src}
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      fontSize: '1rem'
                    }}
                  >
                    {user.username?.[0]?.toUpperCase()}
                  </Avatar>
                  <Box flex={1}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {user.name || user.username}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                      @{user.username}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={isCreatingChat}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      minWidth: 80,
                      fontSize: '0.75rem'
                    }}
                  >
                    {isCreatingChat ? 'Criando...' : 'Conversar'}
                  </Button>
                </Box>
              ))
            ) : (
              <Box textAlign="center" py={4}>
                <Search sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                <Typography color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  {searchText.length >= 2
                    ? 'Nenhum usuário encontrado'
                    : 'Buscar usuários'}
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  {searchText.length >= 2
                    ? 'Tente buscar com outro termo'
                    : 'Digite o nome ou @usuário para encontrar alguém'}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3
              }}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
