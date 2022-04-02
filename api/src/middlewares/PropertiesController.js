const { Properties, Features, Photos } = require('../db')
const { Op } = require("sequelize")
const { getById } = require('../middlewares/usercreate.js')
const getProperties = async (name) => {
    try {
        let respProperties;
        if (name) {
            respProperties = await Properties.findAll({
                include: [{ model: Features }, { model: Photos }],
                where: {
                    name: name.toLowerCase(),
                }
            });
        } else {
            respProperties = await Properties.findAll({ include: [{ model: Features }, { model: Photos }] })
        }
        return respProperties;

    } catch (error) {
        console.log("Ocurrio un error en PropertiesController/ getProperties:" + error);
    }
}

const updateProperties = async (values, id) => {

    const response = await Properties.update(values, {
        where: { id }
    })
    // const propUpdate = await getById(id)
    // console.log(propUpdate.__proto__)
    // console.log(await propUpdate.getSeller())
    return response
}

const addassociations = async (features, photos, id) => {
    const propUpdate = await getById(id)
    features.length > 0 && await propUpdate.addFeatures(features)
    // photos.length > 0 && await propUpdate.addPhotos(photos) //*pendiiente asociacion de fotos
}

const setassociations = async (features, photos, id) => {
    const propUpdate = await getById(id)
    features.length > 0 && await propUpdate.setFeatures(features)
    // photos.length > 0 && await propUpdate.set(features) //*pendiiente asociacion de fotos
}

module.exports = {
    getProperties,
    updateProperties,
    addassociations,
    setassociations,
}