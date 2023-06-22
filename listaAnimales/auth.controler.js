const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken");

const { expressjwt } = require("express-jwt")
const User = require('./user.model')

mongoose.connect('mongodb+srv://KvzonVega:admin123456@cluster0.mxrymo4.mongodb.net/animals?retryWrites=true&w=majority')

const app = express()

app.use(express.json())

console.log(process.env.SECRET);

const validateJwt = expressjwt({secret: process.env.SECRET, algorithms: ['HS256'] }) // con esto creamos nuestro middleware

const generarToken = _id => jsonwebtoken.sign({ _id }, process.env.SECRET)


const isAuthenticated = express.Router().use(validateJwt, async (req, res, next) =>{
    try{
        const user = await User.findById(req.auth._id)
        if(!user){
            return res.status(401).end()
        }
        req.user = user
        next()
    }catch(e){
    next(e)
    }
})

const Auth = {
    login: async (req, res) => {
        const { body } = req
        try {

            const user = await User.findOne({ email: body.email })
            if (!user) {
                return res.status(401).send('Usuario no encontrado, verifique su clave o password')
            }
            const isMatch = await bcrypt.compare(body.password, user.password)

            if (isMatch) {
                const generaToken = generarToken(user._id)
                return res.status(200).send(generaToken)
            }

            res.status(403).send('Usuario y/o password invalido')

        } catch (error) {

            console.log(error);
            res.status(500).send(error.mesage)

        }
    },
    register: async (req, res) => {
        const { body } = req

        try {

            const isUser = await User.findOne({ email: body.email })
            if (isUser) {
                return res.status(401).send('Usuario ya existe')
            }
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(body.password, salt)
            const user = await User.create({
                email: body.email,
                password: hashed,
                salt
            })
            const generaToken = generarToken( user._id )
            res.status(201).send(generaToken)

        } catch (error) {

            console.log(error);
            res.status(500).send(error.mesage)

        }
    },
}

module.exports = { Auth, isAuthenticated }