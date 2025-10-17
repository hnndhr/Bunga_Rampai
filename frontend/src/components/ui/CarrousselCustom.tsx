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

export default function CarrousselCustom({
  cards,
  height = "600px",
}: CarrousselCustomProps) {
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
  const prev = () =>
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);

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
          // --- hitung diff yang simetris antara -half..+half ---
          let diff = i - index;
          const half = Math.floor(cards.length / 2);

          if (diff > half) diff -= cards.length;
          if (diff < -half) diff += cards.length;

          // --- variabel dasar ---
          let x = 0,
            scale = 1,
            opacity = 1,
            zIndex = 1,
            blur = "0px";

          const baseOffset = isMobile ? 180 : 400;
          const baseScale = isMobile ? 1 : 0.85;

          // --- interpolasi posisi, skala, dan opacity ---
          const distance = Math.abs(diff);
          const t = Math.min(distance / half, 1);

          x = diff * baseOffset * 1; // geser kiri/kanan halus
          scale = 1 - t * 0.25; // perlahan mengecil
          opacity = 1 - t * 0.5; // perlahan memudar
          blur = `${t * 3}px`; // blur makin jauh
          zIndex = 10 - distance;

          return (
            <motion.div
              key={card.key}
              layout
              className="absolute cursor-grab flex items-center justify-center"
              style={{
                transformStyle: "initial",
                zIndex,
                filter: `blur(${blur})`,
              }}
              animate={{
                x,
                scale,
                opacity,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 19,
              }}
onClick={() => {
  if (i === index && card.link) {
    router.push(card.link); // klik card tengah
  } else if (i === (index + 1) % cards.length) {
    setIndex((index + 1) % cards.length); // klik kanan → geser kanan
  } else if (i === (index - 1 + cards.length) % cards.length) {
    setIndex((index - 1 + cards.length) % cards.length); // klik kiri → geser kiri
  }
}}

            >
              <div
                className={`
                  rounded-[20px] shadow-2xl overflow-hidden aspect-[2828/4000]
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
