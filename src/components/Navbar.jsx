import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home', section: 'hero' },
  { label: 'About', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Portfolio', section: 'portfolio' },
  { label: 'Experience', section: 'experience' },
  { label: 'Contact', section: 'contact' },
]

export default function Navbar({ activeIndex, scrollTo, isMobile }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  useEffect(() => {
    setIsOpen(false)
  }, [activeIndex])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isMobile ? 'glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-end h-16 md:h-20">

          {isMobile ? (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-white rounded-full"
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-full left-0 right-0 glass border-t border-white/5"
                  >
                    <div className="px-6 py-6 space-y-1">
                      {NAV_ITEMS.map((item, i) => (
                        <button
                          key={item.section}
                          onClick={() => scrollTo(i)}
                          className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                            activeIndex === i
                              ? 'bg-accent/10 text-accent'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="text-accent/60 text-xs mr-2">0{i + 1}</span>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.section}
                  onClick={() => scrollTo(i)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeIndex === i
                      ? 'text-accent bg-accent/10'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {activeIndex === i && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-accent/10 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
