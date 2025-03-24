import React, { useState } from 'react';

const BookingForm = ({ hotel }) => {
    const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle booking logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book {hotel.name}</h2>
            <input type="date" onChange={(e) => setDates({ ...dates, checkIn: e.target.value })} />
            <input type="date" onChange={(e) => setDates({ ...dates, checkOut: e.target.value })} />
            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm; 