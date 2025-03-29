"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const letters = "FERRO".split("")

const IntroLoader = ({ onFinish = () => { } }) => {
  const [phase, setPhase] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 2700),
      setTimeout(() => setPhase(3), 4200),
      setTimeout(() => {
        setShow(false)
        onFinish()
      }, 4800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50"
          initial={{ opacity: 1, filter: "blur(0px)", backgroundColor: "#000" }}
          exit={{
            zIndex: 50,
            opacity: 0,
            filter: "blur(10px)",
            transition: {
              duration: 1.2,
              ease: "easeInOut",
            },
          }}
        >
          {/* Container centrado que tiene el ancho del nombre completo */}
          <div className="flex justify-center items-center">
            {/* Contenedor interno con espacio reservado para SANTIAGO */}
            <motion.div
              className="text-white text-4xl md:text-6xl flex items-center justify-end"
              animate={phase === 3 ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Espacio reservado para SANTIAGO */}
              <div className="w-[calc(8ch+1rem)] flex items-center h-full">
                {/* SANTIAGO animation - fuente fina y elegante */}
                {phase === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: -65 }}
                    transition={{ duration: 1 }}
                    className="flex items-center h-full font-santiago tracking-wide"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 100,
                      letterSpacing: "0.05em",
                    }}
                  >
                    SANTIAGO
                  </motion.div>
                )}
              </div>

              {/* FERRO animation - fuente extra bold e impactante */}
              <div
                className="flex gap-1 font-ferro"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 900,
                }}
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{
                      opacity: 0,
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      rotate: Math.random() * 360,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                      transition: {
                        duration: 1,
                        delay: i * 0.05,
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default IntroLoader

