import Axios from 'axios';
const API_BASE_URL = 'https://servidor-nicholas-scripts.herokuapp.com/';
let token = localStorage.getItem("token")
const api = Axios.create({
    baseURL:API_BASE_URL
})


export default api;