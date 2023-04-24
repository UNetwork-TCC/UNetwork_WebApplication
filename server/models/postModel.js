import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 100 },
    content: { type: Object, required: true },
    postedBy: { type: Object, required: true },
    postedAt: { type: String, required: true },
    postedIn: { type: Object, required: true },
    comments: { type: Array, required: true },
    likes: { type: Object, required: true },
    views: { type: Object, required: true }
})
const postModel = mongoose.model('Posts', postSchema, 'Posts')

export default postModel