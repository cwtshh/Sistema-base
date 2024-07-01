import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../util/constants";
import axios from "axios";


const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);

    const verify_token = async(token) => {
        console.log(token);
        const res = await axios.post(`${API_BASE_URL}/users/verify-token`, { token });
        console.log(res.data.message + 'a');
        if(res.data.message === 'Token válido') {
            return 1;
        }
        console.log('Token inválido');  
        return 0;
    };

    useEffect(() => {
        const retrive_user_data = async() => {
            const user = localStorage.getItem("auth@user");
            const token = localStorage.getItem("auth@token");
            if(user && token) {
                if(await verify_token(token) === 0) {
                    console.log("CAIU AQ")
                    localStorage.removeItem("auth@user");
                    localStorage.removeItem("auth@token");
                    return;
                }
                setUser(JSON.parse(user));
                setToken(token);
            }
        };
        retrive_user_data();
    }, []);

    const login = async(email, password) => {
        const res = await axios.post(`${API_BASE_URL}/users/login`, {
            email,
            password
        }).then(res => {
            // console.log(res.data);
            localStorage.setItem("auth@user", JSON.stringify(res.data.user));
            localStorage.setItem("auth@token", res.data.token);
            setUser(res.data.user);
            setToken(res.data.token);
        }).catch(error => {
            console.error(error);
        });
    };

    const register_user = async(name, email, password) => {
        const res = await axios.post(`${API_BASE_URL}/users/register`, {
            name,
            email,
            password
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.error(error);
        });
    }

    const logout = () => {
        localStorage.removeItem("auth@user");
        localStorage.removeItem("auth@token");
        setUser(null);
        setToken(null);
    }

    return (
        <UserAuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            register_user
        }}>
            {children}
        </UserAuthContext.Provider>
    )
};

export const useUserAuth = () => useContext(UserAuthContext);

export default UserAuthContext;