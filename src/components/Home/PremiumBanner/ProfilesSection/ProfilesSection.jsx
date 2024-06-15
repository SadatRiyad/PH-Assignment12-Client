/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ProfilesSection = () => {
    const [profiles, setProfiles] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending');

    const profileData = [
        { id: 1, type: 'Male', image: 'path/to/image1.jpg', division: 'Dhaka', age: 23, occupation: 'Student' },
        { id: 2, type: 'Female', image: 'path/to/image2.jpg', division: 'Chattagram', age: 45, occupation: 'House wife' },
        { id: 3, type: 'Male', image: 'path/to/image3.jpg', division: 'Rangpur', age: 30, occupation: 'Job' },
        { id: 4, type: 'Female', image: 'path/to/image4.jpg', division: 'Khulna', age: 27, occupation: 'Student' },
        { id: 5, type: 'Male', image: 'path/to/image5.jpg', division: 'Sylhet', age: 35, occupation: 'Job' },
        { id: 6, type: 'Female', image: 'path/to/image6.jpg', division: 'Maymansign', age: 29, occupation: 'House wife' },
    ];

    useEffect(() => {
        const sortedProfiles = [...profileData].sort((a, b) => {
            return sortOrder === 'ascending' ? a.age - b.age : b.age - a.age;
        });
        setProfiles(sortedProfiles);
    }, [profileData, sortOrder]);

    return (
        <div className="container mx-auto py-6 bg-slate-200 pb-10">
            <div className="flex flex-col md:flex-row justify-between mb-12 items-center">
                <div className='mb-6 md:mb-0 text-center md:text-left'>
                    <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
                    <h2 className="text-4xl font-bold text-customBlue"><span className='text-customGulabi'>Premium</span> Profiles</h2>
                    <p className="">Check out the latest six premium member
                    profiles cards</p>
                </div>
                <Select onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort Based on Age" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort Based on Age</SelectLabel>
                            <SelectItem value="ascending">Ascending</SelectItem>
                            <SelectItem value="descending">Descending</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                ))}
            </div>
        </div>
    );
};

export default ProfilesSection;
