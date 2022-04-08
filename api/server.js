const nodemailer = require('nodemailer');
// var express = require('express')
// var exphbs = require('express-handlebars');
var hbs = require('nodemailer-express-handlebars');

const { MY_EMAIL, PASSWORD } = process.env

// var app = express()
// Step 1
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


const handlebarsOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: './views',
        defaultLayout: false,
    },
    viewPath: './views',
    extName: ".handlebars"
}

transporter.use('compile', hbs(handlebarsOptions));

    transporter.verify().then(response=>{
        console.log(response)
    })

let mailOptions = {
    from: '"Publicación completa 👻" <dominicode.xyz@gmail.com>',
    to: 'bicivo8142@royins.com',
    subject: 'Testing and Testing',
    template: 'home',
    context: {
        title: 'title here',
        text: 'loremaasidlasd'
    }

}

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error)
    } else {
        console.log('Email sent: ' + info.response)
    }
})
// var hbs = exphbs.create({
//     // Specify helpers which are only registered on this instance.
//     helpers: {
//         foo: function () { return 'FOO!'; },
//         bar: function () { return 'BAR!'; }
//     }
// });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.get('/', function (req, res, next) {
//     res.render('home', {
//         showTitle: true,

//         // Override `foo` helper only for this rendering.
//         helpers: {
//             foo: function () { return 'foo.'; }
//         }
//     });
// });

// app.listen(3000);

