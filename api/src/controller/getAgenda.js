const { Router } = require('express');
const { getAgenda, postAgenda } = require('../middlewares/CalendarMidd')
const router = Router();


router.get('/', async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);
        const listAgebda=await getAgenda(userId);
        listAgebda?.length>0?
        res.status(200).json(listAgebda)
        :res.status(404).json({message:"No se encontraron registro"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   
   
})

router.post('/', async (req, res) => {
    try {
        const { place,dates,hours, sellerId, buyerId} = req.body;
        const createCita = await postAgenda(place, dates,hours,sellerId, buyerId);
        createCita?.dataValues ?
        res.status(200).json(createCita?.dataValues)
        :res.status(404).json({message:"No se pudo crear la cita."});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

module.exports = router;
