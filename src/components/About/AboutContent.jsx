"use client"

import { useState, useEffect } from "react"
import Profile from "./Profile"

export default function AboutContent() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Indicador de la carga de pagina */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-500">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
            <p className="mt-4 text-xl text-white">Cargando experiencia 3D...</p>
          </div>
        </div>
      )}

      {/* Contenido con desvanecimiento */}
      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Profile />
      </div>
    </>
  )
}