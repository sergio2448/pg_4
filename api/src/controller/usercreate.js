const { Router } = require('express');
const {
    insert,
    getbyEmail
} = require('../middlewares/usercreate.js')

const router = Router();

router.post('/', async (req, res) => {
    const { name, email, password, roleid } = req.body
    try {
        if (await getbyEmail(email).length > 0) {
            return res.json(await getbyEmail(email))
        } else {
            await insert(name, email, password, roleid)

            return res.json(await getbyEmail(email))
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/update', ()=>{
    
})

module.exports = router;