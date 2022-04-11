const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const { API_KEY } = process.env

const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: API_KEY
    })
)

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

