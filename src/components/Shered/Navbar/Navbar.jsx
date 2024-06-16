import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/footerLogo-removebg-preview.png";
import "./Navbar.css";
import useAuth from "../../Hooks/useAuth/useAuth";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const handleLogout = () => {
        logoutUser();
    };

    const Links = (
        <>
            <NavLink to="/" className="hover:text-customBlue text-white font-medium focus:text-customBlue hover:bg-transparent transition-colors duration-75 mr-[1px] mb-[3px]">Home</NavLink>
            <NavLink to="/biodatas" className="hover:text-customBlue text-white font-medium focus:text-customBlue hover:bg-transparent transition-colors duration-75 mr-[1px] mb-[3px]">Biodatas</NavLink>
            <NavLink to="/aboutUs" className="hover:text-customBlue text-white font-medium focus:text-customBlue hover:bg-transparent transition-colors duration-75 mr-[1px] mb-[3px]">About Us</NavLink>
            <NavLink to="/contactUs" className="hover:text-customBlue text-white font-medium focus:text-customBlue hover:bg-transparent transition-colors duration-75 mr-[1px] mb-[3px]">Contact Us</NavLink>
            {user && <NavLink to="/dashboard" className="hover:text-customBlue text-white font-medium focus:text-customBlue hover:bg-transparent transition-colors duration-75 mr-[1px] mb-[3px]">Dashboard</NavLink>}
        </>
    );

    return (
        <header className="sticky bg-customGulabi flex justify-evenly w-full z-10 top-0 h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div>
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        to="/"
                        className="flex w-2/4 items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <img src={logo} alt="Logo" className="w-[50%]" />
                    </Link>
                    <div className="flex justify-evenly w-full">
                        {Links}
                    </div>
                </nav>
            </div>
            <div className="w-full md:w-fit">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-customGulabi">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <img src={logo} alt="Logo" className="w-[80%]" />
                            </Link>
                            {Links}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="ml-auto flex-1 sm:flex-initial">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                                <Avatar className="w-15 rounded-full p-[2px] border border-customBlue">
                                    <AvatarImage className="rounded-full" src={user?.photoURL} />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Link to="/dashboard">My Dashboard</Link></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <NavLink to="/login" className="btn mx-2 px-5 py-3 justify-center items-center bg-customBlue hover:bg-transparent border-customBlue text-white hover:text-customBlue rounded border hover:border-customBlue transition-all duration-200">Login</NavLink>
                )}
            </div>
        </header>
    );
};

export default Navbar;
