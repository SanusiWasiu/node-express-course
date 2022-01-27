const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    // res.send("Register user")
    const { name, email, password } = req.body
    // if (!name || !email || !password) {
    //    throw new BadRequestError('Please provide name, email and password') 
    // }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const safeUser = { name, email, password: hashedPassword }
    const user = await User.create({...safeUser})
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send("Login User")
}

module.exports = {
    register,
    login
}