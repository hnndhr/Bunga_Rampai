"use client";

import React from "react";
import CircularGallery from "../ui/CircularGallery";
import { surveyCards } from "../ui/SurveyCardData";

export default function OurSurveysSection() {
  // Mapping data ke format yang diminta CircularGallery
  const galleryItems = surveyCards.map((card) => ({
    image: card.image,
  }));

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-800 via-gray-800 to-gray-900 flex flex-col items-center justify-center text-center px-6 py-24">
      {/* Section Title */}
      <div className="mb-5 max-w-3xl">
        <h2 className="text-5xl font-bold text-white mb-4">Our Surveys</h2>
      </div>

      {/* Circular Gallery */}
      <div className="w-full max-w-6xl h-[600px]">
        <CircularGallery
          items={galleryItems}
          bend={0}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={1}
          scrollEase={0.05}
        />
      </div>

      {/* Optional footer text */}
      <p className="text-slate-400 text-sm">
        Scroll or drag to explore the gallery
      </p>
    </section>
  );
}
