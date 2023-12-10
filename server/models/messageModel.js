import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        sendedBy: { type: Object, required: true },
        sendedAt: { type: String, required: true, default: new Date().getDate() },
        sendedIn: { type: String, required: true, default: 'chat' },
        type: { type: String, required: true, default: 'text' }, 
    },
    {
        timestamps: true
    }
)

const messageModel = mongoose.model('Messages', messageSchema, 'Messages')

export default messageModel