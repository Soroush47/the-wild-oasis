import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api", //express
    // baseURL: "http://localhost:5000",  //json-server
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    // req => new Promise(resolve => setTimeout(() => resolve(req), 800)),
    req => {
        // console.log("--- Axios Request ---");
        // console.log("URL:", req.url);
        // console.log("Method:", req.method);
        // console.log("Headers:", req.headers);
        // console.log("Data:", req.data);
        return req;
    },
    error => Promise.reject(error),
);

export default api;
