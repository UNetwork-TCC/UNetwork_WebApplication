'use client'

import { Box, Typography, useTheme, alpha } from '@mui/material'
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
      if (!message || !message.content) return

      // Filtrar mensagens válidas antes de verificar duplicatas
      const validMessages = messages.filter(m => m && m.content)

      // Verificar se a mensagem já existe (evitar duplicatas)
      const messageExists = validMessages.some(
        m =>
          m._id === message._id ||
          (m.content === message.content &&
            m.sendedBy === message.sendedBy &&
            m.sendedAt === message.sendedAt)
      )

      if (!messageExists) {
        dispatch(setMessages([...validMessages, message]))
      }
    },
    [messages, dispatch]
  )

  // Ouvir mensagens em tempo real
  useChatMessages(id, handleNewMessage)

  // Carregar mensagens iniciais quando o chat mudar
  useEffect(() => {
    if (!id) return

    // Limpar mensagens antigas antes de carregar novas
    dispatch(setMessages([]))

    const loadMessages = async () => {
      const result: any = await getChat(id)
      const chatData = result.data
      const msgs = chatData?.messages ?? []

      // Filtrar mensagens válidas (remover nulls e mensagens sem conteúdo)
      const validMsgs = msgs.filter((m: any) => m && m.content)
      dispatch(setMessages(validMsgs))
    }

    loadMessages()
  }, [id, getChat, dispatch])

  // Gerenciar entrada/saída da sala de chat
  useEffect(() => {
    if (!id) return

    // Entrar na sala do chat quando conectado
    if (isConnected) {
      joinChatRoom(id)
    }

    // Cleanup: sair da sala ao desmontar ou mudar de chat
    return () => {
      leaveChatRoom(id)
    }
  }, [id, isConnected, joinChatRoom, leaveChatRoom])

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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'action.hover',
          borderRadius: '3px',
          '&:hover': {
            bgcolor: 'action.selected'
          }
        }
      }}
    >
      {!isLoading ? (
        <>
          {Array.isArray(messages)
            ? messages
                .filter(message => message && message.content)
                .map((message, index) => (
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
                px: 2,
                py: 1,
                borderRadius: '20px 20px 20px 4px',
                bgcolor: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.common.white, 0.08)
                  : theme.palette.grey[100],
                width: 'fit-content',
                animation: 'fadeIn 0.3s ease-in-out',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  '& span': {
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'text.secondary',
                    animation: 'bounce 1.4s ease-in-out infinite'
                  },
                  '& span:nth-of-type(1)': { animationDelay: '0s' },
                  '& span:nth-of-type(2)': { animationDelay: '0.2s' },
                  '& span:nth-of-type(3)': { animationDelay: '0.4s' },
                  '@keyframes bounce': {
                    '0%, 60%, 100%': { transform: 'translateY(0)' },
                    '30%': { transform: 'translateY(-3px)' }
                  }
                }}
              >
                <span />
                <span />
                <span />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
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
