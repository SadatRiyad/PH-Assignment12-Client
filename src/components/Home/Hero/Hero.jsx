import '../Home.css';

const Hero = () => {
    return (
        <div>
            <div className="hero a1 relative bg-cover bg-center h-[500px] flex items-center justify-center">
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="px-8" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" >
                        <h1 className="mb-6 text-white text-4xl lg:text-5xl md:text-5xl font-extrabold">Welcome to BB-Matrimony</h1>
                        <p className="mb-10 text-white px-6 lg:px-24 text-sm lg:text-base md:text-base text-balance">Find Your Perfect Match Today<br />
                            Join thousands of happy couples who have found love through BB-Matrimony. <br /> Sign up now to start your journey towards a fulfilling relationship.</p>
                        <a href='#' className="text-xs px-6 py-3 bg-customRed border-orange text-white hover:text-white rounded hover:border-orange opacity-90 hover:-translate-y-1 transition-all duration-200 font-bold mt-6 md:text-base">Join Now</a>
                        <a href='#premium' className="text-xs px-6 py-3 ml-4 bg-customBlue border-orange text-white hover:text-white rounded hover:border-orange opacity-90 hover:-translate-y-1 transition-all duration-200 font-bold mt-6 md:text-base">Start Exploring</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;