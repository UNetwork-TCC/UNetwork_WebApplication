import { Message } from '../models/index.js'

export const getById = async (req, res) => {
    try {
        const {id} = req.params
        const messages = await Message.find(id)

        if (!messages) {
            return res.status(400).send({message: "Mensagem não encontrada!"})
        }

        res.status(200).send(messages)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createMessage = async (req, res) => {
    try {
        const {content} = req.body
          
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