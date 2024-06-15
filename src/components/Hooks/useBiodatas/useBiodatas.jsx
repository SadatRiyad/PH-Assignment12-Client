import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublix";

const useBiodatas = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: biodatas = [], isPending: loading, } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodatas');
            return res.data;
        }
    })

    return [biodatas, refetch, loading]
};

export default useBiodatas;
