import React from 'react'
import { useState , useEffect } from 'react';

function Carousel ({images}) {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [images.length]);

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-4">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      );
}

export default Carousel 