const { Features } = require('../db')

const getFeatures = async () =>{
    try {
        const listFeatures= await Features.findAll();
            return listFeatures;
    } catch (error) {
        console.log("Ocurrio un error en FeatureMidd/ getFeatures :"+error);
    }
}

module.exports={
    getFeatures
}
