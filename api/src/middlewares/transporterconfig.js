const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const { API_KEY, MY_EMAIL, PASSWORD } = process.env

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: MY_EMAIL,
        pass: PASSWORD
    },
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    }
})

// const transporter = nodemailer.createTransport(
//     nodemailerSendgrid({
//         apiKey: API_KEY
//     })
// )

const handlebarsOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: './views',
        defaultLayout: false,
    },
    viewPath: './views',
    extName: ".handlebars",
}

transporter.use('compile', hbs(handlebarsOptions))
module.exports = transporter

