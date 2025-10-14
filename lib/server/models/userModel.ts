import mongoose from 'mongoose'

const shortcutSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 },
    category: { type: String, required: true, maxlength: 50 },
    color: { type: String, required: true, maxlength: 50 },
    link: { type: String, required: true, maxlength: 50 }
})

const otherInfoSchema = new mongoose.Schema({
    bio: { type: String, required: true, maxlength: 50 },
    phone: { type: String, required: true, maxlength: 50 },
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, maxlength: 50 },
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 50 },
    followers: { type: [String], required: true, default: [] },
    groupes: { type: [String], required: true, default: [] },
    chats: { type: [String], required: true, default: [] },
    admin: { type: Boolean, required: true, default: false },
    posts: { type: [String], required: true, default: [] },
    createdAt: { type: String, required: true, default: new Date().toISOString() },
    avatar: { type: String, required: true },
    grade: { type: Number, required: true, default: 1 },
    class: { type: String, required: true },
    shortcuts: { type: [shortcutSchema], required: true, default: [] },
    otherInfo: { type: otherInfoSchema, required: true, default: { bio: '', phone: '' } }
})

const userModel = mongoose.models['Users'] || mongoose.model('Users', userSchema, 'Users')
export default userModel
