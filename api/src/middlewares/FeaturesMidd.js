const { Features } = require('../db')

const getFeatures = async () => {
    try {
        const listFeatures = await Features.findAll({
            order:[['isNumerable', 'ASC']],
            attributes: ["name", "isNumerable"]
        });
        return listFeatures;
    } catch (error) {
        console.log("Ocurrio un error en FeatureMidd/ getFeatures :" + error);
    }
}
const getNumerableFeatures = async (condition) => {
    try {
        const listFeatures = await Features.findAll({
            attributes: ["name", "isNumerable"],
            where: {
                isNumerable: condition
            }
        });
        return listFeatures;
    } catch (error) {
        console.log("Ocurrio un error en FeatureMidd/ getFeatures :" + error);
        res.status(404).json(error)
    }
}

module.exports = {
    getFeatures,
    getNumerableFeatures
}
