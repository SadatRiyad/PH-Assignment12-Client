import useAxiosPublic from '@/components/Hooks/useAxiosPublic/useAxiosPublix';
import useCounter from '@/components/Hooks/useCounter/useCounter';
import { useEffect, useState } from 'react';

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();
  const [counter, refetch, loading] = useCounter();
  const [counters, setCounters] = useState(counter);

  // using useEffect
  useEffect(() => {
    axiosPublic("/counters")
      .then((response) => {
        setCounters(response.data);
        refetch();
      })
  }, [axiosPublic, refetch]);

  if (loading) {
      <section className="bg-customBlue text-white py-12 pb-20">
        <div className="container mx-auto text-center">
          <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
          <h2 className="text-4xl font-bold mb-16"><span className='text-customGulabi'>BB-Matrimony</span> User Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
              <h3 className="text-2xl font-bold mb-2">Loading...</h3>
              <p className="text-lg">Total Biodatas</p>
            </div>
            <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
              <h3 className="text-2xl font-bold mb-2">Loading...</h3>
              <p className="text-lg">Girls Biodatas</p>
            </div>
            <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
              <h3 className="text-2xl font-bold mb-2">Loading...</h3>
              <p className="text-lg">Boys Biodatas</p>
            </div>
            <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
              <h3 className="text-2xl font-bold mb-2">Loading...</h3>
              <p className="text-lg">Marriages Completed</p>
            </div>
          </div>
        </div>
      </section>
  }

  return (
    <section className="bg-customBlue text-white py-12 pb-20">
      <div data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="top-bottom" data-aos-delay="100" className="container mx-auto text-center">
        <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
        <h2 className="text-4xl font-bold mb-16"><span className='text-customGulabi'>BB-Matrimony</span> User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.totalBiodatas}</h3>
            <p className="text-lg">Total Biodatas</p>
          </div>
          <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.girlsBiodatas}</h3>
            <p className="text-lg">Girls Biodatas</p>
          </div>
          <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.boysBiodatas}</h3>
            <p className="text-lg">Boys Biodatas</p>
          </div>
          <div className="p-6 border hover:bg-customGulabi border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.marriagesCompleted}</h3>
            <p className="text-lg">Marriages Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
