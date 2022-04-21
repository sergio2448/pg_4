const axios = require("axios")
const {
    isAdmin,
    transactionsURL,
    newFeature,
    deletefeature,
    statusPromotion,
    getUserByEmail,
    getRoleByName,
    allUserDB,
    banUser,
    suprProp
} = require('./authadmin')
const { changestatus } = require('./StatusMidd')
const { removeFeature, setassociations, addassociations } = require('./PropertiesController')
const { datetoISO } = require('./AddSubscription.js')
const authtoken = require('../middlewares/authtoken.js')
const host = 'https://new-pg.herokuapp.com/'
const getUser = async (req, res) => {
    try {
        const { userEmail } = req.query
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')

    } catch (error) {
        res.status(500).json(error)
    }
}

const transactions = async (req, res) => {
    const { start_date, end_date, userEmail } = req.query
    try {
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        if (start_date.length === 0 && end_date.length === 0) {
            req.query.start_date =  new Date(new Date()- 730*60*60*1000).toISOString()
            req.query.end_date = new Date().toISOString()
        } else {
            req.query.start_date = datetoISO(start_date)
            req.query.end_date = datetoISO(end_date)
        }


        const url = transactionsURL(req.query)
        const access_token = await authtoken()
        const { data } = await axios.get(`${url}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }

}

const suspenduser = (req, res) => {

    res.status(200).json("usuario suspendido")
}

const deleteprop = async (req, res) => {
    try {
        const { id, adminEmail } = req.query
        const rolename = await isAdmin(adminEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const suprimir = await suprProp(id)
        res.status(200).json("propieda eliminada")
    } catch (error) {
        console.log("error en deleteProp" + error)
        res.status(500).json(error)
    }

}

const setRoleAdmin = async (req, res) => {
    try {
        const { adminEmail, userEmail, role } = req.query
        const rolename = await isAdmin(adminEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const usermatched = await getUserByEmail(userEmail)
        const setrole = await getRoleByName(role)
        console.log(setrole)
        await usermatched.setRole(setrole)
        res.status(200).json("status cambiado")
    } catch (error) {
        res.status(500).json(error)
    }

}

const addFeature = async (req, res) => {
    const { userEmail } = req.query
    const { nameFeature, isNumerable } = req.body
    try {
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const [response, created] = await newFeature(nameFeature, isNumerable)
        if (!created) return res.sendStatus(304)
        res.status(200).json({ response, created })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteFeature = async (req, res) => {
    const { nameFeature, userEmail } = req.query
    try {
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const response = await deletefeature(nameFeature)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

const statusProp = async (req, res) => {
    const { idProp, userEmail, status } = req.body
    try {
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')

        await statusPromotion(idProp, status)

        res.status(200).json({ msg: "Status actualizado" })
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllProps = async (req, res) => {
    try {
        const { adminEmail } = req.body
        const rolename = await isAdmin(adminEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const allProps = await Properties.findAll({
            include: [{ model: Features },
            { model: Photos },
            { model: Idstatus },
            { model: Sellers, include: { model: Users } },
            { model: Reviews, include: { model: Buyers } }]
        })
        res.status(200).json(allProps)
    } catch (error) {
        res.status(500).json(error)
    }

}

const upProp = async (req, res) => {
    try {
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const { id, override } = req.query
        const { data } = await axios.put(`${host}/Properties/${id}?override=${override}`, { ...req.body })
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateStatus = async (req, res) => {
    try {
        const { idProp, status, userEmail } = req.query
        const rolename = await isAdmin(userEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        await changestatus(idProp, status)

        res.status(200).json("cambiado")
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateFeatures = async (req, res) => {
    const { override } = req.query
    const { id } = req.params
    const { features } = req.body
    try {
        if (override === 'true') {
            await removeFeature(id);
            setassociations(features, id)
        } else if (override === 'false') {
            await addassociations(features, id)
        }
        return res.json({ status: 'update' })
    } catch (error) {
        return res.status(404).json(error)
    }
}

const getUsers = async (req, res) => {
    try {
        const { adminEmail } = req.query
        const rolename = await isAdmin(adminEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para acceder a la información')
        const users = await allUserDB()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }

}

const deleteUser = async (req, res) => {
    try {
        const { adminEmail, userId } = req.query
        const rolename = await isAdmin(adminEmail)
        if (!rolename) return res.status(403).json('No tiene autorización para realizar la acción')
        const baned = await banUser(userId)
        console.log(baned)
        res.status(200).json({ msg: "Usuario baneado exitosamente" })
    } catch (error) {
        res.status(500).json(error)
    }

}
module.exports = {
    getUser,
    suspenduser,
    deleteprop,
    setRoleAdmin,
    transactions,
    addFeature,
    deleteFeature,
    statusProp,
    upProp,
    updateStatus,
    updateFeatures,
    getUsers,
    deleteUser,
    getAllProps
}