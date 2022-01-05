import axios from 'axios'

const ecommerceAPI = axios.create({
    baseURL: 'http://localhost:54191',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default ecommerceAPI