const express = require("express");
const {
    getProperties,
    updateProperties,
    setassociations,
    addassociations,
    fillProperties
} = require('../middlewares/PropertiesController')
// const {addphoto} = require('../middlewares/usercreate.js')
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const {id,cost,address,city,country,cp,lease,search}= req.query;
        const result = await getProperties(id,cost,address,city,country,cp,lease,search);
        if(result?.length> 0){
            return res.json(result) ;
        }else{
            return res.status(404).json({message:"No se encontraron registros"});
        }
    } catch (error) {
        console.log("Ocurrio un error en PropertiesRoute / get :"+error);
    }
});

router.post("/pro", fillProperties);

//! ----------------  En contrucción----------------//
router.put('/put/:id', async (req, res) => {
    const { override } = req.query
    const { id } = req.params
    const { features /*, photos*/ } = req.body
    try {
        let values = {};
        for (let key in req.body) {
            if (key !== 'features' || key !== 'photos') {
                (req.body[key].length > 0) && (values[key] = req.body[key])
            }
        }
        // await addphoto(photos) //*pendiiente asociacion de fotos
        await updateProperties(values, id)
        if (override === 'true') {
            setassociations(features /*, photos*/, id)
        } else if (override === 'false') {
            await addassociations(features /*, photos*/, id)
        }
        return res.json({ status: 'update' })
    } catch (error) {
        return res.status(404).json(error)
    }

})
//! ----------------^^^^^----------------//
module.exports = router;
