import { Message } from '../models/index.js'

export const getMessages = async (req, res) => {
    try {
        const {id} = req.params
        const messages = await Message.find(id)
        res.status(200).send(messages)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}
