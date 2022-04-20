const { Router } = require('express');
const { getAgenda, postAgenda } = require('../middlewares/CalendarMidd')
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { idSeller, idBuyer } = req.body;
        console.log(idSeller, idBuyer);
        const listAgebda=await getAgenda(idSeller, idBuyer);
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
