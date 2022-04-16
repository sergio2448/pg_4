const { Favorite,Properties,Buyers,Idstatus } = require('../db')

const postFavorite = async (buyerId,propertyId) =>{
   
    try {
        const resultCreate= await Favorite.create({buyerId,propertyId});
            return resultCreate;
    } catch (error) {
        console.log("Ocurrio un error en FavoriteMidd/ postFavorite :"+error);
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

const deleteFavorites = async (id,userId,propertyId) =>{
    try {
        let listdata
        if(id){
            listdata= await Favorite.destroy({ where:{id}});
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