'use client'

import { IconButton, InputBase, Box, useTheme, alpha, ClickAwayListener } from '@mui/material'
import { Send, ImageOutlined, EmojiEmotions } from '@mui/icons-material'
import EmojiPicker from 'emoji-picker-react'
import {
  type ReactElement,
  useState,
  type FormEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useCallback
} from 'react'
import { useCreateMessageMutation } from '@/features/message'
import { useAppDispatch, useAppSelector } from '@/store'
import { setMessages, useAddMessageToChatMutation } from '@/features/chat'
import { useSocket } from '@/contexts'

export default function ChatBar({ chatId }: { chatId: string }): ReactElement {
  const theme = useTheme()

  const dispatch = useAppDispatch()

  const [text, setText] = useState('')
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)

  const [createMessage] = useCreateMessageMutation()
  const [addMessageToChat] = useAddMessageToChatMutation()

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const user = useAppSelector(state => state.auth.user)
  const messages = useAppSelector(state => state.chat.messages)

  const { sendMessage: sendSocketMessage, setTyping, isConnected } = useSocket()

  const onEmojiClick = (emojiObject: any): void => {
    setText(prevInput => prevInput + emojiObject.emoji)
  }

  // Controlar indicador de digitando com debounce
  const handleTyping = useCallback(() => {
    if (!isConnected) return

    // Se não estava digitando, emitir que começou
    if (!isTypingRef.current) {
      isTypingRef.current = true
      setTyping(chatId, true)
    }

    // Limpar timeout anterior
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Definir novo timeout para parar de "digitar" após 2 segundos de inatividade
    typingTimeoutRef.current = setTimeout(() => {
      isTypingRef.current = false
      setTyping(chatId, false)
    }, 2000)
  }, [chatId, setTyping, isConnected])

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      // Garantir que pare de digitar ao sair
      if (isTypingRef.current) {
        setTyping(chatId, false)
      }
    }
  }, [chatId, setTyping])

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> & MouseEvent<HTMLButtonElement>
  ): void => {
    ;(async () => {
      e.preventDefault()

      if (!text.trim()) return

      // Parar indicador de digitando imediatamente ao enviar
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      if (isTypingRef.current) {
        isTypingRef.current = false
        setTyping(chatId, false)
      }

      const now = new Date()
      const messageTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

      const newMessage = {
        content: text.trim(),
        sendedBy: user._id,
        sendedIn: chatId,
        sendedAt: messageTime,
        type: 'text' as const
      }

      // Atualizar UI localmente primeiro (otimistic update)
      dispatch(setMessages([...messages, newMessage]))

      // Limpar input
      setText('')

      // Enviar via Socket.io para tempo real
      if (isConnected) {
        sendSocketMessage(chatId, newMessage)
      }

      // Persistir no banco de dados
      const result: any = await createMessage(newMessage)

      // result.data é a mensagem criada (já extraída pelo transformResponse)
      if (result.data) {
        // Usar o novo endpoint que faz $push ao invés de sobrescrever
        await addMessageToChat({
          chatId,
          message: result.data
        })
      }
    })()
  }

  return (
    <Box
      sx={{
        flexShrink: 0,
        p: { xs: 1.5, sm: 2 },
        bgcolor: 'background.default'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.05)
            : theme.palette.grey[100],
          borderRadius: '28px',
          px: { xs: 1.5, sm: 2 },
          py: 0.5,
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.1)
            : theme.palette.grey[200],
          transition: 'border-color 0.2s',
          '&:focus-within': {
            borderColor: 'primary.main'
          }
        }}
      >
        <IconButton
          component="label"
          htmlFor="file"
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          <ImageOutlined sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
        </IconButton>

        <InputBase
          sx={{
            flex: 1,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '& input': {
              py: 1
            }
          }}
          placeholder="Digite sua mensagem..."
          value={text}
          onChange={e => {
            setText(e.target.value)
            handleTyping()
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(e as any)
            }
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, position: 'relative' }}>
          <IconButton
            type="button"
            aria-label="Emoji"
            onClick={() => setShowEmojiPicker(val => !val)}
            size="small"
            sx={{
              color: showEmojiPicker ? 'primary.main' : 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <EmojiEmotions sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
          </IconButton>

          <IconButton
            onClick={handleSubmit}
            disabled={!text.trim()}
            sx={{
              bgcolor: text.trim() ? 'primary.main' : 'action.disabledBackground',
              color: text.trim() ? 'white' : 'action.disabled',
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: text.trim() ? 'primary.dark' : 'action.disabledBackground'
              }
            }}
          >
            <Send sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} />
          </IconButton>
        </Box>
      </Box>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <ClickAwayListener onClickAway={() => setShowEmojiPicker(false)}>
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 70, sm: 80 },
              right: { xs: 16, sm: 24 },
              zIndex: 1000,
              boxShadow: theme.shadows[8],
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              autoFocusSearch={false}
              width={320}
              height={400}
            />
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  )
}
