import { Chat } from '../models/index.js'

export const fetchChats = async (req, res) => {
    try {
        const fetched = await Chat.find().limit(20)
        if (!fetched) {
            return res.status(400).send({message: 'Os chats não foram encontrados!'})
        }
        res.status(200).json(fetched)
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
        return res.status(200).json(chat)
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

        const deletedChat = await Chat.findon(id)
        res.status(200).send({deletedChat, message: 'Chat deletado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateChat = async (req, res) => {
    try {
        const { id } = req.params
        const { messages, users } = req.body
        const chat = await Chat.findById(id)

        if (!chat) {
            return res.status(404).send({message: 'Chat não econtrado!'})
        }

        if (messages || users) {
            const chatUpdates = { messages: [...chat.messages, ...messages || ''], users: [...chat.users, ...users || ''],  }
            const chatUptaded = await Chat.findByIdAndUpdate(id, chatUpdates)
    
            res.status(200).send({chatUptaded, message: 'Chat atualizado com sucesso!'})
        } else {
            return res.status(400).send({message: 'Preenha os campos obrigatórios!'})
        }
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createChat = async (req, res) => {
    try {
        const { users } = req.body

        const chat = await Chat.findOne({ users: { $all: [...users] } })

        if (chat) return res.status(200).json(chat)

        if (!users) {
            return res.status(400).send({message: 'Preencha todos os campos!'})
        } 
        
        const newChat = await Chat({
            users
        })

        await newChat.save()
        res.status(201).send({newChat, message: 'Chat criado com sucesso!'})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
}

export const findUserChats = async (req, res) => {
    const { userId } = req.params

    try {
        const chats = await Chat.find({
            users: { $in: [userId] }
        })

        res.status(200).json(chats)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}