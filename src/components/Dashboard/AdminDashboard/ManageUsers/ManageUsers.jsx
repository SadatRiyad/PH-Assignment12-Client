import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const { data: searchedUsers = [], refetch: refetchSearch } = useQuery({
        queryKey: ["searchedUsers", searchTerm],
        queryFn: async () => {
            if (searchTerm) {
                const res = await axiosSecure.get(`/users/search?username=${searchTerm}`);
                return res.data;
            }
            return [];
        },
        enabled: true,
    });

    const makeAdmin = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/admin/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success", "User is now an admin!", "success");
            refetch();
        },
    });

    const makePremium = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/users/premium/${id}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire("Success", "User is now premium!", "success");
            refetch();
        },
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        refetchSearch();
    };

    const handleMakeAdmin = (id) => {
        makeAdmin.mutate(id);
    };

    const handleMakePremium = (id) => {
        makePremium.mutate(id);
    };

    return (
        <>
            <Card>
                <Helmet>
                    <title>Manage Users | BB-Matrimony</title>
                </Helmet>
                <CardHeader>
                    <div className="justify-between flex mb-0 items-center">
                        <CardTitle>Manage Users</CardTitle>
                        <p className="font-medium text-lg">Total Users: {users?.length}</p>
                    </div>
                    <div className="pb-2">
                        <CardDescription>
                            Admin can manage users, make them admin or premium.
                        </CardDescription>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by username"
                        className="mt-4 p-2 border rounded"
                    />
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Admin Status</TableHead>
                                <TableHead>Premium Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(searchTerm ? searchedUsers : users).map((user, index) => (
                                <TableRow key={user?._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user?.name}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell><Badge className={user?.role === "admin" ? "capitalize bg-customGreen px-[23px] py-1" : "capitalize bg-customGulabi px-6 py-1"}>{user?.role === 'admin' ? 'Yes' : 'No'}</Badge></TableCell>

                                    <TableCell><Badge className={user?.isPremium === true ? "capitalize bg-customGreen px-[19px] py-1" : "capitalize bg-customGulabi px-6 py-1"}>{user?.isPremium === true ? "Premium" : "Normal"}</Badge></TableCell>
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
                                                    <a onClick={() => handleMakeAdmin(user._id)}>Make Admin</a>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <a onClick={() => handleMakePremium(user._id)}>Make Premium</a>
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

export default ManageUsers;
