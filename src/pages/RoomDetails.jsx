import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../components/Shared/Container";
import RoomDetailsCard from "../components/Rooms/RoomDetailsCard";
import ReviewForm from "../components/Forms/ReviewForm";
import BookingForm from "../components/Forms/BookingForm";
import useAuth from "../hooks/useAuth";
import { getRoomById } from "../api/rooms";
import Loader from "../components/Shared/Loader";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(id);
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>Error loading room details: {error}</div>;

  return (
    <>
      <Helmet>
        <title>{room?.title || "Room Details"} | Luxury Hotel Booking</title>
      </Helmet>
      <Container>
        <RoomDetailsCard room={room} />
        {user && (
          <>
            <BookingForm room={room} />
            <ReviewForm roomId={id} />
          </>
        )}
      </Container>
    </>
  );
};

export default RoomDetails;
