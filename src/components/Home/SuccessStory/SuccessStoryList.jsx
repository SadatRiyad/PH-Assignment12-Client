import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import 'swiper/css';
import "../Home.css"
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Typewriter } from "react-simple-typewriter";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/components/Hooks/useAxiosPublic/useAxiosPublix";


const SuccessStoryList = () => {
    const axiosPublic = useAxiosPublic();

    // get the marriges data with tanstack query 
    const { data: reviews = [] } = useQuery({
        queryKey: ['marriages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/marriages');
            return res.data;
        }
    })

    // Sort the reviews by marriage date in descending order and limit 6
    const sortedReviews = [...reviews].sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)).slice(0, 6);

    return (
        <div className="pt-12  bg-customGulabi text-center text-balance border-b-8" id="moreCrafts">
            <div data-aos="zoom-in" data-aos-duration="1500" data-aos-anchor-placement="top-bottom" data-aos-delay="150" className="pt-16 pb-4 mb-12 mx-4 bg-customBlue rounded-2xl">
                <h5 className='text-4xl font-extrabold text-customGulabi mb-1'>_______</h5>
                <h2
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="0"
                    className="text-3xl sm:text-4xl font-bold text-center mb-4 text-customGulabi"
                >
                    Our {' '}
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>
                        <Typewriter
                            words={['Success', 'User Success Stories..', 'Success Stories']}
                            cursor
                            cursorStyle='.'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                </h2>
                <p
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-delay="0"
                    className="text-xs md:text-sm text-center px-4 md:px-20 mb-8 text-white opacity-80">
                    Discover what users are saying about BB-Matrimony and how it is making <br /> a difference for finding the
                    perfect match in their life.
                </p>

                <div className="text-center">
                    <div>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            pagination={{ clickable: true }}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            {sortedReviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div key={index} className="p-4 text-center border min-w-[300px] min-h-[440px] rounded shadow bg-customPink">
                                        <img data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" src={review.coupleImage} alt="Couple" className="w-full min-h-[210px] border max-h-fit object-cover rounded" />
                                        <h3 data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="text-xl font-bold mt-3 opacity-90 text-white"><span className="text-customBlue">Marriage Date:</span> {review.marriageDate}</h3>
                                        <div data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="flex text-center justify-center items-center mt-2 w-full">
                                            {Array.from({ length: review.reviewStar }, (_, i) => (
                                                <svg key={i} className="w-5 h-5 text-yellow-500 text-center" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.444 4.436a1 1 0 00.95.691h4.688c.969 0 1.371 1.24.588 1.81l-3.796 2.707a1 1 0 00-.364 1.118l1.445 4.436c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.796 2.707c-.784.57-1.84-.197-1.54-1.118l1.445-4.436a1 1 0 00-.364-1.118L2.049 9.864c-.784-.57-.38-1.81.588-1.81h4.688a1 1 0 00.95-.691l1.444-4.436z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="my-3 text-white text-[14px]">{review.successStoryText}</p>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default SuccessStoryList;
