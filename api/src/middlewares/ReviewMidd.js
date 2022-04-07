const { Reviews } = require('../db')

const postReview = async (comment,rating, buyerId, propertyId) =>{
   
    try {
        const resultCreate= await Reviews.create({comment,rating, buyerId, propertyId});
            return resultCreate;
    } catch (error) {
        console.log("Ocurrio un error en ReviewMidd/ postReview :"+error);
    }
}

module.exports={
    postReview
}