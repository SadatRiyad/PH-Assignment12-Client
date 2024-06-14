import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import '../Home.css';

const Hero = () => {
    return (
        <div>
           <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide> 
                    <div className="hero a1 relative bg-cover bg-center h-[500px] flex items-center justify-center">
                        <div className="hero-overlay bg-opacity-20"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="px-8" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" >
                                <h1 className="mb-6 text-white text-4xl lg:text-5xl md:text-5xl font-extrabold">Welcome to BB-Matrimony</h1>
                                <p className="mb-10 text-white px-6 lg:px-24 text-sm lg:text-base md:text-base text-balance">Find Your Perfect Match Today<br />
                                Join thousands of happy couples who have found love through BB-Matrimony. <br /> Sign up now to start your journey towards a fulfilling relationship.</p>
                                <a href='#' className="text-xs px-6 py-3 bg-customBlue border-orange text-white hover:text-white rounded hover:border-orange opacity-90 hover:-translate-y-1 transition-all duration-200 font-bold mt-6 md:text-base">Join Now</a>
                                <a href='#' className="text-xs px-6 py-3 ml-4 bg-customRed border-orange text-white hover:text-white rounded hover:border-orange opacity-90 hover:-translate-y-1 transition-all duration-200 font-bold mt-6 md:text-base">Start Exploring</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* <SwiperSlide>
                    <div className="hero a2 relative bg-cover bg-center h-[500px] flex items-center justify-center">
                        <div className="hero-overlay bg-opacity-20"></div>
                        <div data-aos="zoom-in" data-aos-duration="1000" className="hero-content text-center text-neutral-content">
                            <div className="px-8" data-aos="zoom-in" data-aos-duration="1000">
                                <h1 className="mb-8  opacity-85 text-4xl lg:text-6xl md:text-5xl font-extrabold text-primary">Discover New Recommendations</h1>
                                <p className="mb-8 text-primary opacity-75 px-6 lg:px-24 text-sm lg:text-base md:text-base text-balance">Find alternative product suggestions from our community. Explore and compare different options. <br /> Unlock a world of product choices. <br />Join us to discover unique recommendations that match your preferences.</p>
                                <a href='#' className="px-4 py-2 bg-primary hover:bg-primary border-primary text-white hover:text-white rounded hover:border-primary opacity-95 hover:-translate-y-1 transition-all duration-200 font-bold mt-8">Start Exploring</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="hero a3 relative bg-cover bg-center h-[500px] flex items-center justify-center">
                        <div className="hero-overlay bg-opacity-15"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div data-aos="zoom-in" data-aos-duration="1000" className="px-8">
                                <h1 className="mb-6 animate-bounce hover:animate-none text-4xl text-[#FF6347] lg:text-6xl md:text-5xl font-bold">Explore Product Alternatives</h1>
                                <p className="mb-8 px-6 lg:px-24 text-[#FF6347] font-semibold text-sm lg:text-base md:text-base">From everyday essentials to niche products, <br /> discover diverse recommendations tailored to your needs.</p>
                                <a href='#' className="px-4 py-2 bg-[#FF6347] hover:bg-[#FF6347] border-[#FF6347] text-white hover:text-white rounded hover:border-[#FF6347]  hover:-translate-y-1 transition-all duration-200 font-bold mt-6">Find Your Match</a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide> */}
            </Swiper>  
        </div>
    );
};

export default Hero;