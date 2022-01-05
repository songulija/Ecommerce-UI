import axios from 'axios'

const ecommerceAPI = axios.create({
    baseURL: 'https://localhost:44381',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default ecommerceAPI