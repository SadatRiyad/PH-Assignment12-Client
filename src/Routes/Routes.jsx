import MainLayout from '@/Layouts/MainLayout/MainLayout';
import Home from '@/components/Home/Home';
import Login from '@/components/Login/Login';
import PrivateRoute from '@/Routes/PrivateRoute/PrivateRoute';
import Register from '@/components/Register/Register';
import ErrorPage from '@/components/Shered/ErrorPage/ErrorPage';
import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '@/Layouts/DashboardLayout/DashboardLayout';
import Biodatas from '@/components/Biodatas/Biodatas';
import AboutUs from '@/components/AboutUs/AboutUs';
import ContactUs from '@/components/ContactUs/ContactUs';
import ViewBiodata from '@/components/Dashboard/UserDashboard/ViewBiodata/ViewBiodata';
import BiodataForm from '@/components/Dashboard/UserDashboard/BiodataForm/BiodataForm';
import MyContactRequests from '@/components/Dashboard/UserDashboard/MyContactRequests/MyContactRequests';
import FavouritesBiodata from '@/components/Dashboard/UserDashboard/FavouritesBiodata/FavouritesBiodata';
import Dashboard from '@/components/Dashboard/Dashboard/Dashboard';
import AdminDashboard from '@/components/Dashboard/AdminDashboard/AdminDashboard/AdminDashboard';
import ManageUsers from '@/components/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import ApprovedPremium from '@/components/Dashboard/AdminDashboard/ApprovedPremium/ApprovedPremium';
import ApprovedContactRequest from '@/components/Dashboard/AdminDashboard/ApprovedContactRequest/ApprovedContactRequest';
import BiodataDetails from '@/components/BiodataDetails/BiodataDetails';
import GotMarried from '@/components/Dashboard/UserDashboard/GotMarried/GotMarried';
import CheckoutPage from '@/components/CheckoutPage/CheckoutPage';
import WrappedCheckoutUpgrade from '@/components/CheckoutPage/CheckoutUpgrade';
import SuccessStory from '@/components/Dashboard/AdminDashboard/SuccessStory/SuccessStory';
import AdminRoute from './AdminRoute/AdminRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/biodatas",
        element: <Biodatas></Biodatas>,
      },
      {
        path: "/biodata/:id",
        element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/biodata/${params.id}`, { credentials: 'include' }),
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/checkout/:id",
        element: <PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>,
      },
      {
        path: "/checkout/upgrade/:id",
        element: <PrivateRoute><WrappedCheckoutUpgrade></WrappedCheckoutUpgrade></PrivateRoute>,
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // Add dashboard routes here for user
      {
        path:"/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      },
      {
        path: "viewBiodata",
        element: <PrivateRoute><ViewBiodata></ViewBiodata></PrivateRoute>,
      },
      {
        path: "addBiodata",
        element: <PrivateRoute><BiodataForm></BiodataForm></PrivateRoute>,
      },
      {
        path: "editBiodata",
        element: <PrivateRoute><BiodataForm></BiodataForm></PrivateRoute>,
        // loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/biodata/id/${params.id}`, { credentials: 'include' }),
      },
      {
        path: "myContactRequest",
        element: <PrivateRoute><MyContactRequests></MyContactRequests></PrivateRoute>,
      },
      {
        path: "favouritesBiodata",
        element: <PrivateRoute><FavouritesBiodata></FavouritesBiodata></PrivateRoute>,
      },
      {
        path: "gotMarried",
        element: <PrivateRoute><GotMarried></GotMarried></PrivateRoute>,
      },
      // for admin
      {
        path: "adminDashboard",
        element: <AdminRoute><PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute></AdminRoute>,
      },
      {
        path: "manageUsers",
        element: <AdminRoute><PrivateRoute><ManageUsers></ManageUsers></PrivateRoute></AdminRoute>,
      },
      {
        path: "approvedPremium",
        element: <AdminRoute><PrivateRoute><ApprovedPremium></ApprovedPremium></PrivateRoute></AdminRoute>,
      },
      {
        path: "approvedContactRequest",
        element: <AdminRoute><PrivateRoute><ApprovedContactRequest></ApprovedContactRequest></PrivateRoute></AdminRoute>,
      },
      {
        path: "successStory",
        element: <AdminRoute><PrivateRoute><SuccessStory></SuccessStory></PrivateRoute></AdminRoute>,
      },

    ]
  },
]);
