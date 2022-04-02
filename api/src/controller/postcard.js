const { Router } = require('express');
const { BanckCards } = require('../db')
const {
    findByName
} = require('../middlewares/usercreate.js')
const router = Router();

module.exports = router;

router.post('*', async (req, res) => {
    const { holderName, cardNumber, expirationDate, cvv } = req.body
    const [newCard, created] = await BanckCards.findOrCreate({
        where: {
            holderName,
            cardNumber,
            expirationDate,
            cvv
        }
    })
    //* por ahora se asocia por el nombre del porpietario de la targeta y el propietario de la cuenta pero esto no debe ser así
    await findByName(holderName, newCard)
    res.json({ card: newCard, status: created })
})
