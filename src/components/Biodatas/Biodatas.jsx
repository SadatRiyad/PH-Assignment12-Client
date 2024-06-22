import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useBiodatas from '../Hooks/useBiodatas/useBiodatas';
import ProfileCard from '../Home/PremiumBanner/ProfileCard/ProfileCard';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import "../../index.css";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Biodatas = () => {
    const [biodatas, , loading] = useBiodatas();
    const [ageRange, setAgeRange] = useState([18, 99]);
    const [ageRange1, setAgeRange1] = useState([18, 99]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [filteredBiodatas, setFilteredBiodatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const resultsPerPage = 9;


    useEffect(() => {
        // Filtering biodatas based on criteria
        const filterBiodatas = biodatas.filter(biodata => {
            return (
                (selectedType ? biodata.biodataType === selectedType : true) &&
                (selectedDivision ? biodata.presentDivision === selectedDivision : true) &&
                (biodata.age >= ageRange[0] && biodata.age <= ageRange[1] || biodata.age >= ageRange && biodata.age <= ageRange1)
            );
        });
        setFilteredBiodatas(filterBiodatas);
    }, [ageRange, ageRange1, biodatas, selectedDivision, selectedType])

    // Paginate filtered biodatas
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentBiodatas = filteredBiodatas.slice(indexOfFirstResult, indexOfLastResult);

    // Handle search
    const handleSearch = (e) => {
        const search = e.target.value;
        const SearchedBiodatas = biodatas.filter(biodata => biodata.biodataID.toLowerCase().includes(search.toLowerCase()));
        setFilteredBiodatas(SearchedBiodatas);
        setCurrentPage(1); // Reset to first page
    }

    // Handle filter changes
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
        setCurrentPage(1); // Reset to first page
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div className="flex text-center items-center justify-center h-dvh w-dvw">Loading...</div>;
    }

    const totalPages = Math.ceil(filteredBiodatas.length / resultsPerPage);

    return (
        <div className="grid container mx-auto px-4 min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Helmet>
                <title>Biodatas | BB-Matrimony</title>
            </Helmet>

            <div className="flex h-full max-h-screen flex-col pt-6 gap-2 md:pr-4">
                <h2 className="text-4xl font-bold mb-4 mt-4 md:mt-0">Filters</h2>
                <div className="mb-4 border-2 border-customGulabi p-2 px-4 bg-slate-200">
                    <div className='justify-between flex items-center mb-1'>
                        <label className="block mb-2 font-medium">Age Range: {ageRange[0]} {ageRange1[1] ? '-' : ""} {ageRange[1]}</label>
                        <Button
                            onClick={() => {
                                setAgeRange([18, 99]);
                                setAgeRange1([18, 99]);
                            }}
                            className="bg-customGulabi m-0 text-white py-0 rounded-full text-xs"
                        >Reset</Button>
                    </div>
                    <input
                        type="range"
                        name="ageRange"
                        min="18"
                        max="99"
                        value={ageRange.join(',')}
                        onChange={handleFilterChange}
                        className="w-full custom-range"
                        multiple
                    />
                    <div className="flex justify-between">
                        <span>18</span>
                        <span>99</span>
                    </div>
                </div>
                <div className="mb-4 border-2 p-3 border-customGulabi bg-slate-200">
                    <label className="block mb-2">Biodata Type:</label>
                    <select name="type" value={selectedType} onChange={handleFilterChange} className="w-full border-2 border-customGulabi  p-2 rounded-full">
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-4 border-2 p-3 border-customGulabi bg-slate-200">
                    <label className="block mb-2">Present Division:</label>
                    <select name="division" value={selectedDivision} onChange={handleFilterChange} className="w-full border-2 border-customGulabi p-2 rounded-full">
                        <option value="">All</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
            </div>
            <div className="w-full h-fit pt-6 md:pl-5 md:border-l-4 min-h-dvh">
                <div className='grid w-full grid-cols-1 md:grid-cols-2 text-center md:text-left items-center'>
                    <div className='w-full flex justify-between'>
                        <h2 className="text-2xl font-bold mb-2 md:mb-5">Total Biodatas: <span className='text-customGulabi'>{biodatas.length}</span></h2>
                        <h2 className="text-2xl font-bold mb-2 md:mb-5 ml-4">Biodatas Found: <span className='text-customGulabi'>{filteredBiodatas.length}</span></h2>
                    </div>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative justify-end items-end flex mb-8 md:mb-5">
                                <Search className="absolute right-3.5 top-[14px] h-4 w-4 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search by Biodata ID"
                                    className="w-full border-2 p-2 rounded-full border-customGulabi  appearance-none bg-background pr-8 pl-4 shadow-none md:w-fit lg:w-2/3"
                                    onChange={handleSearch}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentBiodatas.map(profile => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))}
                </div>
                {totalPages > 1 && (
                    <Pagination className="my-8 w-fit text-white rounded-lg">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-customBlue border border-customBlue cursor-pointer"
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'pagination-link active border border-customBlue cursor-not-allowed' : 'pagination-link border border-customBlue bg-customBlue text-white cursor-pointer'}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="bg-customBlue border border-customBlue cursor-pointer"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default Biodatas;
