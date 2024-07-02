import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../util/constants";


const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [ admin, setAdmin ] = useState(null);
    const [ token, setToken ] = useState(null);

    const verify_token = async(token) => {
        const res = await axios.post(`${API_BASE_URL}/admin/verify_token`, { token });
        if(res.data.message === 'Token válido') {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        const retrive_admin_data = async() => {
            const admin = localStorage.getItem("auth@admin");
            const token = localStorage.getItem("auth@admin_token");
            if(admin && token) {
                if(await verify_token(token) === 0) {
                    localStorage.removeItem("auth@admin");
                    localStorage.removeItem("auth@admin_token");
                    return;
                }
                setAdmin(JSON.parse(admin));
                setToken(token);
            }
        };
        retrive_admin_data();
    });

    const login_admin = async(email, password) => {
        const res = await axios.post(`${API_BASE_URL}/admin/login`, {
            email,
            password
        }).then(res => {
            localStorage.setItem("auth@admin", JSON.stringify(res.data.admin));
            localStorage.setItem("auth@admin_token", res.data.token);
            setAdmin(res.data.admin);
            setToken(res.data.token);
            
        }).catch(error => {
            console.error(error);
        });
    };

    const register_admin = async(name, email, password) => {
        const res = await axios.post(`${API_BASE_URL}/admin/register`, {
            name,
            email,
            password
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        });
    }

    const logout = async() => {
        localStorage.removeItem("auth@admin");
        localStorage.removeItem("auth@admin_token");
        setAdmin(null);
        setToken(null);
    }

    return (
        <AdminAuthContext.Provider value={{ admin, token, login_admin, logout, register_admin }}>
            {children}
        </AdminAuthContext.Provider>
    )
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export default AdminAuthContext;