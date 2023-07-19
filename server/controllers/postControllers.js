import { Post } from '../models/index.js'

export const fetchPosts = async (req, res) => {
    try {
        const fetched = await Post.find().limit(20)
        if (!fetched) {
            return res.status(400).send({message: 'Os posts não foram encontrados!'})
        }
        res.status(200).send({fetched, message: 'Post encontrado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createPost = async (req, res) => {
    try {
        const {name, description, content} = req.body

        if (!name || !description || !content) {
            return res.status(400).send({message: 'Campos obrigatórios não foram preenchidos!'})
        }

        const postUpdates = Post({
            name, 
            description,
            content,
            likes: 0,
            views: 0,
            comments: [],
            postedAt: 0,
            postedIn: 0,
            postedBy: 0
        })

        await postUpdates.save()

        res.status(200).send({postUpdates, message: 'Post criado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params
        const existingPost = await Post.findById(id)

        if (!existingPost) {
            return res.status(400).send({message: 'Post não encontrado!'})
        }

        res.status(200).send({existingPost, message: 'Post encontrado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { views, likes, comments } = req.body
        const existingPost = await Post.findById(id)

        if (!existingPost) {
            return res.status(400).send({message: 'Post não encontrado!'})
        }

        const postUpdates = { views, likes, comments }
        const postUpdated = await Post.findByIdAndUpdate(id, postUpdates)

        return res.status(200).send({postUpdated, message: 'Post atualizado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        await Post.findByIdAndDelete(id)
        res.status(200).send({message: 'Post deletado!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}