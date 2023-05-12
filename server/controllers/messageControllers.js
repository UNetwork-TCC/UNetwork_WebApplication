import { Message } from '../models/index.js'

export const getById = async (req, res) => {
    try {
        const {id} = req.params
        const messages = await Message.find(id)
        res.status(200).send(messages)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const CreateMessage = (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}