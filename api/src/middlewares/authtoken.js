const axios = require('axios')
const { PAYPAL_API, PAYPA_API_CLIENT, PAYPAL_API_SECRET } = process.env

const authtoken = async () => {
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    const { data: { access_token } } = await axios.post(`${PAYPAL_API}v1/oauth2/token`, params, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
        },
        auth: {
            username: PAYPA_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })
    return access_token
}

module.exports = authtoken