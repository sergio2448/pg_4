const express = require("express");
const { getProperties }  =require('../controller/PropertiesController')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const {id,cost,address,city,country,cp,lease}= req.query;
        const result = await getProperties(id,cost,address,city,country,cp,lease);
        if(result?.length> 0){
            return res.json(result) ;
        }else{
            return res.status(404).json({message:"No se encontraron registros"});
        }
    } catch (error) {
        console.log("Ocurrio un error en PropertiesRoute / get :"+error);
    }
})

module.exports = router;
