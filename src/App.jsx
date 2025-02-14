import { Outlet } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
