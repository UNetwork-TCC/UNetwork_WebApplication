'use client'

import { IconButton, InputBase, Box, useTheme } from '@mui/material'
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
import { setMessages, useUpdateChatMutation } from '@/features/chat'
import { useSocket } from '@/contexts'

export default function ChatBar({ chatId }: { chatId: string }): ReactElement {
  const theme = useTheme()

  const dispatch = useAppDispatch()

  const [text, setText] = useState('')
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)

  const [createMessage] = useCreateMessageMutation()
  const [updateChat] = useUpdateChatMutation()

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

      const messageTime = new Date().getHours() + ':' + new Date().getMinutes()

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
      const { data }: any = await createMessage(newMessage)

      await updateChat({
        _id: chatId,
        messages: [data.newMessage]
      })
    })()
  }

  return (
    <Box
      m={2}
      height="3.5rem"
      width="97%"
      sx={{
        [theme.breakpoints.only('lg')]: {
          height: '3rem'
        },
        [theme.breakpoints.only('md')]: {
          height: '2.5rem',
          width: '94%'
        }
      }}
    >
      <Box
        boxShadow={theme.shadows[3]}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.card',
          borderRadius: 3.5,
          p: 0.5,
          height: '100%',

          [theme.breakpoints.only('lg')]: {
            borderRadius: 2.5,
            p: 0
          },

          [theme.breakpoints.only('md')]: {
            borderRadius: 2.5
          },

          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <InputBase
          sx={{
            flex: 1,
            fontSize: '1rem',
            ml: 2,
            [theme.breakpoints.only('lg')]: {
              ml: 1.7,
              fontSize: '1.2rem'
            },
            [theme.breakpoints.only('md')]: {
              ml: 1.5,
              fontSize: '1rem'
            }
          }}
          placeholder={'Digite sua mensagem...'}
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
        <Box mr={2}>
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <IconButton component="label" htmlFor="file">
            <ImageOutlined
              sx={{
                [theme.breakpoints.only('lg')]: {
                  mr: 0.5
                },
                [theme.breakpoints.only('md')]: {
                  fontSize: '1.3rem',
                  mr: 0
                }
              }}
            />
          </IconButton>

          <IconButton
            sx={{ mr: 1 }}
            type="button"
            aria-label="Emoji"
            onClick={() => {
              setShowEmojiPicker(val => !val)
            }}
            size="large"
          >
            <EmojiEmotions
              sx={{
                [theme.breakpoints.only('lg')]: {
                  mr: 0
                },
                [theme.breakpoints.only('md')]: {
                  fontSize: '1.3rem',
                  mr: 0
                }
              }}
            />
          </IconButton>
          <IconButton
            onClick={handleSubmit}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              ':hover': { bgcolor: 'primary.main', opacity: '80%' }
            }}
            size="small"
          >
            <Send
              sx={{
                [theme.breakpoints.only('lg')]: {
                  fontSize: '1.3rem',
                  m: '0.1rem'
                },
                [theme.breakpoints.only('md')]: {
                  fontSize: '1rem',
                  m: '0.1rem'
                }
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '11%',
          [theme.breakpoints.only('lg')]: {
            bottom: '20%'
          }
        }}
      >
        {showEmojiPicker && (
          <Box>
            <Box
              onClick={() => {
                setShowEmojiPicker(false)
              }}
              sx={{
                ml: '15.5%',
                width: '69%',
                mt: '7%',
                height: '75%',
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: 2
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 3 }}>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}
