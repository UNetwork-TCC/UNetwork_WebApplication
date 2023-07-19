import  jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).send({ message: 'Token não existe!'})

        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) return res.status(401).send({ message: 'Token inválido'})
        })

        next()
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}