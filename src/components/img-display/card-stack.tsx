"use client";
import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { Link } from 'next-view-transitions'

interface ImageData {
  id: number;
  name: string;
  url: string;
  key: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface CardStackProps {
  images: ImageData[];
  id: string;
}

const CardStack: React.FC<CardStackProps> = ({ images, id }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);

  const checkIfDesktop = () => {
    setIsDesktop(window.innerWidth >= 1024); // Assuming 1024px as the breakpoint for desktop
  };

  useEffect(() => {
    checkIfDesktop();
    window.addEventListener("resize", checkIfDesktop);
    return () => window.removeEventListener("resize", checkIfDesktop);
  }, []);

  class CardStackManager {
    private scrollableContainer: HTMLElement;
    private activeIndex = 0;
    private globalScrollProgress = 0;
    private cardCount: number;
    private visibleCards: VisibleCard[] = [];
    private id: string;
    private onActiveIndexChange: (index: number) => void;
    private setHasScrolled: (hasScrolled: boolean) => void;

    constructor(
      scrollableContainer: HTMLElement,
      id: string,
      onActiveIndexChange: (index: number) => void,
      setHasScrolled: (hasScrolled: boolean) => void,
    ) {
      this.scrollableContainer = scrollableContainer;
      this.id = id;
      this.cardCount = scrollableContainer.querySelectorAll(
        `.scrollable-card-${id}`,
      ).length;
      this.onActiveIndexChange = onActiveIndexChange;
      this.setHasScrolled = setHasScrolled;
      this.handleScroll = this.handleScroll.bind(this);
      this.init();
    }

    private init() {
      this.scrollableContainer.addEventListener("scroll", this.handleScroll);
      this.createVisibleCards();
      this.visibleCards.forEach((card) => {
        card.update(this.globalScrollProgress, this.activeIndex);
      });
      this.handleActiveIndex();
    }  

    private createVisibleCards() {
      const children = this.scrollableContainer.querySelectorAll(
        `.visible-card-${this.id}`,
      );
      for (let i = 0; i < children.length; i++) {
        this.visibleCards.push(
          new VisibleCard(
            this.cardCount,
            this.globalScrollProgress,
            this.activeIndex,
            i,
            this.id,
          ),
        );
      }
    }

    private handleScroll = () => {
      this.setHasScrolled(true);
      const { scrollLeft, scrollWidth, clientWidth } = this.scrollableContainer;
      const newScrollProgress = scrollLeft / (scrollWidth - clientWidth);
      this.globalScrollProgress = newScrollProgress;
      this.handleActiveIndex();
      this.update();
    };
  

    private handleActiveIndex() {
      const relativeScrollPerCard = 1 / (this.cardCount - 1);
      const previousScrollSnapPoint =
        relativeScrollPerCard * (this.activeIndex - 1);
      const nextScrollSnapPoint =
        relativeScrollPerCard * (this.activeIndex + 1);
      // const newActiveIndex = Math.round(
      //   this.globalScrollProgress / relativeScrollPerCard,
      // );

      // if (this.activeIndex !== newActiveIndex) {
      //   this.activeIndex = newActiveIndex;
      //   this.onActiveIndexChange(this.activeIndex);
      // }

      if (
        this.globalScrollProgress <= previousScrollSnapPoint &&
        this.activeIndex > 0
      ) {
        this.activeIndex = this.activeIndex - 1;
      } else if (
        this.globalScrollProgress >= nextScrollSnapPoint &&
        this.activeIndex < this.cardCount - 1
      ) {
        this.activeIndex = this.activeIndex + 1;
      }
    }

    private update() {
      this.visibleCards.forEach((card) => {
        card.update(this.globalScrollProgress, this.activeIndex);
      });
    }

    public cleanup() {
      this.scrollableContainer.removeEventListener("scroll", this.handleScroll);
    }  
  }

  class VisibleCard {
    private element: HTMLElement;
    private cardCount: number;
    private globalScrollProgress: number;
    private activeIndex: number;
    private index: number;
    private id: string;
    private maxCardsOnOneSide = 5;

