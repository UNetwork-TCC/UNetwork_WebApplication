import  jwt  from 'jsonwebtoken'

export const checkToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) { return res.status(401).send({ message: 'Token invalido!'}) }
        token = token.split(' ')[1]
        const verify = jwt.verify(token, process.env.SECRET)
        if (verify == false) { return res.status(401).send({ message: 'Por favor, logue para isto!'}) }
        next()
    } catch (error) {
        res.status(404).send({message: error.message})
    }
}