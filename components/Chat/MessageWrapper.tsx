'use client'

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { type ReactElement, useEffect, useRef, useCallback } from 'react'
import Message from './Message'
import { setMessages, useGetChatMutation } from '@/features/chat'
import { useAppDispatch, useAppSelector } from '@/store'
import { MessageSkeleton } from '@/layout/skeletons'
import { useSocket, useChatMessages } from '@/contexts'
import type { IMessage } from '@/types'

export default function MessageWrapper({ id }: { id: string }): ReactElement {
  const theme = useTheme()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [getChat, { isLoading }] = useGetChatMutation()

  const dispatch = useAppDispatch()

  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const userId = useAppSelector(state => state.auth.user._id)
  const messages = useAppSelector(state => state.chat.messages)

  const { joinChatRoom, leaveChatRoom, typingUsers, isConnected } = useSocket()

  // Scroll para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Handler para novas mensagens via Socket
  const handleNewMessage = useCallback(
    (message: IMessage) => {
      // Verificar se a mensagem já existe (evitar duplicatas)
      const messageExists = messages.some(
        m =>
          m._id === message._id ||
          (m.content === message.content &&
            m.sendedBy === message.sendedBy &&
            m.sendedAt === message.sendedAt)
      )

      if (!messageExists) {
        dispatch(setMessages([...messages, message]))
      }
    },
    [messages, dispatch]
  )

  // Ouvir mensagens em tempo real
  useChatMessages(id, handleNewMessage)

  // Carregar mensagens iniciais e entrar na sala
  useEffect(() => {
    ;(async () => {
      const { data }: any = await getChat(id)
      dispatch(setMessages(data?.messages ?? []))
    })()

    // Entrar na sala do chat
    if (isConnected) {
      joinChatRoom(id)
    }

    // Cleanup: sair da sala ao desmontar
    return () => {
      leaveChatRoom(id)
    }
  }, [getChat, id, isConnected, joinChatRoom, leaveChatRoom, dispatch])

  // Re-entrar na sala quando reconectar
  useEffect(() => {
    if (isConnected && id) {
      joinChatRoom(id)
    }
  }, [isConnected, id, joinChatRoom])

  // Scroll quando novas mensagens chegam
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Obter usuários digitando neste chat
  const currentTypingUsers = typingUsers.get(id) || []
  const isTyping = currentTypingUsers.length > 0

  return (
    <Box
      sx={{
        p: 4,
        gap: 1,
        width: '100%',
        height: '85%',
        position: 'sticky',
        display: 'flex',
        overflow: 'scroll',
        overflowX: 'hidden',
        alignItems: 'start',
        flexDirection: 'column',

        [theme.breakpoints.down('lg')]: {
          height: '80%'
        },

        [theme.breakpoints.down('md')]: {
          height: '80%'
        }
      }}
    >
      {!isLoading ? (
        <>
          {Array.isArray(messages)
            ? messages.map((message, index) => (
                <Message
                  key={message._id || `msg-${index}`}
                  messageInfo={message}
                  text={message.content}
                  sendedAt={message.sendedAt}
                  messageFrom={message.sendedBy !== userId ? 'him' : 'me'}
                />
              ))
            : null}

          {/* Indicador de digitando */}
          {isTyping && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                borderRadius: 2,
                bgcolor: 'action.hover',
                animation: 'fadeIn 0.3s ease-in-out'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  '& span': {
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'text.secondary',
                    animation: 'bounce 1.4s ease-in-out infinite'
                  },
                  '& span:nth-of-type(1)': { animationDelay: '0s' },
                  '& span:nth-of-type(2)': { animationDelay: '0.2s' },
                  '& span:nth-of-type(3)': { animationDelay: '0.4s' },
                  '@keyframes bounce': {
                    '0%, 60%, 100%': { transform: 'translateY(0)' },
                    '30%': { transform: 'translateY(-4px)' }
                  },
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                  }
                }}
              >
                <span />
                <span />
                <span />
              </Box>
              <Typography variant="caption" color="text.secondary">
                {currentTypingUsers.length === 1
                  ? `${currentTypingUsers[0].username} está digitando...`
                  : 'Digitando...'}
              </Typography>
            </Box>
          )}

          {/* Ref para scroll automático */}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <>
          <MessageSkeleton messageFrom="me" />
          <MessageSkeleton messageFrom="him" />
          <MessageSkeleton messageFrom="me" />
          <MessageSkeleton messageFrom="him" />
          <MessageSkeleton messageFrom="me" />
          <MessageSkeleton messageFrom="him" />
          <MessageSkeleton messageFrom="me" />
        </>
      )}
    </Box>
  )
}
