import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useHorizontalScroll } from './hooks/useHorizontalScroll'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import ScrollIndicator from './components/ScrollIndicator'
import BackToTop from './components/BackToTop'
import Cursor from './components/Cursor'

function App() {
  const { containerRef, activeIndex, scrollTo, isMobile, sectionIds } = useHorizontalScroll()
  const [visibleSections, setVisibleSections] = useState({})

  useEffect(() => {
    setVisibleSections((prev) => ({ ...prev, [sectionIds[0]]: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isMobile) return
    setVisibleSections((prev) => ({
      ...prev,
      [sectionIds[activeIndex]]: true,
    }))
    if (activeIndex > 0) {
      setVisibleSections((prev) => ({
        ...prev,
        [sectionIds[activeIndex - 1]]: true,
      }))
    }
    if (activeIndex < sectionIds.length - 1) {
      setVisibleSections((prev) => ({
        ...prev,
        [sectionIds[activeIndex + 1]]: true,
      }))
    }
  }, [activeIndex, isMobile, sectionIds])

  return (
    <div className="relative">
      <Cursor />
      <ScrollIndicator activeIndex={activeIndex} scrollTo={scrollTo} sections={sectionIds} />
      <BackToTop scrollTo={scrollTo} />

      {isMobile ? (
        <MobileLayout
          sectionIds={sectionIds}
          scrollTo={scrollTo}
        />
      ) : (
        <div
          ref={containerRef}
          className="flex overflow-x-hidden h-screen w-screen snap-x snap-mandatory"
        >
          <Hero scrollTo={scrollTo} />
          <About active={visibleSections['about']} />
          <Skills active={visibleSections['skills']} />
          <Portfolio active={visibleSections['portfolio']} />
          <Experience active={visibleSections['experience']} />
          <Testimonials active={visibleSections['testimonials']} />
          <Contact active={visibleSections['contact']} />
        </div>
      )}
    </div>
  )
}

const deckConfig = [
  { rotateX: 22, y: 110, scale: 0.78, rotateZ: -2.5 },
  { rotateX: 17, y: 85, scale: 0.82, rotateZ: 2 },
  { rotateX: 12, y: 65, scale: 0.86, rotateZ: -1.5 },
  { rotateX: 8, y: 50, scale: 0.90, rotateZ: 1 },
  { rotateX: 14, y: 75, scale: 0.84, rotateZ: -2 },
  { rotateX: 20, y: 95, scale: 0.80, rotateZ: 1.5 },
  { rotateX: 10, y: 60, scale: 0.88, rotateZ: -1 },
]

function MobileLayout({ sectionIds, scrollTo }) {
  const sectionRefs = useRef({})
  const [mobileActive, setMobileActive] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMobileActive((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.12 }
    )

    const current = sectionRefs.current
    sectionIds.forEach((id) => {
      if (current[id]) observer.observe(current[id])
    })

    return () => observer.disconnect()
  }, [sectionIds])

  const sections = [
    { id: 'hero', Comp: Hero, props: { scrollTo } },
    { id: 'about', Comp: About },
    { id: 'skills', Comp: Skills },
    { id: 'portfolio', Comp: Portfolio },
    { id: 'experience', Comp: Experience },
    { id: 'testimonials', Comp: Testimonials },
    { id: 'contact', Comp: Contact },
  ]

  return (
    <div className="w-full bg-dark" style={{ perspective: '1400px' }}>
      {sections.map(({ id, Comp, props }, index) => {
        const cfg = deckConfig[index]
        return (
          <div
            key={id}
            ref={(el) => (sectionRefs.current[id] = el)}
            id={id}
            className="relative"
            style={{ zIndex: sections.length - index }}
          >
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: cfg.y,
                  rotateX: cfg.rotateX,
                  rotateZ: cfg.rotateZ,
                  scale: cfg.scale,
                  filter: 'blur(8px)',
                  transition: { duration: 0.45, ease: 'easeIn' },
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  rotateZ: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: {
                    duration: 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.04,
                  },
                },
              }}
              initial="hidden"
              animate={mobileActive[id] ? 'visible' : 'hidden'}
              style={{ transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
            >
              <Comp active={!!mobileActive[id]} {...props} />
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

export default App
