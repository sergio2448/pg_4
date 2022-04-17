const {
    getbyEmail,
    getRolebyId
} = require('../middlewares/usercreate')
const { Features, Properties, Roles } = require('../db')
const { PAYPAL_API } = process.env

const isAdmin = async (userEmail) => {
    const usermatched = await getbyEmail(userEmail)
    if (usermatched === null) return false
    const userrolid = usermatched.getDataValue('roleId')
    const roleid = await getRolebyId(userrolid)
    const rolename = roleid.getDataValue("rolName")

    return rolename === 'admin' ? true : false
}

const transactionsURL = (query) => {
    const url = [`${PAYPAL_API}v1/reporting/transactions?`]
    for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
            const element = query[key];
            if (element.length > 0 && key !== "userEmail" && key !== "undefined") {
                url.push(`${key}=${element}&`)
            }
        }
    }
    return url.join('')
}

const newFeature = async (name, isNumerable) => {
    const feature = await Features.findOrCreate({
        where: { name },
        defaults: { isNumerable: isNumerable }
    })

    return feature
}

const deletefeature = async (name) => {
    const response = await Features.destroy({
        where: { name }
    })
    return response
}

const statusPromotion = async (id, status) => {
    await Properties.update({ statuspromotion: status }, {
        where: { id }
    })
}

const getUserByEmail = async (userEmail) => {
    const usermatched = await getbyEmail(userEmail)
    return usermatched
}

const getRoleByName = async (name) => {
    const role = await Roles.findOne({
        where: { rolName: name }
    })
    const roleId = role.getDataValue('id')
    return roleId
}

module.exports = {
    isAdmin,
    transactionsURL,
    newFeature,
    deletefeature,
    statusPromotion,
    getUserByEmail,
    getRoleByName
}