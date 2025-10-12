"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Card from "../ui/CardOurSurvey"; // pastikan path-nya benar
import OurSurveyCard from "../ui/CardOurSurvey";

const Carroussel = dynamic(() => import("../ui/Carroussel"), { ssr: false });

export default function OurSurveysSection() {
  const [cards] = useState([
    {
      key: 1,
      content: <OurSurveyCard imageSrc="/images/1.jpg" />,
    },
    {
      key: 2,
      content: <OurSurveyCard imageSrc="../images/flower-image.jpg" />,
    },
    {
      key: 3,
      content: <OurSurveyCard imageSrc="/images/1.jpg" />,
    },
  ]);

  return (
    <section className="w-full bg-gradient-to-t from-gray-900 to-slate-800 pt-20 text-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold">Our Surveys</h2>

      <div className="relative flex justify-center">
        <Carroussel
          cards={cards}
          height="600px"
          width="80%"
          margin="0"
          offset={1}
          showArrows={false}
        />
      </div>

      <p className="text-sm text-gray-300 -bottom-20 mt-[-3rem]">
        Scroll or drag to explore the gallery
      </p>
    </section>
  );
}
