'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode
} from 'react'
import { Socket } from 'socket.io-client'
import {
  getSocket,
  connectSocket,
  disconnectSocket,
  joinChat,
  leaveChat,
  sendMessage as emitMessage,
  startTyping,
  stopTyping,
  markMessageRead,
  type ChatMessage,
  type ServerToClientEvents,
  type ClientToServerEvents
} from '@/lib/socket'
import { useAppSelector } from '@/store'

interface TypingUser {
  odId: string
  username: string
}

interface SocketContextValue {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  isConnected: boolean
  onlineUsers: Set<string>
  typingUsers: Map<string, TypingUser[]> // chatId -> users typing

  // Ações
  joinChatRoom: (chatId: string) => void
  leaveChatRoom: (chatId: string) => void
  sendMessage: (
    chatId: string,
    message: ChatMessage,
    recipientIds?: string[]
  ) => void
  setTyping: (chatId: string, isTyping: boolean) => void
  markAsRead: (chatId: string, messageId: string) => void
}

const SocketContext = createContext<SocketContextValue | null>(null)

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set())
  const [typingUsers, setTypingUsers] = useState<Map<string, TypingUser[]>>(
    new Map()
  )

  const user = useAppSelector(state => state.auth.user)
  const userId = user?._id
  const username = user?.username

  // Conectar quando o usuário estiver logado
  useEffect(() => {
    if (!userId) return

    const sock = getSocket()
    if (!sock) return

    setSocket(sock)

    // Event listeners
    const onConnect = () => {
      setIsConnected(true)
      connectSocket(userId)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    const onUserStatus = (data: { userId: string; status: 'online' | 'offline' }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev)
        if (data.status === 'online') {
          newSet.add(data.userId)
        } else {
          newSet.delete(data.userId)
        }
        return newSet
      })
    }

    const onTypingUpdate = (data: {
      chatId: string
      odId: string
      username?: string
      isTyping: boolean
    }) => {
      setTypingUsers(prev => {
        const newMap = new Map(prev)
        const currentTyping = newMap.get(data.chatId) || []

        if (data.isTyping) {
          // Adicionar usuário se não estiver na lista
          if (!currentTyping.some(u => u.odId === data.odId)) {
            newMap.set(data.chatId, [
              ...currentTyping,
              { odId: data.odId, username: data.username || 'Usuário' }
            ])
          }
        } else {
          // Remover usuário da lista
          newMap.set(
            data.chatId,
            currentTyping.filter(u => u.odId !== data.odId)
          )
        }

        return newMap
      })
    }

    sock.on('connect', onConnect)
    sock.on('disconnect', onDisconnect)
    sock.on('user:status', onUserStatus)
    sock.on('typing:update', onTypingUpdate)

    // Conectar
    if (!sock.connected) {
      sock.connect()
    } else {
      setIsConnected(true)
      connectSocket(userId)
    }

    return () => {
      sock.off('connect', onConnect)
      sock.off('disconnect', onDisconnect)
      sock.off('user:status', onUserStatus)
      sock.off('typing:update', onTypingUpdate)
    }
  }, [userId])

  // Desconectar ao deslogar
  useEffect(() => {
    return () => {
      disconnectSocket()
    }
  }, [])

  const joinChatRoom = useCallback((chatId: string) => {
    joinChat(chatId)
  }, [])

  const leaveChatRoom = useCallback((chatId: string) => {
    leaveChat(chatId)
  }, [])

  const sendMessageHandler = useCallback(
    (chatId: string, message: ChatMessage, recipientIds?: string[]) => {
      emitMessage(chatId, message, recipientIds)
    },
    []
  )

  const setTyping = useCallback(
    (chatId: string, isTyping: boolean) => {
      if (!userId || !username) return

      if (isTyping) {
        startTyping(chatId, userId, username)
      } else {
        stopTyping(chatId, userId)
      }
    },
    [userId, username]
  )

  const markAsRead = useCallback(
    (chatId: string, messageId: string) => {
      if (!userId) return
      markMessageRead(chatId, messageId, userId)
    },
    [userId]
  )

  const value: SocketContextValue = {
    socket,
    isConnected,
    onlineUsers,
    typingUsers,
    joinChatRoom,
    leaveChatRoom,
    sendMessage: sendMessageHandler,
    setTyping,
    markAsRead
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket deve ser usado dentro de um SocketProvider')
  }
  return context
}

// Hook para ouvir mensagens em um chat específico
export function useChatMessages(
  chatId: string,
  onNewMessage: (message: ChatMessage) => void
) {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket || !chatId) return

    const handleMessage = (data: { chatId: string; message: ChatMessage }) => {
      if (data.chatId === chatId) {
        onNewMessage(data.message)
      }
    }

    socket.on('message:receive', handleMessage)

    return () => {
      socket.off('message:receive', handleMessage)
    }
  }, [socket, chatId, onNewMessage])
}

// Hook para notificações de mensagens
export function useMessageNotifications(
  onNotification: (data: {
    chatId: string
    message: ChatMessage
    senderId: string
  }) => void
) {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    socket.on('message:notification', onNotification)

    return () => {
      socket.off('message:notification', onNotification)
    }
  }, [socket, onNotification])
}
