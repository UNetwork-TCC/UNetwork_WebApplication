import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
    userId: { type: String },
    filename: { type: String, required: true },
    at: {
        id: { type: String },
        type: { type: String }
    } 
})

const fileModel = mongoose.model('Files', fileSchema, 'Files')

export default fileModel
