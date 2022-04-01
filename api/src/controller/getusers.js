const { Router } = require('express');
const { Users } = require('../db')

const router = Router();

module.exports = router;

router.get('*', async (req, res) => {
    const users = await Users.findAll();
    res.json(users)
})
