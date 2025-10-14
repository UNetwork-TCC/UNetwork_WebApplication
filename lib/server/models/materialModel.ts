import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    file: { type: String, required: true },
    createdAt: { type: String, required: true, default: new Date().toISOString() },
    createdBy: { type: String, required: true, default: 'System' }
})

const materialModel = mongoose.models['Materials'] || mongoose.model('Materials', materialSchema, 'Materials')

export default materialModel