import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../../FirebaseConfig/FirebaseConfig";
import axios from "axios";

// export the AuthContext so that other components can use it
export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [render, setRender] = useState(false);

    // google auth provider
    const googleProvider = new GoogleAuthProvider();

    // loading 
    if (loading) {
        <div className="flex w-full items-center justify-center h-screen">Loading...</div>
    }

    // sign in with google
    const handleSignInWithGoogle = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, googleProvider)
                .then((result) => {
                    const user = result.user;
                    const userInfo = {
                        name: result.user?.displayName,
                        email: result.user?.email,
                    }
                    setUser(user);
                    axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                });
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    // register new user
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // update user profile
    const updateUserProfile = (name, photoURL) => {

        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    // log in existing user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    // log out user
    const logoutUser = () => {
        return signOut(auth);
    }

    // observe the user auth state changes
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            // if user exist then issue a token
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, { withCredentials: true })
                    .then(res => {
                        const token = res.data.token;
                        if (token) {
                            localStorage.setItem('access-token', token);
                            setLoading(false);
                            // console.log(loading)
                        }
                    })
            } else {
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser, { withCredentials: true })
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => unSubscribe();
    }, [render, auth, user?.email, loading]);

    // value to be provided to the children components in the AuthContext
    const authInfo = {
        auth,
        user,
        setUser,
        setRender,
        render,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        loading,
        setLoading,
        handleSignInWithGoogle,
    }
    // console.log(authInfo)

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;