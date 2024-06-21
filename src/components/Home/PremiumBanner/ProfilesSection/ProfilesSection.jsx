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
import useBiodatas from '@/components/Hooks/useBiodatas/useBiodatas';

const ProfilesSection = () => {
    const [profiles, setProfiles] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending');
    const [biodatas] = useBiodatas();
    const profileData = biodatas.filter(biodata => biodata?.isPremium === true).slice(0, 6);

    useEffect(() => {
        const sortedProfiles = [...profileData].sort((a, b) => {
            return sortOrder === 'ascending' ? a.age - b.age : b.age - a.age;
        });
        setProfiles(sortedProfiles);
    }, [profileData, sortOrder]);

    return (
        <div className="container mx-auto py-12 bg-slate-200" id='premium'>
            <div className="flex flex-col md:flex-row justify-between mb-12 items-center">
                <div data-aos="fade-right" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0"  className='mb-6 md:mb-0 text-center md:text-left'>
                    <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
                    <h2 className="text-4xl font-bold text-customBlue"><span className='text-customGulabi'>Premium</span> Profiles</h2>
                    <p className="">Check out the latest six premium member
                    profiles cards</p>
                </div>
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" >
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
            </div>
            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                    <ProfileCard key={profile._id} profile={profile} />
                ))}
            </div>
        </div>
    );
};

export default ProfilesSection;
