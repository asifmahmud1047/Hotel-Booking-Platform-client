import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "../config/firebase.config";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create new user with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Update user profile information
  const updateUserProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      setUser((prev) => ({
        ...prev,
        displayName: name,
        photoURL: photo,
      }));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully");
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google successfully");
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Sign out user
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      // Clear JWT token from HTTP only cookie
      await axios.post("/api/v1/auth/logout");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Observer for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // If user exists, get new JWT token
      if (currentUser) {
        try {
          const response = await axios.post("/api/v1/auth/jwt", {
            email: currentUser.email,
          });

          // Token is automatically stored in HTTP only cookie by the server
          console.log("JWT token refreshed");
        } catch (error) {
          console.error("Error refreshing JWT token:", error);
        }
      }

      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;




// import { createContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import axios from "axios";
// import { app  from "../config/firebase.config";

// // Create the context with a default value
// export const AuthContext = createContext({
//   user: null,
//   loading: true,
//   createUser: () => Promise.resolve(),
//   signIn: () => Promise.resolve(),
//   signInWithGoogle: () => Promise.resolve(),
//   updateUserProfile: () => Promise.resolve(),
//   logOut: () => Promise.resolve(),
// });

// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Create user with email and password
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // Sign in with email and password
//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // Sign in with Google
//   const signInWithGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   // Update user profile
//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     });
//   };

//   // Sign out
//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // Observer for user state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       console.log("Current user:", currentUser);

//       // Get and set token
//       if (currentUser) {
//         // Uncomment and update with your actual API endpoint
//         // axios.post('http://localhost:5000/api/v1/auth/jwt', { email: currentUser.email })
//         //     .then(data => {
//         //         localStorage.setItem('access-token', data.data.token);
//         //         setLoading(false);
//         //     })
//         setLoading(false);
//       } else {
//         localStorage.removeItem("access-token");
//         setLoading(false);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     user,
//     loading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     updateUserProfile,
//     logOut,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;