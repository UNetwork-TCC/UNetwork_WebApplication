import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    users: { type: Array, required: true },
    messages: { type: Array, required: true },
    icon: { type: String, default: "random_icon.png" }
})
const chatModel = mongoose.model('Chats', chatSchema, 'Chats')

export default chatModel