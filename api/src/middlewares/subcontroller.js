const axios = require('axios')
const { getbyEmail } = require('../middlewares/usercreate.js')
const authtoken = require('../middlewares/authtoken.js')
const { newsub, UpdateSub, getIdUser, getIdSub, Declinesub, datetoISO } = require('./AddSubscription.js')
const { PAYPAL_API } = process.env
const host = 'http://localhost:3001'
const hostclient = 'http://localhost:3000'
const hostip = "http://192.168.1.66:3001"

const createProduct = async (req, res) => {
    try {
        const product = {
            name: "Vip mebership Inmuebles",
            description: "Vip member in Inmuebles page",
            type: "DIGITAL",
            category: "PUBLISHING_SERVICES"
        }

        const access_token = await authtoken()

        const { data } = await axios.get(`${host}/sub/show-product`)

        const result = data.find(({ name }) => name === product.name)
        if (!result) {
            const { data } = await axios.post(`${PAYPAL_API}v1/catalogs/products`, product, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            return res.status(200).json(data.id)
        } else {
            return res.status(200).json(result.id)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const createPlan = async (req, res) => {
    try {
        const product_id = await axios.post(`${host}/sub/create-product`, {})

        console.log(product_id.data)

        const plan = {
            name: "Plan Vip Mensual",
            product_id: product_id.data,
            status: "ACTIVE",
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: 'MONTH',
                        interval_count: 1
                    },
                    tenure_type: 'REGULAR',
                    sequence: 1,
                    total_cycles: 12,
                    pricing_scheme: {
                        fixed_price: {
                            value: "5",
                            currency_code: "USD"
                        }
                    }
                }
            ],
            payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee: {
                    value: "12",
                    currency_code: "USD"
                },
                setup_fee_failure_action: "CONTINUE",
                payment_failure_threshold: 3

            },
            taxes: {
                percentage: "15",
                inclusive: false
            }
        }

        const access_token = await authtoken()

        const { data } = await axios.get(`${host}/sub/show-plan`)

        const result = data.find(({ name }) => name === plan.name)

        console.log(result)

        if (!result) {
            const { data } = await axios.post(`${PAYPAL_API}v1/billing/plans`, plan, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            // console.log(data)
            res.status(200).json(data.id)
        } else {
            return res.status(200).json(result.id)
        }


    } catch (error) {

        res.status(500).json(error)
    }
}

const generateSubscription = async (req, res) => {
    try {
        const { emailUser } = req.body

        const plan_id = await axios.post(`${host}/sub/create-plan`, {})

        const subscription = {
            plan_id: plan_id.data,
            quatity: 1,
            subscriber: {
                name: {
                    given_name: "nombrePrueba",
                    surname: "apellidoPrueba"
                },
                email_address: "email@example.com"
            },
            application_context: {
                brand_name: 'Inmobiliaria.com',
                shipping_preference: "NO_SHIPPING",
                user_action: "CONTINUE",
                return_url: `${hostip}/sub/capture-sub?emailUser=${emailUser}`,
                cancel_url: `${hostip}/sub/cancel-sub?emailUser=${emailUser}`,
            }
        }

        const access_token = await authtoken()

        const { data } = await axios.post(`${PAYPAL_API}v1/billing/subscriptions`, subscription, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error.response.data)
        res.status(500).json(error)
    }
}

const captureSub = async (req, res) => {
    const { subscription_id, emailUser } = req.query
    const reason = { reason: " Active subscription " }
    try {

        const access_token = await authtoken()


        const response = await newsub(subscription_id)
        const usermatched = await getbyEmail(emailUser)
        if (usermatched === null) return res.status(404).json({ msg: "Usuario no encontrado, no se activará la subscripción" })

        await usermatched.setSubscription(response)

        await axios.post(`${PAYPAL_API}/v1/billing/subscriptions/${subscription_id}/activate`, reason, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const userid = await getIdUser(usermatched)
        await UpdateSub(userid)

        // await axios.post(`${host}/send-email/subscribers/${emailUser}/`);

        res.redirect(`${hostclient}`);
    } catch (error) {
        res.status(500).json(error)
    }

}

const cancelSub = async (req, res) => {
    try {
        const { subscription_id, emailUser } = req.query
        res.redirect(`${hostclient}`);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//suspende la subscription en caso de que no quiera continuar
const suspendSub = async (req, res) => {
    try {
        const { emailUser } = req.query

        const reason = {
            reason: "Not satisfied with the service"
        }

        const usermatched = await getbyEmail(emailUser)
        if (usermatched === null) return res.status(404).json({ msg: "Usuario no encontrado, no se activará la subscripción" })
        const userid = await getIdUser(usermatched)
        const sub = await usermatched.getSubscription()
        const id = await getIdSub(sub)
        console.log(id)
        const access_token = await authtoken()

        await axios.post(`${PAYPAL_API}v1/billing/subscriptions/${id}/suspend`, reason, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        await Declinesub(userid)

        res.status(200).send("suspendido");
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const reactiveSub = async (req, res) => {
    const { emailUser } = req.query
    const reason = { reason: " Active subscription " }
    try {
        const usermatched = await getbyEmail(emailUser)
        if (usermatched === null) return res.status(404).json({ msg: "Usuario no encontrado, no se activará la subscripción" })
        const userid = await getIdUser(usermatched)
        const sub = await usermatched.getSubscription()
        const id = await getIdSub(sub)
        console.log(id)
        const access_token = await authtoken()

        await axios.post(`${PAYPAL_API}v1/billing/subscriptions/${id}/activate`, reason, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        await UpdateSub(userid)
        // await axios.post(`${host}/send-email/subscribers/${emailUser}/`);

        res.status(200).json({ active: "activada" })
    } catch (error) {
        res.status(500).json(error)
    }
}

const productlist = async (req, res) => {
    try {
        const access_token = await authtoken()
        const { data: { products } } = await axios.get(`${PAYPAL_API}v1/catalogs/products/`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }

}

const planslist = async (req, res) => {
    try {
        const access_token = await authtoken()
        const { data: { plans } } = await axios.get(`${PAYPAL_API}v1/billing/plans/`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        res.status(200).json(plans)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createProduct,
    createPlan,
    generateSubscription,
    captureSub,
    productlist,
    planslist,
    cancelSub,
    suspendSub,
    reactiveSub
}