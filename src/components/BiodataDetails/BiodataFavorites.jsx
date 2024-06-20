import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth/useAuth";
import useBiodatas from "../Hooks/useBiodatas/useBiodatas";

const BiodataList = () => {
    const [biodatas] = useBiodatas();
    const [userFavorites, setUserFavorites] = useState([]);
    const { user } = useAuth();

    useEffect(() => {

        // Fetch user favorites
        const fetchUserFavorites = async () => {
            if (user) {
                const result = await axios.get(`${import.meta.env.VITE_API_URL}/users/email/${user.email}`, { withCredentials: true });
                setUserFavorites(result.data.favorites || []);
            }
        };

        fetchUserFavorites();
    }, [user]);

    const addToFavorites = async (biodataID) => {
        await axios.post(`${import.meta.env.VITE_API_URL}/users/favorites/add`, biodataID, { withCredentials: true })
        setUserFavorites([...userFavorites, biodataID]);
    };

    const removeFromFavorites = async (biodataID) => {
        if (!user) return; // Ensure user is logged in

        await axios.post(`${import.meta.env.VITE_API_URL}/users/favorites/remove`, biodataID, { withCredentials: true })

        setUserFavorites(userFavorites.filter((id) => id !== biodataID));
    };

    return (
        <div>
            <h1>Biodata List</h1>
            <ul>
                {biodatas.map((biodata) => (
                    <li key={biodata._id}>
                        <h2>{biodata.name}</h2>
                        {/* Other biodata details */}
                        {userFavorites.includes(biodata._id) ? (
                            <button onClick={() => removeFromFavorites(biodata._id)}>
                                Remove from Favorites
                            </button>
                        ) : (
                            <button onClick={() => addToFavorites(biodata._id)}>
                                Add to Favorites
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BiodataList;
