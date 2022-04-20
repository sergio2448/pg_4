const { Router } = require('express');
const userCreate = require('../controller/usercreate.js')
const allusers = require('../controller/getusers')
const postroles = require('../controller/postroles.js')
const postcards = require('../controller/postcard.js')
const getroles = require('../controller/getroles.js')
const PropertiesRoute = require('../controller/PropertiesRoute');
const nodemailer = require('../controller/sendemails.js')
const payment = require('../controller/paymentroute.js')
const getFeatures = require('../controller/getFeatures')
const postReview = require('../controller/postReview')
const postUser = require('../controller/postUserSellers')
const getAgenda = require('../controller/getAgenda')
const calendar = require('../controller/Calendar')
const favorite = require('../controller/Favorite')
const status = require('../controller/Status')
const subscription = require('../controller/subscriptionroute.js')
const superusuario = require('../controller/superusuario.js')
const { BanckCards } = require('../db')


const router = Router();

router.use("/Properties", PropertiesRoute);

router.use('/agenda', getAgenda);

//todo: crea un usuario
router.use('/user', userCreate)

//todo: obtiene todos los usuarios
router.use('/users', allusers)

//todo: crea un rol de usuario
router.use('/role', postroles)

//todo: obtiene todos los roles
router.use('/roles', getroles)

//todo: crea una tarjeta y asocia segun el nombre
router.use('/cards', postcards)

//todo: lista las features 
router.use('/feature', getFeatures)

//todo: crear una Review 
router.use('/review', postReview)

//todo: create Usuario
router.use('/optionUser', postUser)

//todo: envia los emails
router.use('/send-email', nodemailer)

//todo: añade el metodo de pago de paypal
router.use('/pay', payment)

//todo: lista de typo de agenda
router.use('/typeAgenda', getAgenda)

router.use('/status', status)

router.use('/calendar', calendar)

router.use('/favorite', favorite)

//todo: crea la subscripción a la pagina
router.use('/sub', subscription)

//todo: rutas del usuario admin
router.use('/admin', superusuario)

module.exports = router;
