import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 100 },
    usersOnGroup: { type: Array, required: true, default: [] },
    createdAt: { type: String, required: true, default: new Date().getDate() },
    messages: { type: Array, required: true, default: [] },
    icon: { type: String, default: 'random_icon.png' }
})

const groupModel = mongoose.models['Groupes'] || mongoose.model('Groupes', groupSchema, 'Groupes')

export default groupModel