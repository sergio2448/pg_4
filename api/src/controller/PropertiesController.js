const { Properties,Features,Photos } = require('../db')
const { Op } = require("sequelize") 

const getProperties = async (name) => {
    try {
        let respProperties;
        if(name){
            respProperties= await Properties.findAll({
                include:[{model:Features},{model:Photos}],
                where:{
                    name:name.toLowerCase(),
                }
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