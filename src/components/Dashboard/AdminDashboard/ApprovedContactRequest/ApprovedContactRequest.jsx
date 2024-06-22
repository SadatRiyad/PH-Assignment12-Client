import { useMutation, useQuery } from "@tanstack/react-query";
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

const ApprovedContactRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState([]);

  // Fetch contact requests
  const { data: requests = [], refetch, isPending: loading } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests");
      setRequest(res.data.requests);
      return [requests, refetch, loading];
    },
  });

  // Mutation to approve a contact request
  const approveContact = useMutation({
    mutationFn: async (biodataId) => {
      const res = await axiosSecure.patch(`/contact-requests/approve/${biodataId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Contact request approved!", "success");
      refetch();
    },
    onError: (error) => {
      Swal.fire("Error", error.message, "error");
    },
  });

  const handleApproveContact = (biodataId) => {
    approveContact.mutate(biodataId);
  };
  if (loading) {
    <p>Loading...</p>;
  }
  // console.log(request)
  return (
    <>
      <Card>
        <Helmet>
          <title>Approved Contact Request | BB-Matrimony</title>
        </Helmet>
        <CardHeader>
          <div className="justify-between flex mb-0 items-center">
            <CardTitle>Approved Contact Request </CardTitle>
            <p className="font-medium text-lg">Total Request: {request?.length}</p>
          </div>
          <div className="pb-2">
            <CardDescription>
              Here you can see all the requested contact requests.
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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                request.length === 0 &&
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <p className="text-base font-medium mt-8 text-balance mb-8"> 
                      No contact requests found!
                       <br />
                      Please check back later...
                    </p>
                  </TableCell>
                </TableRow>
              }
              {request.map((user, index) => (
                <TableRow key={user?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.selfName}</TableCell>
                  <TableCell>{user?.selfEmail}</TableCell>
                  <TableCell>{user?.biodataId}</TableCell>

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
                          <a onClick={() => handleApproveContact(user?._id)}>Approved Contact Request </a>
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

export default ApprovedContactRequests;