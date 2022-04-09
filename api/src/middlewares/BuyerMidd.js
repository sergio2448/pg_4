const { Buyers } = require('../db')
const { getbyEmail } = require('./usercreate')

const postBuyer = async (firstName,lastName,phoneNumber,dateBirth,email) =>{
   
    try {
        const resultCreate= await Buyers.create({firstName,lastName,phoneNumber,dateBirth});
        const user = await getbyEmail(email)
        await user.addBuyer(resultCreate)
            return Buyers.findByPk(resultCreate?.dataValues.id) ;
    } catch (error) {
        console.log("Ocurrio un error en SellerMidd/ postSeller :"+error);
    }
}

module.exports = {
    postBuyer
}