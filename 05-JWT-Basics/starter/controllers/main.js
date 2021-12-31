const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const {username, password } = req.body
    const id = new Date().getDate()

    if(!username || !password){
        throw new BadRequestError('please provide  password and username')
    }
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})
    console.log(username, password)

    res.status(200).json({ msg: 'User Created', token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({ 
            msg: `Hello, ${req.user.username}`, 
            secret: `here is your authorized data, your lucky number is ${luckyNumber}`
        })
    
}

module.exports = {
    login,
    dashboard
}