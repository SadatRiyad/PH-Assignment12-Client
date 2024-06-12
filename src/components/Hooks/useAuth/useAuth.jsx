import { AuthContext } from "@/components/ContextAPI/AuthProvider/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState;
};

export default useAuth;