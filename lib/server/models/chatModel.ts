import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    users: { type: Array, required: true },
    messages: { type: Array, required: true, default: [] },
})

const chatModel = mongoose.models['Chats'] || mongoose.model('Chats', chatSchema, 'Chats')

export default chatModel