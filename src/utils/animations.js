"use client"

import { useEffect } from "react"
import { useAnimation } from "framer-motion"

export const useFormAnimation = () => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }
}

