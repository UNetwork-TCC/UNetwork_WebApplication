import { Picture } from '../models/index.js'

export const postPictures = async (req, res) => {
    try {
        const {name} = req.body
        const file = req.file

        const newPicture = Picture({
            name,
            src: file.path
        })

        await newPicture.save()

        res.status(200).send({ file, message: 'Imagem salva com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deletePictures = async(req, res) => {
    try {
        const {id} = req.params
        const deletedPicture = await Picture.findByIdAndDelete(id)
        if (!deletedPicture) return res.status(400).send({message: 'Imagem não encontrada!'})
        res.status(200).send({deletedPicture, message: 'Imagem deletada com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getPicturesById = async (req, res) => {
    try {
        const {id} = req.params
        const gotten = await Picture.findById(id)
        if (!gotten) return res.status(400).send({message: 'Imagem não encontrada!'})
        res.status(200).send({ gotten, message: 'Imagem pega com sucesso!'}) 
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updatePictures = async(req, res) => {
    try {
        const {id} = req.params
        const {name} = req.body
        const file = req.file
        if(!(id, name, file)) return res.status(400).send({message: 'Por favor, preencha todos os campos!'})
        const updates = {name, file}
        const updated = await Picture.findByIdAndUpdate(id, updates)
        if (!updated) return res.status(400).send({message: 'Alterações não feitas!'})
        res.status(200).send({updated, message:'Os dados foram atualizados!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}
