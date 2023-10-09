import { News } from '../models/index.js'

export const fetchNews = async (req, res) => {
    try {
        const fetched = await News.find()
        if (!fetched) {
            return res.status(400).send({message: 'As notícias não foram encontradas!'})
        }
        res.status(200).json(fetched)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

export const getNewsById = async (req, res) => {
    try {
        const {id} = req.params
        const news = await News.findById(id)

        if (!news) {
            return res.status(400).send({message: 'Notícia não encontrada!'})
        }
        res.status(200).json(news)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createNews = async (req, res) => {
    try {
        const { name, description, content, icon} = req.body
        
        if (!name || !description || !content ) {
            return res.status(400).send({message: 'Preencha todos os campos!'})
        }
        
        const newNews = News({
            name,
            description,
            content,
            icon,
            postedAt: 0,
            comments: [],
            likes: {},
            views: {},
        })

        await newNews.save()
        res.status(200).send({newNews, message: 'A notícia foi criada com sucesso!'})

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateNews = async (req, res) => {
    try {
        const {id} = req.params
        const existingNews = await News.findById(id)

        if (!existingNews) {
            return res.status(400).send({message: 'Notícia não encontrada!'})
        }

        const { name, description, content } = req.body

        if (!name || !description || !content) {
            return res.status(400).send({message: 'Preencha todos os campos!'})
        }

        const newsUpdates = {...req.body}

        const newsUpdated = await News.findByIdAndUpdate(id, newsUpdates)
        res.status(200).send({newsUpdated, message: 'A notícia foi atualizada com sucesso!'})


    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteNews = async (req, res) => {
    try {
        const {id} = req.params
        const existingNews = News.findById(id)

        if (!existingNews) {
            return res.status(400).send({message: 'Notícia não encontrada!'})
        }

        const deletedNews = await News.findByIdAndDelete(id)
        res.status(200).send({deletedNews, message: 'A notícia foi deletada com sucesso!'})
        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}