"use client"

import { useState, useCallback, useEffect } from "react"
import TerminalEffect from "./TerminalEffect"

const IconHover = () => {
  const icons = {
    home: "/icons/home.svg",
    projects: "/icons/projects.svg",
    about: "/icons/about.svg",
    contact: "/icons/contact.svg",
  }

  // Items de navegacion
  const navItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "projects", label: "Projects", href: "/projects" },
    { key: "about", label: "About", href: "/about" },
    { key: "contact", label: "Contact", href: "/contact" },
  ]

  // Para manejar la lógica del icono que se muestra en la caja de la derecha
  const [activeIconKey, setActiveIconKey] = useState(null)
  const [iconOpacity, setIconOpacity] = useState(0)

  // Efecto para animar el blur del icono de la derecha
  useEffect(() => {
    if (activeIconKey) {
      setIconOpacity(0)
      const timer = setTimeout(() => {
        setIconOpacity(1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [activeIconKey])

  //Handlers que actualizan que icono esta activo
  const handleMouseEnter = useCallback((key) => {
    setActiveIconKey(key)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveIconKey(null)
  }, [])

  // Funcion para caluclar el blur basado en la opacidad
  const calcBlur = useCallback((opacity) => `${(1 - opacity) * 5}px`, [])

  return (
    <div className="relative bg-[url('/background.jpg')] bg-cover bg-center h-screen">
      {/* Lista de navegacion */}
      <div className="absolute top-4 left-4 md:top-16 md:left-16 w-1/3 md:w-1/4 h-auto md:h-1/2 bg-white/10 backdrop-blur-sm rounded-tl-4xl p-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
                className="group flex items-center justify-between w-full"
              >
                {/* Contenedor del texto y subrayado */}
                <span className="relative inline-block text-4xl md:text-6xl py-2 md:py-3">
                  {/* Texto que rota en hover */}
                  <span className="inline-block transition-transform duration-300 group-hover:rotate-3">
                    {item.label}
                  </span>
                  {/* Subrayado */}
                  <span className="absolute left-0 bottom-0 block h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </span>

                {/* Chevron a la derecha */}
                <img
                  src="/icons/chevron.svg"
                  alt="Chevron"
                  className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:-translate-x-10"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenedor del icono de la derecha */}
      <div className="absolute top-1/3 right-4 md:right-16 bottom-4 md:bottom-16 aspect-square bg-white/10 backdrop-blur-sm rounded-br-4xl p-4 flex items-center justify-center overflow-hidden">
        {/* Icono activo */}
        {activeIconKey && (
          <img
            src={icons[activeIconKey] || "/placeholder.svg"}
            alt={`${activeIconKey} icon`}
            className="absolute w-40 h-40 md:w-60 md:h-60 transition-all duration-500 ease-in-out"
            style={{
              opacity: iconOpacity,
              filter: `blur(${calcBlur(iconOpacity)})`,
            }}
          />
        )}

        {/* Efecto terminal si no hay icono */}
        {!activeIconKey && (
          <div className="w-full h-full flex items-end">
            <TerminalEffect />
          </div>
        )}
      </div>
    </div>
  )
}

export default IconHover

