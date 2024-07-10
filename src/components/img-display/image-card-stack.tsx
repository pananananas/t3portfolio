"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
}

const CardStack: React.FC<CardStackProps> = ({ images }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    class CardStackManager {
      private scrollableContainer: HTMLElement;
      private activeIndex: number = 0;
      private globalScrollProgress: number = 0;
      private cardCount: number;
      private visibleCards: VisibleCard[] = [];

      constructor(scrollableContainer: HTMLElement) {
        this.scrollableContainer = scrollableContainer;
        this.cardCount =
          scrollableContainer.querySelectorAll(".scrollable-card").length;
        this.init();
      }

      private init() {
        this.scrollableContainer.addEventListener(
          "scroll",
          this.handleScroll.bind(this),
        );
        this.createVisibleCards();
        this.visibleCards.forEach((card) => {
          card.update(this.globalScrollProgress, this.activeIndex);
        });
      }

      private createVisibleCards() {
        const children = document.querySelectorAll(".visible-card");
        for (let i = 0; i < children.length; i++) {
          this.visibleCards.push(
            new VisibleCard(
              this.cardCount,
              this.globalScrollProgress,
              this.activeIndex,
              i,
            ),
          );
        }
      }

      private handleScroll() {
        const { scrollLeft, scrollWidth, clientWidth } =
          this.scrollableContainer;
        const newScrollProgress = scrollLeft / (scrollWidth - clientWidth);
        this.globalScrollProgress = newScrollProgress;
        this.handleActiveIndex();
        this.update();
      }

      private handleActiveIndex() {
        const relativeScrollPerCard = 1 / (this.cardCount - 1);
        const previousScrollSnapPoint =
          relativeScrollPerCard * (this.activeIndex - 1);
        const nextScrollSnapPoint =
          relativeScrollPerCard * (this.activeIndex + 1);

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
    }

    class VisibleCard {
      private element: HTMLElement;
      private cardCount: number;
      private globalScrollProgress: number;
      private activeIndex: number;
      private index: number;
      private maxCardsOnOneSide: number = 5;

      constructor(
        cardCount: number,
        globalScrollProgress: number,
        activeIndex: number,
        index: number,
      ) {
        this.element = document.querySelectorAll(".visible-card")[
          index
        ] as HTMLElement;
        this.cardCount = cardCount;
        this.globalScrollProgress = globalScrollProgress;
        this.activeIndex = activeIndex;
        this.index = index;
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
        let opacity = this.maxCardsOnOneSide - absoluteCardScrollProgress;
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
        this.element.style.transform = `translateX(${translateX - 50}%) translateY(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        this.element.style.zIndex = zIndex.toString();
        this.element.style.opacity = opacity.toString();
      }
    }

    if (scrollableContainerRef.current) {
      new CardStackManager(scrollableContainerRef.current);
    }
  }, []);

  return (
    <div ref={parentRef} className="relative h-[24rem] w-[24rem]">
      <div
        ref={scrollableContainerRef}
        className="scrollbar-hide flex h-full snap-x snap-mandatory overflow-x-scroll border"
      >
        {images.map((image) => (
          <Link
            href={`/img/${image.id}`}
            key={image.id}
            className="scrollable-card h-full w-full flex-[1_0_100%] snap-start snap-always"
          />
        ))}

        <div className="perspective-[60rem] pointer-events-none absolute left-0 top-0 h-full w-full cursor-ew-resize">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="visible-card transform-style-preserve-3d pointer-events-none absolute left-1/2 top-1/2 flex h-[15rem] w-[12rem] cursor-ew-resize items-center justify-center"
            >
              <Image
                src={image.url}
                alt={image.name}
                width={480}
                height={480}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
