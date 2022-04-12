const { Router } = require('express');
const { getAgenda } = require('../middlewares/CalendarMidd')
const router = Router();


router.get('/', async (req, res) => {
    try {
        const listAgebda=await getAgenda();
        listAgebda?.length>0?
        res.status(200).json(listAgebda)
        :res.status(404).json({message:"No se encontraron registro"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   
   
})

module.exports = router;
