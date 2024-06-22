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
import { useQuery } from "@tanstack/react-query"
import Swal from "sweetalert2"
import { Helmet } from "react-helmet-async"
import useAxiosPublic from "@/components/Hooks/useAxiosPublic/useAxiosPublix"
import useAxiosSecure from "@/components/Hooks/useAxiosSecure/useAxiosSecure"



const SuccessStory = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // get the marriges data with tanstack query 
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['marriages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/marriages');
            return res.data;
        }
    })

    const handleViewStory = (id) => {
        // find successStoryText with id
        const story = reviews.find((story) => story._id === id);
        // console.log(story)
        Swal.fire({
            imageUrl: story?.coupleImage,
            title: `Success Story for ${story?.selfBiodataId} and ${story?.partnerBiodataId}, MarriageDate: ${story?.marriageDate} and given Review: ${story?.reviewStar}/5 Star.`,
            text: story.successStoryText,
            confirmButtonText: "Close",
            background: "#eee",
        });
    }
    const handleDeleteStory = (id) => {
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
                axiosSecure.delete(`/marriages/${id}`)
                    .then((res) => {
                        if (res.data) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Success Story removed from the list",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    return (
        <>
            {reviews.length > 0 ? (
                <Card>
                    <Helmet>
                        <title>Success Story | BB-Matrimony</title>
                    </Helmet>
                    <CardHeader>
                        <CardTitle>Total Success Story: {reviews.length}</CardTitle>
                        <CardDescription>
                            Here you can see the success stories of the users who found their perfect match on BB-Matrimony.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Male Biodata Id</TableHead>
                                    <TableHead>Female Biodata Id</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reviews.map((request, index) => (
                                    <TableRow key={request._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{request.selfBiodataId}</TableCell>
                                        <TableCell>
                                            {request.partnerBiodataId}
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
                                                    <DropdownMenuItem><a onClick={() => handleViewStory(request._id)}>View Story</a></DropdownMenuItem>
                                                    <DropdownMenuItem><a onClick={() => handleDeleteStory(request._id)}>Delete</a></DropdownMenuItem>
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
                    <h1 className="text-balance text-3xl mb-2 font-bold text-customBlue">No Success Story Found!</h1>
                    <p className="text-sm text-balance px-4 text-center text-gray-500">
                        There are no SuccessStory right now. when someone shere, it is shown here...
                    </p>
                </div>
            )}
        </>
    );
};

export default SuccessStory;