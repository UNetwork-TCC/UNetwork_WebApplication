import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 300 },
    theme: { type: String, required: true },
    usersOnClass: { type: Array, required: true, default: [] },
    createdAt: { type: String, required: true, default: new Date().getDate() },
    visibility: { type: String, required: true, default: 'public' },
    code: { type: String, required: true, default: () => Math.random().toString(36).substring(2, 8).toUpperCase() },
    messages: { type: Array, default: [] },
    voiceChannels: { type: Array, default: [] },
    chatChannels: { type: Array, default: [] },
    icon: { type: String }

})

const classModel = mongoose.models['Classes'] || mongoose.model('Classes', classSchema, 'Classes')

export default classModel