    constructor(
      cardCount: number,
      globalScrollProgress: number,
      activeIndex: number,
      index: number,
      id: string,
    ) {
      this.element = document.querySelector(
        `.visible-card-${id}:nth-child(${index + 1})`,
      ) as HTMLElement;
      this.cardCount = cardCount;
      this.globalScrollProgress = globalScrollProgress;
      this.activeIndex = activeIndex;
      this.index = index;
      this.id = id;
    }

    update(globalScrollProgress: number, activeIndex: number) {
      this.globalScrollProgress = globalScrollProgress;
      this.activeIndex = activeIndex;

      const relativeScrollPerCard =
        this.cardCount > 1 ? 1 / (this.cardCount - 1) : 1;
      const cardRelativeScrollStart = relativeScrollPerCard * this.index;
      const cardScrollProgress =
        (this.globalScrollProgress - cardRelativeScrollStart) /
        relativeScrollPerCard;
      const absoluteCardScrollProgress = Math.abs(cardScrollProgress);
      const activeCardScrollProgress =
        this.globalScrollProgress / relativeScrollPerCard - this.activeIndex;
      const absoluteActiveCardScrollProgress = Math.abs(
        activeCardScrollProgress,
      );

      const translateX = this.calculateTranslateX(
        cardScrollProgress,
        absoluteCardScrollProgress,
      );
      const translateZ = this.calculateTranslateZ(absoluteCardScrollProgress);
      const rotateY = this.calculateRotateY(
        absoluteActiveCardScrollProgress,
        absoluteCardScrollProgress,
        cardScrollProgress,
      );
      const rotateZ = this.calculateRotateZ(cardScrollProgress);
      const scale = this.calculateScale(absoluteCardScrollProgress);
      const zIndex = this.calculateZIndex(activeCardScrollProgress);
      const opacity = this.calculateOpacity(absoluteCardScrollProgress);

      this.applyStyles(
        translateX,
        translateZ,
        rotateY,
        rotateZ,
        scale,
        zIndex,
        opacity,
      );
    }

    private calculateTranslateX(
      cardScrollProgress: number,
      absoluteCardScrollProgress: number,
    ): number {
      let translateX = 0;

      if (this.activeIndex === this.index) {
        if (absoluteCardScrollProgress < 0.5) {
          translateX = -128 * cardScrollProgress;
        } else {
          translateX = -128 * Math.sign(cardScrollProgress);
          translateX += 128 * cardScrollProgress;
          translateX +=
            -((1 - absoluteCardScrollProgress / this.cardCount / 4) * 10) *
            (absoluteCardScrollProgress - 0.5) *
            2 *
            Math.sign(cardScrollProgress);
        }
      } else {
        translateX =
          cardScrollProgress *
          -((1 - absoluteCardScrollProgress / this.cardCount / 4) * 10);
      }

      return translateX;
    }

    private calculateTranslateZ(absoluteCardScrollProgress: number): number {
      return 200 - absoluteCardScrollProgress * 40;
    }

    private calculateRotateY(
      absoluteActiveCardScrollProgress: number,
      absoluteCardScrollProgress: number,
      cardScrollProgress: number,
    ): number {
      let rotateY = 0;

      if (absoluteActiveCardScrollProgress < 0.5) {
        rotateY = absoluteActiveCardScrollProgress * -75;
      } else {
        rotateY = (1 - absoluteActiveCardScrollProgress) * -75;
      }

      if (this.index === this.activeIndex) {
        if (absoluteCardScrollProgress < 0.5) {
          rotateY = absoluteCardScrollProgress * -90;
        } else {
          rotateY = (1 - absoluteCardScrollProgress) * -90;
        }
      }

      rotateY *=
        Math.sign(cardScrollProgress) *
        (1 - Math.abs(this.activeIndex - this.index) / this.cardCount);

      return rotateY;
    }

    private calculateRotateZ(cardScrollProgress: number): number {
      return cardScrollProgress * 2 * -1;
    }

