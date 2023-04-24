import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sendedBy: { type: Object, required: true },
    sendedAt: { type: String, required: true },
    sendedIn: { type: String, required: true }
})
const messageModel = mongoose.model('Messages', messageSchema, 'Messages')

export default messageModel