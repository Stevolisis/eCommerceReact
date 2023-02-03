import axios from "axios";

const api = axios.create({
    baseURL2:"https://ecommerce-api-ivory.vercel.app",
    baseURL:"http://localhost:80",
});

export default api;