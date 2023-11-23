import { Material } from '../models/index.js'

export const fetchMaterials = async (req, res) => {
    try {
        const fetched = await Material.find().limit(40)
        if (!fetched) {
            return res.status(400).send({message: 'Os materiais não foram encontradas!'})
        }
        res.status(200).json(fetched)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

export const getMaterialById = async (req, res) => {
    try {
        const {id} = req.params
        const materials = await Materials.find(id)

        if (!materials) {
            return res.status(400).send({message: 'Material não encontrada!'})
        }

        res.status(200).json(materials)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const createMaterial = async (req, res) => {
    try {
        const { file } = req.body
        
        if (!content) {
            return res.status(400).send({ message: 'A mensagem não pode ser vazia!' })
        }

        const newMaterial = Material({
            file
        })

        await newMaterial.save()

        res.status(200).send({ newMaterial, message: 'Mensagem criada com sucesso!' })
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}


export const deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {return res.status(400).send({message: 'Por favor, insira um id válido'})}
        const deletedMaterial = await Material.findByIdAndDelete(id)
        res.status(200).send({deletedMaterial, message: 'mensagem deletada com sucesso!'})

    } catch (error) {
        res.status(404).send({message: error.message})
    }
}

export const updateMaterial = async (req, res) => {
    try {
        const {id} = req.params
        const oldMaterial = Material.findById(id)

        if (!oldMaterial) {
            res.status(400).send({message: 'Mensagem não encontrada!'})
        }

        const { file } = req.body

        if (!file) {
            res.status(400).send({message: 'Preencha todos os campos!'})
        }

        const updatedMaterial = await Material.findByIdAndUpdate(id, file) 
        res.status(200).send({ updatedMaterial, message: 'Mensagem atualizada com sucesso!' })
        
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}