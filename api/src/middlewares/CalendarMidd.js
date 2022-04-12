const { Calendar,Agenda } = require('../db')

const getAgenda = async () =>{
    try {
        const listFeatures= await Agenda.findAll();
            return listFeatures;
    } catch (error) {
        console.log("Ocurrio un error en CalendarMidd/ getAgenda :"+error);
    }
}


const postCalendar = async (date,role, propertyId, userId, agendaId) =>{
    try {
        const resultCreate= await Calendar.create({date,role, propertyId, userId, agendaId});
            return resultCreate;
    } catch (error) {
        console.log("Ocurrio un error en ReviewMidd/ postCalendar :"+error);
    }
}



module.exports={
    getAgenda,
    postCalendar
}
