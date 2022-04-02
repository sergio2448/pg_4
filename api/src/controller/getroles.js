const { Router } = require('express');
const { Roles } = require('../db')

const router = Router();

module.exports = router;

router.get('*', async (req, res) => {
    res.json(await Roles.findAll())
})

