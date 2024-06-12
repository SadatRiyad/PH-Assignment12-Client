import { Helmet } from "react-helmet-async";
import { useRouteError } from "react-router-dom";
import errorPic from "../../../assets/404.jpeg"

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error)
    return (
        // <!-- error page start -->
        <div className="flex justify-center items-center text-center h-screen">
            <Helmet>
                <title>Error Page | Page Not Found | BB-Matrimony</title>
            </Helmet>
            <div id="error-page" className="px-4">
                <img className="justify-center flex items-center w-full" src={errorPic} ></img>
                <h1 className="mb-2 mt-4 text-xl font-bold text-green-600">Oops... Page {error.statusText} !</h1>
                <p className="text-balance mb-4">Sorry, the page you are looking for does not exist.</p>
                <button onClick={() => window.history.back()} className="btn md:mx-2 px-4 py-2 border bg-green-600 hover:bg-transparent border-green-600 text-white hover:text-green-600 rounded hover:border-green-600 hover:-translate-y-1 transition-all duration-200 my-4">Go Back</button>
                <span className="mx-4 font-bold">OR</span>
                <button onClick={() => window.location.href = "/"} className="btn md:mx-2 px-4 py-2 border bg-green-600 hover:bg-transparent border-green-600 text-white hover:text-green-600 rounded hover:border-green-600 hover:-translate-y-1 transition-all duration-200 my-4">Go Home</button>
            </div>
        </div>

    );
};

export default ErrorPage;