const { Router } = require('express');
const { postCalendar,getCalendar,deleteCalendar } = require('../middlewares/CalendarMidd')
const router = Router();

router.post('/', async (req, res) => {
    try {
        const { dates,hour,type, propertyId, userId} = req.body;
        const createDate=await postCalendar(dates,hour,type, propertyId, userId);
        createDate?.dataValues ?
        res.status(200).json(createDate?.dataValues)
        :res.status(404).json({message:"No se pudo crear la cita."});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

router.get('/:userId', async (req, res) => {
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

router.delete('/:id',async(req,res) =>{
    const {id} = req.params;
    try {
        const resDelete =await deleteCalendar(id);
        if(resDelete>0){
            res.status(204).send("Se eleiminó exitosamente el id: "+id);
        }else{
            res.status(500).send("No se encontro el recuros");
        }
        
    } catch (error) {
        console.log("Ocurrio un error en BdPokemonConstroller/ Pokemon /deletePokemon:"+error);
    }
})

module.exports = router;
