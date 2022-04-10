const {
    getUserById,
    getEmailUser,
    getUserName
} = require('../middlewares/usercreate.js')

const userdata = async (userid) => {
    const user = await getUserById(userid)
    const emailUser = await getEmailUser(user)
    const userName = await getUserName(user)

    return {
        emailUser,
        userName
    }
}

module.exports = userdata