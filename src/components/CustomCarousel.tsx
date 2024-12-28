import { useState, useEffect } from "react";

const CustomCarousel = ({ carouselData }: any) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === carouselData.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="default-carousel" className="relative w-full">
      <div className="relative h-56 overflow-hidden md:h-96">
        {carouselData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`absolute inset-0 duration-700 ease-in-out ${
              activeSlide === index ? "block" : "hidden"
            }`}
            data-carousel-item
          >
            <img
              src={item.image_url}
              alt={item.label}
              className="absolute block w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {carouselData.map((item: any, index: number) => (
          <button
            key={item.id}
            type="button"
            className={`w-3 h-3 rounded-full ${
              activeSlide === index
                ? "bg-gray-900"
                : "bg-gray-300 hover:bg-gray-500"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 9l4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default CustomCarousel;
