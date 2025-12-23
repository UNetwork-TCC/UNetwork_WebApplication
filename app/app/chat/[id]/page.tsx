'use client'

import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import {
  ChatBar,
  ChatArea,
  ContactsArea,
  MessageWrapper,
  ChatHeader
} from '@/components'
import { type ReactElement, useState, useEffect, use } from 'react'
import {
  setChatId,
  setMessages,
  useFindUserChatsMutation,
  useGetChatMutation
} from '@/features/chat'
import { useAppDispatch, useAppSelector } from '@/store'
import { IUser, type IChat } from '@/types'
import { ContactsAreaSkeleton } from '@/layout/skeletons'
import { useGetUserMutation } from '@/features/user'
import { useRouter } from 'next/navigation'

export default function ChatPage({
  params
}: {
  params: Promise<{ id: string }>
}): ReactElement {
  const { id } = use(params)
  const theme = useTheme()
  const chatId = useAppSelector(state => state.chat.id)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [findUserChats, { data: chats, isLoading }] = useFindUserChatsMutation()
  const [getChat] = useGetChatMutation()
  const [getUser, { isLoading: isLoadingUser }] = useGetUserMutation()

  const [chatUser, setChatUser] = useState<IUser | null>(null)

  const userId = useAppSelector(state => state.auth.user._id)

  const handleBack = (): void => {
    dispatch(setMessages([]))
    dispatch(setChatId(''))
    router.push('/app/chat')
  }

  useEffect(() => {
    if (userId) {
      findUserChats(userId)
    }
  }, [findUserChats, userId])

  useEffect(() => {
    if (!id) return

    const loadChatUser = async () => {
      const { data }: any = await getChat(id)
      if (!data?.users) return

      const chatUserId = data.users.find((uid: string) => uid !== userId)
      if (chatUserId) {
        const { data: user }: any = await getUser(chatUserId)
        setChatUser(user)
      }
    }

    loadChatUser()
  }, [id, userId, getChat, getUser])

  useEffect(() => {
    if (chatId && chatId !== id) {
      router.push('/app/chat/' + chatId)
    }
  }, [chatId, id, router])

  // Componente do chat ativo
  const ActiveChat = () => (
    <ChatArea>
      <ChatHeader
        user={chatUser}
        isLoading={isLoadingUser}
        onBack={handleBack}
        showBackButton={isMobile}
      />
      <MessageWrapper id={id} />
      <ChatBar chatId={id} />
    </ChatArea>
  )

  // Estado vazio (sem chat selecionado)
  const EmptyChat = () => (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 3,
          p: 4,
          textAlign: 'center',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' }
          }
        }}
      >
        <img
          src="/assets/svg/Chat/chatbg.svg"
          alt="Selecione uma conversa"
          style={{ maxWidth: '200px', opacity: 0.8 }}
        />
        <Typography
          variant="h5"
          sx={{ color: 'text.secondary', fontWeight: 500 }}
        >
          Selecione uma conversa
        </Typography>
        <Typography variant="body2" color="text.disabled">
          Escolha um contato para começar a conversar
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Desktop: Mostra lista de contatos + chat */}
      {!isMobile && (
        <>
          {isLoading ? (
            <ContactsAreaSkeleton />
          ) : (
            <ContactsArea
              userId={userId ?? ''}
              chats={chats ?? ([] as IChat[])}
            />
          )}
          <Divider orientation="vertical" flexItem />
          {id ? <ActiveChat /> : <EmptyChat />}
        </>
      )}

      {/* Mobile: Mostra lista de contatos OU chat */}
      {isMobile && (
        <>
          {!id ? (
            isLoading ? (
              <ContactsAreaSkeleton />
            ) : (
              <ContactsArea
                userId={userId ?? ''}
                chats={chats ?? ([] as IChat[])}
                sx={{ width: '100%', height: '100%' }}
              />
            )
          ) : (
            <ActiveChat />
          )}
        </>
      )}
    </Box>
  )
}
