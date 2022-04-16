const { Users, Properties, Subscription } = require('../db')

const newsub = async (id) => {
    const sub = await Subscription.create({
        id
    })

    return sub
}

const UpdateSub = async (userid) => {
    const UserUpdate = await Users.update({ isPremium: true }, {
        where: { id: userid }
    })
    return UserUpdate
}

const getIdSub = async (sub) => {
    const subid = sub.getDataValue('id')
    return subid
}

const getIdUser = async (user) => {
    const userid = user.getDataValue('id')
    return userid
}

const Declinesub = async (userid) => {
    const UserUpdate = await Users.update({ isPremium: false }, {
        where: { id: userid }
    })
    return UserUpdate
}
module.exports = {
    newsub,
    UpdateSub,
    getIdSub,
    getIdUser,
    Declinesub
}