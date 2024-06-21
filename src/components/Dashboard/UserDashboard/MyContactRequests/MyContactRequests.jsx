import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure"
import { useQuery } from "@tanstack/react-query"
import useAuth from "@/components/Hooks/useAuth/useAuth"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import { Badge } from "@/components/ui/badge"

export default function MyContactRequests() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isContactRequest, setIsContactRequest] = useState([]);
    const [biodataDetails, setBiodataDetails] = useState({});

    // removeContactRequest
    const handleRemoveContactRequest = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/users/ContactRequest/${user.email}/${id}`)
                        .then((res) => {
                            if (res.data) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Biodata removed from Contact Request",
                                    icon: "success"
                                });
                                refetch();
                            }
                        })
                }
            });

        } catch (error) {
            console.error("Error removing from ContactRequest:", error);
            toast.error("Error removing from ContactRequest", { autoClose: 2000 });
        }
    };

    // fetchContactRequest with tanstack
    // eslint-disable-next-line no-unused-vars
    const { refetch, data: ContactRequest = [], isPending: loadingContactRequest } = useQuery({
        queryKey: ['ContactRequest', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact-requests/${user.email}`);
            const isContactRequestExist = res.data;
            setIsContactRequest(isContactRequestExist.requests);
            return isContactRequestExist.requests;
        }
    });

    // fetch biodata details for approved requests
    useEffect(() => {
        const fetchBiodataDetails = async (biodataId) => {
            try {
                const res = await axiosSecure.get(`/biodata/${biodataId}`);
                setBiodataDetails(prev => ({ ...prev, [biodataId]: res.data }));
            } catch (error) {
                console.error("Error fetching biodata details:", error);
            }
        };

        isContactRequest.forEach(request => {
            if (request.status === "approved") {
                fetchBiodataDetails(request.biodataId);
            }
        });
    }, [isContactRequest, axiosSecure]);

    if (loadingContactRequest) {
        return <div className="flex w-full items-center justify-center h-screen">Loading...</div>
    }

    return (
        <>
            {isContactRequest.length > 0 ? (
                <Card>
                    <Helmet>
                        <title>My Contact Requests | BB-Matrimony</title>
                    </Helmet>
                    <CardHeader>
                        <CardTitle>My Contact Requests</CardTitle>
                        <CardDescription>
                            View and manage your Contact Request biodata profiles.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Biodata Id</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Mobile No</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isContactRequest.map((request, index) => (
                                    <TableRow key={request._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{request.biodataId}</TableCell>
                                        <TableCell>
                                            <Badge className={request?.status === "pending" ? "capitalize bg-customGulabi" : "capitalize bg-customGreen"}>
                                                {request.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={request?.status === "pending" ? "capitalize text-customGulabi" : "capitalize"}>
                                            {request.status === "approved" && biodataDetails[request.biodataId]?.mobile || "Wait for approval"}
                                        </TableCell>
                                        <TableCell className={request?.status === "pending" ? "capitalize text-customGulabi" : ""}>
                                            {request.status === "approved" && biodataDetails[request.biodataId]?.email || "Wait for approval"}
                                        </TableCell>
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
                                                    <DropdownMenuItem><Link to={`/biodata/${request.biodataId}`}>View Details</Link></DropdownMenuItem>
                                                    <DropdownMenuItem><a onClick={() => handleRemoveContactRequest(request._id)}>Delete</a></DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <div className="flex -mt-8 flex-col w-full items-center justify-center text-center h-screen">
                    <h1 className="text-balance text-3xl mb-2 font-bold text-customBlue">You have No Contact Request...</h1>
                    <p className="text-sm text-balance px-4 text-center text-gray-500">
                        You have not added any biodata to your Contact Request yet.
                        <br /> Add some biodata to your Contact Request to see them here.
                    </p>
                    <Link to="/biodatas" className="btn btn-primary bg-customGulabi text-white mb-3 p-4 flex gap-1 w-fit mt-4 justify-center h-fit items-center">
                        Add Biodata
                    </Link>
                </div>
            )}
        </>
    );
}
