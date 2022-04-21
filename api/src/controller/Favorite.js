const { Favorite} = require('../db')
const { Router } = require('express');
const { postFavorite,getFavorites,deleteFavorites } = require('../middlewares/FavoriteMidd')
const router = Router();


router.post('/', async (req, res) => {
    try {
        const { buyerId, propertyId} = req.body;
        console.log(propertyId)
        const dbsearch = await Favorite.findOne({
            where:{
                propertyId:propertyId,
            }
        })
        // console.log(dbsearch)
        if(!dbsearch){
        const create=await postFavorite( buyerId, propertyId);
        create?.dataValues ?
        res.status(200).json(create?.dataValues)
        :res.status(404).json({message:"No se pudo marcar como favorito"});}
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})


router.get('/:userId', async (req, res) => {
    try {
        const {userId}= req.params;
        const listFeatures=await getFavorites(userId);
        listFeatures?.length>0?
        res.status(200).json(listFeatures)
        :res.status(404).json({message:"No se encontraron registro"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    } 
})

router.delete('/',async(req,res) =>{
    const {
        favoriteId,
        userId,
        propertyId,
      } = req.query;
    try {
        const resDelete =await deleteFavorites(favoriteId,userId,propertyId);
        if(resDelete>0){
            res.status(204).send("Se eliminó exitosamente el id: "+favoriteId);
        }else{
            res.status(500).send("No se encontro el recursos");
        }
        
    } catch (error) {
        console.log("Ocurrio un error en Review/ delete :"+error);
    }
})



module.exports = router;
