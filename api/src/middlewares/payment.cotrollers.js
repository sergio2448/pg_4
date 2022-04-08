const axios = require('axios')
const { getById } = require('../middlewares/usercreate.js')
const { Properties } = require('../db')
const host = 'http://localhost:3001'
const hostclient = 'http://localhost:3000'

const { PAYPAL_API, PAYPA_API_CLIENT, PAYPAL_API_SECRET } = process.env
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
                    description: "Veneficios vip del usuario"
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
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
        const { data: { access_token } } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
            },
            auth: {
                username: PAYPA_API_CLIENT,
                password: PAYPAL_API_SECRET
            }
        })
        //* ------------^^^^^^^^^^^^^^^^^^^^^^------------*//
        //* ------------realiza la orden de pago ------------*//
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(response.data)



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
        const { data } = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
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
        const property = await getById(idProperty)
        console.log(property)

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

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder,
    propertyNotFound
}