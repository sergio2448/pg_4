const { Roles, Users, BanckCards, Properties, Features, Photos } = require('../db')
async function insert(name, email, image, roleid) {
    try {
        const newUser = await Users.create(
            {
                name,
                email,
                image,
            }
        )
        const Role = await getRolebyId(roleid)
        await Role.addUser(newUser)
        return newUser
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

async function getById(id) {
    const Property = await Properties.findByPk(id, {
        include: [{ model: Features }, { model: Photos }]
    })
    return Property
}

async function addphoto(photo) {
    photo.map((value) => {
        Photos.findOrCrate({
            where: { photos: value }
        })
    })
}
module.exports = {
    insert,
    getbyEmail,
    findByName,
    getById,
    addphoto
}