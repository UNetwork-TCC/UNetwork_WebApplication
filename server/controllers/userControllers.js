import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const fetchUsers = async (_req, res) => {
    try {
        const fetched = await User.find().select('-password')
        if (!fetched) {
            return res.status(400).send({message: 'Os usuários não foram encontrados!'})
        }
        res.status(200).json(fetched)
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
        return res.status(200).json(user)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password, username } = req.body
        const existingUser = await User.findOne({ email })
        const hashedPassword = bcrypt.hashSync(password, 10)

        if (password.length < 8) {
            return res.status(400).send({message: 'A senha precisa de ao menos 8 caractéres!'})
        }

        if (existingUser) {
            return res.status(400).send({message: 'Usuário já cadastrado!'})
        }
        
        const newUser = User({
            name,
            email,
            username,
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
                grade: 1,
                shortcuts: []
            },
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
        
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).send({deletedUser, message: 'Usuário deletado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params        
        let hashedPassword
        let userUpdates

        if (req.body.password) {
            hashedPassword = bcrypt.hashSync(req.body.password)
            userUpdates = { ...req.body, password: hashedPassword }
        } else {
            userUpdates = { ...req.body }
        }
        
        const userUpdated = await User.findByIdAndUpdate(id, userUpdates)

        res.status(200).json(userUpdated)
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

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        
        if (!(email && password )) return res.status(400).send({message: 'Por favor, insira todos os campos'})
        if (email !== existingUser.email) return res.status(400).send({ message: 'Email incorreto! Revise as informações!'})
        if (!existingUser) return res.status(400).send({message: 'Email não encontrado! Por favor insira um usuário válido'})
    
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).send({ message: 'Senha incorreta! Revise as informações!'})

        const token = jwt.sign(
            { id: existingUser._id, email },
            process.env.SECRET,
            {
                expiresIn: '12h',
            }
        )

        existingUser.token = token
      
        delete existingUser.password
        res.status(200).send({ user: existingUser, message: 'O login foi efetuado com sucesso!', token })
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

