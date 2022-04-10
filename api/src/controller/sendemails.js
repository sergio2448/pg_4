const express = require('express');
const {
    getUserById,
    getEmailUser,
    getUserName
} = require('../middlewares/usercreate.js')
const userdata = require('../middlewares/emailuserdata.js')
const transporter = require('../middlewares/transporterconfig.js')

// const hbs = require('nodemailer-express-handlebars')
const router = express();

module.exports = router



router.post("/published", async (req, res) => {
    const { userid } = req.body
    try {
        
        const {
            emailUser,
            userName
        } = userdata(userid)

        let mailOptions = {
            from: '"Inmobiliaria" <casillas588@hotmail.com>',
            to: emailUser,
            subject: 'Publicación completa 👻',
            template: 'Publicado',
            context: {
                Document: `Publicacion completa`,
                title: `Hola ${userName}`,
            }
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err.message)
            } else {
                console.log("email enviado")
                return res.status(200).json(info.response)
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/welcome', async (req, res) => {
    const { userid } = req.body
    try {

        const {
            emailUser,
            userName
        } = await userdata(userid)

        let mailOptions = {
            from: '"Inmobiliaria" <casillas588@hotmail.com>',
            to: emailUser,
            subject: '¡Te damos la bienvenida ✅¡',
            template: 'Welcome',
            context: {
                Document: `Welcome to my page`,
                title: `Hola ${userName}`,
            }
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return res.status(500).send(err.message)
            } else {
                console.log("email enviado")
                return res.status(200).json(info.response)
            }
        })
    } catch (error) {
        res.send(500).json(error)
    }
})