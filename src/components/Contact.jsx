import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollAnimation from './ScrollAnimation'

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
  hidden: { opacity: 0, x: -120, scale: 0.9, rotateY: 10, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const infoReveal = {
  hidden: { opacity: 0, x: 120, scale: 0.9, rotateY: -10, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
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
    name: 'TikTok',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.02c-.01 1.64-.26 3.27-1.14 4.66-1.55 2.4-4.52 3.65-7.29 3.04-3.05-.67-5.32-3.3-5.46-6.42-.14-2.87 1.64-5.63 4.38-6.52 1.34-.44 2.83-.43 4.16-.03v4.11c-.55-.26-1.19-.36-1.78-.23-.88.19-1.52 1.05-1.44 1.95.07.72.6 1.39 1.3 1.56.91.22 1.91-.12 2.37-.93.31-.56.45-1.22.45-1.86v-14.47z" />
      </svg>
    ),
    href: 'https://www.tiktok.com/@tatabiin.h.al.h.ambo',
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
    href: 'https://github.com/tatabiinhairudinambo',
  },
  {
    name: 'Instagram',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    href: 'https://www.instagram.com/attasjah_/',
  },
]

const inputClass = "w-full px-4 md:px-5 py-3 md:py-4 bg-dark-200 border border-white/5 rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-accent/50 focus:shadow-[0_0_20px_rgba(108,99,255,0.1)] transition-all duration-300"

export default function Contact({ active }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const text = `Halo, saya ${name} (${email}).\n\nSubjek: ${subject}\n\nPesan:\n${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/6282213840415?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <ScrollAnimation id="contact" className="section-panel" direction="up" duration={0.8}>
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
        style={{ perspective: '1200px' }}
      >
        <motion.div variants={fadeUp} className="flex flex-col w-full mb-6 md:mb-12">
          <p className="section-label !mb-2">Contact</p>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
        </motion.div>
        <div className="relative pl-6 mb-6 md:mb-12">
          <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent bg-[length:100%_200%] opacity-80 rounded-full" style={{ animation: 'gradientRotateVertical 2s linear infinite' }}></div>
          <motion.h2 variants={fadeUp} className="section-title !mb-0">
            Mari ciptakan{' '}
            <span className="text-gradient">karya yang hebat</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12">
          <motion.div variants={formReveal} className="md:col-span-3" style={{ transformStyle: 'preserve-3d' }}>
            <form onSubmit={handleSendWhatsApp} className="space-y-3 md:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="relative hover-running-border rounded-xl">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={inputClass} required />
                </div>
                <div className="relative hover-running-border rounded-xl">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className={inputClass} required />
                </div>
              </div>
              <div className="relative hover-running-border rounded-xl">
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className={inputClass} required />
              </div>
              <div className="relative hover-running-border rounded-xl">
                <textarea rows={4} name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className={`${inputClass} resize-none`} required />
              </div>
              <button type="submit" className="relative hover-running-border btn-primary w-full justify-center text-sm rounded-xl">
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
                <p className="text-white text-sm md:text-base">Cileungsi, Jawa Barat, Indonesia</p>
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

          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="relative mt-8 md:mt-12 pt-5 md:pt-6 pb-4 border-t border-white/5 flex flex-col items-center justify-center text-white/20 text-[11px] md:text-xs text-center"
        >
          <p className="text-white/40 text-xs md:text-sm leading-relaxed italic mb-4 max-w-lg">
            "Terbuka untuk proyek freelance dan peluang full-time. Saya biasanya merespon dalam 24 jam."
          </p>
          <p>&copy; 2026 mari bergabung bersama saya by developer tatabiin hairudin ambo</p>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
        </motion.div>
      </motion.div>
    </ScrollAnimation>
  )
}
