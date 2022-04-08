const nodemailer = require('nodemailer')
const { MY_EMAIL, PASSWORD } = process.env

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    // service: 'gmail',
    port: 2525,
    // secure: true,
    auth: {
        user: MY_EMAIL,
        pass: PASSWORD
    }
    // ,
    // tls: {
    //     rejectUnauthorized: true,
    //     minVersion: "TLSv1.2"
    // }
})

module.exports = transporter
    
