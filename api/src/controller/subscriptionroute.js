const { Router } = require('express');
const {
    createProduct,
    createPlan, 
    generateSubscription,
    captureSub,
    productlist,
    planslist,
    cancelSub,
    suspendSub,
    reactiveSub
} = require('../middlewares/subcontroller.js')
const router = Router();

module.exports = router

router.post('/create-product', createProduct)

router.post('/create-plan', createPlan)

router.post('/create-sub', generateSubscription)

router.get('/capture-sub', captureSub)

router.get('/cancel-sub', cancelSub)

router.get('/suspend-sub', suspendSub)

router.get('/show-product', productlist)

router.get('/show-plan', planslist)

router.get('/active-sub', reactiveSub)
/*
    *faltantes: ruta para cancelar o suspender subscription,
    *ruta para ver las transacciones: (admin)
    *ruta para que el usuario consulte sus subscripciones
    *ruta que evalua el estado de la subscription
    *Definit veneficios para el usuario vip 
*/