import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { ScrollRestoration } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // Page transition variants for Framer Motion
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  // Configure transition timing
  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Navbar />

      {/* Main Content with Animation */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4CAF50",
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: "#F44336",
            },
          },
        }}
      />

      {/* Restore scroll position on navigation */}
      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
