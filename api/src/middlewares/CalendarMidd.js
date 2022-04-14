const { Calendar,Agenda,Properties,Sellers,User } = require('../db')

const getAgenda = async () =>{
    try {
        const listAgenda= await Agenda.findAll();
            return listAgenda;
    } catch (error) {
        console.log("Ocurrio un error en CalendarMidd/ getAgenda :"+error);
    }
}


const postCalendar = async (dates,hour,type, propertyId, userId) =>{
    try {
        let resultCreate;
        if(type==="inabil"){
            resultCreate= await Calendar.create({dates,hour,type, propertyId, userId});
        }else{
            resultCreate= await Calendar.create({dates,hour,type, propertyId, userId});
            const agendaSeller=await Properties.findAll({include:[{model:Sellers,inlcude:{model:User}}],where:{id:propertyId}})
            console.log(agendaSeller); 
            
        }
        
            return resultCreate;
    } catch (error) {
        console.log("Ocurrio un error en ReviewMidd/ postCalendar :"+error);
    }
}

const getCalendar = async (userId) =>{
    try {
        const listCalendar= await Calendar.findAll({
            where:{userId}});
            return listCalendar;
    } catch (error) {
        console.log("Ocurrio un error en CalendarMidd/ getCalendar :"+error);
    }
}



module.exports={
    getAgenda,
    postCalendar,
    getCalendar
}
