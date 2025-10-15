"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import { useRouter } from "next/navigation";

interface CarouselCard {
  key: number;
  content: React.ReactNode;
  link?: string;
}

interface CarrousselCustomProps {
  cards: CarouselCard[];
  height?: string;
}

export default function CarrousselCustom({ cards, height = "600px" }: CarrousselCustomProps) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Deteksi ukuran layar
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % cards.length);
  const prev = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  const bind = useDrag(
    ({ movement: [mx], last }) => {
      if (last) {
        if (mx < -50) next();
        else if (mx > 50) prev();
      }
    },
    { axis: "x" }
  );

  return (
    <div
      {...bind()}
      className="relative mx-auto flex items-center justify-center overflow-hidden select-none"
      style={{
        width: "100%",
        height: "70vh",
        perspective: "1000px",
        alignItems: "center",
        touchAction: "pan-y",
      }}
    >
      <AnimatePresence initial={false}>
        {cards.map((card, i) => {
          const diff = (i - index + cards.length) % cards.length;
          let x = 0,
            scale = 1,
            opacity = 1,
            zIndex = 1,
            blur = "0px";

          const offset = isMobile ? 180 : 400;
          const sideScale = isMobile ? 0.9 : 0.85;

          if (diff === 0) {
            x = 0;
            scale = 1;
            opacity = 1;
            zIndex = 10;
          } else if (diff === 1 || diff === -cards.length + 1) {
            x = offset;
            scale = sideScale;
            opacity = 0.6;
            zIndex = 5;
            blur = "2px";
          } else if (diff === cards.length - 1 || diff === -1) {
            x = -offset;
            scale = sideScale;
            opacity = 0.6;
            zIndex = 5;
            blur = "2px";
          } else {
            opacity = 0;
            scale = 0.7;
            zIndex = 0;
          }

          return (
            <motion.div
              key={card.key}
              className="absolute cursor-grab transition-transform flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                zIndex,
                filter: `blur(${blur})`,
              }}
              animate={{
                x,
                scale,
                opacity,
                y: 0,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 100 }}
              onClick={() => {
                if (diff === 0 && card.link) router.push(card.link);
                else if (diff === 1 || diff === cards.length - 1) setIndex(i);
              }}
            >
              <div
                className={`
                  rounded-[20px] shadow-2xl overflow-hidden aspect-[2828/4000]
                  w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw]
                `}
              >
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
