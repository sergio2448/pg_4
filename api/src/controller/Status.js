const { Router } = require('express');
const { getStatus, newStatus, changestatus } = require('../middlewares/StatusMidd')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const listData = await getStatus();
        listData?.length > 0 ?
            res.status(200).json(listData)
            : res.status(404).json({ message: "No se encontraron registro" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.post('/createstatus', async (req, res) => {
    try {
        const { name } = req.body
        const response = await newStatus(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/updateStatus', async (req, res) => {
    try {
        const { idProp, status } = req.query
        await changestatus(idProp, status)

        res.status(200).json("cambiado")
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
