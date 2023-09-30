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


dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', socket => {
    console.log('Usuário conectado!', socket.id);
  
    socket.on('disconnect', reason => {
      console.log(`Usuário desconectado! ${socket.id}`);
    })
  
    socket.on('set_username', username => {
      socket.data.username = username
      console.log(socket.data.username);
  
      socket.on('message', text => {
        io.emit('recieveMessage', {
          text, 
          authorId: socket.id, 
          author: socket.data.username
        })
      })
    })
  })
    

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({origin: 'http://localhost:5173'}))

app.use('/pictures', pictureRouter)
app.use('/user', userRouter)
app.use('/news', newsRouter)
app.use('/group', groupRouter)
app.use('/message', messageRouter)
app.use('/chat', chatRouter)
app.use('/post', postRouter)
app.use('/class', classRouter)
app.use('/forum', forumRouter)

const clients = []

io.on('connection', (client) => {
    clients.push(client)
    console.log(`Cliente conectado com o id: ${client.id}`);

    client.on('disconnect', () =>{
        clients.splice(client.indexOf(client), 1)
        console.log(`Cliente desconectado com o id: ${client.id}`);
    })
}
)


const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 3001

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.error(error.message))
