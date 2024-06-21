import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure";
import useMyBiodata from "@/components/Hooks/useBiodatas/useMyBiodata";
import { Helmet } from "react-helmet-async";
import { IoDiamond } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ViewBiodata = () => {
    const img = 'https://cdn.dribbble.com/users/1489103/screenshots/6326497/no-data-found.png';
    const [biodata, refetch] = useMyBiodata();
    const axiosSecure = useAxiosSecure();
    const isPremium = "pending";
    const data = { isPremium };

    const {
        _id,
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
        biodataID,
        isPremium: Premium
    } = biodata;

    const handleMakePremium = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make your biodata premium?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/biodata/id/${_id}`, data)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.acknowledged === true) {
                            refetch();
                            Swal.fire({
                                title: "Request Sent!",
                                text: "Your request to make the biodata premium has been sent.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };
    return (
        <div className="container px-0 mx-auto">
            <Helmet>
                <title>View Biodata | BB-Matrimony</title>
            </Helmet>
            {biodata ? (
                <div className="biodata-details">
                    <h1 className="text-4xl font-bold text-center bg-customBlue pt-1 pb-3 text-white border-x-4 border-x-customGulabi  border-t-4 border-t-customGulabi"><span className='text-4xl font-extrabold text-customGulabi'>_______</span> <br />{biodataID}</h1>
                    <div className="flex flex-col lg:flex-row border-4 border-customGulabi bg-customBlue text-white p-6 lg:items-center">
                        <img data-aos="fade-right" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" src={profileImage} alt={name} className="min-h-60 max-h-screen w-full lg:w-2/4 rounded-lg lg:mr-8 border-4 border-customGulabi" />
                        <div data-aos="fade-left" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="lg:ml-5 mt-5 lg:mt-5">
                            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-customGulabi">{name}</h2>
                            <p className="text-base md:text-lg">Your Age: <span className="text-customGulabi ml-1 font-semibold">{age}</span></p>
                            <p className="text-base md:text-lg">Your Gender: <span className="text-customGulabi ml-1 font-semibold">{biodataType}</span></p>
                            <p className="text-base md:text-lg">Your Date of Birth: <span className="text-customGulabi ml-1 font-semibold">{dob}</span></p>
                            <p className="text-base md:text-lg">Your Occupation: <span className="text-customGulabi ml-1 font-semibold">{occupation}</span></p>
                            <p className="text-base md:text-lg">Your Height: <span className="text-customGulabi ml-1 font-semibold">{height}</span></p>
                            <p className="text-base md:text-lg">Your Weight: <span className="text-customGulabi ml-1 font-semibold">{weight}</span></p>
                            <p className="text-base md:text-lg">Your Race: <span className="text-customGulabi ml-1 font-semibold">{race}</span></p>
                            <p className="text-base md:text-lg">Your Permanent Division: <span className="text-customGulabi ml-1 font-semibold">{permanentDivision}</span></p>
                            <p className="text-base md:text-lg">Your Present Division: <span className="text-customGulabi ml-1 font-semibold">{presentDivision}</span></p>
                            <p className="text-base md:text-lg">Your Father&apos;s Name: <span className="text-customGulabi ml-1 font-semibold">{fathersName}</span></p>
                            <p className="text-base md:text-lg">Your Mother&apos;s Name: <span className="text-customGulabi ml-1 font-semibold">{mothersName}</span></p>
                            <p className="text-base md:text-lg">Expected Partner Age: <span className="text-customGulabi ml-1 font-semibold">{expectedPartnerAge}</span></p>
                            <p className="text-base md:text-lg">Expected Partner Height: <span className="text-customGulabi ml-1 font-semibold">{expectedPartnerHeight}</span></p>
                            <p className="text-base md:text-lg">Expected Partner Weight: <span className="text-customGulabi ml-1 font-semibold">{expectedPartnerWeight}</span></p>
                            <p className="text-base md:text-lg">Your Email: <span className="text-customGulabi ml-1 font-semibold">{email}</span></p>
                            <p className="text-base md:text-lg">Your Phone: <span className="text-customGulabi ml-1 font-semibold">{mobile}</span></p>
                            <div data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="md:flex gap-4 mt-6 w-full h-fit mb-4">
                                {
                                    Premium === "pending" ? (
                                        <button
                                            className="btn btn-primary bg-gray-500 text-white mb-3 p-4 flex gap-1 w-full justify-center h-fit items-center"
                                            disabled
                                        >
                                            Already Requested for Premium <IoDiamond />
                                        </button>
                                    ) : Premium === true ? (
                                        <button
                                            className="btn btn-primary bg-customGulabi text-white mb-3 p-4 flex gap-1 w-full justify-center h-fit items-center"
                                            disabled
                                        >
                                            Your biodata is Already Premium <IoDiamond />
                                        </button>)
                                        : Premium === false ? (
                                            <button
                                                className="btn btn-primary bg-customGulabi text-white mb-3 p-4 flex gap-1 w-full justify-center h-fit items-center"
                                                onClick={handleMakePremium}
                                            >
                                                Make Biodata to Premium <IoDiamond />
                                            </button>)
                                            : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="biodata-details">
                    <h1 className="text-4xl font-bold text-center bg-customBlue pt-1 pb-3 text-white border-x-4 border-x-customGulabi  border-t-4 border-t-customGulabi"><span className='text-4xl font-extrabold text-customGulabi'>_______</span> <br />View Biodata</h1>
                    <div className="flex flex-col lg:flex-row border-4 border-customGulabi bg-customBlue text-white p-6 lg:items-center">
                        <img data-aos="fade-right" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" src={img} alt={name} className="min-h-60 w-full lg:w-2/4 rounded-lg lg:mr-8 border-4 border-customGulabi" />
                        <div data-aos="fade-left" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="lg:ml-5 mt-5 lg:mt-5">
                            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-customGulabi">No Biodata Found!</h2>
                            <p className="text-base lg:text-lg text-balance">Please create your biodata to view it here, Click the button below to create your biodata.</p>
                            <div data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="md:flex gap-4 mt-6 w-full h-fit mb-4">
                                <Link to="/dashboard/addBiodata" className="btn btn-primary bg-customGulabi text-white mb-3 p-4 flex gap-1 w-full justify-center h-fit items-center"> Create Biodata </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewBiodata;