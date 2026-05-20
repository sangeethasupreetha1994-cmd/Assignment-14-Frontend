import axios from "axios";

const api = axios.create({
    baseURL: "https://assignment-14-backend.onrender.com"
});

export default api;