import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RoomCard from "./RoomCard";
import RoomFilters from "./RoomFilters";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import useRooms from "../../hooks/useRooms";

const RoomList = () => {
  const { rooms, loading, error } = useRooms();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
  });

  // Filter rooms based on current filters
  const filteredRooms = rooms.filter((room) => {
    const price = parseFloat(room.price);
    return price >= filters.priceRange[0] && price <= filters.priceRange[1];
  });

  // Get min and max prices from all rooms
  const prices = rooms.map((room) => parseFloat(room.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          Error loading rooms. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="md:w-1/4">
          <RoomFilters
            onFilterChange={setFilters}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>

        {/* Rooms Section */}
        <div className="md:w-3/4">
          {/* View Toggle and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredRooms.length} of {rooms.length} rooms
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Rooms Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "space-y-6"
              }
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} viewMode={viewMode} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    No rooms found matching your criteria.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
