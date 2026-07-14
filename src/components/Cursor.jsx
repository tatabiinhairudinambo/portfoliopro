import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef(null)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const isHovering = useRef(false)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice()) return

    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleHoverStart = () => {
      isHovering.current = true
      document.body.style.cursor = 'none'
    }

    const handleHoverEnd = () => {
      isHovering.current = false
      document.body.style.cursor = ''
    }

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, [role="button"], .card, .btn-primary, .btn-outline')
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    document.addEventListener('mousemove', moveCursor)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="w-full h-full rounded-full border border-accent/50 bg-accent/10 backdrop-blur-sm transition-all duration-200" />
    </motion.div>
  )
}
