import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxSection({ id, className = '', children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -36])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0.45, 0.45, 0])
  const rail = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section id={id} ref={ref} className={`section ${className}`}>
      <motion.div aria-hidden className="parallax-follow" style={{ y, opacity }} />
      <motion.div aria-hidden className="parallax-rail" style={{ opacity }}>
        <motion.span className="parallax-rail-fill" style={{ scaleY: rail }} />
      </motion.div>
      <div className="relative z-[3] w-full">{children}</div>
    </section>
  )
}
