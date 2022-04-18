const { default: axios } = require('axios');
const { Router } = require('express');
const {
    getUser,
    suspenduser,
    deleteprop,
    setRoleAdmin,
    transactions,
    addFeature,
    deleteFeature,
    statusProp,
    upProp,
    updateStatus,
    updateFeatures
} = require('../middlewares/superusuario.js');

const router = Router();

router.get('/usuario', getUser)

router.get('/suspend-user', suspenduser)

router.get('/transactions', transactions)

router.delete('/delete-prop', deleteprop)

router.patch('/set-roleadmin', setRoleAdmin)

router.post('/addFeature', addFeature)

router.delete('/deleteFeature', deleteFeature)

router.post('/status-prop', statusProp)

router.patch('/updateProperties', upProp)

router.patch('/updateStatus', updateStatus)

router.patch('/updateFeatures/:id', updateFeatures)

router.get("/axiosupdate", async (req, res) => {
    try {
        const { data } = await axios.patch('http://localhost:3001/admin/updateProperties', { hola: "mundo" })
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router