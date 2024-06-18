import { Helmet } from 'react-helmet-async';
import aboutPic from '../../assets/about.jpg';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 pt-0 pb-4 bg-customGulabi text-white border-b-8">
            <Helmet>
                <title>About Us | BB-Matrimony</title>
            </Helmet>
            <div className='w-full p-4 h-fit'>
                <div data-aos="zoom-in" data-aos-duration="700" data-aos-anchor-placement="top-bottom" data-aos-delay="50" className='w-full h-fit rounded-lg'>
                    <img className='w-full rounded-lg' src={aboutPic} alt="" />
                </div>
            </div>
            <div data-aos="zoom-in" data-aos-duration="700" data-aos-anchor-placement="top-bottom" data-aos-delay="500" className='text-center md:mt-12 mb-10 mx-1'>
                <h1 className="text-2xl md:text-4xl font-bold mb-5 md:mb-7">Welcome to <span className='text-blue'>&apos;BB-Matrimony&apos;</span></h1>
                <p className="text-sm md:text-base mb-4 md:mx-2">
                    Welcome to BB-Matrimony, your trusted platform for finding your life partner. Whether you are seeking a loving spouse or a meaningful relationship, we are here to assist you every step of the way.
                </p>
                <p className="text-sm md:text-base mb-4 md:mx-2">
                    Our dedicated team of experts is committed to providing you with comprehensive information, personalized advice, and unparalleled service to help you find your perfect match. From detailed profiles to advanced matchmaking algorithms, we offer a range of features to cater to your unique needs and preferences.
                </p>
                <p className="text-sm md:text-base mb-4 md:mx-2">
                    At BB-Matrimony, we understand that finding a life partner is a significant decision. That is why we strive to make the process as seamless and stress-free as possible for our clients. With our expertise and resources, you can trust us to navigate the matrimonial journey with confidence and success.
                </p>
            </div>
            <div className="md:pt-12 px-1 mb-8">
                <Accordion type="single" collapsible>
                    <AccordionItem className="bg-customBlue focus:bg-customBlue px-4 rounded-t-lg" data-aos="fade-up" data-aos-duration="700" data-aos-anchor-placement="top-bottom" data-aos-delay="200" value="item-1">
                        <AccordionTrigger className="text-xl font-medium">
                            Q: What sets BB-Matrimony apart from other matrimonial platforms?
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>Ans: At BB-Matrimony, we pride ourselves on our personalized approach to matchmaking. Our dedicated team of experts goes above and beyond to understand your unique needs and preferences, ensuring a seamless and stress-free experience from start to finish.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="bg-customBlue focus:bg-customBlue px-4" data-aos="fade-up" data-aos-duration="700" data-aos-anchor-placement="top-bottom" data-aos-delay="300" value="item-2">
                        <AccordionTrigger className="text-xl font-medium">
                            Q: How experienced is the team at BB-Matrimony?
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>Ans: Our team brings years of collective experience and expertise to the table. From seasoned matchmakers to relationship counselors, each member of our team is committed to delivering exceptional service and results for our clients.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="bg-customBlue focus:bg-customBlue px-4 rounded-b-lg" data-aos="fade-up" data-aos-duration="700" data-aos-anchor-placement="top-bottom" data-aos-delay="400" value="item-3">
                        <AccordionTrigger className="text-xl font-medium">
                            Q: Can I trust BB-Matrimony to find the perfect partner for me?
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>Ans: Absolutely! We understand that finding a life partner is a significant decision, and we take our responsibility to our clients very seriously. With our extensive network, matchmaking algorithms, and dedication to customer satisfaction, you can trust us to help you find your perfect match.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default AboutUs;