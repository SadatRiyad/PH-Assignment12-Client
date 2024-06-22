import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();
    const [premiumRequests, setPremiumRequests] = useState([]);

    const { data: Requests = [], refetch, isPending: loading } = useQuery({
        queryKey: ['PremiumRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get("/premium-requests");
            setPremiumRequests(res.data);
            // console.log(res.data)
            return [Requests, refetch, loading]
        }
    });


    const handleMakePremium = (_id) => {
        // console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make this biodata premium?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/biodata/${_id}/make-premium`,)
                    .then((res) => {
                        // console.log(res.data)
                        if (res.data.acknowledged === true) {
                            refetch();
                            Swal.fire({
                                title: "Done",
                                text: "this Biodata is now Premium.",
                                icon: "success"
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong. Please try again.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (loading) {
        <div>Loading...</div>;
    }
    // console.log(premiumRequests)
    return (
        <>
            <Card>
                <Helmet>
                    <title>Approved Premium Biodata | BB-Matrimony</title>
                </Helmet>
                <CardHeader>
                    <div className="justify-between flex mb-0 items-center">
                        <CardTitle>Approved Premium Biodata</CardTitle>
                        <p className="font-medium text-lg">Total Request: {premiumRequests?.length}</p>
                    </div>
                    <div className="pb-2">
                        <CardDescription>
                            This is the list of all the user who applied for premium biodata...
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Biodata Id</TableHead>
                                <TableHead>Premium Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                premiumRequests.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        <p className="text-base font-medium mt-8 text-balance mb-8">No Premium Biodata Requests availabe right now, <br />
                                            Please check back later...
                                        </p>
                                    </TableCell>
                                </TableRow>
                            }
                            {premiumRequests.map((user, index) => (
                                <TableRow key={user?._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user?.name}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell>{user?.biodataID}</TableCell>

                                    <TableCell><Badge className={user?.isPremium === true ? "capitalize bg-customGreen px-[19px] py-1" : "capitalize bg-customGulabi px-6 py-1"}>{user?.isPremium === true ? "Premium" : "pending"}</Badge></TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <a onClick={() => handleMakePremium(user?._id)}>Make Premium</a>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default ApprovedPremium;