import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/rooms", label: "Rooms" },
    ...(user ? [{ path: "/dashboard/my-bookings", label: "My Bookings" }] : []),
  ];

  return (
    <nav className="py-4 shadow-md bg-white sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            StayVista
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors hover:text-primary
                  ${isActive ? "text-primary" : "text-gray-600"}`
                }
              >
                {label}
              </NavLink>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <button
                  onClick={handleLogOut}
                  className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `text-lg font-medium transition-colors hover:text-primary
                  ${isActive ? "text-primary" : "text-gray-600"}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-600">{user.displayName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;




// import { Link, NavLink } from "react-router-dom";
// import Container from "./Container";
// import { FaUserCircle } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { user, loading, logOut } = useAuth();

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {
//         toast.success("Logged out successfully");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       });
//   };

//   const navLinks = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "text-blue-500 font-semibold" : ""
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/rooms"
//           className={({ isActive }) =>
//             isActive ? "text-blue-500 font-semibold" : ""
//           }
//         >
//           Rooms
//         </NavLink>
//       </li>
//       {user && (
//         <li>
//           <NavLink
//             to="/dashboard/my-bookings"
//             className={({ isActive }) =>
//               isActive ? "text-blue-500 font-semibold" : ""
//             }
//           >
//             My Bookings
//           </NavLink>
//         </li>
//       )}
//     </>
//   );

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="fixed w-full bg-white z-50 shadow-sm">
//         <div className="py-4 border-b-[1px]">
//           <Container>
//             <div className="flex justify-center">
//               <span className="loading loading-spinner loading-md"></span>
//             </div>
//           </Container>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed w-full bg-white z-50 shadow-sm">
//       <div className="py-4 border-b-[1px]">
//         <Container>
//           <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
//             {/* Logo */}
//             <Link to="/" className="font-bold text-2xl">
//               StayVista
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-8">
//               <ul className="flex items-center gap-8">{navLinks}</ul>
//             </div>

//             {/* User Menu */}
//             <div className="relative">
//               <div className="flex items-center gap-4">
//                 {user ? (
//                   <>
//                     <div className="hidden md:flex items-center gap-2">
//                       {user.photoURL ? (
//                         <img
//                           src={user.photoURL}
//                           alt="profile"
//                           className="rounded-full h-8 w-8 object-cover"
//                         />
//                       ) : (
//                         <FaUserCircle className="h-8 w-8" />
//                       )}
//                       <span>{user.displayName}</span>
//                     </div>
//                     <button
//                       onClick={handleLogOut}
//                       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <Link
//                     to="/login"
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                   >
//                     Login
//                   </Link>
//                 )}

//                 {/* Mobile Menu Button */}
//                 <div className="md:hidden">
//                   <button
//                     className="p-2 hover:bg-gray-100 rounded-full"
//                     onClick={() =>
//                       document.getElementById("mobile-menu").showModal()
//                     }
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4 6h16M4 12h16M4 18h16"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* Mobile Menu Modal */}
//       <dialog id="mobile-menu" className="modal modal-bottom sm:modal-middle">
//         <div className="modal-box">
//           <form method="dialog">
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>
//           <ul className="flex flex-col gap-4 mt-4">
//             {navLinks}
//             {user && (
//               <div className="flex items-center gap-2 border-t pt-4">
//                 {user.photoURL ? (
//                   <img
//                     src={user.photoURL}
//                     alt="profile"
//                     className="rounded-full h-8 w-8 object-cover"
//                   />
//                 ) : (
//                   <FaUserCircle className="h-8 w-8" />
//                 )}
//                 <span>{user.displayName}</span>
//               </div>
//             )}
//           </ul>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Navbar;