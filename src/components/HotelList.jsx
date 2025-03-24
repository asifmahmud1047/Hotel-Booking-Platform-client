import React from 'react';

const HotelList = ({ hotels }) => {
    return (
        <div className="hotel-list">
            {hotels.map(hotel => (
                <div key={hotel.id} className="hotel-item">
                    <h2>{hotel.name}</h2>
                    <p>{hotel.description}</p>
                    <button>View Details</button>
                </div>
            ))}
        </div>
    );
};

export default HotelList; 