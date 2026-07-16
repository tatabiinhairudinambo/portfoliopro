import { motion } from 'framer-motion'

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1, staggerDirection: 1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const formReveal = {
  hidden: { opacity: 0, x: -120, scale: 0.9, rotateY: 10, filter: 'blur(8px)', transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const infoReveal = {
  hidden: { opacity: 0, x: 120, scale: 0.9, rotateY: -10, filter: 'blur(8px)', transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const socialStagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, staggerDirection: 1 },
  },
}

const socialItem = {
  hidden: { opacity: 0, y: 20, scale: 0.5, transition: { duration: 0.2 } },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const socials = [
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Dribbble',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.815zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'GitHub',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Instagram',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    href: '#',
  },
]

const inputClass = "w-full px-4 md:px-5 py-3 md:py-4 bg-dark-200 border border-white/5 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(108,99,255,0.1)] transition-all duration-300"

export default function Contact({ active }) {
  return (
    <section id="contact" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        style={{ perspective: '1200px' }}
      >
        <motion.p variants={fadeUp} className="section-label">Contact</motion.p>
        <motion.h2 variants={fadeUp} className="section-title mb-6 md:mb-12">
          Let's create{' '}
          <span className="text-gradient">something great</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12">
          <motion.div variants={formReveal} className="md:col-span-3" style={{ transformStyle: 'preserve-3d' }}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 md:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <input type="text" placeholder="Your Name" className={inputClass} />
                <input type="email" placeholder="Your Email" className={inputClass} />
              </div>
              <input type="text" placeholder="Subject" className={inputClass} />
              <textarea rows={4} placeholder="Your Message" className={`${inputClass} resize-none`} />
              <button type="submit" className="btn-primary w-full justify-center text-sm">
                Kirim Pesan
              </button>
            </form>
          </motion.div>

          <motion.div variants={infoReveal} className="md:col-span-2 space-y-4 md:space-y-6" style={{ transformStyle: 'preserve-3d' }}>
            <div className="card p-5 md:p-8 space-y-4 md:space-y-6">
              <div>
                <h3 className="font-display text-xs md:text-sm font-semibold text-white/40 mb-1">Email</h3>
                <a href="mailto:tataambo913@gmail.com" className="text-white hover:text-accent transition-colors text-sm md:text-base">
                  tataambo913@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-display text-xs md:text-sm font-semibold text-white/40 mb-1">Location</h3>
                <p className="text-white/60 text-sm md:text-base">Cileungsi, Jawa Barat, Indonesia</p>
              </div>
              <div>
                <h3 className="font-display text-xs md:text-sm font-semibold text-white/40 mb-2 md:mb-3">Social</h3>
                <motion.div variants={socialStagger} initial="hidden" animate={active ? 'visible' : 'hidden'} className="flex gap-2.5 md:gap-3">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      variants={socialItem}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-dark-300 border border-white/5 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/30 hover:shadow-[0_0_20px_rgba(108,99,255,0.15)] transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="card p-5 md:p-8">
              <p className="text-white/30 text-xs md:text-sm leading-relaxed">
                Terbuka untuk proyek freelance dan peluang full-time.
                Saya biasanya merespon dalam 24 jam.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-8 md:mt-12 pt-5 md:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 text-white/20 text-[11px] md:text-xs"
        >
          <p>&copy; 2025 Developer Tatabiin Hairudin Ambo. All rights reserved.</p>
          <p>Designed & built with passion</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
