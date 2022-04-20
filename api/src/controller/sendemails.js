const express = require('express');
const userdata = require('../middlewares/emailuserdata.js')
const transporter = require('../middlewares/transporterconfig.js')
const router = express();

module.exports = router

const hostclient = 'http://localhost:3000'

router.post("/published", async (req, res) => {
    const { userid } = req.body
    try {

        const {
            emailUser,
            userName
        } = await userdata(userid)

        let mailOptions = {
            from: '"Inmobiliaria Henry"<inmuebleshenry@gmail.com>',
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
            from: '"Inmobiliaria Henry" <inmuebleshenry@gmail.com>',
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
        res.status(500).json(error)
    }
})

router.post('/donation', async (req, res) => {
    const { userid } = req.body
    try {
        if(userid){
            const {
                emailUser
            } = await userdata(userid)
    
            let mailOptions = {
                from: '"Inmobiliaria Henry" <inmuebleshenry@gmail.com>',
                to: emailUser,
                subject: '¡Gracias por tu donación!',
                template: 'Donation',
                context: {
                    title: `Recibimos tu donación`,
                    body: `Gracias por tu contribución`,
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
        }
       
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/payment', (req, res, next) => {
    const { emailUser, tiempo } = req.query
    
    try {
        
        let mailOptions = {
            from: '"Inmobiliaria Henry" <inmuebleshenry@gmail.com>',
            to: emailUser,
            subject: '¡Gracias por compra¡',
            template: 'Promotion',
            context: {
                content: `Ahora tu publicación será promocionada por ${tiempo === 'uno' ? "un mes":tiempo + " meses" }`,
                p: `Recuerda que cada contribución a la plataforma nos ayudará a crecer y llegar a más personas`
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

router.post('/subscribers/:emailUser/', (req, res, next) => {
    const { emailUser } = req.params
    try {
        let mailOptions = {
            from: '"Inmobiliaria Henry" <inmuebleshenry@gmail.com>',
            to: emailUser,
            subject: '¡Gracias por compra¡',
            template: 'Promotion',
            context: {
                content: `Gracias por tu compra`,
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