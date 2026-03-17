import jwt from 'jsonwebtoken';
import 'dotenv/config'

export function createToken(payload){
    let token = jwt.sign(
        payload,
        process.env.SECERET,
        {expiresIn: '30d'}
    )
    return token
}


export function tokenVerify(req, res,next){
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    if(!token) return res.status(400).json({message: "No valid token"})
    jwt.verify(token, process.env.SECERET, (error, user) => {
        if(error) {
            return res.status(400).json({message: error})
        }
        req.user = user
        next()
    })
}