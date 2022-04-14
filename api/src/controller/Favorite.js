const { Router } = require('express');
const { postFavorite,getFavorites } = require('../middlewares/FavoriteMidd')
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { buyerId, propertyId} = req.body;
        const create=await postFavorite( buyerId, propertyId);
        create?.dataValues ?
        res.status(200).json(create?.dataValues)
        :res.status(404).json({message:"No se pudo marcar como favorito"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})


router.get('/:userId', async (req, res) => {
    try {
        const {userId}= req.params;
        const listFeatures=await getFavorites(userId);
        listFeatures?.length>0?
        res.status(200).json(listFeatures)
        :res.status(404).json({message:"No se encontraron registro"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    } 
})


module.exports = router;
