"use client"

import { useState, useEffect, useRef } from "react"

const TerminalEffect = () => {
  const [lines, setLines] = useState([])
  const animationRefs = useRef([])
  const lineChangeRefs = useRef([]) // Array to store multiple interval references
  const numberOfLines = 5

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const getRandomInterval = () => {
    // Generate random intervals between 100ms and 800ms for character changes
    return Math.floor(Math.random() * 700) + 100
  }

  const getRandomLineChangeInterval = () => {
    // Generate random intervals between 2000ms and 3000ms for line length changes
    return Math.floor(Math.random() * 1000) + 2000
  }

  const getRandomLength = () => {
    // Generate random length between 18 and 22
    return Math.floor(Math.random() * 5) + 18
  }

  // Create a character object with random value and change time
  const createCharacter = () => ({
    value: getRandomChar(),
    nextChangeTime: getRandomInterval(),
  })

  // Initialize a line with a specific length
  const initializeLine = (length) => {
    return Array.from({ length }, () => createCharacter())
  }

  // Change the length of a specific line
  const changeLineLength = (lineIndex, currentLines) => {
    const newLength = getRandomLength()
    const currentLine = currentLines[lineIndex]
    let newLine

    if (newLength > currentLine.length) {
      // Add new characters
      const additionalChars = Array.from({ length: newLength - currentLine.length }, () => createCharacter())
      newLine = [...currentLine, ...additionalChars]
    } else if (newLength < currentLine.length) {
      // Remove characters
      newLine = currentLine.slice(0, newLength)
    } else {
      // Same length, no change needed
      newLine = currentLine
    }

    return newLine
  }

  // Setup animation for a specific character
  const setupCharacterAnimation = (lineIndex, charIndex) => {
    const interval = getRandomInterval()

    const timeout = setTimeout(() => {
      setLines((currentLines) => {
        // Make sure the line and character still exist
        if (!currentLines[lineIndex] || !currentLines[lineIndex][charIndex]) {
          return currentLines
        }

        const newLines = [...currentLines]
        newLines[lineIndex] = [...newLines[lineIndex]]
        newLines[lineIndex][charIndex] = {
          value: getRandomChar(),
          nextChangeTime: interval,
        }
        return newLines
      })

      // Setup the next animation for this character
      setupCharacterAnimation(lineIndex, charIndex)
    }, interval)

    // Store the timeout reference
    if (!animationRefs.current[lineIndex]) {
      animationRefs.current[lineIndex] = []
    }
    animationRefs.current[lineIndex][charIndex] = timeout
  }

  // Setup line length change for a specific line
  const setupLineChange = (lineIndex) => {
    // Generate a random interval between 2-3 seconds
    const interval = getRandomLineChangeInterval()

    // Create an interval that changes just this line's length
    const intervalId = setInterval(() => {
      setLines((currentLines) => {
        const newLines = [...currentLines]
        newLines[lineIndex] = changeLineLength(lineIndex, currentLines)
        return newLines
      })

      // Clear the current interval and set up a new one with a different random duration
      clearInterval(lineChangeRefs.current[lineIndex])
      setupLineChange(lineIndex)
    }, interval)

    // Store the interval reference
    lineChangeRefs.current[lineIndex] = intervalId
  }

  useEffect(() => {
    // Initialize lines with random lengths
    const initialLines = Array.from({ length: numberOfLines }, () => initializeLine(getRandomLength()))

    setLines(initialLines)
    animationRefs.current = Array(numberOfLines)
      .fill()
      .map(() => [])
    lineChangeRefs.current = Array(numberOfLines).fill(null)

    // Setup initial character animations
    initialLines.forEach((line, lineIndex) => {
      line.forEach((_, charIndex) => {
        setupCharacterAnimation(lineIndex, charIndex)
      })
    })

    // Setup individual line length changes with different intervals
    for (let i = 0; i < numberOfLines; i++) {
      setupLineChange(i)
    }

    // Cleanup on unmount
    return () => {
      // Clear character animation timeouts
      animationRefs.current.forEach((lineTimeouts) => lineTimeouts.forEach((timeout) => clearTimeout(timeout)))

      // Clear all line change intervals
      lineChangeRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval)
      })
    }
  }, [])

  // Setup new character animations when lines change
  useEffect(() => {
    // For each line, check if there are new characters that need animations
    lines.forEach((line, lineIndex) => {
      line.forEach((char, charIndex) => {
        // If this character doesn't have an animation yet, set one up
        if (!animationRefs.current[lineIndex] || !animationRefs.current[lineIndex][charIndex]) {
          setupCharacterAnimation(lineIndex, charIndex)
        }
      })
    })
  }, [lines])

  return (
    <div className="text-4xl text-right w-full">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="whitespace-pre">
          {line.map((char, charIndex) => (
            <span key={`${lineIndex}-${charIndex}`}>{char.value}</span>
          ))}
          {lineIndex === lines.length - 1 && <span className="animate-blink">|</span>}
        </div>
      ))}
    </div>
  )
}

export default TerminalEffect

