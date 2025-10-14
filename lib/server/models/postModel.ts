import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    content: { type: Object, required: true },
    postedBy: { type: Object, required: true },
    postedAt: { type: String, required: true, default: () => new Date().toISOString() },
    postedIn: { type: Object, required: true },
    comments: { type: Object, required: true, default: { amount: 0, comments: [] } },
    likes: { type: Object, required: true, default: { amount: 0, likes: [] } },
    views: { type: Object, required: true, default: { amount: 0, views: [] } },
})

const postModel = mongoose.models['Posts'] || mongoose.model('Posts', postSchema, 'Posts')

export default postModel