import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlenght: 50 },
    title: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 300 },
    theme: { type: String, required: true },
    usersOnClass: { type: Array, required: true },
    createdAt: { type: String, required: true, default: new Date().getDate() },
    messages: { type: Array },
    voiceChannels: { type: Array, default: [] },
    chatChannels: { type: Array, default: [] },
    icon: { type: String, default: 'random_icon.png' }

})

const classModel = mongoose.model('Classes', classSchema, 'Classes')

export default classModel