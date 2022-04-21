const axios = require('axios')
const {
    getbyEmail,
    getRolebyId
} = require('../middlewares/usercreate')
const { Roles, Users, BanckCards, Properties, Features, Photos, Sellers, Buyers, Sales, Idstatus, Subscription, BannedUsers } = require('../db')
const { PAYPAL_API } = process.env
const hostback = "https://new-pg.herokuapp.com"


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

const allUserDB = async () => {
    const users = await Users.findAll({
        include: [{ model: Roles }
            , {
            model: Sellers,
            include: { model: Properties, include: [{ model: Photos }, { model: Features }, { model: Idstatus }] }
        }
            , { model: BanckCards }
            , { model: Buyers, include: { model: Sales } }
            , { model: Subscription }
        ],
    });
    return users
}

const banUser = async (userId) => {
    const matched = await Users.findOne({
        where: { id: userId }
    });

    const { id, name, email, image, isPremium, roleId } = matched

    const addBanedtable = await BannedUsers.create({
        id, name, email, image, isPremium, roleId
    })

    const action = await matched.destroy()

    return action

}

const suprProp = async (id) => {
    const Prop = await Properties.findOne({
        where: { id }
    })
    const seller = await Prop.getSeller()
    const user = await seller.getUser()
    const email = user.getDataValue("email")
    const nameUser = user.getDataValue("name")
    
    const supProp = await Properties.destroy({
        where: { id }
    })
    await axios.post(`${hostback}/send-email/deletprop/${email}?nameUser=${nameUser}`)
    return supProp
}
module.exports = {
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
}