import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "../components/Shared/Container";
import RoomFilters from "../components/Rooms/RoomFilters";
import RoomList from "../components/Rooms/RoomList";
import PageBanner from "../components/Shared/PageBanner";
import useRooms from "../hooks/useRooms";
import Loader from "../components/Shared/Loader";

const Rooms = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { rooms, loading, error } = useRooms(priceRange);

  if (loading) return <Loader />;
  if (error) return <div>Error loading rooms: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>Rooms | Luxury Hotel Booking</title>
      </Helmet>
      <PageBanner title="Our Rooms" subtitle="Find your perfect stay" />
      <Container>
        <RoomFilters priceRange={priceRange} setPriceRange={setPriceRange} />
        <RoomList rooms={rooms} />
      </Container>
    </>
  );
};

export default Rooms;
