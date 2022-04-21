const { Favorite,Properties,Buyers,Idstatus } = require('../db')

const postFavorite = async (buyerId,propertyId) =>{
   
    let prop = await Favorite.findOne({ where: { buyerId: buyerId, propertyId: propertyId} });
    if(!prop){
        const resultCreate = await Favorite.create({buyerId,propertyId});
            return resultCreate;
    }else{
        return null;
    }
}

const getFavorites = async (userId) =>{
    try {
        const listdata= await Buyers.findAll({
            //logging: console.log,
            include:[{model:Favorite,include:{model:Properties,include:{model:Idstatus}}}],
            where:{userId}});
            return listdata;
    } catch (error) {
        console.log("Ocurrio un error en FavoriteMidd/ getFavorites :"+error);
    }
}

const deleteFavorites = async (favoriteId,userId,propertyId) =>{
    try {
        let listdata
        if(favoriteId){
            listdata= await Favorite.destroy({ where:{id:favoriteId}});
            
        }else{
            const dataBuyer= await Buyers.findAll({where:{userId}})
            const buyerId=dataBuyer.map(d => d.dataValues.id);
            console.log(buyerId);
            listdata= await Favorite.destroy({
                where:{buyerId,propertyId}
            });
        }
         
            return listdata;
    } catch (error) {
        console.log("Ocurrio un error en FavoriteMidd/ getFavorites :"+error);
    }
}

module.exports={
    postFavorite,
    getFavorites,
    deleteFavorites
}