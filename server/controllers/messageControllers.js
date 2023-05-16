import { Message } from '../models/index.js'

export const fetchMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        res.status(200).send({ messages })
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

export const getById = async (req, res) => {
    try {
        const {id} = req.params
        const messages = await Message.find(id)

        if (!messages) {
            return res.status(400).send({message: 'Mensagem não encontrada!'})
        }

        res.status(200).send(messages)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createMessage = async (req, res) => {
    try {
        const { content, sendedBy, sendedAt, sendedIn, type } = req.body
        
        if (!content) {
            return res.status(400).send({ message: 'A mensagem não pode ser vazia!' })
        }

        const newMessage = Message({
            content,
            sendedAt,
            sendedBy,
            sendedIn,
            type
        })

        await newMessage.save()

        res.status(200).send({ newMessage, message: 'Mensagem criada com sucesso!' })
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}


export const deleteMessage = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}