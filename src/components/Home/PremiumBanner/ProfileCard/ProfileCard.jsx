/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
// import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@shadcn/ui';

const ProfileCard = ({ profile }) => {
  const { id, type, image, division, age, occupation } = profile;

  return (
    <Card className="shadow-lg hover:drop-shadow-2xl">
      <CardHeader className="bg-customGulabi mb-4">
        <img src={image} alt={`${type}`} className="bg-customBlue text-white text-center p-1 h-32 w-32 mx-auto rounded-full" />
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-1">Biodata Id: {id}</CardTitle>
        <CardDescription>Biodata Type: {type}</CardDescription>
        <CardDescription>Division: {division}</CardDescription>
        <CardDescription>Age: {age}</CardDescription>
        <CardDescription>Occupation: {occupation}</CardDescription>
        <Link to={`/biodata/${id}`}>
          <Button className="mt-4 w-full bg-customBlue hover:bg-customBlue text-white">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
