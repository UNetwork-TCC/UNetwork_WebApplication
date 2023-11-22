import mongoose from 'mongoose'

const materialSchema = new mongoose.Schema({
    file: { type: String, required: true },
})

const materialModel = mongoose.model('Materials', materialSchema, 'Materials')

export default materialModel