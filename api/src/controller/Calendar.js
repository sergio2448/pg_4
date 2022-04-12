const { Router } = require('express');
const { postCalendar,getCalendar } = require('../middlewares/CalendarMidd')
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { date,role, propertyId, userId, agendaId} = req.body;
        const createDate=await postCalendar(date,role, propertyId, userId, agendaId);
        createDate?.dataValues ?
        res.status(200).json(createDate?.dataValues)
        :res.status(404).json({message:"No se pudo crear la cita"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

router.get('/:idUser', async (req, res) => {
    try {
        const {userId}= req.params;
        const listCalendar=await getCalendar(userId);
        listCalendar?.length>0?
        res.status(200).json(listCalendar)
        :res.status(404).json({message:"No se encontraron registro"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
   
   
})


module.exports = router;
