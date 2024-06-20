import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useBiodatas from '../Hooks/useBiodatas/useBiodatas';
import ProfileCard from '../Home/PremiumBanner/ProfileCard/ProfileCard';
import { Button } from '../ui/button';

const Biodatas = () => {
    const [biodatas, , loading] = useBiodatas();
    const [ageRange, setAgeRange] = useState([18, 99]);
    const [ageRange1, setAgeRange1] = useState([18, 99]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    // console.log(biodatas)

    if (loading) {
        return <div className="flex text-center items-center justify-center h-dvh w-dvw">Loading...</div>
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ageRange') {
            setAgeRange(value.split(',').map(Number));
            setAgeRange1(value.split(',').map(Number));
        } else if (name === 'type') {
            setSelectedType(value);
        } else if (name === 'division') {
            setSelectedDivision(value);
        }
    };

    const filteredBiodatas = biodatas.filter(biodata => {
        return (
            (selectedType ? biodata.biodataType === selectedType : true) &&
            (selectedDivision ? biodata.presentDivision === selectedDivision : true) &&
            (biodata.age >= ageRange[0] && biodata.age <= ageRange[1] || biodata.age >= ageRange && biodata.age <= ageRange1)
        );
    });
    console.log(filteredBiodatas)

    return (
        <div className="grid container mx-auto px-4 min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Helmet>
                <title>Biodatas | BB-Matrimony</title>
            </Helmet>

            <div className="flex h-full max-h-screen flex-col pt-6 gap-2 pr-4">
                <h2 className="text-4xl font-bold mb-4 mt-4 md:mt-0">Filters</h2>
                <div className="mb-4 border-2 p-2 px-4">
                    <div className='justify-between flex items-center mb-1'>
                        <label className="block mb-2 font-medium">Age Range: {ageRange[0]} {ageRange1[1] ? '-' : ""} {ageRange[1]}</label>
                        {/* reset */}
                        <Button
                            onClick={() => {
                                setAgeRange([18, 99]);
                                setAgeRange1([18, 99]);
                            }}
                            className="bg-red-500 m-0 text-white py-0 rounded-full text-xs"
                        >Reset</Button>
                    </div>
                    <input
                        type="range"
                        name="ageRange"
                        min="18"
                        max="99"
                        value={ageRange.join(',')}
                        onChange={handleFilterChange}
                        className="w-full"
                        multiple
                    />
                    <div className="flex justify-between">
                        <span>18</span>
                        <span>99</span>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Biodata Type:</label>
                    <select name="type" value={selectedType} onChange={handleFilterChange} className="w-full border-2 p-2 rounded-full">
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Present Division:</label>
                    <select name="division" value={selectedDivision} onChange={handleFilterChange} className="w-full border-2 p-2 rounded-full">
                        <option value="">All</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagram">Chattagram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
            </div>
            <div className="w-full h-fit pt-6 md:pl-5 md:border-l-4 min-h-dvh">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Total Biodatas: {biodatas.length}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* {filteredBiodatas.slice(0, 20).map(profile => ( */}
                    {filteredBiodatas.map(profile => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Biodatas;