const { Properties,Features,Photos } = require('../db')
const { Op } = require("sequelize") 

const getProperties = async (id,cost,address,city,country,cp,lease) => {
    try {
        let respProperties;
        console.log(id);
        if(id || cost ||address ||city ||country ||cp ||lease){
            let objWhere={};
            id? objWhere.id=id:null;
            cost? objWhere.cost={[Op.lte]:parseInt(cost)}:null;
            cp? objWhere.cp=cp:null;
            lease? objWhere.lease=lease:null;
            address? objWhere.address={[Op.iLike]:`%${address}%`}:null;
            city? objWhere.city={[Op.iLike]:`%${city}%`}:null;
            country? objWhere.country={[Op.iLike]:`%${country}%`}:null;

            respProperties= await Properties.findAll({
                logging: console.log,
                include:[{model:Features},{model:Photos}],
                where:objWhere
            });
        }else{
            respProperties=await Properties.findAll({  include:[{model:Features},{model:Photos}]})
        }
        return respProperties;

    } catch (error) {
        console.log("Ocurrio un error en PropertiesController/ getProperties:"+error);
    }
}

module.exports ={
    getProperties
}