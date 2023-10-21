import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import {
  chatRouter,
  groupRouter,
  messageRouter,
  newsRouter,
  postRouter,
  userRouter,
  classRouter,
  forumRouter,
  pictureRouter
} from './routes/index.js'
import { URLSearchParams } from 'url'
import { log } from 'console'


dotenv.config()

const app = express()

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})

let users = []
let messages = []

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', reason => {
    console.log(`
      Usuário desconectado! ${socket.id}
      Razão: ${reason}
    `);
  })


  socket.on('select_room', data => {
    socket.join(data.room)

    let user = {
      room: data.room,
      username: data.username,
      id: socket.id
    }

    const userInRoom = users.find(user => user.username === data.username && user.room === data.room)
    if (!userInRoom) users.push(user)
    console.log(users);
  })


  socket.on('message', data => {
    console.log(data);
    const message = {
      text: data
    }
    console.log(message);
    messages.push(message)
    io.to('leon').emit('message', message.text)
    
  })
})


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({ origin: 'https://5173-unetworktcc-unetworkweb-0cx5kotb7wu.ws-us105.gitpod.io' }))

app.use('/pictures', pictureRouter)
app.use('/user', userRouter)
app.use('/news', newsRouter)
app.use('/group', groupRouter)
app.use('/message', messageRouter)
app.use('/chat', chatRouter)
app.use('/post', postRouter)
app.use('/class', classRouter)
app.use('/forum', forumRouter)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 3001

const socketIoPort = 3001
server.listen(socketIoPort, () => console.log(`Socket servidor na porta ${socketIoPort}`))

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch(error => console.error(error.message))
