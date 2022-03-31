const { Router } = require('express');
const axios = require('axios');
const { Op } = require('Sequelize')
const { Roles, Users, BanckCards } = require('../db')


const router = Router();

async function insert(name, email, password, roleid) {
    const [newUser, create] = await Users.create(
        {
            name,
            email,
            password,
         
        },
    )
    
    //     console.log(roleid)
    //     console.log(newUser)
    //     await newUser.addRoles(roleid)
    //     return newUser
    
}


async function getbyEmail(pEmail) {
    const matched = await Users.findAll({
        where: {
            email: pEmail
        }
    })
    return matched
}


router.post('/user', async (req, res) => {
    const { name, email, password, roleid } = req.body
    try {
        if (await getbyEmail(email).length > 0) {
            return res.json(await getbyEmail(email))
        } else {
            return res.json(await insert(name, email, password, roleid))
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/users', async (req, res) => {
    const users = await Users.findAll({
        include: [{
            model: Roles,
            attributes: ['rolName'],
            through: {
                attributes: []
            }
        }]
    });
    res.json(users)
})

router.post('/roles', async (req, res) => {
    const { id, name } = req.body
    const newUser = await Roles.create(
        {   id,
            rolName: name
        }
    )
    return res.json(newUser)
})

router.get('/roles', async (req, res) => {
    res.json(await Roles.findAll())
})
module.exports = router;
