"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ImageData {
  id: number;
  name: string;
  url: string;
  key: string;
  userId: string;
  folderId: number;
  createdAt: string;
  updatedAt: string | null;
}

interface ComparisonSliderProps {
  beforeImage?: ImageData;
  afterImage?: ImageData;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const getPositionPercentage = (clientX: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      return ((clientX - containerRect.left) / containerRect.width) * 100;
    }
    return 0;
  };

  const handleMove = (clientX: number) => {
    const newPosition = getPositionPercentage(clientX);
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      handleMove(event.clientX);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches && event.touches[0]) {
      handleMove(event.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      isDragging.current = false;
    };

    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => {
      document.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, []);

  return (
    <div
      className="relative aspect-square h-[300px] w-[300px] touch-none overflow-hidden rounded-lg sm:h-[400px] md:h-[500px]"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => (isDragging.current = false)}
    >
      <div className="absolute left-0 top-0 h-full w-full">
        {beforeImage && (
          <Image
            src={beforeImage.url}
            alt={beforeImage.name}
            layout="fill"
            objectFit="cover"
            priority
            className="pointer-events-none select-none"
          />
        )}
      </div>
      <div
        className="absolute left-0 top-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative  h-full  w-[300px]">
          {afterImage && (
            <Image
              src={afterImage.url}
              alt={afterImage.name}
              layout="fill"
              objectFit="cover"
              priority
              className="pointer-events-none select-none"
            />
          )}
        </div>
      </div>
      <div
        className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-white"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
      >
        <div className="absolute left-1/2 top-3/4 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md">
          <svg
            className="h-6 w-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <svg
            className="h-6 w-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
