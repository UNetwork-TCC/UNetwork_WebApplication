import { File } from '../models/index.js'
import azure from 'azure-storage'
import { v4 as uuid } from 'uuid'

const container = 'images'
const storage = 'unetworkblobapi'

const CONNECTION_URL = process.env.AZURE_STORAGE_CONNECTION_URL
const blobSvc = azure.createBlobService(CONNECTION_URL)

export const postFiles = async (req, res) => {
    try {
        const { userId, at, file64Based } = req.body
        let filename = req.body?.filename

        if (!filename) {
            filename = uuid().toString() + '.jpg'
        }

        const matches = file64Based.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        const type = matches[1]
        const buffer = new Buffer(matches[2], 'base64')

        blobSvc.createBlockBlobFromText('images', filename, buffer, {
            contentType: type
        }, async (error, _result, _response) => {
            if (error) {
                filename = 'default.jpg'
            }

            const newFile = File({
                userId,
                at,
                filename
            })

            const fileUrl = `https://${storage}.blob.core.windows.net/${container}/${filename}`

            await newFile.save()
            res.status(200).send({ newFile, src: fileUrl, message: 'Imagem salva com sucesso!'})
        })        
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const deleteFiles = async(req, res) => {
    const blobSvc = azure.createBlobService(CONNECTION_URL)

    try {
        const {id} = req.params
        const deletedFile = await File.findByIdAndDelete(id)
        if (!deletedFile) return res.status(400).send({message: 'Imagem não encontrada!'})

        blobSvc.deleteBlobIfExists(container, deletedFile.filename)

        res.status(200).send({deletedFile, message: 'Imagem deletada com sucesso!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const getFilesById = async (req, res) => {
    try {
        const { id } = req.params
        const gotten = await File.find({ src: 'uploads/' + id })
        if (!gotten) return res.status(400).send({message: 'Imagem não encontrada!'})
        res.status(200).json(gotten)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateFiles = async(req, res) => {
    try {
        const {id} = req.params
        const { name, userId, at } = req.body
        const file = req.file

        if(!(id, name, file)) return res.status(400).send({message: 'Por favor, preencha todos os campos!'})
        
        const updates = {name, file}
        const updated = await File.findByIdAndUpdate(id, updates)
        
        if (!updated) return res.status(400).send({message: 'Alterações não feitas!'})
        res.status(200).send({updated, message:'Os dados foram atualizados!'})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}
