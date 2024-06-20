import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth/useAuth";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublix";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { registerUser, updateUserProfile, setRender, render, setUser, user, handleSignInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location?.state || '/';
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    // handleSignInWithGoogle 
    const SignInWithGoogle = () => {
        handleSignInWithGoogle()
            .then(() => {
                toast("Google Login Successfully!", { type: "success", autoClose: 2000 });
                setTimeout(() => {
                    navigate(redirect);
                }, 3000)
            })
            .catch(() => {
                toast("Invalid login credentials.", { type: "error", autoClose: 2000 })
                reset();
            })
    };

    const onSubmit = (data) => {
        const { name, email, photoURL, password } = data;

        registerUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(name, photoURL)
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: 'user',
                            isPremium: false,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    setRender(!render);
                                    setUser({ ...user, displayName: name, photoURL: photoURL })
                                    reset();
                                    toast("Register Successfully!", { type: "success", autoClose: 2000 });
                                    setTimeout(() => {
                                        navigate(redirect);
                                    }, 3000)
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
            .catch(() => {
                toast.error('Email already in use, please try another email', { autoClose: 2000 });
                reset();
            });
    };

    return (
        <div className="p-8 md:px-20 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
            <Helmet>
                <title>Register | BB-Matrimony</title>
            </Helmet>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-customBlue">Register to BB-Matrimony</CardTitle>
                    <CardDescription>
                        Join our community and find your perfect match.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="grid gap-2 form-control mb-2 mt-2">
                                <Label htmlFor="name">Name</Label>
                                <Input  {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Please input your name",
                                    },
                                })}
                                    type="text"
                                    placeholder="Your full name"
                                    id="name"
                                    required
                                />
                                {errors?.name && (
                                    <span className="text-customRed text-sm mt-1 items-center flex">
                                        <BsInfoCircle className="mr-1 font-bold" />
                                        {errors?.name?.message}
                                    </span>
                                )}
                            </div>




                            {/* <div className="items-center flex mt-1">
                                <input
                                    {...register("checkbox", {
                                        required: {
                                            value: true,
                                            message: "Checkbox must be checked",
                                        },
                                    })}
                                    type="checkbox"
                                    className="checkbox bg-white border-[1.4px] checked:border-none checked:bg-orange border-dotted border-orange checkbox-xs mr-1"
                                />
                                <label htmlFor="terms" className="text-xs text-tertiary">
                                    I agree to the{" "}
                                    <Link to="#" className="text-orange underline">
                                        terms and conditions!
                                    </Link>
                                </label>
                                {errors?.checkbox && (
                                    <span className="text-red text-xs mt-1 flex items-center">
                                        <BsInfoCircle className="mr-1 text-orange font-bold text-base" />
                                        {errors?.checkbox?.message}
                                    </span>
                                )}
                            </div> */}
                            <div className="grid gap-2 form-control mb-2 mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Please enter your email"
                                    }, pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,9}$/,
                                        message: "Invalid email format"
                                    }
                                })}
                                    id="email"
                                    type="email"
                                    placeholder="mail@example.com"
                                    required
                                />
                                {errors?.email && <span className="text-customRed text-sm mt-1 items-center flex"><BsInfoCircle className="mr-1 font-bold" />{errors?.email?.message}</span>}
                            </div>

                            <div className="grid gap-2 form-control mb-2 mt-4">
                                <Label htmlFor="photoURL">Photo URL</Label>
                                <Input   {...register("photoURL", {
                                    required: {
                                        value: true,
                                        message: "Please enter a photo URL",
                                    },
                                })}
                                    type="text"
                                    placeholder="Your photo URL"
                                    id="photoURL"
                                    required
                                />
                                {errors?.photoURL && (
                                    <span className="text-customRed text-sm mt-1 items-center flex">
                                        <BsInfoCircle className="mr-1 font-bold" />
                                        {errors?.photoURL?.message}
                                    </span>
                                )}
                            </div>


                            <div className="grid gap-2 relative mb-2 mt-4">
                                <div className="flex items-center form-control">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    }, minLength: {
                                        value: 6,
                                        message: "Minimum length of 6 characters"
                                    }, validate: {
                                        uppercase: value => value === value.toLowerCase() ? "Password must contain at least one uppercase letter" : undefined,
                                        lowercase: value => value === value.toUpperCase() ? "Password must contain at least one lowercase letter" : undefined
                                    }
                                })} id="password" className="pr-9" type={passwordVisible ? 'text' : 'password'} placeholder="your password" required />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 top-7 right-0 items-center px-3"
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ?
                                        <AiOutlineEye size={20} />
                                        :
                                        <AiOutlineEyeInvisible size={20} />
                                    }
                                </button>
                            </div>
                            {errors?.password && <span className="text-customRed text-sm mt-1 items-center flex"><BsInfoCircle className="mr-1 font-bold" />{errors?.password?.message}</span>}

                            <Button type="submit" className="w-full form-control mt-6 bg-customBlue hover:bg-customRed">
                                Register
                            </Button>
                        </form>
                        <Button onClick={() => SignInWithGoogle()} variant="outline" className="w-full">
                            <FcGoogle className="text-xl mr-2"></FcGoogle> Continue with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to='/login' className="underline">
                            Login Here
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default Register;