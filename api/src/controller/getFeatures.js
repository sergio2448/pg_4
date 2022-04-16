const { Router } = require('express');
const { getFeatures, getNumerableFeatures } = require('../middlewares/FeaturesMidd')
const router = Router();


router.get('/', async (req, res) => {
    try {
        const listFeatures = await getFeatures();
        listFeatures?.length > 0 ?
            res.status(200).json(listFeatures)
            : res.status(404).json({ message: "No se encontraron registro" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

router.get('/numerable', async (req, res) => {
    const { condition } = req.query
    try {
        const listFeatures = await getNumerableFeatures(condition);
        listFeatures?.length > 0 ?
            res.status(200).json(listFeatures)
            : res.status(404).json({ message: "No se encontraron registro" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

module.exports = router;
