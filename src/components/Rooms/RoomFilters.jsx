import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RefreshCw, ListFilter } from "lucide-react";

// eslint-disable-next-line react/prop-types
const RoomFilters = ({ onFilterChange, minPrice = 0, maxPrice = 1000 }) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce the filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ priceRange });
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange, onFilterChange]);

  const handleReset = () => {
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Filter Rooms</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (per night)
          </label>
          <div className="px-2">
            <Slider
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-6"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Additional Filters (shown when expanded) */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Add more filter options here */}
          </motion.div>
        )}

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Filters
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomFilters;
