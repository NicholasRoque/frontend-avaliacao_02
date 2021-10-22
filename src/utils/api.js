import Axios from 'axios';
const API_BASE_URL = 'http://localhost:3000';
let token = localStorage.getItem("token")
const api = Axios.create({
    baseURL:API_BASE_URL
})


export default api;