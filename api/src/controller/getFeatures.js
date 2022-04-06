const { Router } = require('express');
const { getFeatures } = require('../middlewares/FeaturesMidd')
const router = Router();


router.get('/', async (req, res) => {
   const listFeatures=await getFeatures();
   listFeatures?.length>0?
    res.status(200).json(listFeatures)
    :res.status(404).json({message:"No se encontraron registro"});
   
})

module.exports = router;
