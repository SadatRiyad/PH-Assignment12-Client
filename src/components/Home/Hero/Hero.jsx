import { Link } from 'react-router-dom';
import '../Home.css';

const Hero = () => {
    return (
        <div>
            <div className="hero a1 relative bg-cover bg-center h-[550px] flex items-center justify-center" >
                <div className="hero-content text-center text-neutral-content">
                    <div className="px-8" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" >
                        <h1 className="mb-6 text-customBlue text-4xl lg:text-5xl md:text-5xl font-extrabold">Welcome to BB-Matrimony</h1>
                        <p className="mb-10 text-customBlue px-6 lg:px-24 text-sm lg:text-base md:text-base text-balance font-medium opacity-90">Find Your Perfect Match Today<br />
                            Join thousands of happy couples who have found love through BB-Matrimony. <br /> Sign up now to start your journey towards a fulfilling relationship.</p>
                        <Link to="/biodatas" className="text-xs px-6 py-3 bg-customRed border-customRed text-white hover:text-customRed rounded border hover:border-customRed hover:bg-white opacity-90 font-bold mt-6 md:text-base">Join Now</Link>
                        <a href='#premium' className="text-xs px-6 py-3 ml-4 bg-customBlue border-customBlue text-white hover:text-customBlue border hover:bg-white rounded hover:border-customBlue opacity-90 font-bold mt-6 md:text-base">Start Exploring</a>
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default Hero;