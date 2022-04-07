const { Router } = require('express');
const { postSeller } = require('../middlewares/SellerMidd')
const { insert } = require('../middlewares/usercreate')
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { firstName,lastName,nickName,email,image,roleid,phoneNumber,dateBirth} = req.body;

        const newUser=await insert(nickName, email, image, roleid);
        
        const createReview=await postSeller(firstName,lastName,phoneNumber,dateBirth,email);
        console.log(createReview);

        createReview?.dataValues ?
        res.status(200).json(createReview?.dataValues)
        :res.status(404).json({message:"No se pudo crear el usuario"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }

})

module.exports = router;
