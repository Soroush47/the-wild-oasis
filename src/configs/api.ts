import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3001",  express
    baseURL: "http://localhost:5000", //json-server
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    req => new Promise(resolve => setTimeout(() => resolve(req), 800)),
    error => Promise.reject(error),
);

export default api;
