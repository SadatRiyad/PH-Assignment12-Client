import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/components/Hooks/useAuth/useAuth";
import { ToastContainer, toast } from "react-toastify";
import useMyBiodata from "@/components/Hooks/useBiodatas/useMyBiodata";
import { Helmet } from "react-helmet-async";

export default function GotMarried() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [biodata] = useMyBiodata();
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        selfBiodataId: `${biodata.biodataID}`,
        partnerBiodataId: "",
        coupleImage: "",
        successStoryText: "",
        marriageDate: "",
        reviewStar: "",
        submittedUserName: `${user.displayName}`,
        submittedUserEmail: `${user.email}`,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosSecure.post("/marriages", formData)
            .then((res) => {
                if (res.data) {
                    toast("Congratulations! Your marriage story has been shared successfully.", { type: "success", autoClose: 2000 });
                }
            })
            // navigate("/dashboard");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container mx-auto px-0 py-4">
            <Helmet>
                <title>Got Merried | BB-Matrimony</title>
            </Helmet>
            <Card>
                <CardHeader>
                    <CardTitle>Share Your Marriage Story</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="selfBiodataId" className="block text-sm font-medium text-gray-700">
                                Self Biodata Id
                            </label>
                            <Input
                                id="selfBiodataId"
                                name="selfBiodataId"
                                type="text"
                                placeholder="Enter your biodata ID"
                                value={formData.selfBiodataId}
                                onChange={handleChange}
                                readOnly
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="partnerBiodataId" className="block text-sm font-medium text-gray-700">
                                Partner Biodata Id
                            </label>
                            <Input
                                id="partnerBiodataId"
                                name="partnerBiodataId"
                                type="text"
                                placeholder="Enter partner's biodata ID"
                                value={formData.partnerBiodataId}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="coupleImage" className="block text-sm font-medium text-gray-700">
                                Couple Image Link
                            </label>
                            <Input
                                id="coupleImage"
                                name="coupleImage"
                                type="url"
                                placeholder="Enter couple image URL"
                                value={formData.coupleImage}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="successStoryText" className="block text-sm font-medium text-gray-700">
                                Success Story
                            </label>
                            <Textarea
                                id="successStoryText"
                                name="successStoryText"
                                placeholder="Share your story..."
                                value={formData.successStoryText}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="marriageDate" className="block text-sm font-medium text-gray-700">
                                Marriage Date
                            </label>
                            <Input
                                id="marriageDate"
                                name="marriageDate"
                                type="date"
                                value={formData.marriageDate}
                                onChange={handleChange}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="reviewStar" className="block text-sm font-medium text-gray-700">
                                Review Star
                            </label>
                            <select
                                id="reviewStar"
                                name="reviewStar"
                                value={formData.reviewStar}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            >
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <option key={star} value={star}>
                                        {star} star{star > 1 && "s"}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer/>
        </div>
    );
}
