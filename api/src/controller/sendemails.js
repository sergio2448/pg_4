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
        console.log(emailUser)
        const userName = getUserName(user)
        console.log(userName)
        
        const handlebarsOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: './views',
                defaultLayout: false,
            },
            viewPath: './views',
            extName: ".handlebars",
        }
    
        transporter.use('compile', hbs(handlebarsOptions));
    
        await transporter.verify()
    
        let mailOptions = {
            from: '"Publicación completa 👻" <dominicode.xyz@gmail.com>',
            to: emailUser,
            subject: 'Testing and Testing',
            template: postStatus,
            context: {
                Document:`Publicacion completa`,
                title: `Hola ${userName},`,
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

