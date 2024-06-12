import MainLayout from '@/Layouts/MainLayout/MainLayout';
import Home from '@/components/Home/Home';
import Login from '@/components/Login/Login';
import Register from '@/components/Register/Register';
import ErrorPage from '@/components/Shered/ErrorPage/ErrorPage';
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
          loader: () => fetch(`${import.meta.env.VITE_API_URL}/biodatas`),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>,
        },
      ],
    },
  ]);
  