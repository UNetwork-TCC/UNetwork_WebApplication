export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send({ users })
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id, '-password')

        if (!user) {
            res.status(404).send({message: 'usuário não econtrado'})
        }
        return res.status(200).send({ user, message: 'Usuário encontrado' })
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        const {email, password, } = req.body
        const hashedPassword = bcrypt.hashSync(password)
    
        if (password.length < 8) {
            return res.status(400).send({message: 'A senha precisa de ao menos 8 caracteres!'})
        } 
        const newUser = User({email, password: hashedPassword})
        try {
            await newUser.save()
            res.status(201).send({newUser, message: 'Usuário criado com sucesso!'})
        } catch (error) {
            res.status(404).send({message: error.message})
        }
    
        
    } catch (error) {
        res.status(404).send({message: error.message})
    }

}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        
        const deletedUser = await User.findOneAndDelete(id)
        res.status(200).send({deletedUser, message: 'Usuário deletado'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const {email, password} = req.body
        
        if (!email || !password) {
            return res.status(400).send({message: 'preenche tudo mané'})
        } else {
            
        }
        const hashedPassword = bcrypt.hashSync(password)
        
        const userUpdate = {email: email, password: hashedPassword}
        const userUptaded = await User.findByIdAndUpdate(id, userUpdate)

        res.status(200).send({userUptaded, message: 'usuário atualizado com sucesso'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}