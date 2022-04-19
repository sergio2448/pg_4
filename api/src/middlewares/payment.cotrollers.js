const axios = require('axios')
const { getById } = require('../middlewares/usercreate.js')
const { Properties, BanckCards } = require('../db')
const userdata = require('../middlewares/emailuserdata.js')
const authtoken = require('../middlewares/authtoken.js')
const { PAYPAL_API, PAYPA_API_CLIENT, PAYPAL_API_SECRET } = process.env
const host = 'http://localhost:3001'
const hostclient = 'http://localhost:3000'



const createOrder = async (req, res) => {
    const { id } = req.body
    const { tiempo } = req.query
    console.log(req.body)
    console.log(id)
    try {
        const property = await getById(id)
        console.log(!!property)
        if (property === null) return res.redirect(`${host}/pay/propertyNotFound?idProperty=${id}`)

        const uno = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `19.99`
                    },
                    description: "Pago por promoción de publicación que durará un mes desde su compra"
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

        const tres = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `59.99`
                    },
                    description: "Pago por promoción de publicación durará un tres desde su compra"
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

        const seis = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: `99.99`
                    },
                    description: "Pago por promoción de publicación durará un seis desde su compra"
                }
            ],
            application_context: {
                brand_name: 'Inmobiliaria.com',
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `${host}/pay/capture-order?idProperty=${id}&tiempo=${tiempo}`,
                cancel_url: `${host}/pay/cancel-order?idProperty=${id}&tiempo=${tiempo}`,
            }
        }

        const access_token = await authtoken()


        switch (tiempo) {
            case 'uno':
                const response = await axios.post(`${PAYPAL_API}v2/checkout/orders`, uno, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                console.log(response.data)
                return res.status(200).json(response.data)
            case 'tres':
                const response2 = await axios.post(`${PAYPAL_API}v2/checkout/orders`, tres, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                console.log(response2.data)
                return res.status(200).json(response2.data)
            case 'seis':
                const response3 = await axios.post(`${PAYPAL_API}v2/checkout/orders`, seis, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                console.log(response3.data)
                return res.json(response3.data)
            default:
                return res.status(404).send('Debe especificar el tiempo')
                break;
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const captureOrder = async (req, res) => {
    const { token, PayerID, idProperty, tiempo } = req.query
    try {
        const access_token = await authtoken()
        const { data } = await axios.post(`${PAYPAL_API}v2/checkout/orders/${token}/capture`, {}, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(data)
        const { id, status, purchase_units, payer, links } = data

        const response = await BanckCards.create({
            id,
            status,
            purchase_units: purchase_units[0],
            payer: payer.name,
            links: links[0]
        })
        const property = await getById(idProperty)
        const seller = await property.getSeller()
        const userid = seller.getDataValue('userId')

        await response.setUser(userid)


        if (status === "COMPLETED") {
            await Properties.update({ statuspromotion: true }, {
                where: {
                    id: idProperty
                }
            })
            const { emailUser } = await userdata(userid)
        await axios.post(`${host}/send-email/payment/${emailUser}/${idProperty}`);
        }
        
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }



}

const cancelOrder = async (req, res) => {
    try {
        const { idProperty } = req.query
        res.redirect(`${hostclient}`);
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