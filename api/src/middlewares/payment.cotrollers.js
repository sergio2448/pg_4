const axios = require('axios')
const { Op } = require("sequelize")
const { getById } = require('../middlewares/usercreate.js')
const { Properties, BanckCards, PromotionDetails } = require('../db')
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
    console.log(tiempo)
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
                return_url: `${host}/pay/capture-order?idProperty=${id}&tiempo=${tiempo}`,
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
        const { id, status, purchase_units, payer, links } = data
        const response = await BanckCards.create({
            id,
            status,
            purchase_units: purchase_units[0],
            payer: payer.name,
            links: links[0]
        })
        console.log(data)
        const property = await getById(idProperty)
        const { data: { create_time } } = await axios.get(`${PAYPAL_API}v2/checkout/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        console.log(tiempo)
        const promotion = await PromotionDetails.create({
            startDate: create_time, tiempo
        })

        console.log(promotion.__proto__)
        await promotion.setProperty(idProperty)
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
            // await axios.post(`${host}/send-email/payment/${emailUser}/${idProperty}`);
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

const checkout = async (req, res) => {
    try {
        const findall = await Properties.findAll({
            include: [
                {
                    model: PromotionDetails,
                    attributes: ['tiempo', 'createdAt', "startDate"],

                }
            ],
            where: {
                // id: "af7bc5c5-734b-4779-a280-c204305e9fb1",
                statuspromotion: "true"
            },
            attributes: ["id", "sellerId", "statuspromotion"]

        })

        findall?.map(({ id, promotionDetail: { tiempo, startDate } }) => {
            let date = new Date(startDate)
            console.log(datediference(date))
            if (tiempo === "uno") {
                datediference(date) === 1 && Properties.update({ statuspromotion: false }, {
                    where: {
                        id: id
                    }
                })
            } else if (tiempo === "tres") {
                datediference(date) === 0 && Properties.update({ statuspromotion: false }, {
                    where: {
                        id: id
                    }
                })
            } else if (tiempo === "seis") {
                datediference(date) === 1 && Properties.update({ statuspromotion: false }, {
                    where: {
                        id: id
                    }
                })
            }

        })
        
        res.status(200).json(findall)
    } catch (error) {
        res.status(500).json(error)
    }
}


const datepromotion = async (req, res) => {
    const date = "2022-02-19T07:00:28Z"
    const tiempo = 'tres'
    try {
        const promotion = await PromotionDetails.create({
            startDate: date, tiempo
        })
        console.log(promotion);
        let todate = new Date(date)
        console.log(datediference(todate))
        res.status(200).json(promotion)
    } catch (error) {
        res.status(500).json(error)
    }
}


const datediference = (date1, date2 = new Date()) => {

    const date1utc = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2utc = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day
}
module.exports = {
    createOrder,
    captureOrder,
    cancelOrder,
    propertyNotFound,
    donationCompleted,
    checkout,
    datepromotion,
    datediference,
}