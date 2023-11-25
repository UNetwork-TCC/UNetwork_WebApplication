import mongoose from 'mongoose'

const pictureSchema = new mongoose.Schema({
    userId: { type: String },
    filename: { type: String, required: true },
    at: {
        id: { type: String },
        type: { type: String }
    } 
})

const pictureModel = mongoose.model('Pictures', pictureSchema, 'Pictures')

export default pictureModel
