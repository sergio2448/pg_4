const { Router } = require('express');
const { postSeller } = require('../middlewares/SellerMidd')
const { insert } = require('../middlewares/usercreate')
const { getbyEmail } = require('../middlewares/usercreate')
const { Roles } = require('../db')
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { firstName,lastName,nickName,email,image,phoneNumber,dateBirth} = req.body;
        
        const userexistente = await getbyEmail(email)
        let seller;
        if(userexistente===null){
            const idRol=await Roles.findAll({where:{rolName:"seller"} })
            console.log(idRol[0]?.dataValues?.id);
            const newUser=await insert(nickName, email, image, idRol[0]?.dataValues?.id);
            const createReview=await postSeller(firstName,lastName,phoneNumber,dateBirth,email);
            if(createReview?.dataValues ){
                seller=createReview?.dataValues;
                res.status(200).json({result:"Nuevo",seller})
            }else{
                res.status(404).json({message:"No se pudo crear el usuario"});
            }            
        }else{
            seller=userexistente;
            res.status(200).json({result:"Existente",seller})
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }

})

module.exports = router;
