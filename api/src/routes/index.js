const { Router } = require('express');
const userCreate = require('../controller/usercreate.js')
const allusers = require('../controller/getusers')
const postroles = require('../controller/postroles.js')
const postcards = require('../controller/postcard.js')
const getroles = require('../controller/getroles.js')
const PropertiesRoute = require('../controller/PropertiesRoute');
const getFeatures = require('../controller/getFeatures')

const router = Router();
router.use("/Properties", PropertiesRoute);

//todo: crea un usuario
router.use('/user', userCreate )

//todo: obtiene todos los usuarios
router.use('/users', allusers)

//todo: crea un rol de usuario
router.use('/role', postroles)

//todo: obtiene todos los roles
router.use('/roles', getroles)

//todo: crea una tarjeta y asocia segun el nombre
router.use('/cards', postcards)

//todo: crea una tarjeta y asocia segun el nombre
router.use('/feature', getFeatures)

module.exports = router;
