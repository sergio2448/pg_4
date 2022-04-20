const { Reviews, Properties } = require("../db");

const postReview = async (comment, rating, buyerId, propertyId) => {
  try {
    const resultCreate = await Reviews.create({
      comment,
      rating,
      buyerId,
      propertyId,
    });
    return resultCreate;
  } catch (error) {
    console.log("Ocurrio un error en ReviewMidd/ postReview :" + error);
  }
};

const deleteReview = async (id) => {
  try {
    const resDelete = await Reviews.destroy({
      where: {
        id,
      },
    });
    return resDelete;
  } catch (error) {
    console.log("Ocurrio un error en ReviewMidd/ deleteReview:" + error);
  }
};

module.exports = {
  deleteReview,
  postReview,
};
