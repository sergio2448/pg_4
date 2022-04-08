const nodemailer = require('nodemailer')
const { MY_EMAIL, PASSWORD } = process.env

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

module.exports = transporter
    
