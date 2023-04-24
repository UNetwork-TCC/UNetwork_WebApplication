import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlenght: 50 },
    title: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 100 },
    theme: { type: String, required: true },
    rules: { type: String, required: true, maxlenght: 200  },
    usersOnClass: { type: Array, required: true },
    createdAt: { type: String, required: true },
    messages: { type: Array, required: true },
    voiceChannels: { type: Array, required: true },
    chatChannels: { type: Array, required: true },
})
const classModel = mongoose.model('Classes', classSchema, 'Classes')

export default classModel