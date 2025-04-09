"use client"

import { useState } from "react"

export default function SoftwareProjects() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const projects = [
    { name: "NeuroNEApp", description: "Brain exercising games platform", link: "https://neurneapp.example.com" },
    { name: "QuantumStore", description: "B2B digital marketplace for wholesale goods ", link: "https://quantumstore.example.com" },
    { name: "VocalWise", description: "AI oratory coaching app with comprehensive feedback", link: "https://vocalwise.example.com" },
    { name: "InboxVIP", description: "Direct influencer-follower engagement platform", link: "https://inboxvip.example.com" },
    { name: "SpeechTherapist", description: "AI-powered phonetic error recognition tool for speech therapists", link: "https://speechtherapist.example.com" },
    { name: "Tecnicar", description: "Electric karts race laps system", link: "https://tecnicar.example.com" },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-4xl select-none">
        <h2 className="text-3xl font-bold mb-12 text-center ">Software Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 backdrop-blur-xs ">
          {/* Esquina superior izquierda */}
          <div className="absolute top-0 left-0 w-[10%] h-[25%] border-t-2 border-l-2 border-white"></div>
          {/* Esquina inferior derecha */}
          <div className="absolute bottom-0 right-0 w-[10%] h-[25%] border-b-2 border-r-2 border-white"></div>

          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="h-full p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">{project.name}</h3>
                </div>
                {project.description && <p className="mt-2 text-sm text-gray-500">{project.description}</p>}
                <div
                  className={`w-full h-1 bg-gradient-to-r from-gray-800 to-gray-300 mt-4 rounded-full transition-all duration-300 origin-left ${hoveredIndex === index ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
