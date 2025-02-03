import React, { useState, useEffect } from "react";
import "./Carousel.css";

const images = [
  "https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]);

  // Go to the previous slide
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Go to the next slide
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative flex flex-col items-center w-full">
    {/* Image Display */}
    <div
      className="w-full h-[250px] bg-cover bg-center rounded-lg shadow-lg transition-all duration-500"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    ></div>

    {/* Navigation Buttons */}
    <button
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
      onClick={goToPrevious}
    >
      &lt;
    </button>
    <button
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
      onClick={goToNext}
    >
      &gt;
    </button>

    {/* Dot Indicators */}
    <div className="flex mt-4 space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === currentIndex ? "bg-[#2874f0] w-3" : "bg-gray-300"
          } transition-all`}
        ></div>
      ))}
    </div>
  </div>

  );
};

export default Carousel;
