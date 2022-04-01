const { Roles, Users, BanckCards } = require('../../db')

async function insert(name, email, password, roleid) {
    try {
        const newUser = await Users.create(
            {
                name,
                email,
                password,
            }
        )
        const Role = await getRolebyId(roleid)
        await Role.addUser(newUser)
    } catch (err) {
        return err
    }

}

async function getbyEmail(pEmail) {
    const matched = await Users.findOne({
        where: {
            email: pEmail
        }
    })
    return matched
}

async function getRolebyId(id) {
    const role = await Roles.findByPk(id)
    return role
}

async function findByName(name, card) {
    const usercurrent = await Users.findOne({
        where: { name }
    })

    await usercurrent.addBanckCard(card)
    return usercurrent

}


module.exports = {
    insert,
    getbyEmail,
    findByName
}