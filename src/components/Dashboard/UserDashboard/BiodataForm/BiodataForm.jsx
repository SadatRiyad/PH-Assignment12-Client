import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import useAuth from "@/components/Hooks/useAuth/useAuth";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useBiodatas from "@/components/Hooks/useBiodatas/useBiodatas";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BiodataForm = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [biodatas] = useBiodatas();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [biodata, setBiodata] = useState(null);
    const navigate = useNavigate();
    const redirect = '/dashboard/editBiodata';
    const id = biodata?._id;
    const prevBiodataID = biodatas.length;
    const newBiodataID = prevBiodataID + 1;
    const biodataID = "BiodataID-" + newBiodataID;
    const isPremium = false;

    const [selectValues, setSelectValues] = useState({
        biodataType: '',
        height: '',
        weight: '',
        occupation: '',
        race: '',
        permanentDivision: '',
        presentDivision: '',
        expectedPartnerHeight: '',
        expectedPartnerWeight: '',
    });

    // using tanstack and axiosSecure without useEffect
    const { data: myBiodata = [], isPending: loading, refetch } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/email/${user.email}`)
            // console.log(res.data)
            if (res.data) {
                setBiodata(res.data);
                setIsEditMode(true);
                // console.log(isEditMode)
                for (const [key, value] of Object.entries(res.data)) {
                    setValue(key, value);
                }
                setSelectValues({
                    biodataType: res.data?.biodataType || '',
                    height: res.data?.height || '',
                    weight: res.data?.weight || '',
                    occupation: res.data?.occupation || '',
                    race: res.data?.race || '',
                    permanentDivision: res.data?.permanentDivision || '',
                    presentDivision: res.data?.presentDivision || '',
                    expectedPartnerHeight: res.data?.expectedPartnerHeight || '',
                    expectedPartnerWeight: res.data?.expectedPartnerWeight || '',
                });
            }
            return [myBiodata, loading, refetch];
        },
    });

    useEffect(() => {
        if (isEditMode && biodata) {
            setSelectValues({
                biodataType: biodata.biodataType || '',
                height: biodata.height || '',
                weight: biodata.weight || '',
                occupation: biodata.occupation || '',
                race: biodata.race || '',
                permanentDivision: biodata.permanentDivision || '',
                presentDivision: biodata.presentDivision || '',
                expectedPartnerHeight: biodata.expectedPartnerHeight || '',
                expectedPartnerWeight: biodata.expectedPartnerWeight || '',
            });
        }
    }, [isEditMode, biodata]);

    if (loading) {
        return <div className="flex text-center items-center justify-center h-dvh w-dvw">Loading...</div>
    }

    const handleSelectChange = (name, value) => {
        setValue(name, value);
        setSelectValues(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (data) => {
        if (isEditMode) {
            axiosSecure.put(`/biodata/id/${id}`, data)
                .then((response) => {
                    if (response.data.acknowledged === true) {
                        toast("Biodata Updated successfully!", { type: "success", autoClose: 2000 });
                        refetch();
                    }
                }).catch((error) => {
                    console.log(error)
                    toast("Failed to Update biodata. Please try again.", { type: "error", autoClose: 2000 });
                });
        } else {
            axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/biodata`,
                data: { ...data, email: user.email, biodataID, isPremium },
                withCredentials: true,
            }).then((response) => {
                if (response.data.acknowledged === true) {
                    toast("Biodata saved successfully!", { type: "success", autoClose: 2000 });
                    navigate(redirect);
                    refetch();
                }
            }).catch((error) => {
                console.log(error)
                toast("Failed to save biodata. Please try again.", { type: "error", autoClose: 2000 });
            });
        }
    };
    return (
        <div className="p-4 md:p-8 md:px-20 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
            <Helmet>
                <title>{isEditMode ? "Edit Biodata" : "Add Biodata"} | BB-Matrimony</title>
            </Helmet>
            <Card className="mx-auto max-w-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-customBlue">{isEditMode ? "Edit Your Biodata" : "Create Your Biodata"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="biodataType">Biodata Type</Label>
                            <Select id="biodataType" {...register("biodataType", !isEditMode && { required: "Biodata Type is required" })} value={selectValues.biodataType} onValueChange={(value) => handleSelectChange('biodataType', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.biodataType}` : "Select Biodata Type"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.biodataType && <span className="text-customRed text-sm mt-1">{errors.biodataType.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={isEditMode ? `${biodata?.name}` : ''} {...register("name", { required: "Name is required" })} placeholder="Your Name" />
                            {errors.name && <span className="text-customRed text-sm mt-1">{errors.name.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="profileImage">Profile Image Link</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.profileImage}` : ''} id="profileImage" {...register("profileImage", { required: "Profile Image Link is required" })} placeholder="http://example.com/image.jpg" />
                            {errors.profileImage && <span className="text-customRed text-sm mt-1">{errors.profileImage.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.dob}` : ''} id="dob" type="date" {...register("dob", { required: "Date of Birth is required" })} />
                            {errors.dob && <span className="text-customRed text-sm mt-1">{errors.dob.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="height">Height</Label>
                            <Select id="height" value={selectValues.height} onValueChange={(value) => handleSelectChange('height', value)} {...register("height", !isEditMode && { required: "Height is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.height}` : "Select Height"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Short">Short</SelectItem>
                                    <SelectItem value="Average">Average</SelectItem>
                                    <SelectItem value="Tall">Tall</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.height && <span className="text-customRed text-sm mt-1">{errors.height.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="weight">Weight</Label>
                            <Select id="weight" value={selectValues.weight} onValueChange={(value) => handleSelectChange('weight', value)} {...register("weight", !isEditMode && { required: "Weight is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.weight}` : "Select Weight"} />

                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Light">Light</SelectItem>
                                    <SelectItem value="Average">Average</SelectItem>
                                    <SelectItem value="Heavy">Heavy</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.weight && <span className="text-customRed text-sm mt-1">{errors.weight.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="age">Age</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.age}` : ''} id="age" type="number" {...register("age", { required: "Age is required" })} placeholder="Your Age" />
                            {errors.age && <span className="text-customRed text-sm mt-1">{errors.age.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Select id="occupation" value={selectValues.occupation} onValueChange={(value) => handleSelectChange('occupation', value)} {...register("occupation", !isEditMode && { required: "Occupation is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.occupation}` : "Select Occupation"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Student">Student</SelectItem>
                                    <SelectItem value="Job">Job</SelectItem>
                                    <SelectItem value="House wife">House wife</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.occupation && <span className="text-customRed text-sm mt-1">{errors.occupation.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="race">Race</Label>
                            <Select id="race" value={selectValues.race} onValueChange={(value) => handleSelectChange('race', value)} {...register("race", !isEditMode && { required: "Race is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.race}` : "Select Race"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Asian">Asian</SelectItem>
                                    <SelectItem value="African">African</SelectItem>
                                    <SelectItem value="Caucasian">Caucasian</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.race && <span className="text-customRed text-sm mt-1">{errors.race.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="fathersName">Father Name</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.fathersName}` : ''} id="fathersName" {...register("fathersName")} placeholder="Father's Name" />
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="mothersName">Mother Name</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.mothersName}` : ''} id="mothersName" {...register("mothersName")} placeholder="Mother's Name" />
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="permanentDivision">Permanent Division</Label>
                            <Select id="permanentDivision" value={selectValues.permanentDivision} onValueChange={(value) => handleSelectChange('permanentDivision', value)} {...register("permanentDivision", !isEditMode && { required: "Permanent Division is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.permanentDivision}` : "Select Permanent Division"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                                    <SelectItem value="Chattagram">Chattagram</SelectItem>
                                    <SelectItem value="Rangpur">Rangpur</SelectItem>
                                    <SelectItem value="Barisal">Barisal</SelectItem>
                                    <SelectItem value="Khulna">Khulna</SelectItem>
                                    <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                                    <SelectItem value="Sylhet">Sylhet</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.permanentDivision && <span className="text-customRed text-sm mt-1">{errors.permanentDivision.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="presentDivision">Present Division</Label>
                            <Select id="presentDivision" value={selectValues.presentDivision} onValueChange={(value) => handleSelectChange('presentDivision', value)} {...register("presentDivision", !isEditMode && { required: "Present Division is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.presentDivision}` : "Select Present Division"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Dhaka">Dhaka</SelectItem>
                                    <SelectItem value="Chattagram">Chattagram</SelectItem>
                                    <SelectItem value="Rangpur">Rangpur</SelectItem>
                                    <SelectItem value="Barisal">Barisal</SelectItem>
                                    <SelectItem value="Khulna">Khulna</SelectItem>
                                    <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                                    <SelectItem value="Sylhet">Sylhet</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.presentDivision && <span className="text-customRed text-sm mt-1">{errors.presentDivision.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="expectedPartnerAge">Expected Partner Age</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.expectedPartnerAge}` : ''} id="expectedPartnerAge" type="number" {...register("expectedPartnerAge")} placeholder="Expected Partner Age" />
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="expectedPartnerHeight">Expected Partner Height</Label>
                            <Select id="expectedPartnerHeight" value={selectValues.expectedPartnerHeight} onValueChange={(value) => handleSelectChange('expectedPartnerHeight', value)} {...register("expectedPartnerHeight", !isEditMode && { required: "Expected Partner Height is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.expectedPartnerHeight}` : "Select Expected Partner Height"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Short">Short</SelectItem>
                                    <SelectItem value="Average">Average</SelectItem>
                                    <SelectItem value="Tall">Tall</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.expectedPartnerHeight && <span className="text-customRed text-sm mt-1">{errors.expectedPartnerHeight.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="expectedPartnerWeight">Expected Partner Weight</Label>
                            <Select id="expectedPartnerWeight" value={selectValues.expectedPartnerWeight} onValueChange={(value) => handleSelectChange('expectedPartnerWeight', value)} {...register("expectedPartnerWeight", !isEditMode && { required: "Expected Partner Weight is required" })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={isEditMode ? `${biodata?.expectedPartnerWeight}` : "Select Expected Partner Weight"} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Light">Light</SelectItem>
                                    <SelectItem value="Average">Average</SelectItem>
                                    <SelectItem value="Heavy">Heavy</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.expectedPartnerWeight && <span className="text-customRed text-sm mt-1">{errors.expectedPartnerWeight.message}</span>}
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="email">Contact Email</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.email}` : ''} id="email" type="email" value={user.email} readOnly />
                        </div>

                        <div className="grid gap-2 form-control mb-1">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input defaultValue={isEditMode ? `${biodata?.mobile}` : ''} id="mobile" {...register("mobile", { required: "Mobile Number is required" })} placeholder="Mobile Number" />
                            {errors.mobile && <span className="text-customRed text-sm mt-1">{errors.mobile.message}</span>}
                        </div>

                        <Button type="submit" className="w-full form-control mt-6 bg-customBlue hover:bg-customRed">
                            {isEditMode ? "Update Now" : "Submit Now"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default BiodataForm;
