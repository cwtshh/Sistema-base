import axios from "axios";
import { API_BASE_URL } from "../util/constants";

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}`
});

axiosInstance.interceptors.request.use(
    (config) => {
        const tokenAdmin = localStorage.getItem("auth@admin_token");
        const tokenUser = localStorage.getItem("auth@token");
        if(tokenAdmin) {
            config.headers.Authorization = `Bearer ${tokenAdmin}`;
        }
        if(tokenUser) {
            config.headers.Authorization = `Bearer ${tokenUser}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;