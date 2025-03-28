import React, { useState } from "react";

const IconHover = () => {
  const icons = {
    home: "/icons/home.svg",
    projects: "/icons/projects.svg",
    about: "/icons/about.svg",
    contact: "/icons/contact.svg",
  };

  const [activeIcon, setActiveIcon] = useState(null);
  const [prevIcon, setPrevIcon] = useState(null);
  const [activeOpacity, setActiveOpacity] = useState(0);
  const [prevOpacity, setPrevOpacity] = useState(0);

  const handleMouseEnter = (key) => {
    // Si ya hay un ícono activo, lo dejamos como previo para que se desvanezca
    if (activeIcon && activeIcon !== key) {
      setPrevIcon(activeIcon);
      setPrevOpacity(1);
    }
    // Establecemos el nuevo ícono activo y reiniciamos su opacidad
    setActiveIcon(key);
    setActiveOpacity(0);
    // Activamos el fade in con un pequeño delay para disparar la transición
    setTimeout(() => {
      setActiveOpacity(1);
    }, 50);
  };

  const handleMouseLeave = () => {
    // Al salir, queremos desvanecer el ícono activo, dejándolo como previo
    if (activeIcon) {
      setPrevIcon(activeIcon);
      setPrevOpacity(1);
      setActiveIcon(null);
      // El fade out se dispara al poner la opacidad a 0
      setPrevOpacity(0);
    }
  };

  // onTransitionEnd se usará para limpiar el prevIcon al terminar la animación de salida
  const handleTransitionEnd = () => {
    setPrevIcon(null);
  };

  // Función para calcular el blur: cuanto menor la opacidad, mayor el blur (por ejemplo, de 5px a 0px)
  const calcBlur = (opacity) => `${(1 - opacity) * 5}px`;

  return (
    <div className="relative bg-[url('/background.jpg')] bg-cover bg-center h-screen">
        {/* Lista de navegación */}
        <div className="absolute top-15 left-15 w-1/4 h-1/2 bg-white/10 rounded pl-10 content-center">
          <ul className="space-y-6 text-6xl">
            <li onMouseEnter={() => handleMouseEnter("home")} onMouseLeave={handleMouseLeave}>
              <a className="hover:underline" href="/">Home</a>
            </li>
            <li onMouseEnter={() => handleMouseEnter("projects")} onMouseLeave={handleMouseLeave}>
              <a className="hover:underline" href="/projects">Projects</a>
            </li>
            <li onMouseEnter={() => handleMouseEnter("about")} onMouseLeave={handleMouseLeave}>
              <a className="hover:underline" href="/about">About</a>
            </li>
            <li onMouseEnter={() => handleMouseEnter("contact")} onMouseLeave={handleMouseLeave}>
              <a className="hover:underline" href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contenedor para los íconos, con imágenes superpuestas */}
        <div className="absolute top-1/3 right-15 bottom-15 aspect-square bg-white/10 rounded px-4 py-2 flex items-center justify-center">
          {prevIcon && (
            <img
              src={icons[prevIcon]}
              alt={`${prevIcon} icon`}
              style={{
                opacity: prevOpacity,
                filter: `blur(${calcBlur(prevOpacity)})`,
                transition: "opacity 500ms ease-in-out, filter 500ms ease-in-out",
              }}
              // Cuando termina la transición del ícono previo, lo eliminamos
              onTransitionEnd={handleTransitionEnd}
              className="absolute w-60 h-60"
            />
          )}
          {activeIcon && (
            <img
              src={icons[activeIcon]}
              alt={`${activeIcon} icon`}
              style={{
                opacity: activeOpacity,
                filter: `blur(${calcBlur(activeOpacity)})`,
                transition: "opacity 500ms ease-in-out, filter 500ms ease-in-out",
              }}
              className="absolute w-60 h-60"
            />
          )}
        </div>
    </div>
  );
};

export default IconHover;
