import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 100 },
    content: { type: Object, required: true },
    postedBy: { type: Object, required: true },
    postedAt: { type: String, required: true, default: new Date().getDate() },
    postedIn: { type: Object, required: true },
    comments: { type: Array, required: true },
    likes: { type: Object, required: true },
    views: { type: Object, required: true },
    icon: { type: String, default: 'random_icon.png' }
})

const postModel = mongoose.model('Posts', postSchema, 'Posts')

export default postModel