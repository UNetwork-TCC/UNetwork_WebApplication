import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 100 },
    content: { type: Object, required: true },
    postedAt: { type: String, required: true, default: new Date().getDate() },
    comments: { type: Array, required: true },
    likes: { type: Object, required: true },
    views: { type: Object, required: true },
})

const newsModel = mongoose.model('News', newsSchema, 'News')

export default newsModel