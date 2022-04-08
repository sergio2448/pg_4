const { Roles, Users, BanckCards, Properties, Features, Photos } = require('../db')
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

async function getUserById(id){
    const user = await Users.findByPk(id)
    return user
}

function getEmailUser(user){
    const email = user.getDataValue('email')
    return email
}

function getUserName(user){
    const name = user.getDataValue('name')
    return name
}
module.exports = {
    insert,
    getbyEmail,
    findByName,
    getById,
    addphoto,
    getUserById,
    getEmailUser,
    getUserName
}