import { Group } from '../models/index.js'

export const getById = async (req, res) => {
    try {
        const {id} = req.params
        const group = await Group.findById(id)

        if (!group) {
            res.status(404).send({message: 'Grupo não econtrado!'})
        }
        return res.status(200).send({ group, message: 'Grupo encontrado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createGroup = async (req, res) => {
    try {
        const { title, description, usersOnGroup } = req.body

        if (!title || !description || !usersOnGroup) {
            return res.status(400).send({message: 'Preencha todos os campos obrigatórios!'})
        }
        
        const newGroup = Group({
            title,
            description,
            usersOnGroup,
            messages: 0,
            createdAt: 0
        })

        await newGroup.save() 

        res.status(201).send({newGroup, message: 'Grupo criado com sucesso!'})

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const {id} = req.params
        
        const deletedGroup = await Group.findOneAndDelete(id)
        res.status(200).send({deletedGroup, message: 'Grupo deletado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateGroup = async (req, res) => {
    try {
        const {id} = req.params
        const { title, description, usersOnGroup } = req.body
        const existingGroup = await Group.findById(id)

        if (!existingGroup) {
            return res.status(404).send({message: 'Grupo não econtrado!'})
        }
        
        if (!title || !description || !usersOnGroup) {
            return res.status(400).send({message: 'Preencha todos os campos obrigatórios!'})
        }
        
        const groupUpdates = {title, description, usersOnGroup}
        const groupUptaded = await Group.findByIdAndUpdate(id, groupUpdates)

        return res.status(200).send({groupUptaded, message: 'Grupo atualizado com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

