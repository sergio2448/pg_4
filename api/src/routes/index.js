const { Router } = require('express');
const axios = require('axios');
const { Op } = require('sequelize')
const { Roles, Users, BanckCards } = require('../db')
const PropertiesRoute = require('./PropertiesRoute');


const router = Router();
router.use('/Properties', PropertiesRoute);

async function insert(name, email, password, roleid) {
    const newUser = await Users.create(
        {
            name,
            email,
            password,
        }
    )
    const Role = await getRolebyId(roleid)
    await Role.addUser(newUser)
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


router.post('/user', async (req, res) => {
    const { name, email, password, roleid } = req.body
    try {
        if (await getbyEmail(email).length > 0) {
            return res.json(await getbyEmail(email))
        } else {
            await insert(name, email, password, roleid)

            return res.json(await getbyEmail(email))
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/users', async (req, res) => {
    const users = await Users.findAll();
    res.json(users)
})

router.post('/roles', async (req, res) => {
    const { id, name } = req.body
    const newUser = await Roles.create(
        {
            id,
            rolName: name
        }
    )
    return res.json(newUser)
})

router.get('/roles', async (req, res) => {
    res.json(await Roles.findAll())
})

router.post('/cards', async(req,res)=>{
    const {} = req.body
})

module.exports = router;
