import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "@/components/Hooks/useAuth/useAuth";
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    // get biodataID from the url
    const biodataID = window.location.pathname.split("/").pop();
    const { user } = useAuth();
    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState({
        biodataId: biodataID || "anonymous",
        selfName: user?.displayName || "anonymous",
        selfEmail: user?.email || "anonymous",
    });
    // console.log(formData)
    const datas ={
        biodataId: formData.biodataId,
        selfName: formData.selfName,
        selfEmail: formData.selfEmail,
        status: "pending",
        amountPaid: 5,
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error("Stripe error:", error);
        } else {
            try {
                const response = await axiosSecure.post("/payments", {
                    amount: 500, // Amount in cents (5 USD)
                    paymentMethodId: paymentMethod.id,
                });
                // console.log(response.status); // Check the response status

                if (response.data.success) {
                    await axiosSecure.post("/contact-requests", datas);
                    Swal.fire({
                        title: "Congratulations!",
                        text: `Your Payment for Contact Request: ${biodataID} is Successful.`,
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Okay"
                      }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/dashboard/myContactRequest");
                        }
                      });
                    
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        <div className="flex items-center justify-center h-96">Loading...   </div>
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-52 lg:px-80 bg-customBlue">
            <Helmet>
                <title>Checkout | BB-Matrimony</title>
            </Helmet>
            <Card className="md:p-1">
                <CardHeader>
                    <CardTitle className="text-4xl text-center mb-4 md:mb-6">Checkout Now</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="biodataId" className="block text-sm font-medium text-gray-700">
                                Biodata Id
                            </label>
                            <Input
                                id="biodataId"
                                name="biodataId"
                                type="text"
                                value={formData.biodataId}
                                readOnly
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="selfEmail" className="block text-sm font-medium text-gray-700">
                                Self Email
                            </label>
                            <Input
                                id="selfEmail"
                                name="selfEmail"
                                type="email"
                                value={formData.selfEmail}
                                readOnly
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="cardElement" className="block text-sm font-medium text-gray-700">
                                Card Details
                            </label>
                            <CardElement
                                id="cardElement"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#32325d',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#fa755a',
                                        },
                                    },
                                }}
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <Button className="w-full mt-1" type="submit" disabled={!stripe || loading}>
                                Pay $5.00
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

const WrappedCheckoutPage = () => (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
);

export default WrappedCheckoutPage;
