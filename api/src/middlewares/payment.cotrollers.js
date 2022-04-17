const axios = require('axios')
const { getById } = require('../middlewares/usercreate.js')
const { Properties } = require('../db')
const userdata = require('../middlewares/emailuserdata.js')
const authtoken = require('../middlewares/authtoken.js')
const { PAYPAL_API, PAYPA_API_CLIENT, PAYPAL_API_SECRET } = process.env
const host = 'http://localhost:3001'
const hostclient = 'http://localhost:3000'
const createOrder = async (req, res) => {
    const { id } = req.body
    console.log(req.body)
    console.log(id)
    try {
        const property = await getById(id)
        console.log(!!property)
        if (property === null) return res.redirect(`${host}/pay/propertyNotFound?idProperty=${id}`)
        //* ------------objeto que define la orden------------*//
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `10.99`
                    },
                    description: "Pago por promoción de publicación"
                }
            ],
            application_context: {
                brand_name: 'Inmobiliaria.com',
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `${host}/pay/capture-order?idProperty=${id}`,
                cancel_url: `${host}/pay/cancel-order?idProperty=${id}`,
            }
        }
        //* ------------^^^^^^^^^^^^^^^^^^^^^^------------*//
        //*-------------genera un token de autorización----------------- *//

        const access_token = await authtoken()

        //* ------------^^^^^^^^^^^^^^^^^^^^^^------------*//

        //* ------------realiza la orden de pago ------------*//
        const response = await axios.post(`${PAYPAL_API}v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(response.data)
        //* ------------^^^^^^^^^^^^^^^^^^^^^^^^ ------------*//
        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const captureOrder = async (req, res) => {
    const { token, PayerID, idProperty } = req.query
    console.log(token, PayerID)
    try {
        const { data } = await axios.post(`${PAYPAL_API}v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: PAYPA_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
        console.log(data)
        const { status } = data
        console.log(status)  //completed
        if (status === "COMPLETED") {
            await Properties.update({ statuspromotion: true }, {
                where: {
                    id: idProperty
                }
            })
        }
        /** crear una tabla para asociar la compra al usuario */
        const property = await getById(idProperty)
        const seller = await property.getSeller()
        const userid = seller.getDataValue('userId')
        const { emailUser } = await userdata(userid)
        await axios.post(`${host}/send-email/payment/${emailUser}/${idProperty}`);
        res.redirect(`${hostclient}/pay/${idProperty}`);
    } catch (error) {
        res.sendStatus(500).json(error)
    }



}

const cancelOrder = async (req, res) => {
    try {
        const { idProperty } = req.query
        res.redirect(`${hostclient}/pay/${idProperty}`);
    } catch (error) {
        res.sendStatus(500).json(error)
    }

}

const propertyNotFound = async (req, res) => {
    const { idProperty } = req.query
    console.log(idProperty)
    res.status(404).json("property not found")
}

const donationCompleted = (req, res) => {
    res.json(`${hostclient}/payment`);
}

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder,
    propertyNotFound,
    donationCompleted
}