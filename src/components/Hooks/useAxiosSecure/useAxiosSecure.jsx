import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth/useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
    },
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        },
            async err => {
                console.log('error from axios interceptor', err.response)
                if (err.response.status === 401 || err.response.status === 403) {
                    await logoutUser()
                    navigate("/login");
                }
                return Promise.reject(err);
            });
    }, [logoutUser, navigate])

    return axiosSecure;
};

export default useAxiosSecure;