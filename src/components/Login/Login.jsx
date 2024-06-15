import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location?.state?.from ? location.state.from : '/';
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { loginUser, handleSignInWithGoogle } = useAuth();

    // toggle password visibility
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
        // console.log(data);
        const { email, password } = data;
        loginUser(email, password)
            .then(() => {
                toast("Login Successfully!", { type: "success", autoClose: 2000 });
                setTimeout(() => {
                    navigate(redirect);
                }, 3000)
            })
            .catch(() => {
                toast.error("Invalid login credentials. Please check your email and password.", { type: "error", autoClose: 2000 })
            })
    };

    return (
        <div className="p-8 md:px-20 min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
            <Helmet>
                <title>Login | BB-Matrimony</title>
            </Helmet>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-customBlue">Login to BB-Matrimony</CardTitle>
                    <CardDescription>
                        Welcome back! <br /> Please login to your account to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="grid gap-2 form-control mb-1">
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

                            <div className="grid gap-2 relative mb-2 mt-4">
                                <div className="flex items-center form-control">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
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
                                Login
                            </Button>
                        </form>
                        <Button onClick={() => SignInWithGoogle()} variant="outline" className="w-full">
                            <FcGoogle className="text-xl mr-2"></FcGoogle> Continue with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to='/register' className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default Login;