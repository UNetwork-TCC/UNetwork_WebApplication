import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
 
import { 
    chatRouter,
    groupRouter,
    messageRouter,
    newsRouter,
    postRouter,
    userRouter,
    classRouter,
    forumRouter,
    materialRouter,
    fileRouter
} from './routes/index.js'


dotenv.config()

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/files', fileRouter)
app.use('/user', userRouter)
app.use('/news', newsRouter)
app.use('/group', groupRouter)
app.use('/message', messageRouter)
app.use('/chat', chatRouter)
app.use('/post', postRouter)
app.use('/class', classRouter)
app.use('/forum', forumRouter)
app.use('/material', materialRouter)

app.use(express.static('uploads'))

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 3001

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(error => console.error(error.message))
