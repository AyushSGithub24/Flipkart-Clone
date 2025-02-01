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
    <div className="carousel">
      <button className="carousel-button prev" onClick={goToPrevious}>
        &lt;
      </button>
      <div className="carousel-image-wrapper">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
      <button className="carousel-button next" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
