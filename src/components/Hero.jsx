import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import RotatingText from './RotatingText'
import ParallaxSection from './ParallaxSection'
import { site } from '../data/site'
import { ease, stagger } from '../lib/motion'

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.22, ease },
  }),
}

function HeroName() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30])
  const y3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 0])

  return (
    <>
      <motion.span style={{ y: y1 }} className="hero-line hero-line--1">Tatabiin</motion.span>
      <motion.span style={{ y: y2 }} className="hero-line hero-line--2">Hairudin</motion.span>
      <motion.span style={{ y: y3 }} className="hero-line hero-line--3">Ambo</motion.span>
    </>
  )
}

export default function Hero() {
  return (
    <ParallaxSection id="hero" className="hero-section">
      <div className="container-page">
        <motion.p
          custom={0}
          variants={item}
          initial="hidden"
          animate="visible"
          className="section-label text-center mb-2"
        >
          {site.location}
        </motion.p>

        <div className="hero-weave">
          <div className="hero-weave-stage">
            <h1 className="hero-weave-heading" aria-label="Tatabiin Hairudin Ambo">
              <HeroName />
            </h1>

            <img
              src="/hero.png"
              alt="Tatabiin Hairudin Ambo"
              className="hero-weave-photo"
              draggable="false"
              decoding="async"
            />

            <div className="hero-weave-heading hero-weave-heading--front" aria-hidden="true">
              <HeroName />
            </div>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-2 flex flex-col items-center text-center"
        >
          <motion.div custom={2} variants={item} className="min-h-[26px] text-[15px] leading-snug text-[var(--muted)]">
            <RotatingText
              texts={site.roles}
              classNames={['text-[var(--text)]', 'text-[var(--muted)]', 'text-[var(--link)]', 'text-[var(--text)]']}
              mainClassName="justify-center overflow-hidden"
              staggerFrom="last"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden"
              transition={{ duration: 0.22, ease }}
              rotationInterval={4400}
              splitBy="lines"
            />
          </motion.div>
          <motion.p custom={3} variants={item} className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--muted)]">
            Desain & kode, seimbang sempurna — membangun produk digital yang jelas dan berguna.
          </motion.p>
          <motion.div custom={4} variants={item} className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/work" className="btn-primary">
              Lihat karya
            </Link>
            <Link to="/contact" className="btn-outline">
              Hubungi saya
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
