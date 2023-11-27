import { Picture } from '../models/index.js'
import azure from 'azure-storage'
import { v4 as uuid } from 'uuid'

const container = 'images'
const storage = 'unetworkblobapi'

const CONNECTION_URL = process.env.AZURE_STORAGE_CONNECTION_URL
const blobSvc = azure.createBlobService(CONNECTION_URL)

export const postPictures = async (req, res) => {
    let uuidFilename

    try {
        const { userId, at, file64Based, filename } = req.body
        
        if (!filename) {
            uuidFilename  = uuid().toString() + '.jpg'
        }

        const matches = file64Based.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const type = matches[1]
        const buffer = new Buffer(matches[2], 'base64')

        blobSvc.createBlockBlobFromText('images', filename || uuidFilename, buffer, {
            contentType: type
        }, async (error, _result, _response) => {
            if (error) {
                filename = 'default.png'
            }
            
            const newPicture = Picture({
                userId,
                at,
                filename
            })

            const fileUrl = `https://${storage}.blob.core.windows.net/${container}/${filename}`

            await newPicture.save()
            res.status(200).send({ newPicture, src: fileUrl, message: 'Imagem salva com sucesso!'})
        })        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deletePictures = async(req, res) => {
    const blobSvc = azure.createBlobService(CONNECTION_URL)

    try {
        const {id} = req.params
        const deletedPicture = await Picture.findByIdAndDelete(id)
        if (!deletedPicture) return res.status(400).send({message: 'Imagem não encontrada!'})

        blobSvc.deleteBlobIfExists(container, deletedPicture.filename)

        res.status(200).send({deletedPicture, message: 'Imagem deletada com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getPicturesById = async (req, res) => {
    try {
        const { id } = req.params
        const gotten = await Picture.find({ src: 'uploads/' + id })
        if (!gotten) return res.status(400).send({message: 'Imagem não encontrada!'})
        res.status(200).json(gotten)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updatePictures = async(req, res) => {
    try {
        const {id} = req.params
        const { name, userId, at } = req.body
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
