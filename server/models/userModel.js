import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlenght: 30 }, 
    name: { type: String, required: true, maxlenght: 50 },
    email: { type: String, required: true, maxlenght: 50 },
    followers: { type: Array, required: true },
    settings: { type: Object, required: true },
    password: { type: String, required: true, minlength: 8, maxlength: 99 },
    groupes: { type: Array, required: true },
    chats: { type: Array, required: true },
    admin: { type: Boolean, required: false },
    posts: { type: Array, required: true },
    createdAt: { type: String, default: String(new Date()) },
    otherInfo: { type: Object, required: true, maxlength: 50, default: {
        avatar: {
            src: '',
            name: ''
        },
        bio: '',
        phone: '',
        grade: 1,
        shortcuts: {
            title: '',
            category: '',
            color: '',
            link: ''
        }
    } },
})

const userModel = mongoose.model('Users', userSchema, 'Users')

export default userModel
