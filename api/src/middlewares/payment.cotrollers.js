const axios = require('axios')
const { getById } = require('../middlewares/usercreate.js')
const host = 'http://localhost:3001'

const { PAYPAL_API, PAYPA_API_CLIENT, PAYPAL_API_SECRET } = process.env
const createOrder = async (req, res) => {
    const { id } = req.body
    console.log(req.body)
    console.log(id)
    try {
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
                cancel_url: `${host}/pay/cancel-order`,
            }
        }
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
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(response.data)
        console.log('back')


        res.json(response.data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}
const captureOrder = async (req, res) => {
    const { token, PayerID, idProperty } = req.query
    console.log(token, PayerID)

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
        const property  = await getById(idProperty)
        console.log(property)
    }


    res.redirect("http://localhost:3000/pay/1/");
    // res.send('orden capturada')
}
const cancelOrder = async (req, res) => {
    try {
        res.redirect('http://localhost:3000/pay/1/')
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
}