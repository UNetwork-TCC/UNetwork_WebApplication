import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    sendedBy: { type: Object, required: true },
    sendedAt: { type: String, required: true, default: new Date().getDate() },
    sendedIn: { type: String, required: true },
    type: { type: String, required: true, default: "text" }, 
    icon: { type: String, default: "random_icon.png" }
})

const messageModel = mongoose.model('Messages', messageSchema, 'Messages')

export default messageModel