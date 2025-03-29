"use client"

import { useEffect, useState } from "react"
import LinesBackground from "./LinesBackground"
import IconHover from "./IconHover"
import IntroLoader from "./IntroLoader"
import { motion, AnimatePresence } from "framer-motion"

const MainContent = () => {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroLoader onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          className="relative w-full h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <LinesBackground />
          <IconHover />
        </motion.div>
      )}
    </>
  )
}

export default MainContent

