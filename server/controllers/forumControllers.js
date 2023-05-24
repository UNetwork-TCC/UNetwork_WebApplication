import { Forum } from "../models/index.js"

export const fetchForums = async (req, res) => {
    try {
        const fetched = await Forum.find().limit(20)
        if (!fetched) {
            return res.status(400).send({message: "Os forums não foram encontrados!"})
        }
        res.status(200).send({fetched, message: "forums encontrados!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createForums = async (req, res) => {
    try {
        const { title, description, theme} = req.body
        if (!title || !description || !theme) {
            return res.status(400).send({message: "Preencha todos os campos!"})
        }

        const newForum = Forum({
            title, 
            description, 
            theme
        })
        
        const updatedForum = await newForum.save()
        res.status(200).send({updatedForum, message: "O novo forúm foi criado!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateForumsMessages = async (req, res) => {
    try {
        const {id} = req.params
        const { messages } = req.body
        if (!messages) {
            return res.status(400).send({message: "Preencha todos os campos!"})
        }

        const updates = {...req.body}
        
        const updatedForum = await Forum.findByIdAndUpdate(id, updates)
        res.status(200).send({updatedForum, message: "O novo fórum foi criado!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteForum = async (req, res) => {
    try {
        const {id} = req.params
        const existingForum = await Forum.findById(id)
        if (!existingForum) {
            return res.status(400).send({message: "Os forums não foram encontrados!"})
        }
        const deletedForum = await Forum.findByIdAndDelete(id)
        res.status(200).send({deletedForum, message: "O fórum foi deletado!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getForumById = async (req, res) => {
    try {
        const {id} = req.params
        const existingForum = await Forum.findById(id)
        if (!existingForum) {
            return res.status(400).send({message: "Os forums não foram encontrados!"})
        }
        res.status(200).send({existingForum, message: "O fórum foi encontrado!"})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}