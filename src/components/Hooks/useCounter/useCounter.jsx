import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublix";

const useCounter = () => {
    const axiosPublic = useAxiosPublic();
    const { data: counter = [], refetch, isPending: loading } = useQuery({
        queryKey: ['counter'],
        queryFn: async () => {
          const res = await axiosPublic.get("/counters");
            return res.data
        },
      });
      return [counter, refetch, loading];
};

export default useCounter;



