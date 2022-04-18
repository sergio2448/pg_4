const { Users, Subscription } = require('../db')

const newsub = async (id) => {
    const [sub, created] = await Subscription.findOrCreate({
        where: { id }
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

const datetoISO = (dateStr) => {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const [month, date, year] = dateStr.split('/');

    const isoStr = `${year}-${padTo2Digits(month)}-${padTo2Digits(
        date,
    )}T00:00:00Z`;

    return isoStr
}

module.exports = {
    newsub,
    UpdateSub,
    getIdSub,
    getIdUser,
    Declinesub,
    datetoISO
}