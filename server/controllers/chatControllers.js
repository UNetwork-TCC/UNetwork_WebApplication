import { Chat } from '../models/index.js'

export const fetchChats = async (req, res) => {
    try {
        const fetched = await Chat.find().limit(20)
        if (!fetched) {
            return res.status(400).send({message: "Os chats não foram encontrados!"})
        }
        res.status(200).send({fetched, message: "Chats encontrados com sucesso!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getChatById = async (req, res) => {
    try {
        const {id} = req.params
        const chat = await Chat.findById(id)

        if (!chat) {
            return res.status(404).send({message: 'Chat não econtrado!'})
        }
        return res.status(200).send({ chat, message: 'Chat encontrado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteChat = async (req, res) => {
    try {
        const {id} = req.params
        const chat = await Chat.findById(id)

        if (!chat) {
            return res.status(404).send({message: 'Chat não econtrado!'})
        }

        const deletedChat = await Chat.findOneAndDelete(id)
        res.status(200).send({deletedChat, message: 'Chat deletado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateChat = async (req, res) => {
    try {
        const {id} = req.params
        const { messages, users } = req.body
        const chat = await Chat.findById(id)

        if (!chat) {
            return res.status(404).send({message: 'Chat não econtrado!'})
        }

        if (!messages || !users) {
            return res.status(400).send({message: 'Todos os campos precisam ser preenchidos!'})
        }
        
        const chatUpdates = {messages: [...messages], users: [...users]}
        const chatUptaded = await Chat.findByIdAndUpdate(id, chatUpdates)

        res.status(200).send({chatUptaded, message: 'Chat atualizado com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createChat = async (req, res) => {
    try {
        const { users, messages } = req.body

        if (!users || !messages) {
            return res.status(400).send({message: 'Nem todos os campos foram preenchidos!'})
        } 
        
        const newChat = Chat({
            users,
            messages,
        })

        await newChat.save()
        res.status(201).send({newChat, message: 'Chat criado com sucesso!'})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
}