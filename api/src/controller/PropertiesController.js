const { Properties, Features, Photos } = require("../db");
const { Op } = require("sequelize");

const getProperties = async (name) => {
  try {
    let respProperties;
    if (name) {
      respProperties = await Properties.findAll({
        include: [{ model: Features }, { model: Photos }],
        where: {
          name: name.toLowerCase(),
        },
      });
    } else {
      respProperties = await Properties.findAll({
        include: [{ model: Features }, { model: Photos }],
      });
    }
    return respProperties;
  } catch (error) {
    console.log(
      "Ocurrio un error en PropertiesController/ getProperties:" + error
    );
  }
};

const fillProperties = async (req, res) => {
  try {
    let { description, m2, address, city, country, cost, cp, lease } = req.body;
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
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getProperties,
  fillProperties
};
