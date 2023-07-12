import mongoose from 'mongoose'

const pictureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    src: { type: String, required: true },
})

const pictureModel = mongoose.model('Pictures', pictureSchema, 'Pictures')

export default pictureModel