    private calculateScale(absoluteCardScrollProgress: number): number {
      let scale = 1 - absoluteCardScrollProgress * 0.05;

      if (this.index === this.activeIndex) {
        if (absoluteCardScrollProgress < 0.5) {
          scale -= absoluteCardScrollProgress * 0.25;
        } else {
          scale -= (1 - absoluteCardScrollProgress) * 0.25;
        }
      }

      return Math.max(scale, 0);
    }

    private calculateZIndex(activeCardScrollProgress: number): number {
      const distanceIndex = Math.abs(this.activeIndex - this.index);
      let zIndex = this.cardCount - distanceIndex;

      if (Math.sign(activeCardScrollProgress) === -1) {
        if (this.index < this.activeIndex) {
          zIndex += 1;
          if (activeCardScrollProgress < -0.5) {
            zIndex += 1;
          }
        }
      }
      if (Math.sign(activeCardScrollProgress) === 1) {
        if (this.index === this.activeIndex) {
          zIndex += 1;
        }
        if (this.index > this.activeIndex) {
          zIndex += 1;
          if (activeCardScrollProgress > 0.5) {
            zIndex += 1;
          }
        }
      }

      return zIndex;
    }

    private calculateOpacity(absoluteCardScrollProgress: number): number {
      const opacity = this.maxCardsOnOneSide - absoluteCardScrollProgress;
      return Math.max(0, Math.min(1, opacity));
    }
    private applyStyles(
      translateX: number,
      translateZ: number,
      rotateY: number,
      rotateZ: number,
      scale: number,
      zIndex: number,
      opacity: number,
    ) {
      const transform = `translateX(${translateX - 50}%) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      this.element.style.transform = transform;
      this.element.style.zIndex = zIndex.toString();
      this.element.style.opacity = opacity.toString();
    }
  }

  const createCardStackManager = useCallback(() => {
    if (scrollableContainerRef.current) {
      return new CardStackManager(
        scrollableContainerRef.current,
        id,
        setActiveIndex,
        setHasScrolled
      );
    }
    return null;
  }, [id]);

  useEffect(() => {
    const cardStackManager = createCardStackManager();

    return () => {
      if (cardStackManager) {
        cardStackManager.cleanup();
      }
    };
  }, [id, createCardStackManager]);

  const handleArrowClick = (direction: "left" | "right") => {
    setArrowClicked(true);
    if (direction === "left" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === "right" && activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    if (scrollableContainerRef.current) {
      const scrollWidth = scrollableContainerRef.current.scrollWidth;
      const clientWidth = scrollableContainerRef.current.clientWidth;
      const scrollLeft =
        (scrollWidth - clientWidth) * (activeIndex / (images.length - 1));
      scrollableContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex, images.length]);

  return (
    <div ref={parentRef} className="relative h-[14rem] w-[12rem]">
      {isDesktop && (!hasScrolled || arrowClicked) && (
        <>
          {activeIndex > 0 && (
            <button
              onClick={() => handleArrowClick("left")}
              className="absolute left-[-15px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:translate-x-[-4px]"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          {activeIndex < images.length - 1 && (
            <button
              onClick={() => handleArrowClick("right")}
              className="absolute right-[-15px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-black bg-opacity-40 text-white transition-all hover:scale-105 hover:bg-opacity-50 active:translate-x-[4px]"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </>
      )}
      <div
        ref={scrollableContainerRef}
        className={`scrollbar-hide flex h-full w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll`}
      >
        {images.map((image) => (
          <Link
            href={`/img/${image.id}`}
            key={image.id}
            className={`scrollable-card-${id} h-full w-full flex-[1_0_100%] flex-shrink-0 snap-start snap-always`}
          />
        ))}

        <div className="perspective-[60rem] pointer-events-none absolute left-0 top-0 h-full w-full cursor-ew-resize">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`visible-card-${id} transform-style-preserve-3d pointer-events-none absolute left-1/2 top-1/2 flex h-[12rem] w-[9rem] cursor-ew-resize items-center justify-center shadow-lg`}
            >
              <Image
                src={image.url}
                alt={image.name}
                width={480}
                height={480}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
