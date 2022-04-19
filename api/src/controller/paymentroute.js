const { Router } = require('express');
const {
    createOrder,
    captureOrder,
    cancelOrder,
    // createProduct,
    // redirectPayment
    propertyNotFound,
    donationCompleted,
    checkout,
    
} = require('../middlewares/payment.cotrollers.js')
const router = Router();

module.exports = router

router.post('/dispatch-order',createOrder)

// router.get('/create-product', createProduct)

router.get('/capture-order', captureOrder)

router.get('/cancel-order', cancelOrder)

router.get('/propertyNotFound', propertyNotFound)

router.get('/redirect-home', donationCompleted)
