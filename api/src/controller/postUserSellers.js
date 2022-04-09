const { Router } = require('express');
const { postSeller } = require('../middlewares/SellerMidd')
const { postBuyer } = require('../middlewares/BuyerMidd')
const { insert } = require('../middlewares/usercreate')
const { getbyEmail } = require('../middlewares/usercreate')
const { Roles } = require('../db')
const router = Router();

router.get('/:email',async (req, res)=>{
    const {email}= req.params;
    const userexistente = await getbyEmail(email)
    if(userexistente===null){
        res.status(200).json({result:"Sin Registros"})
    }
    else{
        res.status(200).json({result:"Existente",seller:userexistente})
    }
})

router.post('/', async (req, res) => {
    try {
        const { firstName,lastName,nickName,email,image,phoneNumber,role,dateBirth} = req.body;
        
        const userexistente = await getbyEmail(email)
        let seller;
        if(userexistente===null){
            const idRol=await Roles.findAll({where:{rolName:role} })
            console.log(idRol[0]?.dataValues?.id);
            const newUser=await insert(nickName, email, image, idRol[0]?.dataValues?.id);
            let createReview
            if(role==="seller"){
                createReview =await postSeller(firstName,lastName,phoneNumber,dateBirth,email);
            }
            if(role==="buyer"){
                createReview = await postBuyer(firstName,lastName,phoneNumber,dateBirth,email)
            }
            
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
