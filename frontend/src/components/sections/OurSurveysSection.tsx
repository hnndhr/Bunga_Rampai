"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import OurSurveyCard from "../ui/OurSurveyCard";
import CarrousselCustom from "../ui/CarrousselCustom";

//Home -> Our Survey (Rand.3)

const Carroussel = dynamic(() => import("../ui/Carroussel"), { ssr: false });

export default function OurSurveysSection() {
const [cards] = useState([
  { key: 1, content: <OurSurveyCard imageSrc="/images/contoh.png" />, link: "/article" },
  { key: 2, content: <OurSurveyCard imageSrc="/images/infografis.png" />, link: "/article" },
  { key: 3, content: <OurSurveyCard imageSrc="/images/infografis.png" />, link: "/article" },
]);


  return (
    <section className="w-full bg-gradient-to-t from-gray-900 to-slate-800 py-16 text-center text-white">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-20">Our Surveys</h2>

      <div className="relative flex justify-center px-4">
        <CarrousselCustom cards={cards} />
      </div>

      <p className="text-xs sm:text-sm text-gray-300 mt-6">
        Click to view article details
      </p>
    </section>
  );
}
