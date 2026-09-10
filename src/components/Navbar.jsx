import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems, site } from '../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-[220] transition-colors duration-[220ms] ${
        scrolled ? 'bg-[#080808] border-b border-[#232323]' : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between min-h-[66px] md:min-h-[72px]">
        <Link
          to="/home"
          onClick={() => setOpen(false)}
          className="font-display text-[16px] font-medium tracking-tight text-[var(--text)] !text-[var(--text)]"
        >
          {site.shortName}
          <span className="text-[var(--muted)]">.</span>
        </Link>

        <div className="header-main-nav hidden lg:flex items-center gap-4 min-[900px]:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-[16px] transition-colors duration-[150ms] ${
                  isActive ? 'text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link to="/contact" onClick={() => setOpen(false)} className="hidden lg:inline-flex btn-primary">
          Let’s talk
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden w-8 h-11 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-[var(--text)]" />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px bg-[var(--text)]" />
          <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-6 h-px bg-[var(--text)]" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#080808] border-t border-[#232323] z-40"
          >
            <div className="container-page py-5 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left px-3 py-3 text-[16px] ${
                      isActive ? 'text-[var(--text)]' : 'text-[var(--muted)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full mt-2 block text-center">
                Let’s talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}