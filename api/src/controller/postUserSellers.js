const { Router } = require('express');
const { postSeller } = require('../middlewares/SellerMidd')
const { postBuyer } = require('../middlewares/BuyerMidd')
const { insert } = require('../middlewares/usercreate')
const { getbyEmail, getUserBanedbyEmail } = require('../middlewares/usercreate')
const { Roles, Sellers } = require('../db');
const sellers = require('../models/Sellers');
const router = Router();

const ROL_SELLER="seller";
const ROL_BUYER="buyer";

router.get('/:email',async (req, res)=>{
    const {email}= req.params;
    const userexistente = await getbyEmail(email)
    let resp;
    if(userexistente===null){
        res.status(200).json({result:"Sin Registros"})
    }
    else{
        res.status(200).json({result:"Existente",user:userexistente})
    }
})

router.post('/', async (req, res) => {
    try {
        const { firstName,lastName,nickName,email,image,phoneNumber,role,dateBirth} = req.body;
        
        const userbaned = await getUserBanedbyEmail(email)
        console.log(userbaned)
        if(userbaned) return res.status(404).send("Este usuario está baneado")
        
        const userexistente = await getbyEmail(email)
        let seller;
        if(userexistente===null){
            const idRol=await Roles.findAll({where:{rolName:"seller"} })
            console.log(idRol[0]?.dataValues?.id);
            const newUser=await insert(nickName, email, image, idRol[0]?.dataValues?.id);
            let createReview =await postSeller(firstName,lastName,phoneNumber,dateBirth,email);
                createReview = await postBuyer(firstName,lastName,phoneNumber,dateBirth,email)
            
            
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
router.put('/updateData', async (req, res) => {
    try{
    const { firstName,lastName,nickName,id,dateBirth,phoneNumber, country} = req.body;
    
   
    const userexistente = await Sellers.findOne({
        where:{
            userId:id
        }

    })
    console.log(userexistente)
    userexistente.firstName = firstName
    userexistente.lastName = lastName
    userexistente.phoneNumber = phoneNumber
    userexistente.dateBirth = dateBirth
    userexistente.country = country
    await userexistente.save()
    res.send(userexistente)}

    catch(error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})

router.post('/phoneNumber', async (req, res) => {
    try {
        const { id, phoneNumber } = req.body;
        const userexistente = await Sellers.findOne({
            where: {
                userId: id
            }
        })
        userexistente.phoneNumber = phoneNumber
        await userexistente.save()
        res.send(userexistente)
    } catch (error) {
        res.send(error.message)
    }

})

module.exports = router;
