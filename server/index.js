import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import { 
    chatRouter,
    // classRouter,
    groupRouter,
    messageRouter,
    newsRouter,
    postRouter,
    userRouter,
    classRouter
} from './routes/index.js'


dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/user', userRouter)
// app.use('/message', classRouter)
app.use('/news', newsRouter)
app.use('/group', groupRouter)
app.use('/message', messageRouter)
app.use('/chat', chatRouter)
app.use('/post', postRouter)
app.use('/class', classRouter)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 3001

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.error(error.message))
