import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlenght: 50 },
    description: { type: String, required: true, maxlenght: 100 },
    usersOnGroup: { type: Array, required: true },
    createdAt: { type: String, required: true },
    messages: { type: Array, required: true },
})
const groupModel = mongoose.model('Groupes', groupSchema, 'Groupes')

export default groupModel