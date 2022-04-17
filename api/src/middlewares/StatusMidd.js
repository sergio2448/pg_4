const { Idstatus, Properties } = require('../db')

const getStatus = async () => {
    try {
        const listdata = await Idstatus.findAll();
        return listdata;
    } catch (error) {
        console.log("Ocurrio un error en StatusMidd/ getstatus :" + error);
    }
}

const newStatus = async (name) => {
    try {
        const [status, crated] = await Idstatus.findOrCreate({
            where: { statusName: name }
        })
        return status
    } catch (error) {
        return error
    }
}

const getStatusbyName = async (name) => {
    const status = await Idstatus.findOne({
        where: { statusName: name }
    })
    const idSt = status.getDataValue("id")

    return idSt
}

const changestatus = async (idProp, name) => {
    const id = await getStatusbyName(name)
    
    const prop = await Properties.findOne({
        where: { id: idProp }
    })
    await prop.setIdstatus(id)
}
module.exports = {
    getStatus,
    newStatus,
    getStatusbyName,
    changestatus
}