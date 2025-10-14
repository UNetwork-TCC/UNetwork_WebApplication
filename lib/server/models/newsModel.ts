import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 100 },
    content: { type: Object, required: true },
    postedAt: { type: String, required: true, default: new Date().getDate() },
    comments: { type: Array, required: true, default: [] },
    likes: { type: Array, required: true, default: [] },
    views: { type: Array, required: true, default: [] },
})

const newsModel = mongoose.models['News'] || mongoose.model('News', newsSchema, 'News')

export default newsModel