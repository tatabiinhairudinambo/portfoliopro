import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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



const mobileSectionAnims = [
  { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } },
  { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } },
  { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } },
  { hidden: { opacity: 0, y: 40, rotateX: 8 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } } },
  { hidden: { opacity: 0, x: -40, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } },
  { hidden: { opacity: 0, scale: 0.92, y: 30 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } },
  { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } },
]

function PortfolioApp() {
  const { containerRef, activeIndex, scrollTo, isMobile, sectionIds } = useHorizontalScroll()
  const [visibleSections, setVisibleSections] = useState({})

  useEffect(() => {
    setVisibleSections((prev) => ({ ...prev, [sectionIds[0]]: true }))
  }, [sectionIds])

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
        <MobileLayout sectionIds={sectionIds} scrollTo={scrollTo} />
      ) : (
        <div
          ref={containerRef}
          className="flex overflow-x-hidden h-screen w-screen snap-x snap-mandatory"
        >
          <Hero scrollTo={scrollTo} />
          <About active={visibleSections['about']} />
          <Experience active={visibleSections['experience']} />
          <Portfolio active={visibleSections['portfolio']} />
          <Skills active={visibleSections['skills']} />
          <Testimonials active={visibleSections['testimonials']} />
          <Contact active={visibleSections['contact']} />
        </div>
      )}
    </div>
  )
}

function MobileLayout({ sectionIds, scrollTo }) {
  const sections = [
    { id: 'hero', Comp: Hero, props: { scrollTo } },
    { id: 'about', Comp: About },
    { id: 'experience', Comp: Experience },
    { id: 'portfolio', Comp: Portfolio },
    { id: 'skills', Comp: Skills },
    { id: 'testimonials', Comp: Testimonials },
    { id: 'contact', Comp: Contact },
  ]

  return (
    <div className="w-full bg-dark">
      {sections.map(({ id, Comp, props }, index) => (
        <motion.div
          key={id}
          id={id}
          variants={mobileSectionAnims[index]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative"
        >
          <Comp active={true} {...props} />
        </motion.div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public Portfolio Route */}
      <Route path="/" element={<PortfolioApp />} />

    </Routes>
  )
}
