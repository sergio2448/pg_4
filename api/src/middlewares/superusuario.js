const axios = require("axios")
const { isAdmin, transactionsURL, newFeature, deletefeature } = require('../middlewares/authadmin.js')
const { datetoISO } = require('./AddSubscription.js')
const authtoken = require('../middlewares/authtoken.js')
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
        req.query.start_date = datetoISO(start_date)
        req.query.end_date = datetoISO(end_date)
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

const deleteprop = (req, res) => {

    res.status(200).json("propieda eliminada")
}

const setRoleAdmin = (req, res) => {

    res.status(200).json("status cambiado")
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
module.exports = {
    getUser,
    suspenduser,
    deleteprop,
    setRoleAdmin,
    transactions,
    addFeature,
    deleteFeature
}