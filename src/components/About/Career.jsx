import { useState } from "react";

export default function CareerTimeline() {
  const careerItems = [
    {
      title: "System Engineer Student",
      company: "Universidad de la Cuenca del Plata",
      period: "Feb 2020 - Dec 2024",
    },
    {
      title: "Software Development Engineer in Test",
      company: "Glitch Code",
      period: "Mar 2023 - Mar 2024",
    },
    {
      title: "Infrastructure Administrator",
      company: "Municipalidad de la Ciudad de Corrientes",
      period: "Apr 2024 - Mar 2025",
    },
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "Mar 2025 - Now",
    },
  ];

  const formatPeriod = (period) => {
    const parts = period.split(" - ")
    const startYear = parts[0].split(" ")[1]
    const endPart = parts[1]
    const endYear = endPart === "Now" ? "Now" : endPart.split(" ")[1]
    return `${startYear} - ${endYear}`
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-5 text-center">My Career Timeline</h2>

      <div className="relative ml-4">
        {/* Vertical timeline line */}
        <div className="absolute left-0 top-0 w-[1px] h-full bg-white/20" />

        {careerItems.map((item, index) => (
          <div key={index} className="relative mb-16 pl-8">
            {/* Timeline dot */}
            <div className="absolute left-[-4px] top-1 w-2 h-2 bg-[#ff3333]" />

            {/* Content */}
            <div className="border border-white/10 p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.company}</h3>
                <span className="text-[#ff3333] font-bold">{formatPeriod(item.period)}</span>
              </div>
              <p className="text-white/70">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}