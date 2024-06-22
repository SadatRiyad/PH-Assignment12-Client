import { Bar, Pie } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import "./AdminDashboard.css"
import useAxiosSecure from '@/components/Hooks/useAxiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState({
        totalBiodatas: 0,
        maleBiodatas: 0,
        femaleBiodatas: 0,
        premiumBiodatas: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/admin/counters');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    const barData = {
        labels: ['Total', 'Male', 'Female', 'Premium','Completed'],
        datasets: [
            {
                label: 'Biodata Count',
                data: [data.totalBiodatas, data.maleBiodatas, data.femaleBiodatas, data.premiumBiodatas, data.marriagesCompleted],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#448811'],
            },
        ],
    };

    const pieData = {
        labels: ['Total Biodata', 'Male Biodata', 'Female Biodata', 'Premium Biodata', 'Total Revenue', 'Merriages Completed'],
        datasets: [
            {
                data: [data.totalBiodatas, data.maleBiodatas, data.femaleBiodatas, data.premiumBiodatas, data.totalRevenue, data.marriagesCompleted],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#448811'],
            },
        ],
    };

    const TotalContactNo = data?.totalRevenue / 5;

    return (
        <div className="py-2">
             <Helmet>
                <title>Admin Dashboard | BB-Matrimony</title>
            </Helmet>
            <div className='mb-4 items-center'>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl md:text-[32px] font-bold mb-4">Admin Dashboard</h1>
                    <Link to="/dashboard/successStory" className="text-sm rounded-lg bg-customBlue text-white px-4 py-3 border-2 hover:border-customBlue hover:bg-transparent hover:text-customBlue font-bold mb-4">Success Story</Link>
                </div>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>Revenue from <span className='text-customGulabi'>$5 * {TotalContactNo}</span> contact information purchases:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">${data?.totalRevenue}</p>

                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="mt-8">
                    <CardHeader className="mb-4">
                        <CardTitle>Biodata Count</CardTitle>
                        <CardDescription>Overview of all biodata counts</CardDescription>
                        <CardDescription>● Total biodata count: {data?.totalBiodatas}</CardDescription>
                        <CardDescription>● Total male biodata count: {data?.maleBiodatas}</CardDescription>
                        <CardDescription>● Total female biodata count: {data?.femaleBiodatas}</CardDescription>
                        <CardDescription>● Total premium biodata count: {data?.premiumBiodatas}</CardDescription>
                        <CardDescription>● Total Marriages Completed count: {data?.marriagesCompleted}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Bar data={barData} />
                    </CardContent>
                </Card>
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Biodata Distribution</CardTitle>
                        <CardDescription>Pie chart representation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Pie data={pieData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
