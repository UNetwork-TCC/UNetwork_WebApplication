import mongoose from 'mongoose'

const forumSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 100 },
    topic: { type: String, required: true },
    image: { type: String },
    createdAt: { type: String, required: true, default: new Date().getDate() },
    createdBy: { type: Object, required: true, default: { user: {} } },
    comments: { type: Array, required: true, default: [] },
    usersIn: { type: Array, required: true, default: [] },
    likes: { type: Array, required: true, default: [] },
    closedAt: { type: String, default: 'Em aberto' },
})

const forumModel = mongoose.models['Forums'] || mongoose.model('Forums', forumSchema, 'Forums')

export default forumModel