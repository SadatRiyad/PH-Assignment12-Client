/* eslint-disable react/prop-types */
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHeart, FaEnvelope, FaPhone } from "react-icons/fa";
import useAxiosSecure from "../Hooks/useAxiosSecure/useAxiosSecure";
import { ContactRoundIcon, HeartOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth/useAuth";
import ProfileCard from "../Home/PremiumBanner/ProfileCard/ProfileCard";
import { Helmet } from "react-helmet-async";

const BiodataDetails = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const biodata = useLoaderData();
    const { user } = useAuth();
    const biodataIds = biodata._id;
    const [isFavorite, setIsFavorite] = useState([]);
    const [isFavorite1, setIsFavorite1] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [similarBiodatas, setSimilarBiodatas] = useState([]);

    // fetchBiodata with tanstack
    const { refetch: refetch1, data: users = [], isPending: loading, } = useQuery({
        queryKey: ['biodata', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            if (res.data) {
                // check users if their isPremium available
                setIsPremium(res.data?.isPremium);
            }
            return [users, refetch1, loading];
        }
    })

    // fetchFavorites with tanstack
    const { refetch, data: favorites = [], isPending: loadingFavorites, } = useQuery({
        queryKey: ['favorites', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/favorites/${user.email}`);
            const isFavoriteExist = res.data.find((favorite) => favorite.biodataId === biodata.biodataID);
            if (isFavoriteExist) {
                setIsFavorite(isFavoriteExist);
                setIsFavorite1(true);
            } else {
                setIsFavorite1(false);
            }
            return [refetch, favorites, loadingFavorites];
        }
    })

    // fetchSimilarBiodatas with tanstack
    const { refetch: refetchSimilar, data: similarBiodatasData = [], isPending: loadingSimilarBiodatas, } = useQuery({
        queryKey: ['similarBiodatas', biodata.biodataType, biodataIds],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/biodatas`, { withCredentials: true });
            const fetchedSimilarBiodatas = res.data.filter(
                (b) => b.biodataType === biodata.biodataType && b._id !== biodataIds
            ).slice(0, 3);
            setSimilarBiodatas(fetchedSimilarBiodatas);
            return [similarBiodatasData, refetchSimilar, loadingSimilarBiodatas];
        }
    })
    if (loading || loadingFavorites || loadingSimilarBiodatas) {
        <div className="flex w-full items-center justify-center h-screen">Loading...</div>
    }

    // add favorites
    const handleAddToFavorites = async () => {
        try {
            const favData = {
                ID: biodataIds,
                biodataId: biodata.biodataID,
                name: biodata.name,
                permanentDivision: biodata.permanentDivision,
                occupation: biodata.occupation,
                profileImage: biodata.profileImage,
            };
            await axiosSecure.put(`/users/favorites/${user.email}`, favData)
                .then((res) => {
                    if (res.data) {
                        toast.success("Biodata added to favorites", { autoClose: 2000 });
                        refetch();
                    }
                })
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Error adding to favorites", { autoClose: 2000 });
        }
    };

    // removefavorites
    const handleRemoveFavorites = async () => {
        try {
            await axiosSecure.delete(`/users/favorites/${user.email}/${isFavorite?.id}`)
                .then((res) => {
                    if (res.data) {
                        toast.success("Biodata removed from favorites", { autoClose: 2000 });
                        refetch();
                    }
                })
        } catch (error) {
            console.error("Error removing from favorites:", error);
            toast.error("Error removing from favorites", { autoClose: 2000 });
        }
    };

    const handleRequestContactInfo = () => {
        navigate(`/checkout/${biodataID}`);
    };

    const {
        name,
        age,
        biodataType,
        dob,
        email,
        expectedPartnerAge,
        expectedPartnerHeight,
        expectedPartnerWeight,
        fathersName,
        height,
        mobile,
        mothersName,
        occupation,
        permanentDivision,
        presentDivision,
        profileImage,
        race,
        weight,
        biodataID
    } = biodata;

    return (
        <div className="container px-0 mx-auto">
            <Helmet>
                <title>{biodataID} | BB-Matrimony</title>
            </Helmet>
            {biodata ? (
                <div className="biodata-details">
                    <h1 className="text-4xl font-bold text-center bg-customBlue pt-1 pb-3 text-white border-x-4 border-x-customGulabi  border-t-4 border-t-customGulabi"><span className='text-4xl font-extrabold text-customGulabi'>_______</span> <br />{biodataID}</h1>
                    <div className="flex flex-col lg:flex-row border-4 border-customGulabi bg-customBlue text-white p-6 lg:items-center">
                        <img data-aos="fade-right" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" src={profileImage} alt={name} className="w-full min-h-60 max-h-screen lg:w-2/4 rounded-lg lg:mr-8 border-4 border-customGulabi" />
                        <div data-aos="fade-left" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="lg:ml-5 mt-5 lg:mt-5">
                            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-customGulabi">{name}</h2>
                            <p className="text-lg">Age: <span className="text-customGulabi ml-1 font-semibold">{age}</span></p>
                            <p className="text-lg">Gender: <span className="text-customGulabi ml-1 font-semibold">{biodataType}</span></p>
                            <p className="text-lg">Date of Birth: <span className="text-customGulabi ml-1 font-semibold">{dob}</span></p>
                            <p className="text-lg">Occupation: <span className="text-customGulabi ml-1 font-semibold">{occupation}</span></p>
                            <p className="text-lg">Height: <span className="text-customGulabi ml-1 font-semibold">{height}</span></p>
                            <p className="text-lg">Weight: <span className="text-customGulabi ml-1 font-semibold">{weight}</span></p>
                            <p className="text-lg">Race: <span className="text-customGulabi ml-1 font-semibold">{race}</span></p>
                            <p className="text-lg">Permanent Division: <span className="text-customGulabi ml-1 font-semibold">{permanentDivision}</span></p>
                            <p className="text-lg">Present Division: <span className="text-customGulabi ml-1 font-semibold">{presentDivision}</span></p>
                            <p className="text-lg">Father&apos;s Name: <span className="text-customGulabi ml-1 font-semibold">{fathersName}</span></p>
                            <p className="text-lg">Mother&apos;s Name: <span className="text-customGulabi ml-1 font-semibold">{mothersName}</span></p>
                            <p className="text-lg">Expected Partner Age: <span className="text-customGulabi ml-1 font-semibold">{expectedPartnerAge}</span></p>
                            <p className="text-lg">Expected Partner Height: <span className="text-customGulabi ml-1 font-semibold">{expectedPartnerHeight}</span></p>
                            <p className="text-lg">Expected Partner Weight: <span className="text-customGulabi ml-1 font-semibold">{expectedPartnerWeight}</span></p>
                            <div className="gap-4 my-4">
                                <a href={isPremium ? `mailto:${email}` : '#PremiumReq'} className="btn btn-info flex items-center text-base lg:text-lg">
                                    <FaEnvelope className="mr-1" />Email: <span className="text-customGulabi ml-1 font-semibold">{isPremium ? `${email}` : "(Premium members can see this)"}</span>
                                </a>
                                <a href={isPremium ? `tel:${mobile}` : '#PremiumReq'} className="btn btn-info flex items-center text-base lg:text-lg">
                                    <FaPhone className="mr-1" />Phone: <span className="text-customGulabi ml-1 font-semibold">{isPremium ? `${mobile}` : "(Premium members can see this)"}</span>
                                </a>
                            </div>

                            <div data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="md:flex gap-4 mt-6 w-full h-fit mb-4">
                                {isFavorite1 ? (
                                    <button 
                                        className="btn btn-primary bg-primary-foreground font-bold border-2 text-customGulabi justify-center border-customGulabi mb-3 p-4 flex gap-1 w-full md:w-fit h-fit items-center"
                                        onClick={handleRemoveFavorites}
                                    >
                                        <HeartOff className="text-customGulabi"/> Remove from Favorites
                                    </button>)
                                    : (
                                        <button
                                            className="btn btn-primary bg-customGulabi border-2 border-customGulabi justify-center text-white mb-3 p-4 flex gap-1 w-full md:w-fit h-fit items-center"
                                            onClick={handleAddToFavorites}
                                        >
                                            <FaHeart /> Add to Favorites
                                        </button>
                                    )}
                                {!isPremium && (
                                    <button 
                                        id="PremiumReq"
                                        className="btn btn-secondary bg-customGulabi justify-center text-white p-4 flex gap-1 w-full md:w-fit h-fit items-center"
                                        onClick={handleRequestContactInfo}
                                    >
                                        <ContactRoundIcon />
                                        Request Contact Info
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="container mx-auto py-12 pb-16 bg-slate-200" id='similar'>
                        <div className="flex flex-col md:flex-row justify-between mb-12 items-center">
                            <div data-aos="fade-right" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className='mb-6 md:mb-0 text-center md:text-left'>
                                <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
                                <h2 className="text-4xl font-bold text-customBlue"><span className='text-customGulabi'>Similar</span> Biodatas</h2>
                                <p className="">Check out other three similar biodatas profile cards</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                            {similarBiodatas.map((profile) => (
                                <ProfileCard key={profile._id} profile={profile} refetch={refetch} isFavorite={isFavorite} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-full items-center justify-center h-screen">
                    Loading...
                </div>
            )}
        </div>
    );
};

export default BiodataDetails;
