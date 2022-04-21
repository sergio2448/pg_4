const { Router } = require('express');
const { getAgenda, postAgenda } = require('../middlewares/CalendarMidd')
const { Agenda } = require("../db")
const router = Router();


router.put('/', async (req, res) => {
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
        const { place,dates,hours, sellerId, buyerId, propertyId} = req.body;
        const createCita = await postAgenda(place, dates,hours,sellerId, buyerId, propertyId);
        createCita?.dataValues ?
        res.status(200).json(createCita?.dataValues)
        :res.status(404).json({message:"No se pudo crear la cita."});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

router.put('/status', async (req, res) => {
    try {
        const { id, status } = req.body;
        const changeStatus = await Agenda.findByPk(id);
        console.log(changeStatus)
        if(changeStatus) {
            changeStatus.status = status
            await changeStatus.save()
        }
        res.status(200).send({
            status: "ok",
            changeStatus
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

module.exports = router;
