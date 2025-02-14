import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/banner1.jpg",
      title: "Experience Luxury Like Never Before",
      description:
        "Discover our premium rooms with stunning views and world-class amenities.",
      buttonText: "Explore Rooms",
    },
    {
      image: "/images/banner2.jpg",
      title: "Your Perfect Getaway Awaits",
      description:
        "Immerse yourself in comfort with our specially curated accommodations.",
      buttonText: "Book Now",
    },
    {
      image: "/images/banner3.jpg",
      title: "Where Comfort Meets Elegance",
      description:
        "Experience the perfect blend of modern luxury and warm hospitality.",
      buttonText: "View Rooms",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000
            ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-xl">
                {slide.description}
              </p>
              <Link
                to="/rooms"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg 
                  inline-block transition-colors text-lg font-semibold"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 
          text-white hover:bg-black/70 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 
          text-white hover:bg-black/70 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors
              ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
