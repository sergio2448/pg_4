const { Router } = require('express');
const { postReview } = require('../middlewares/ReviewMidd')
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { comment,rating, buyerId, propertyId} = req.body;
        const createReview=await postReview(comment,rating, buyerId, propertyId);
        createReview?.dataValues ?
        res.status(200).json(createReview?.dataValues)
        :res.status(404).json({message:"No se pudo crear el comentario"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
    
   
})

module.exports = router;
