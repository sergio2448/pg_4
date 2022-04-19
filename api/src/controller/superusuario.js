const { default: axios } = require('axios');
const { Router } = require('express');
const {
    getUser,
    suspenduser,
    deleteprop,
    setRoleAdmin,
    transactions,
    addFeature,
    deleteFeature,
    statusProp,
    upProp,
    updateStatus,
    updateFeatures,
    getUsers,
    deleteUser
} = require('../middlewares/superusuario.js');

const { checkout } = require('../middlewares/payment.cotrollers.js')

const router = Router();

router.get('/usuario', getUser)

router.get('/suspend-user', suspenduser)

router.get('/transactions', transactions)

router.delete('/delete-prop', deleteprop)

router.patch('/set-roleadmin', setRoleAdmin)

router.post('/addFeature', addFeature)

router.delete('/deleteFeature', deleteFeature)

router.post('/status-prop', statusProp)

router.patch('/updateProperties', upProp)

router.patch('/updateStatus', updateStatus)

router.patch('/updateFeatures/:id', updateFeatures)

router.get('/getUsers', getUsers)

router.delete('/deleteUser', deleteUser)

router.get('/updatepromotions', checkout)


module.exports = router