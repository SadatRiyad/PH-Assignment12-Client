import { useEffect, useState } from 'react';

const SuccessCounter = () => {
  const [counters, setCounters] = useState({
    totalBiodatas: 0,
    girlsBiodatas: 0,
    boysBiodatas: 0,
    marriagesCompleted: 0,
  });

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/counters`);
        const data = await response.json();
        setCounters(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching counters:', error);
      }
    };

    fetchCounters();
  }, []);

  return (
    <section className="bg-customBlue text-white py-10 pb-16">
      <div className="container mx-auto text-center">
      <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
      <h2 className="text-4xl font-bold mb-10"><span className='text-customGulabi'>Our</span> Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 border border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.totalBiodatas}</h3>
            <p className="text-lg">Total Biodatas</p>
          </div>
          <div className="p-6 border border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.girlsBiodatas}</h3>
            <p className="text-lg">Girls Biodatas</p>
          </div>
          <div className="p-6 border border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.boysBiodatas}</h3>
            <p className="text-lg">Boys Biodatas</p>
          </div>
          <div className="p-6 border border-customGulabi rounded-full shadow">
            <h3 className="text-2xl font-bold mb-2">{counters.marriagesCompleted}</h3>
            <p className="text-lg">Marriages Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
