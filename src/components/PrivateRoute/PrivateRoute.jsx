/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
 
    if (!user) {
        if (loading) {
            return <div className="flex w-full items-center justify-center h-screen">Loading...</div>
        }
        return <Navigate to="/login" state={{ from: location.pathname || "/" }} />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;