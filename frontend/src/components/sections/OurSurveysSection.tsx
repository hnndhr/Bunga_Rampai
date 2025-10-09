"use client";

import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  PieChart,
} from "lucide-react";
import { SurveyCard, surveyCards } from "../ui/SurveyCard";

// Survey Card Component
interface SurveyCardComponentProps {
  card: SurveyCard;
  width: number;
}

const SurveyCardComponent: React.FC<SurveyCardComponentProps> = ({
  card,
  width,
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-slate-800 border border-slate-700"
      style={{ width: `${width}px`, height: "420px" }}
    >
      <div className="absolute inset-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
      </div>

      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="flex justify-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/80 backdrop-blur-sm">
            {card.icon}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white leading-tight">
            {card.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {card.description}
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 24;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function OurSurveysSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const numCards = surveyCards.length;

  const itemWidth = 320;
  const trackItemOffset = itemWidth + GAP;

  // === AUTO SLIDE ===
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    let interval: NodeJS.Timeout;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % numCards);
      }, 4000);
    }

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, [isHovered, numCards]);

  // === DRAG HANDLER ===
  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (
      Math.abs(offset) > DRAG_BUFFER ||
      Math.abs(velocity) > VELOCITY_THRESHOLD
    ) {
      if (offset < 0 || velocity < 0) {
        setCurrentIndex((prev) => (prev + 1) % numCards);
      } else {
        setCurrentIndex((prev) => (prev - 1 + numCards) % numCards);
      }
    }
  };

  // === BUTTON HANDLERS ===
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + numCards) % numCards);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % numCards);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-gray-900 to-gray-950 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 pt-8">Our Surveys</h1>
          <p className="text-slate-400 text-lg">
            Explore our research and survey findings
          </p>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{
              width: `${itemWidth}px`,
              height: "420px",
            }}
          >
            <motion.div
              className="flex absolute left-0 top-0"
              drag="x"
              dragConstraints={{
                left: -trackItemOffset * (surveyCards.length - 1),
                right: 0,
              }}
              style={{
                gap: `${GAP}px`,
                x,
              }}
              onDragEnd={handleDragEnd}
              animate={{ x: -(currentIndex * trackItemOffset) }}
              transition={SPRING_OPTIONS}
            >
              {surveyCards.map((card, index) => {
                const range = [
                  -(index + 1) * trackItemOffset,
                  -index * trackItemOffset,
                  -(index - 1) * trackItemOffset,
                ];
                const outputRange = [75, 0, -75];
                const rotateY = useTransform(x, range, outputRange, {
                  clamp: false,
                });
                const scale = useTransform(
                  x,
                  [
                    -(index + 1) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 1) * trackItemOffset,
                  ],
                  [0.85, 1, 0.85]
                );
                const opacity = useTransform(
                  x,
                  [
                    -(index + 1) * trackItemOffset,
                    -index * trackItemOffset,
                    -(index - 1) * trackItemOffset,
                  ],
                  [0.5, 1, 0.5]
                );

                return (
                  <motion.div
                    key={card.id}
                    className="shrink-0 cursor-grab active:cursor-grabbing"
                    style={{
                      width: itemWidth,
                      height: "100%",
                      rotateY,
                      scale,
                      opacity,
                    }}
                  >
                    <SurveyCardComponent card={card} width={itemWidth} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          <button
            onClick={handleNext}
            className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-end justify-center text-center pointer-events-none pt-3">
          <p className="text-white text-sm font-medium">
            Click to view article details
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {surveyCards.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-blue-600"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
              animate={{
                scale: currentIndex === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
