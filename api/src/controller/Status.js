const { Router } = require('express');
const { getStatus } = require('../middlewares/StatusMidd')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const listData=await getStatus();
        listData?.length>0?
        res.status(200).json(listData)
        :res.status(404).json({message:"No se encontraron registro"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    } 
})


module.exports = router;
