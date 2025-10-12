import React from "react";

export default function OurSurveyCard({ imageSrc }: { imageSrc: string }) {
  const CARDBORDERRADIUS = 20;

  return (
    <div
      className="
        relative 
        overflow-hidden 
        shadow-2xl 
        rounded-[20px]
        bg-gray-200
        aspect-[210/297]
        w-[22vw]
        max-w-[800px]
      "
    >
      <img
        src={imageSrc}
        alt="survey"
        className="
          w-full 
          h-full 
          object-fit
          overflow-hidden
          object-center 
          rounded-[20px]
        "
      />
    </div>
  );
}
