import mongoose from 'mongoose'

const forumSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 100 },
    theme: { type: String, required: true },
    createdAt: { type: String, required: true, default: new Date().getDate() },
    messages: { type: Array, required: true, default: [""] },
    closedAt: { type: String, default: "Em aberto" },
    icon: { type: String, default: 'random_icon.png' }
})

const forumModel = mongoose.model('Forums', forumSchema, 'Forums')

export default forumModel