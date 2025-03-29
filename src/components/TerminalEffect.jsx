"use client"

import { useState, useEffect, useRef } from "react"

const TerminalEffect = () => {
  const [lines, setLines] = useState([])
  const animationRefs = useRef([])
  const lineChangeRefs = useRef([])
  const numberOfLines = 5

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  // Funcion que genera un numero entre 500 y 1500 para el tiempo(ms) de cambio de caracteres
  const getRandomInterval = () => {
    return Math.floor(Math.random() * 1000) + 500
  }

  // Funcion que genera un numero entre 4000 y 6000 para el tiempo(ms) de cambio de largo de lineas
  const getRandomLineChangeInterval = () => {
    return Math.floor(Math.random() * 2000) + 4000
  }

  // Funcion que genera un numero entre 18 y 22 para la cantidad de caracteres de la linea
  const getRandomLength = () => {
    return Math.floor(Math.random() * 5) + 18
  }

  // Crea un objeto caracter con un valor (y tiempo de vida) aleatorio
  const createCharacter = () => ({
    value: getRandomChar(),
    nextChangeTime: getRandomInterval(),
  })

  // Inicializar la linea con un largo especifico
  const initializeLine = (length) => {
    return Array.from({ length }, () => createCharacter())
  }

  // Cambiar el largo de una linea espcifica
  const changeLineLength = (lineIndex, currentLines) => {
    const newLength = getRandomLength()
    const currentLine = currentLines[lineIndex]
    let newLine

    if (newLength > currentLine.length) {
      // Añadir caracteres
      const additionalChars = Array.from({ length: newLength - currentLine.length }, () => createCharacter())
      newLine = [...currentLine, ...additionalChars]
    } else if (newLength < currentLine.length) {
      // Eliminar caracteres
      newLine = currentLine.slice(0, newLength)
    } else {
      // Mismo largo, no necesita cambio
      newLine = currentLine
    }

    return newLine
  }

  // Animacion para un caracter especifico
  const setupCharacterAnimation = (lineIndex, charIndex) => {
    const interval = getRandomInterval()

    const timeout = setTimeout(() => {
      setLines((currentLines) => {
        // Asegurarse que el caracter y la linea existe
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

      // Configuracion de la animacion para este caracter
      setupCharacterAnimation(lineIndex, charIndex)
    }, interval)

    // Guardar la referencia en timeout
    if (!animationRefs.current[lineIndex]) {
      animationRefs.current[lineIndex] = []
    }
    animationRefs.current[lineIndex][charIndex] = timeout
  }

  // Configurar el cambio de largo de linea para una liena especifica
  const setupLineChange = (lineIndex) => {
    // Generar un intervalo aleatorio entre 2  3 segundos
    const interval = getRandomLineChangeInterval()

    // Crear un intervalo aleatorio que cambia solo el largo de linea
    const intervalId = setInterval(() => {
      setLines((currentLines) => {
        const newLines = [...currentLines]
        newLines[lineIndex] = changeLineLength(lineIndex, currentLines)
        return newLines
      })

      // Eliminar el intervalo acutar y configurar uno nuevo con una duracion aleatoria diferente
      clearInterval(lineChangeRefs.current[lineIndex])
      setupLineChange(lineIndex)
    }, interval)

    // Guardar la referencia del intervalo
    lineChangeRefs.current[lineIndex] = intervalId
  }

  useEffect(() => {
    // Inicializar las lineas con la longitud aleatorioa
    const initialLines = Array.from({ length: numberOfLines }, () => initializeLine(getRandomLength()))

    setLines(initialLines)
    animationRefs.current = Array(numberOfLines)
      .fill()
      .map(() => [])
    lineChangeRefs.current = Array(numberOfLines).fill(null)

    // Configuracion inicial de la animacion de los caracteres
    initialLines.forEach((line, lineIndex) => {
      line.forEach((_, charIndex) => {
        setupCharacterAnimation(lineIndex, charIndex)
      })
    })

    // Configurar cambios de linea individuales con diferentes intervalos
    for (let i = 0; i < numberOfLines; i++) {
      setupLineChange(i)
    }

    // Borrar al desmontar
    return () => {
      // Borar el timeout de la animacion de caracteres
      animationRefs.current.forEach((lineTimeouts) => lineTimeouts.forEach((timeout) => clearTimeout(timeout)))

      // Borrar todos los intervalos de cambio de liena
      lineChangeRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval)
      })
    }
  }, [])

  // Configurar nuvas animaciones de caracteres cuando la liena cambia
  useEffect(() => {
    // Para cada liena, revisa si no hay nuevos caracteres que necesitan ser animados
    lines.forEach((line, lineIndex) => {
      line.forEach((char, charIndex) => {
        // Si este caracter no tiene animacion, configura una
        if (!animationRefs.current[lineIndex] || !animationRefs.current[lineIndex][charIndex]) {
          setupCharacterAnimation(lineIndex, charIndex)
        }
      })
    })
  }, [lines])

  return (
    <div className="text-4xl text-right w-full select-none">
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

