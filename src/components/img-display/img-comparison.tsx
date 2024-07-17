"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
      className="relative h-[320px] w-[240px] touch-none overflow-hidden rounded-lg sm:h-[300px] sm:w-[200px]"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => (isDragging.current = false)}
    >
      <div className="absolute left-0 top-0 h-full w-full">
        {beforeImage && (
          <Link href={`/img/${beforeImage.id}`} key={beforeImage.id}>
            <Image
              src={beforeImage.url}
              alt={beforeImage.name}
              layout="fill"
              objectFit="cover"
              priority
              className="select-none rounded-lg"
            />
          </Link>
        )}
      </div>
      <div
        className="absolute left-0 top-0 h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative h-[320px] w-[240px] sm:h-[300px] sm:w-[200px]">
          {afterImage && (
            <Image
              src={afterImage.url}
              alt={afterImage.name}
              layout="fill"
              objectFit="cover"
              priority
              className="pointer-events-none select-none rounded-lg"
            />
          )}
        </div>
      </div>
      <div
        className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-white"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
      >
        <div className="absolute left-1/2 top-3/4 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 rotate-90 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
