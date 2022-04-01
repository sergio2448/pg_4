const { Properties, Features, Photos } = require("../db");
const { Op } = require("sequelize");

const getProperties = async (id,cost,address,city,country,cp,lease,search) => {
    try {
        let respProperties;
        let filterSearch;
        if(id || cost ||address ||city ||country ||cp ||lease || search){
           
            if(search){
                filterSearch={[Op.or]: [{address:
                            {[Op.iLike]:`%${search}%`}
                        },
                        {city:
                            {[Op.iLike]:`%${search}%`}
                        },
                        {country:
                            {[Op.iLike]:`%${search}%`}
                        },]
                    };
            }
    
            id? filterSearch.id=id:null;
            cost? filterSearch.cost={[Op.lte]:parseInt(cost)}:null;
            cp? filterSearch.cp=cp:null;
            lease? filterSearch.lease=lease:null;
            address? filterSearch.address={[Op.iLike]:`%${address}%`}:null;
            city? filterSearch.city={[Op.iLike]:`%${city}%`}:null;
            country? filterSearch.country={[Op.iLike]:`%${country}%`}:null;

            respProperties= await Properties.findAll({
                // logging: console.log,
                include:[{model:Features},{model:Photos}],
                where:filterSearch
            });
        }else{
            respProperties=await Properties.findAll({  include:[{model:Features},{model:Photos}]})
        }
        return respProperties;

    } catch (error) {
        console.log("Ocurrio un error en PropertiesController/ getProperties:"+error);
    }
};

const fillProperties = async (req, res) => {
  try {
    let { description, features, m2, address, city, country, cost, cp, lease } = req.body;
    let newProperty = await Properties.create({
      description,
      m2,
      address,
      city,
      country,
      cost,
      cp,
      lease,
    });
    let propertyFeature = await Features.findAll({
      where: { name: features },
    });
    newProperty.addFeatures(propertyFeature);
    res.send("Propiedad creada con éxito");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getProperties,
  fillProperties,
};
