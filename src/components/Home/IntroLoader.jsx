"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const letters = "FERRO".split("")

const IntroLoader = ({ onFinish = () => { } }) => {
  const [phase, setPhase] = useState(0)
  const [show, setShow] = useState(true)
  const [laserVisible, setLaserVisible] = useState(false)
  const [laserLine, setLaserLine] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  })

  const BOX_WIDTH = 700
  const BOX_HEIGHT = 100
  const MAX_LASER_LENGTH = 60
  const LASER_DURATION = 3.2

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 2500),

      setTimeout(() => {
        setLaserVisible(true)

        const segments = [
          { x1: 0, y1: 0, x2: BOX_WIDTH, y2: 0, length: BOX_WIDTH },
          { x1: BOX_WIDTH, y1: 0, x2: BOX_WIDTH, y2: BOX_HEIGHT, length: BOX_HEIGHT },
          { x1: BOX_WIDTH, y1: BOX_HEIGHT, x2: 0, y2: BOX_HEIGHT, length: BOX_WIDTH },
          { x1: 0, y1: BOX_HEIGHT, x2: 0, y2: 0, length: BOX_HEIGHT },
        ]

        const perimeter = 2 * (BOX_WIDTH + BOX_HEIGHT)
        const totalSteps = 240
        const interval = (LASER_DURATION * 1000) / totalSteps

        const segmentStepsArray = segments.map(s =>
          Math.floor((s.length / perimeter) * totalSteps)
        )

        let current = 0
        let t = 0
        let stepInSegment = 0
        const runner = setInterval(() => {
          const segment = segments[current]
          const stepsInThisSegment = segmentStepsArray[current]
          const localT = stepInSegment / stepsInThisSegment

          const x = segment.x1 + (segment.x2 - segment.x1) * localT
          const y = segment.y1 + (segment.y2 - segment.y1) * localT

          const dx = segment.x2 - segment.x1
          const dy = segment.y2 - segment.y1
          const len = Math.sqrt(dx * dx + dy * dy)

          const laserLen =
            t < 20
              ? (MAX_LASER_LENGTH * t) / 20
              : t > totalSteps - 20
                ? (MAX_LASER_LENGTH * (totalSteps - t)) / 20
                : MAX_LASER_LENGTH

          const nx = (dx / len) * laserLen
          const ny = (dy / len) * laserLen

          setLaserLine({
            x1: x - nx / 2,
            y1: y - ny / 2,
            x2: x + nx / 2,
            y2: y + ny / 2,
          })

          t++
          stepInSegment++

          if (stepInSegment >= stepsInThisSegment && current < segments.length - 1) {
            current++
            stepInSegment = 0
          }

          if (t >= totalSteps) {
            clearInterval(runner)
            setLaserVisible(false)
          }
        }, interval)

      }, 2600),

      setTimeout(() => setPhase(3), 2600 + LASER_DURATION * 1000 + 500),
      setTimeout(() => {
        setShow(false)
        onFinish()
      }, 2600 + LASER_DURATION * 1000 + 1600),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onFinish])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 1.2 },
          }}
        >
          <div className="relative flex items-center justify-center w-[600px] h-[80px]">
            {/* LÁSER */}
            {phase >= 2 && laserVisible && (
              <svg
                width={BOX_WIDTH}
                height={BOX_HEIGHT}
                viewBox={`0 0 ${BOX_WIDTH} ${BOX_HEIGHT}`}
                className="absolute"
              >
                <motion.line
                  x1={laserLine.x1}
                  y1={laserLine.y1}
                  x2={laserLine.x2}
                  y2={laserLine.y2}
                  stroke="#da4d4d"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 10px #da4d4d)" }}
                />
              </svg>
            )}

            {/* TEXTO */}
            <motion.div
              className="text-white text-4xl md:text-6xl flex items-center justify-end px-4 py-2 w-full h-full"
              animate={
                phase === 3
                  ? { opacity: 0, filter: "blur(4px)" }
                  : { opacity: 1, filter: "blur(0px)" }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* SANTIAGO */}
              <div className="w-[calc(8ch+1rem)] flex items-center h-full">
                {phase >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: -65 }}
                    transition={{ duration: 1 }}
                    className="flex items-center h-full"
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

              {/* FERRO */}
              <div
                className="flex gap-1"
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
