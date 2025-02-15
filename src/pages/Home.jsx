import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import FeaturedRooms from "../components/Home/FeaturedRooms";
import LocationMap from "../components/Home/LocationMap";
import SpecialOffers from "../components/Home/SpecialOffers";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";
import Container from "../components/Shared/Container";

const Home = () => {
  useEffect(() => {
    // Show special offers popup on first visit
    const hasSeenOffers = localStorage.getItem("hasSeenOffers");
    if (!hasSeenOffers) {
      // Show offers modal
      localStorage.setItem("hasSeenOffers", "true");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Luxury Hotel Booking</title>
      </Helmet>
      <Banner />
      <Container>
        <FeaturedRooms />
        <LocationMap />
        <Testimonials />
        <Newsletter />
      </Container>
      <SpecialOffers />
    </>
  );
};

export default Home;
