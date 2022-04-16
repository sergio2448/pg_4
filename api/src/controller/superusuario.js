const { Router } = require('express');
const {
    getUser,
    suspenduser,
    deleteprop,
    setRoleAdmin,
    transactions,
    addFeature,
    deleteFeature
} = require('../middlewares/superusuario.js');

const router = Router();

router.get('/usuario', getUser)

router.get('/suspend-user', suspenduser)

router.get('/transactions', transactions)

router.delete('/delete-prop', deleteprop)

router.patch('/set-roleadmin', setRoleAdmin)

router.post('/addFeature', addFeature)

router.delete('/deleteFeature', deleteFeature)

module.exports = router