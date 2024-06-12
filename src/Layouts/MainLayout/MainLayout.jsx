import { Outlet, ScrollRestoration } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from "@/components/Shered/Navbar/Navbar";
import Footer from "@/components/Shered/Footer/Footer";


const MainLayout = () => {
    return (
        <>
            <ScrollRestoration />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </>
    );
};

export default MainLayout;