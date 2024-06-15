/* eslint-disable react/prop-types */
import useAuth from "@/components/Hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

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