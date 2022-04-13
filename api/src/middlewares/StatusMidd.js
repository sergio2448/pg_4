const { Idstatus } = require('../db')

const getStatus = async () =>{
    try {
        const listdata= await Idstatus.findAll();
            return listdata;
    } catch (error) {
        console.log("Ocurrio un error en StatusMidd/ getstatus :"+error);
    }
}

module.exports={
    getStatus
}