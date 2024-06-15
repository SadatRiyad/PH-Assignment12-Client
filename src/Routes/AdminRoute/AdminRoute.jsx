/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/components/Hooks/useAuth/useAuth";
import useAdmin from "@/components/Hooks/useAdmin/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex w-full items-center justify-center h-screen">Loading...</div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location.pathname || "/" }} />;

};

export default AdminRoute;