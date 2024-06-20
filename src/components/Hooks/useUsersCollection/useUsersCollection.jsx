import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useUsersCollection = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: users = [], isPending: loading, } = useQuery({
        queryKey: ['biodata', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    return [users, refetch, loading]
};

export default useUsersCollection;