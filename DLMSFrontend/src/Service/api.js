import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: "http://localhost:8080", // Gateway Port
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log("API Interceptor - Token from storage:", token ? "Found" : "Missing");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log("Attached Authorization Header:", config.headers['Authorization']);
        } else {
            console.warn("No token found in localStorage, request will be unauthorized.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
