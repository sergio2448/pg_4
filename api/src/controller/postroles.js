const { Router } = require('express');
const { Roles } = require('../db')

const router = Router();

module.exports = router;

router.post('*', async (req, res) => {
    const { id, name } = req.body
    const newUser = await Roles.create(
        {
            id,
            rolName: name
        }
    )
    return res.json(newUser)
})
