import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.18.239:3333'
})

export default api;