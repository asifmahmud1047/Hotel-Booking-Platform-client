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
            HotelHaven
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
