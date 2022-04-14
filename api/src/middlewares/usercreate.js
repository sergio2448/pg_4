const { Roles, Users, BanckCards, Properties, Features, Photos ,Sellers,Buyers,Sales, Subscription} = require('../db')
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
        // include:[{ model: Roles }],
        include:[{model:Roles}
            ,{model:Sellers,
                include:{model:Properties,include:[{model:Photos},{model:Features} ]}}
            ,{model:BanckCards}
            ,{model:Buyers,include:{model:Sales}}
            ,{model:Subscription}
        ],
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

async function getByIdInFeature(id) {
    const Property = await Properties.findByPk(id, {
        include: [{ model: Features }]
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

async function addfeatures(features, newProperty) {

    features.forEach(async ({name, value}) => {
        const propFeature = await Features.findAll({
            where: { name },
        });
        newProperty.addFeatures(propFeature, { through: { value } });
    })
}
async function setfeatures(features, newProperty) {
    features.forEach(async ({ name, value }) => {
        const propFeature = await Features.findAll({
            where: { name },
        });
        newProperty.addFeatures(propFeature, { through: { value } });
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
    addfeatures,
    setfeatures,
    getUserById,
    getEmailUser,
    getUserName,
    getByIdInFeature
}