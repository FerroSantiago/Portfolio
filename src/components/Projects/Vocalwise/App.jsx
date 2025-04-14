"use client"

import { useState } from "react"

export default function App() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeDevice, setActiveDevice] = useState("mobile")

  // Project details
  const projectInfo = {
    title: "VocalWise",
    description:
      "Oral exam preparation platform powered by Artificial Intelligence to assess and improve verbal, nonverbal, and paraverbal communication skills.",
    technologies: [
      { name: "React Native", description: "Multiplatform interfaces developement" },
      { name: "Firebase", description: "Auth and real time messaging" },
      { name: "Express", description: "API Rest for comunication between services" },
      { name: "Microsoft Azure", description: "Video analysis and comunication processing" },
      { name: "ChatGPT (OpenAI)", description: "Azure output processing and feedback formulation" },
    ],
    features: [
      "Oral exam enviroment simulation",
      "Body language and gestures analysis",
      "Voice tone and speech rythm evaluation",
      "Detailed feedback",
      "Practice history",
    ],
    process: [
      {
        step: 1,
        title: "Recording",
        description: "The user records his oral exam practice",
      },
      {
        step: 2,
        title: "Azure Analysis",
        description:
          "Microsoft Azure processes the video, analyzes verbal and non-verbal components and return raw data",
      },
      {
        step: 3,
        title: "Output Formatting",
        description: "ChatGPT converts the raw data into understandable feedback",
      },
      {
        step: 4,
        title: "Delivery",
        description: "The user receives detailed feedback in the chat interface",
      },
    ],
  }

  // Screenshots - Replace with your actual screenshot paths
  const screenshots = {
    mobile: [
      {
        src: "/images/placeholder.webp",
        alt: "Dashboard principal",
        caption: "Panel principal con estadísticas de práctica",
      },
      {
        src: "/images/placeholder.webp",
        alt: "Pantalla de grabación",
        caption: "Interfaz de grabación de práctica",
      },
      {
        src: "/images/placeholder.webp",
        alt: "Retroalimentación detallada",
        caption: "Análisis detallado del desempeño",
      },
    ],
    desktop: [
      {
        src: "/images/placeholder.webp",
        alt: "Dashboard en escritorio",
        caption: "Versión web del panel principal",
      },
      {
        src: "/images/placeholder.webp",
        alt: "Análisis detallado",
        caption: "Métricas avanzadas de desempeño",
      },
      {
        src: "/images/placeholder.webp",
        alt: "Historial de prácticas",
        caption: "Seguimiento de progreso a lo largo del tiempo",
      },
    ],
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Project Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectInfo.title}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">{projectInfo.description}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-10 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium text-sm md:text-base ${activeTab === "overview" ? "border-b-2 border-blue-800 text-blue-800" : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("tech")}
          className={`px-4 py-2 font-medium text-sm md:text-base ${activeTab === "tech" ? "border-b-2 border-blue-800 text-blue-800" : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Tecnologies
        </button>
        <button
          onClick={() => setActiveTab("screenshots")}
          className={`px-4 py-2 font-medium text-sm md:text-base ${activeTab === "screenshots"
            ? "border-b-2 border-blue-800 text-blue-800"
            : "text-gray-400 hover:text-gray-200"
            }`}
        >
          Screenshots
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-16">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="bg-zinc-800 p-6 rounded-sm transform transition-transform hover:scale-105">
                <h2 className="text-2xl font-bold mb-4">Main Features</h2>
                <ul className="space-y-2">
                  {projectInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-800 mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                {/* Placeholder for a main feature image or illustration */}
                <div className="aspect-video bg-gradient-to-b from-blue-900 to-zinc-800 rounded-sm flex items-center justify-center">
                  {/* Logo del proyecto */}
                  <img src="/icons/logoBlanco.svg" alt="back" width={250} height={250} />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold transform rotate-12">
                  IA Powered
                </div>
              </div>
            </div>

            {/* Process Flow */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-white">How it works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {projectInfo.process.map((process, index) => (
                  <div key={index} className="bg-zinc-800 p-5 rounded-xl relative">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold">
                      {process.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-blue-800 mt-3">{process.title}</h3>
                    <p className="text-gray-300 text-sm">{process.description}</p>
                    {index < projectInfo.process.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-blue-800 text-2xl z-10">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technologies Tab */}
        {activeTab === "tech" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Tecnologies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectInfo.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow border border-zinc-700"
                >
                  <h3 className="text-xl font-bold mb-2 text-blue-800">{tech.name}</h3>
                  <p className="text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-white">System Infraestructure</h3>
              <div className="bg-zinc-800 p-6 rounded-sm border border-zinc-700">
                {/* Legend */}
                <div className="mb-6 p-4 border border-zinc-700 rounded-lg bg-zinc-900 w-fit ml-auto">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-1 bg-red-500"></div>
                      <span className="text-white">Send</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-1 rounded-full bg-blue-500"></div>
                      <span className="text-white">Response</span>
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto w-[800px] h-[600px]">
                  {/* React Native */}
                  <div
                    className="absolute w-64 text-center p-4 border border-cyan-600 rounded-lg bg-zinc-900"
                    style={{
                      top: '20px',       // Ajusta según necesites
                      left: '50%',       // Lo centramos en X
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <h4 className="font-bold text-cyan-400">React Native</h4>
                    <p className="text-sm text-gray-300">User interface</p>
                  </div>

                  {/* Firebase */}
                  <div
                    className="absolute w-64 text-center p-4 border border-amber-600 rounded-lg bg-zinc-900"
                    style={{
                      top: '150px',      // Ajusta a tu gusto
                      left: '20%',       // Aproximadamente un 20% desde la izquierda
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <h4 className="font-bold text-yellow-400">Firebase</h4>
                    <p className="text-sm text-gray-300">Messaging and Auth</p>
                  </div>

                  {/* Express API */}
                  <div
                    className="absolute w-64 text-center p-4 border border-green-700 rounded-lg bg-zinc-900"
                    style={{
                      top: '150px',
                      left: '80%',       // A la derecha
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <h4 className="font-bold text-green-400">Express API</h4>
                    <p className="text-sm text-gray-300">Sending to Microsoft Azure</p>
                  </div>

                  {/* Microsoft Azure */}
                  <div
                    className="absolute w-64 text-center p-4 border border-cyan-700 rounded-lg bg-zinc-900"
                    style={{
                      top: '300px',
                      left: '80%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <h4 className="font-bold text-cyan-400">Microsoft Azure</h4>
                    <p className="text-sm text-gray-300">Video indexer</p>
                  </div>

                  {/* GPT Model */}
                  <div
                    className="absolute w-64 text-center p-4 border border-teal-700 rounded-lg bg-zinc-900"
                    style={{
                      top: '450px',
                      left: '80%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <h4 className="font-bold text-teal-600">GPT Model</h4>
                    <p className="text-sm text-gray-300">Feedback generation</p>
                  </div>

                  <svg
                    className="absolute top-0 left-0"
                    width="800"
                    height="600"
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Flecha: React Native -> Firebase (roja) */}
                    <path d="M 400 90 L 271 169" stroke="#EF4444" strokeWidth="2" />
                    <polygon points="269,170.5 276,160 282,169" fill="#EF4444" />

                    {/* Flecha: React Native -> Express (roja) */}
                    <path d="M 400 90 L 530 170" stroke="#EF4444" strokeWidth="2" />
                    <polygon points="530,170 520,167 523,162" fill="#EF4444" />

                    {/* Flecha: Firebase -> Microsoft Azure (roja) */}
                    <path d="M 270 190 L 630 310" stroke="#EF4444" strokeWidth="2" />
                    <polygon points="630,310 620,310 621,304" fill="#EF4444" />

                    {/* Flecha: Express -> Microsoft Azure (roja) */}
                    <path d="M 640 215 L 640 310" stroke="#EF4444" strokeWidth="2" />
                    <polygon points="640,315 635,305 645,305" fill="#EF4444" />

                    {/* Flecha: Microsoft Azure -> GPT Model (roja) */}
                    <path d="M 640 365 L 640 455" stroke="#EF4444" strokeWidth="2" />
                    <polygon points="640,465 635,455 645,455" fill="#EF4444" />

                    {/* Flecha: GPT Model -> Firebase (azul, punteada) */}
                    <path d="M 520 490 Q 150 550 160 215" stroke="#3B82F6" strokeWidth="2" />
                    <polygon points="160,212 165,222 155,222" fill="#3B82F6" />

                    {/* Flecha: Firebase -> React Native (azul, punteada) */}
                    <path d="M 160 160 L 290 60" stroke="#3B82F6" strokeWidth="2" />
                    <polygon points="290,60 284,68 280,64" fill="#3B82F6" />
                  </svg>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Screenshots Tab */}
        {activeTab === "screenshots" && (
          <div>
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => setActiveDevice("mobile")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeDevice === "mobile" ? "bg-blue-800 text-white" : "bg-zinc-800 text-gray-300 hover:bg-zinc-900"
                    }`}
                >
                  Mobile
                </button>
                <button
                  onClick={() => setActiveDevice("desktop")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeDevice === "desktop"
                    ? "bg-blue-800 text-white"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-900"
                    }`}
                >
                  Desktop
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {screenshots[activeDevice].map((screenshot, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`
                    overflow-hidden rounded-t-4xl shadow-md transition-all duration-300 
                    ${activeDevice === "desktop" ? "aspect-video" : "aspect-[9/16] max-w-[250px] mx-auto"}
                    bg-zinc-800
                  `}
                  >
                    {/* Replace with actual images when available */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">{screenshot.alt}</div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-400">{screenshot.caption}</p>
                  </div>

                  {/* Device frame overlay */}
                  <div
                    className={`
                    absolute inset-0 pointer-events-none border-8 
                    ${activeDevice === "desktop"
                        ? "rounded-lg border-zinc-700"
                        : "rounded-3xl border-zinc-700 max-w-[250px] mx-auto left-0 right-0"
                      }
                  `}
                  >
                    {activeDevice === "mobile" && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-zinc-700 rounded-b-xl"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
