const { Properties, Features, Photos,Produc_Features,Idstatus,Sellers,Users,Reviews,Buyers, PromotionDetails } = require('../db')
const { Op, fn, col } = require("sequelize")
const {
    getById,
    addfeatures,
    setfeatures,
    getByIdInFeature
} = require('../middlewares/usercreate.js')
const getProperties = async (id, cost, address, city, state, country, cp, lease, propertyType, search, listFeatures) => {
    try {
        let respProperties;
        let filterSearch = {};
        if (id || cost || address || city || state || country || cp || lease || propertyType || search || listFeatures) {

            //Buscador Search
            if (search) {
                filterSearch = {
                    [Op.or]: [{
                        address:
                            { [Op.iLike]: `%${search}%` }
                    },
                    {
                        city:
                            { [Op.iLike]: `%${search}%` }
                    },
                    {
                        state:
                            { [Op.iLike]: `%${search}%` }
                    },
                    {
                        country:
                            { [Op.iLike]: `%${search}%` }
                    },
                    ]
                };
            }

            //Buqueda especifica
            id ? filterSearch.id = id : null;
            cost ? filterSearch.cost = { [Op.lte]: parseInt(cost) } : null;
            cp ? filterSearch.cp = cp : null;
            lease ? filterSearch.lease = lease : null;
            propertyType ? filterSearch.propertyType = propertyType : null;
            address ? filterSearch.address = { [Op.iLike]: `%${address}%` } : null;
            state ? filterSearch.state = { [Op.iLike]: `%${state}%` } : null;
            city ? filterSearch.city = { [Op.iLike]: `%${city}%` } : null;
            country ? filterSearch.country = { [Op.iLike]: `%${country}%` } : null;

            //Busqueda de Caracteristicas
            let objeModelFeature={model:Features};
            let nameFeatures;
            if(listFeatures?.length>0){
                nameFeatures = listFeatures.map(f => f.name);
            }
            listFeatures?.length>0 ? objeModelFeature.where={name:{[Op.in]:nameFeatures}}:null;
   
            //BUsqueda con todo lo anterior
            respProperties = await Properties.findAll({
                //logging: console.log,
                include: [objeModelFeature,
                         { model: Photos },
                         { model: Idstatus },
                         {model:Sellers,include:{model:Users}},
                         { model: Reviews,include:{model:Buyers} },
                         {model:PromotionDetails}],
                where: filterSearch
            });

            if (listFeatures) {
                let joinSearchFeatures;
                if(respProperties?.length>0){
                    //Busca que contenga todas las features solicidas
                    joinSearchFeatures=respProperties.map(properties => properties.features)
                                    .map(features => {
                                        let arrFeatures=[];
                                        let idPropertiesRes;
                                        features.forEach(element => {
                                            arrFeatures.push(element.dataValues.name)
                                            idPropertiesRes=element.dataValues.produc_features.dataValues.propertyId
                                        });
                                        return {
                                            name:arrFeatures,
                                            produc_features:idPropertiesRes
                                        }
                                    })
                                    .filter(data =>   {
                                        let resultCompare=true;
                                        listFeatures.forEach(element => {
                                            if(!data.name.includes(element.name)){
                                                resultCompare= false;
                                            }
                                        });
                                        return resultCompare;
                                    })
                    respProperties = await Properties.findAll({
                        include: [objeModelFeature,
                                    { model: Photos },
                                    { model: Idstatus },
                                    {model:Sellers,include:{model:Users}},
                                    { model: Reviews,include:{model:Buyers}},
                                    {model:PromotionDetails}],
                        where: {
                            id: joinSearchFeatures.map(data => data.produc_features)
                        }
                    });

                    //Busca que tenga el numero de elemntos de cada feature
                  return  respProperties.filter(element => {
                        let objFeature=element.dataValues.features.map(elem => elem.dataValues);
                        let contadorCoincidencia=0;
                         objFeature.filter(detalle => {
                           return listFeatures.filter(data => {
                                if(data.name===detalle.name){
                                    if(detalle.produc_features.dataValues.value>=data.value){
                                        contadorCoincidencia++
                                        return detalle.produc_features.dataValues.value>=data.value
                                    }
                                }
                            })
                        })
                        if(contadorCoincidencia==listFeatures.length){
                            return element;
                        }
                        return false;
                    });
                }
            }
        } else {
            respProperties = await Properties.findAll({ include: [{ model: Features },
                                                                 { model: Photos },
                                                                 { model: Idstatus },
                                                                 {model:Sellers,include:{model:Users}},
                                                                 { model: Reviews,include:{model:Buyers}},
                                                                 {model:PromotionDetails}
                                                                ] })
        }
        return respProperties;

    } catch (error) {
        console.log("Ocurrio un error en PropertiesController/ getProperties:" + error);
    }
};



const fillProperties = async (req, res) => {
    try {
        const { description, features, m2, address, city, state , country, cost, cp,lease,propertyType,sellerId,latitude,longitude,highlighted } = req.body;
        const resul = await Idstatus.findAll({where:{statusName:"Publicado"}})
        const idstatusId=resul.map(d => d.dataValues).map(d => d.id);
        let newProperty = await Properties.create({
            description,
            m2,
            address,
            city,
            state,
            country,
            cost,
            cp,
            lease,
            propertyType,
            sellerId,
            latitude,
            longitude,
            highlighted,
            idstatusId:idstatusId[0]
        });

        features.forEach(async element => {
            const propFeature = await Features.findAll({
                where: { name: element.name },
            });

            newProperty.addFeatures(propFeature, { through: { value: element.value } });
        });
        res.send({ message: "Propiedad creada con éxito", id: newProperty.id });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
};

const fillPhotos = async (data, id) => {
    try {
        let newPhoto = await Photos.create({
            photos: data,
            propertyId: id
        });
    } catch (error) {
        console.log(error.message);
    }
};

const deletePhotos = async (id) => {
    try {
        const deletePhotos = await Photos.destroy({
            where: {
                propertyId: id
            }
        })
        return deletePhotos;
    } catch (error) {
        console.log("Algo salio mal en PRopertiesCOntroller / deletePhotos :" + error.message);
    }
}

const updateProperties = async (values, id) => {
    await Properties.update(values, {
        where: {
            id
        }
    })
}

const addassociations = async (features, id) => {
    const propUpdate = await getById(id)
    if (features.length > 0) {
        await addfeatures(features, propUpdate)
    }
}

const removeFeature = async(id) =>{
     const res = await Produc_Features.destroy({where:{propertyId :id} });
     return res;
}

const setassociations = async (features, id) => {
    const propUpdate = await getById(id)
    console.log(features);
    console.log(">>>>>>>>>>>>>");
    if (features.length > 0) {
        await setfeatures(features, propUpdate)
    }
}
const getPhotos= async(id) =>{
    try {
        const listPhotos =await Photos.findAll({
            logging: console.log,
            where:{
                propertyId:id
            }
        });
        console.log(listPhotos);
        return listPhotos;
    } catch (error) {
        console.log("Ocurrio un error en PropertiesControllrt/ getPhotos:"+error.message);
    }
}

const deletePropeties = async(propertiId) =>{
    try {
        const listdata= await Properties.destroy({
                where:{id:propertiId}
            });
            return listdata;
    } catch (error) {
        console.log("Ocurrio un error en FavoriteMidd/ deletePropeties :"+error);
    }
}

module.exports = {
  getProperties,
  updateProperties,
  addassociations,
  setassociations,
  fillProperties,
  fillPhotos,
  deletePhotos,
  removeFeature,
  getPhotos,
  deletePropeties
};