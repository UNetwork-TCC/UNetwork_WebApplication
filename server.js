// Carregar variáveis de ambiente ANTES de tudo
const { loadEnvConfig } = require('@next/env')
const projectDir = process.cwd()
loadEnvConfig(projectDir)

// Debug: verificar se as variáveis foram carregadas
console.log('[ENV] CONNECTION_URL:', process.env.CONNECTION_URL ? '✓ Definida' : '✗ NÃO DEFINIDA')
console.log('[ENV] JWT_SECRET:', process.env.JWT_SECRET ? '✓ Definida' : '✗ NÃO DEFINIDA')

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ dev, hostname, port, turbopack: dev })
const handle = app.getRequestHandler()

// Armazenar usuários online e suas salas de chat
const onlineUsers = new Map() // odId -> socketId
const userSockets = new Map() // socketId -> userId

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  })

  io.on('connection', socket => {
    console.log(`[Socket.io] Cliente conectado: ${socket.id}`)

    // Usuário entra online
    socket.on('user:online', userId => {
      if (userId) {
        onlineUsers.set(userId, socket.id)
        userSockets.set(socket.id, userId)
        console.log(`[Socket.io] Usuário online: ${userId}`)

        // Notificar todos que o usuário está online
        socket.broadcast.emit('user:status', { userId, status: 'online' })
      }
    })

    // Entrar em uma sala de chat
    socket.on('chat:join', chatId => {
      socket.join(`chat:${chatId}`)
      console.log(`[Socket.io] Socket ${socket.id} entrou no chat: ${chatId}`)
    })

    // Sair de uma sala de chat
    socket.on('chat:leave', chatId => {
      socket.leave(`chat:${chatId}`)
      console.log(`[Socket.io] Socket ${socket.id} saiu do chat: ${chatId}`)
    })

    // Enviar mensagem
    socket.on('message:send', data => {
      const { chatId, message } = data
      console.log(`[Socket.io] Mensagem no chat ${chatId}:`, message.content?.substring(0, 50))

      // Enviar para todos na sala (incluindo o remetente para confirmação)
      io.to(`chat:${chatId}`).emit('message:receive', {
        chatId,
        message
      })

      // Notificar usuários do chat que não estão na sala
      if (data.recipientIds) {
        data.recipientIds.forEach(recipientId => {
          const recipientSocketId = onlineUsers.get(recipientId)
          if (recipientSocketId) {
            io.to(recipientSocketId).emit('message:notification', {
              chatId,
              message,
              senderId: message.sendedBy
            })
          }
        })
      }
    })

    // Indicador de digitando
    socket.on('typing:start', data => {
      const { chatId, userId, username } = data
      socket.to(`chat:${chatId}`).emit('typing:update', {
        chatId,
        userId,
        username,
        isTyping: true
      })
    })

    socket.on('typing:stop', data => {
      const { chatId, userId } = data
      socket.to(`chat:${chatId}`).emit('typing:update', {
        chatId,
        userId,
        isTyping: false
      })
    })

    // Mensagem lida
    socket.on('message:read', data => {
      const { chatId, messageId, userId } = data
      socket.to(`chat:${chatId}`).emit('message:read:update', {
        chatId,
        messageId,
        readBy: userId
      })
    })

    // Desconexão
    socket.on('disconnect', reason => {
      const odId = userSockets.get(socket.id)
      if (odId) {
        onlineUsers.delete(odId)
        userSockets.delete(socket.id)
        console.log(`[Socket.io] Usuário offline: ${odId}`)

        // Notificar todos que o usuário está offline
        socket.broadcast.emit('user:status', { odId, status: 'offline' })
      }
      console.log(`[Socket.io] Cliente desconectado: ${socket.id}, razão: ${reason}`)
    })
  })

  httpServer
    .once('error', err => {
      console.error('[Server] Erro:', err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`
========================================
  UNetwork Server iniciado!

  URL: http://${hostname}:${port}
  Ambiente: ${dev ? 'desenvolvimento' : 'produção'}
  Socket.io: ativado
========================================
      `)
    })
})
