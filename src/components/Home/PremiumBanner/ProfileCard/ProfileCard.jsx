/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
// import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@shadcn/ui';

const ProfileCard = ({ profile, refetch ,isFavorite}) => {
  const { biodataID, biodataType, profileImage, permanentDivision, presentDivision, age, occupation } = profile;
  const handleState = () => {
    if (isFavorite) {
      setTimeout(() => {
        refetch();
      }, 700);
    }
  };

  return (
    <Card data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="shadow-lg hover:drop-shadow-2xl">
      <CardHeader className="bg-customGulabi mb-4">
        <img data-aos="zoom-in" data-aos-duration="1000" data-aos-anchor-placement="top-bottom" data-aos-delay="0" src={profileImage} alt={`${biodataType}`} className="bg-customBlue text-white text-center p-1 h-32 w-32 mx-auto rounded-full" />
      </CardHeader>
      <CardContent>
        <div data-aos="fade-right" data-aos-duration="600" data-aos-anchor-placement="top-bottom" data-aos-delay="0">
          <CardTitle className="mb-1">{biodataID}</CardTitle>
          <CardDescription>Biodata Type: {biodataType}</CardDescription>
          <CardDescription>Permanent Division: {permanentDivision}</CardDescription>
          <CardDescription>Present Division: {presentDivision}</CardDescription>
          <CardDescription>Age: {age}</CardDescription>
          <CardDescription>Occupation: {occupation}</CardDescription>
        </div>
        <Link onClick={() => handleState()} to={`/biodata/${biodataID}`}>
          <Button data-aos="fade-up" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-delay="0" className="mt-4 w-full bg-customBlue hover:bg-customBlue text-white">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
