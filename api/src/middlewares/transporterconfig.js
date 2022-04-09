const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const { MY_EMAIL, PASSWORD, API_KEY } = process.env

// let transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     // service: 'gmail',
//     port: 2525,
//     // secure: true,
//     auth: {
//         user: MY_EMAIL,
//         pass: PASSWORD
//     }
//     // ,
//     // tls: {
//     //     rejectUnauthorized: true,
//     //     minVersion: "TLSv1.2"
//     // }
// })
const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: API_KEY
    })
)
module.exports = transporter

