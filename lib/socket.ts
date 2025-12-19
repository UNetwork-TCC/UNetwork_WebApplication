import { io, Socket } from 'socket.io-client'

// Tipos para eventos do Socket
export interface ServerToClientEvents {
  'message:receive': (data: {
    chatId: string
    message: ChatMessage
  }) => void
  'message:notification': (data: {
    chatId: string
    message: ChatMessage
    senderId: string
  }) => void
  'message:read:update': (data: {
    chatId: string
    messageId: string
    readBy: string
  }) => void
  'typing:update': (data: {
    chatId: string
    userId: string
    username?: string
    isTyping: boolean
  }) => void
  'user:status': (data: { userId: string; status: 'online' | 'offline' }) => void
}

export interface ClientToServerEvents {
  'user:online': (userId: string) => void
  'chat:join': (chatId: string) => void
  'chat:leave': (chatId: string) => void
  'message:send': (data: {
    chatId: string
    message: ChatMessage
    recipientIds?: string[]
  }) => void
  'typing:start': (data: {
    chatId: string
    userId: string
    username: string
  }) => void
  'typing:stop': (data: { chatId: string; userId: string }) => void
  'message:read': (data: {
    chatId: string
    messageId: string
    userId: string
  }) => void
}

export interface ChatMessage {
  _id?: string
  content: string
  sendedBy: string
  sendedAt: string
  sendedIn: string
  type: 'text' | 'audio' | 'video' | 'sticker'
}

// Singleton do socket
let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null

export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> | null => {
  if (typeof window === 'undefined') return null

  if (!socket) {
    const url =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== 'undefined' ? window.location.origin : '')

    socket = io(url, {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    socket.on('connect', () => {
      console.log('[Socket.io] Conectado ao servidor')
    })

    socket.on('disconnect', reason => {
      console.log('[Socket.io] Desconectado:', reason)
    })

    socket.on('connect_error', error => {
      console.error('[Socket.io] Erro de conexão:', error.message)
    })
  }

  return socket
}

export const connectSocket = (userId: string): void => {
  const sock = getSocket()
  if (sock && !sock.connected) {
    sock.connect()
    sock.emit('user:online', userId)
  } else if (sock?.connected) {
    sock.emit('user:online', userId)
  }
}

export const disconnectSocket = (): void => {
  if (socket?.connected) {
    socket.disconnect()
  }
}

export const joinChat = (chatId: string): void => {
  const sock = getSocket()
  if (sock?.connected) {
    sock.emit('chat:join', chatId)
  }
}

export const leaveChat = (chatId: string): void => {
  const sock = getSocket()
  if (sock?.connected) {
    sock.emit('chat:leave', chatId)
  }
}

export const sendMessage = (
  chatId: string,
  message: ChatMessage,
  recipientIds?: string[]
): void => {
  const sock = getSocket()
  if (sock?.connected) {
    sock.emit('message:send', { chatId, message, recipientIds })
  }
}

export const startTyping = (
  chatId: string,
  userId: string,
  username: string
): void => {
  const sock = getSocket()
  if (sock?.connected) {
    sock.emit('typing:start', { chatId, userId, username })
  }
}

export const stopTyping = (chatId: string, userId: string): void => {
  const sock = getSocket()
  if (sock?.connected) {
    sock.emit('typing:stop', { chatId, userId })
  }
}

export const markMessageRead = (
  chatId: string,
  messageId: string,
  userId: string
): void => {
  const sock = getSocket()
  if (sock?.connected) {
    sock.emit('message:read', { chatId, messageId, userId })
  }
}
