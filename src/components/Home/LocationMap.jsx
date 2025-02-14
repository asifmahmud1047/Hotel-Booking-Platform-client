import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Container from "../Shared/Container";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const LocationMap = () => {
  // Hotel coordinates (example: New York City)
  const position = [40.7128, -74.006];

  // Custom marker icon
  const customIcon = new Icon({
    iconUrl: "/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Location</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conveniently located in the heart of the city, offering easy access
            to major attractions and transportation hubs.
          </p>
        </div>

        <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold mb-1">HotelHaven</h3>
                  <p className="text-sm">123 Hotel Street, City, Country</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-block mt-2"
                  >
                    Get Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-bold mb-2">Address</h3>
            <p className="text-gray-600">123 Hotel Street, City, Country</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Phone</h3>
            <p className="text-gray-600">+1 234 567 890</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-gray-600">info@hotelhaven.com</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LocationMap;
