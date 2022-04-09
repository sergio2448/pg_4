const { Sellers,Users,Roles,Properties,Photos,Features,BanckCards } = require('../db')
const { getbyEmail } = require('./usercreate')

const postSeller = async (firstName,lastName,phoneNumber,dateBirth,email) =>{ 
    try {
        const resultCreate= await Sellers.create({firstName,lastName,phoneNumber,dateBirth});
        const user = await getbyEmail(email)
        await user.addSeller(resultCreate)
            return Sellers.findByPk(resultCreate?.dataValues.id) ;
    } catch (error) {
        console.log("Ocurrio un error en SellerMidd/ postSeller :"+error);
    }
}


module.exports = {
    postSeller,
}