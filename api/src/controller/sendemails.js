const express = require('express');
const {
    getUserById,
    getEmailUser,
    getUserName
} = require('../middlewares/usercreate.js')

const transporter = require('../middlewares/transporterconfig.js')

const hbs = require('nodemailer-express-handlebars')
const router = express();

module.exports = router

router.post("/", async (req, res) => {
    const { userid, postStatus } = req.body
    try {
        const user = await getUserById(userid)
        const emailUser = await getEmailUser(user)
        const userName = getUserName(user)
        
        
        const handlebarsOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: './views',
                defaultLayout: false,
            },
            viewPath: './views',
            extName: ".handlebars",
        }
        // console.log(transporter)
        transporter.use('compile', hbs(handlebarsOptions))
    
        await transporter.verify()
        // console.log(response)
    
        let mailOptions = {
            from: '"Publicación completa 👻" <casillas588@hotmail.com>',
            to: emailUser,
            subject: 'Testing and Testing',
            template: postStatus,
            context: {
                Document:`Publicacion completa`,
                title: `Hola mundo`,
            }
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err.response.body)
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

