import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useMyBiodata = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: biodata = [], isPending: loading, } = useQuery({
        queryKey: ['biodata', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/biodata/${user.email}`);
            return res.data;
        }
    })

    return [biodata, refetch, loading]
};

export default useMyBiodata;