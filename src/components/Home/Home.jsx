import { Helmet } from 'react-helmet-async';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';
import Hero from './Hero/Hero';
import ProfilesSection from './PremiumBanner/ProfilesSection/ProfilesSection';
import HowItWorks from './HowItWorks/HowItWorks';
import SuccessCounter from './SuccessCounter/SuccessCounter';
import SuccessStoryList from './SuccessStory/SuccessStoryList';

const Home = () => {

    return (
        <div className='bg-base-300'>
            <Helmet>
                <title>Home | BB-Matrimony</title>
            </Helmet>
            <Hero></Hero>
            <ProfilesSection></ProfilesSection>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStoryList></SuccessStoryList>
        </div>
    );
};

export default Home;