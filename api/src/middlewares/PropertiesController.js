const { Properties, Features, Photos } = require('../db')
const { Op,fn,col } = require("sequelize")
const { getById } = require('../middlewares/usercreate.js')
const getProperties = async (id, cost, address, city,state, country, cp, lease, propertyType,search,listFeatures) => {
    try {
        let respProperties;
        let filterSearch={}; 
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
            propertyType? filterSearch.propertyType=propertyType:null;
            address ? filterSearch.address = { [Op.iLike]: `%${address}%` } : null;
            state ? filterSearch.state = { [Op.iLike]: `%${state}%` } : null;
            city ? filterSearch.city = { [Op.iLike]: `%${city}%` } : null;
            country ? filterSearch.country = { [Op.iLike]: `%${country}%` } : null;

            //Busqueda de Caracteristicas
            let objeModelFeature={model:Features};
            listFeatures?.length>0 ? objeModelFeature.where={name:{[Op.in]:listFeatures}}:null;
   

            respProperties = await Properties.findAll({
                logging: console.log,
                include: [objeModelFeature, { model: Photos }],
                where: filterSearch
            });

            if(listFeatures){
                let joinSearchFeatures;
                if(respProperties?.length>0){
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
                                            if(!data.name.includes(element)){
                                                resultCompare= false;
                                            }
                                        });
                                        return resultCompare;
                                    })
                                    console.log(joinSearchFeatures);
                    respProperties = await Properties.findAll({
                        include: [objeModelFeature, { model: Photos }],
                        where: {
                            id:joinSearchFeatures.map(data => data.produc_features)
                        }
                    });
                }
            }
        } else {
            respProperties = await Properties.findAll({ include: [{ model: Features }, { model: Photos }] })
        }
        return respProperties;

    } catch (error) {
        console.log("Ocurrio un error en PropertiesController/ getProperties:" + error);
    }
};



const fillProperties = async (req, res) => {
    try {
        let { description, features, m2, address, city, state , country, cost, cp,lease,propertyType,sellerId,latitude,longitude,highlighted } = req.body;
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
            highlighted
        });

        features.forEach(async element => {
            const propFeature = await Features.findAll({
                where: { name: element.name },
            });

            newProperty.addFeatures(propFeature, { through: { value: element.value } });
        });
        res.send({message:"Propiedad creada con éxito",id:newProperty.id});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
        
    }
};

const fillPhotos = async (data,id) => {
  try {
    let newPhoto = await Photos.create({
      photos: data,
      propertyId:id
    });
  } catch (error) {
    console.log(error.message);
  }
};

const deletePhotos = async (id) =>{
    try {
      const deletePhotos=  await Photos.destroy({
            where: {
                propertyId:id
            }
        })
        return deletePhotos;
    } catch (error) {
        console.log("Algo salio mal en PRopertiesCOntroller / deletePhotos :"+error.message);
    }
}

const updateProperties = async (values, id) => {

    await Properties.update(values, {
        where: {
            id
        }
    })
    
}

const addassociations = async (features/*, photos*/, id) => {
    const propUpdate = await getById(id)
    features.length > 0 && await propUpdate.addFeatures(features)
    // photos.length > 0 && await propUpdate.addPhotos(photos) //*pendiiente asociacion de fotos
}

const setassociations = async (features/*, photos*/, id) => {
    const propUpdate = await getById(id)
    features.length > 0 && await propUpdate.setFeatures(features)
    // photos.length > 0 && await propUpdate.set(features) //*pendiiente asociacion de fotos
}

module.exports = {
  getProperties,
  updateProperties,
  addassociations,
  setassociations,
  fillProperties,
  fillPhotos,
  deletePhotos
};