import { Class } from "../models/index.js";

export const findById = async (req, res) => {
    try {
        const {id} = req.params
        const existingClass = await Class.findById(id)

        if (!existingClass) {
            return res.status(400).send({message: "Classe não encontrada!"})
        }
        res.status(200).send({existingClass, message: "A classe foi encontrada!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createClass = async (req, res) => {
    try {
        const {name, title, description, theme, rules, usersOnClass, icon, voiceChannels, chatChannels} = req.body
        
        if (!name || !title || !description || !theme || !rules || !usersOnClass) {
            return res.status(400).send({message: "Preencha todos os campos!"})
        }
        
        const newClass = Class({
            name,
            title,
            description,
            theme,
            rules,
            usersOnClass,
            createdAt: 0,
            messages: [],
            voiceChannels,
            chatChannels,
            icon
        })

        await newClass.save()
        res.status(200).send({newClass, message: "A Classe foi criada com sucesso!"})

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateClass = async (req, res) => {
    try {
        const {id} = req.params
        const existingClass = await Class.findById(id)

        if (!existingClass) {
            return res.status(400).send({message: "Classe não encontrada!"})
        }

        const {name, title, description, theme, rules, usersOnClass, icon, voiceChannels, chatChannels} = req.body

        if (!name || !title || !description || !theme || !rules || !usersOnClass) {
            return res.status(400).send({message: "Preencha todos os campos!"})
        }

        const classUpdates = {...req.body}

        const classUpdated = await Class.findByIdAndUpdate(id, classUpdates)
        res.status(200).send({classUpdated, message: "A Classe foi atualizada com sucesso!"})


    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteClass = async (req, res) => {
    try {
        const {id} = req.params
        const existingClass = Class.findById(id)

        if (!existingClass) {
            return res.status(400).send({message: "Classe não encontrada!"})
        }

        const deletedClass = await Class.findByIdAndDelete(id)
        res.status(200).send({deletedClass, message: "A Classe foi deletada com sucesso!"})
        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}