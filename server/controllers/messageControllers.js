import { Message } from '../models/index.js'

export const fetchMessages = async (req, res) => {
    try {
        const fetched = await Message.find().limit(40)
        if (!fetched) {
            return res.status(400).send({message: 'As mensagens não foram encontradas!'})
        }
        res.status(200).json(fetched)
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

        res.status(200).json(messages)
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
        const { id } = req.params
        if (!id) {return res.status(400).send({message: 'Por favor, insira um id válido'})}
        const deletedMessage = await Message.findByIdAndDelete(id)
        res.status(200).send({deletedMessage, message: 'mensagem deletada com sucesso!'})

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateMessage = async (req, res) => {
    try {
        const {id} = req.params
        const oldMessage = Message.findById(id)

        if (!oldMessage) {
            res.status(400).send({message: 'Mensagem não encontrada!'})
        }

        const { content } = req.body

        if (!content) {
            res.status(400).send({message: 'Preencha todos os campos!'})
        }

        const updatedMessage = await Message.findByIdAndUpdate(id, content) 
        res.status(200).send({ updatedMessage, message: 'Mensagem atualizada com sucesso!' })
        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getMessagesInChat = async (req, res) => {
    try {
        const { chatId } = req.params

        const messages = await Message.find({ sendedIn: chatId })

        res.status(200).json(messages)
    } catch (error) {
        res.status(404).json(error)
    }
}