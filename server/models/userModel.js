import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlenght: 50 },
    email: { type: String, required: true, maxlenght: 50 },
    followers: { type: Array, required: true },
    settings: { type: Object, required: true },
    password: { type: String, required: true, minlength: 8, maxlength: 99 },
    groupes: { type: Array, required: true },
    chats: { type: Array, required: true },
    admin: { type: Boolean, required: true},
    posts: { type: Array, required: true },
    otherInfo: { type: Object, required: true, maxlength: 50, default: {
        avatar: '',
        bio: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        grade: 1
    } },
    icon: { type: String, default: 'random_icon.png' }
})

const userModel = mongoose.model('Users', userSchema, 'Users')

export default userModel