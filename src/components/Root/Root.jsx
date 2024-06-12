import { Outlet, ScrollRestoration } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from "../Shered/Navbar/Navbar";
import Footer from "../Shered/Footer/Footer";


const Root = () => {
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

export default Root;