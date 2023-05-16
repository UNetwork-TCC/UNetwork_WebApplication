import { User } from '../models/index.js'
import bcrypt from 'bcrypt'

export const fetchUsers = async (_req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id, '-password')

        if (!user) {
            res.status(404).send({message: 'Usuário não econtrado!'})
        }
        return res.status(200).send({ user, message: 'Usuário encontrado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = bcrypt.hashSync(password, 10)

        if (password.length < 8) {
            return res.status(400).send({message: 'A senha precisa de ao menos 8 caractéres!'})
        } 
        
        const newUser = User({
            name,
            email, 
            password: hashedPassword,
            followers: [{}],
            settings: {
                theme: 'light',
                language: 'br',
                timezone: 'America/Sao_Paulo',
                dateFormat: 'DD/MM/YYYY',
                timeFormat: 'HH:mm:ss',                
            },
            groupes: [{}],
            chats: [{}],
            posts: [{}],
            otherInfo: {
                avatar: '',
                bio: '',
                phone: '',
                city: '',
                state: '',
                country: '',
                grade: 1
            },
            icon
        })

        await newUser.save()
        res.status(201).send({user: newUser, message: 'Usuário criado com sucesso!'})

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        
        const deletedUser = await User.findOneAndDelete(id)
        res.status(200).send({deletedUser, message: 'Usuário deletado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).send({message: 'Todos campos devem ser preenchidos!'})
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        
        const userUpdates = {...req.body, password: hashedPassword}
        const userUptaded = await User.findByIdAndUpdate(id, userUpdates)

        res.status(200).send({userUptaded, message: 'Usuário atualizado com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getFollowers = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).send(user.followers)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}