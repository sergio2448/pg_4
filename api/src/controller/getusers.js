const { Router } = require('express');
const { Users } = require('../db')
const { getById } = require('../middlewares/usercreate.js')

const router = Router();

module.exports = router;

router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    res.json(await getById(id))
})