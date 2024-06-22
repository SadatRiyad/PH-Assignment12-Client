import {
    CircleUser,
    Contact,
    Contact2,
    Edit,
    Heart,
    LayoutDashboardIcon,
    LogOutIcon,
    Menu,
    Table,
    UserCircle,
    Users,
    View,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png";
import "../../index.css"
import useAuth from "@/components/Hooks/useAuth/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUserCheck } from "react-icons/fa6"
import useMyBiodata from "@/components/Hooks/useBiodatas/useMyBiodata"
import { AiFillDashboard } from "react-icons/ai"
import useAdmin from "@/components/Hooks/useAdmin/useAdmin"
import { useEffect, useState } from "react"
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure"

export default function DashboardLayout() {
    const axiosSecure = useAxiosSecure();
    const { user, logoutUser } = useAuth();
    const [biodata, , loading] = useMyBiodata()
    const [isAdmin] = useAdmin();
    const [isPremium, setIsPremium] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const forLgClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
    const forMblClass = "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
    const handleLogout = () => {
        logoutUser();
    };

    useEffect(() => {
        axiosSecure.get(`/users/email/${user.email}`)
            .then((res) => {
                setIsPremium(res.data.isPremium);
                setData(res.data);
            })
    }, [axiosSecure, isPremium, user.email])
    // console.log(data)
    const userLinks = (
        <>
            <Link to="/dashboard" className={`${forMblClass} md:${forLgClass} text-customBlue`}>
                <AiFillDashboard className="h-4 w-4" /> User Dashboard
            </Link>
            {biodata?._id ? <NavLink to="/dashboard/editBiodata" className={`${forMblClass} md:${forLgClass}`}><Edit className="h-4 w-4" /> Edit Biodata</NavLink> : <NavLink to="/dashboard/addBiodata" className={`${forMblClass} md:${forLgClass}`}><Edit className="h-4 w-4" /> Add Biodata</NavLink>}
            <NavLink to="/dashboard/viewBiodata" className={`${forMblClass} md:${forLgClass}`}>
                <View className="h-4 w-4" /> View Biodata
            </NavLink>
            <NavLink to="/dashboard/myContactRequest" className={`${forMblClass} md:${forLgClass}`}>
                <Contact className="h-4 w-4" /> My Contact Requests
            </NavLink>
            <NavLink to="/dashboard/favouritesBiodata" className={`${forMblClass} md:${forLgClass}`}>
                <Heart className="h-4 w-4" /> Favourites Biodata
            </NavLink>
            <NavLink to="/dashboard/gotMarried" className={`${forMblClass} md:${forLgClass}`}>
                <UserCircle className="h-4 w-4" /> Got Married
            </NavLink>
            <button onClick={handleLogout} className={`${forMblClass} md:${forLgClass}`}>
                <LogOutIcon className="h-4 w-4" /> Logout
            </button>
        </>
    );
    const adminLinks = (
        <>
            <Link to="/dashboard" className={`${forMblClass} md:${forLgClass} text-customBlue`}>
                <AiFillDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <NavLink to="/dashboard/adminDashboard" className={`${forMblClass} md:${forLgClass}`}>
                <LayoutDashboardIcon className="h-4 w-4" /> Admin Dashboard
            </NavLink>
            <NavLink to="/dashboard/manageUsers" className={`${forMblClass} md:${forLgClass}`}>
                <Users className="h-4 w-4" /> Manage Users
            </NavLink>
            <NavLink to="/dashboard/approvedPremium" className={`${forMblClass} md:${forLgClass}`}>
                <FaUserCheck className="h-4 w-4" /> Approved Premium Biodata
            </NavLink>
            <NavLink to="/dashboard/approvedContactRequest" className={`${forMblClass} md:${forLgClass}`}>
                <Contact2 className="h-4 w-4" /> Approved Contact Request
            </NavLink>
            <NavLink to="/dashboard/successStory" className={`${forMblClass} md:${forLgClass}`}>
                <Table className="h-4 w-4" /> Success Story
            </NavLink>
            <button onClick={handleLogout} className={`${forMblClass} md:${forLgClass}`}>
                <LogOutIcon className="h-4 w-4" /> Logout
            </button>
        </>
    );

    if (loading) {
        return <div className="flex text-center items-center justify-center h-dvh w-dvw">Loading...</div>
    }

    const handleUpgrade = () => {
        navigate(`/checkout/upgrade/${data?._id}`);
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <img className="w-[70%]" src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {
                                !isAdmin ? userLinks : adminLinks
                            }
                        </nav>
                    </div>
                    {
                        isAdmin === false && isPremium === false ? (
                            <div className="p-4 fixed bottom-0">
                                <Card x-chunk="dashboard-02-chunk-0">
                                    <CardHeader className="p-2 pt-0 md:p-4">
                                        <CardTitle className="text-lg">Upgrade to Premium</CardTitle>
                                        <CardDescription className="text-balance text-sm">
                                            Unlock all features <br /> and get unlimited access <br /> to our support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            onClick={handleUpgrade}
                                        >
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : isAdmin === false && isPremium === true ? (
                            <div className="p-4 fixed bottom-0 ">
                                <Card x-chunk="dashboard-02-chunk-0">
                                    <CardHeader className="p-2 pt-0 md:p-4">
                                        <CardTitle className="text-lg">Congratulations!</CardTitle>
                                        <CardDescription className="text-balance text-sm">
                                            You are already <br /> a premium member.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                        <Button size="sm" className="w-full">
                                            <Link to="/contactUs/#support">Contact Us</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <img className="w-[70%] mb-4" src={logo} alt="" />
                                </Link>

                                {
                                    !isAdmin ? userLinks : adminLinks
                                }
                            </nav>
                            {
                                isAdmin === false && isPremium === false ? (
                                    <div className="mt-auto">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="border-0 border-b-0">Upgrade to Premium</CardTitle>
                                                <CardDescription className="text-xs">
                                                    Unlock all features and get unlimited access to our
                                                    support team.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>

                                                <Button
                                                    size="sm"
                                                    className="w-full"
                                                    onClick={handleUpgrade}
                                                >
                                                    Upgrade
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ) : isAdmin === false && isPremium === true ? (
                                    <div className="mt-auto">
                                        <Card>
                                            <CardHeader>
                                                <Card className="border-0 border-b-0">Congratulations!</Card>
                                                <CardDescription className="text-xs">
                                                    You are already a premium member.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button size="sm" className="w-full">
                                                    <Link to="/contactUs">Contact Us</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ) : null
                            }
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1 ">
                        <form>
                            <div className="relative">
                                {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full hidden appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full bg-customBlue">
                                <CircleUser className="h-5 w-5 text-white" />
                                <span className="sr-only">Toggle user menu</span>
                                <Avatar className="w-15 rounded-full p-[2px]">
                                    <AvatarImage className="rounded-full" src={user?.photoURL} />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link to="/">Home</Link></DropdownMenuItem>
                            <DropdownMenuItem><Link to="/contactUs/#support">Contact Us</Link></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <ScrollRestoration />
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    )
}