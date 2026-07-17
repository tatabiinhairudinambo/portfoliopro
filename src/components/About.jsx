import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollAnimation from './ScrollAnimation'

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1, staggerDirection: 1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const fromLeft = {
  hidden: { opacity: 0, x: -60, transition: { duration: 0.6 } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const fromRight = {
  hidden: { opacity: 0, x: 60, transition: { duration: 0.6 } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const mobileFromLeft = {
  hidden: { opacity: 0, x: -20, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const mobileFromRight = {
  hidden: { opacity: 0, x: 20, transition: { duration: 0.5 } },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const statFlip = (i) => ({
  hidden: { opacity: 0, y: 30, scale: 0.9, transition: { duration: 0.4 } },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

const stats = [
  { number: '6+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Happy Clients' },
  { number: '15+', label: 'Countries Reached' },
]

const row1Tags = [
  { label: 'Design Systems', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
  { label: 'UI/UX', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg> },
  { label: 'Frontend', color: 'bg-orange-500/10 border-orange-500/20 text-orange-400', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" /></svg> },
  { label: 'Prototyping', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg> },
  { label: 'Brand Identity', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H8v-2h.5zM16 8h-2v2h2V8zm-2 4h-2v2h2v-2zm4-4h-2v2h2v-2z" /></svg> },
]

const row2Tags = [
  { label: 'React / Next.js', color: 'bg-[#61DAFB]/10 border-[#61DAFB]/20 text-[#61DAFB]', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5" /><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2" cx="12" cy="12" /><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)" /><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)" /></g></svg> },
  { label: 'TypeScript', color: 'bg-[#3178C6]/10 border-[#3178C6]/20 text-[#3178C6]', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /></svg> },
  { label: 'Tailwind CSS', color: 'bg-[#06B6D4]/10 border-[#06B6D4]/20 text-[#06B6D4]', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.92 7.15 14.77 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.08 15 9.23 16.15 11.7 16.15c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.92 13.15 9.77 12 7 12z" /></svg> },
  { label: 'Framer Motion', color: 'bg-[#FF0055]/10 border-[#FF0055]/20 text-[#FF0055]', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8H12l8 8H12v8l-8-8V8L12 0z" /></svg> },
  { label: 'GSAP', color: 'bg-[#88CE02]/10 border-[#88CE02]/20 text-[#88CE02]', icon: <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg> },
]

export default function About({ active }) {
  const [isMobile, setIsMobile] = useState(false)
  const slides = ["/about.jpg", "/tarmizy.jpg", "/zulfakar.jpg", "/hidayat.jpg", "/tata.jpg"]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState('right')

  const nextSlide = () => {
    setSlideDirection('right')
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setSlideDirection('left')
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection('right')
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const leftAnim = isMobile ? mobileFromLeft : fromLeft
  const rightAnim = isMobile ? mobileFromRight : fromRight

  return (
    <ScrollAnimation id="about" className="section-panel" direction="up" duration={0.8}>
      <motion.div
        className="container-custom flex flex-col md:justify-center"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={fadeUp} className="flex flex-col w-full mb-6 md:mb-8">
          <p className="section-label !mb-2">About Me</p>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-12 lg:gap-16">
          <motion.div variants={leftAnim} className="space-y-3 md:space-y-5">
            <motion.div variants={fadeUp} className="mb-4 md:mb-8 flex flex-col items-start w-full relative pl-6">
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent bg-[length:100%_200%] opacity-80 rounded-full" style={{ animation: 'gradientRotateVertical 2s linear infinite' }}></div>
              <motion.h2 
                className="section-title mb-2 md:mb-3 flex flex-wrap"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="block w-full">
                  {"Desain & kode,".split(" ").map((word, i) => (
                    <motion.span 
                      key={`w1-${i}`}
                      custom={i}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: (idx) => ({ 
                          opacity: 1, x: 0, 
                          transition: { delay: 0.8 + (idx * 0.15), duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
                        })
                      }} 
                      className="inline-block mr-2 md:mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <span className="text-gradient block w-full mt-1">
                  {"seimbang sempurna.".split(" ").map((word, i) => (
                    <motion.span 
                      key={`w2-${i}`}
                      custom={i}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: (idx) => ({ 
                          opacity: 1, x: 0, 
                          transition: { delay: 0.8 + (idx * 0.15), duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
                        })
                      }} 
                      className="inline-block mr-2 md:mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </motion.h2>
            </motion.div>
            <p className="text-white/60 text-sm md:text-lg leading-relaxed">
              Saya Tatabiin Hairudin Ambo bersama <strong>Team Hydra Core Digitech</strong>, berfokus sebagai pengembang perangkat lunak dan desain digital. Kami memiliki spesialisasi dalam merancang aplikasi web yang tangguh, sistem informasi yang kompleks, serta perangkat lunak kustom yang menjembatani desain inovatif dengan arsitektur teknis yang kokoh.
            </p>
            <p className="text-white/60 text-sm md:text-lg leading-relaxed">
              Kami telah bermitra dengan beragam klien—mulai dari startup, UMKM, hingga perusahaan besar—untuk mengubah ide dan kebutuhan bisnis menjadi produk digital yang intuitif. Baik dalam mengembangkan dasbor admin yang komprehensif maupun integrasi API tingkat lanjut, tim kami berkomitmen penuh untuk mendorong efisiensi operasional bisnis Anda melalui teknologi.
            </p>
            <div className="md:hidden pt-2 space-y-1.5 overflow-hidden w-full max-w-[80vw] mx-auto">
              <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                  className="flex gap-2 w-max whitespace-nowrap"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                >
                  {[...row1Tags, ...row1Tags].map((tag, i) => (
                    <span key={`mob-r1-${i}`} className={`inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-medium border rounded-full ${tag.color}`}>
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                </motion.div>
              </div>
              <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                  className="flex gap-2 w-max whitespace-nowrap"
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                >
                  {[...row2Tags, ...row2Tags].map((tag, i) => (
                    <span key={`mob-r2-${i}`} className={`inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-medium border rounded-full ${tag.color}`}>
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="hidden md:block pt-2 space-y-2 overflow-hidden">
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                  className="flex gap-3 w-max"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                >
                  {[...row1Tags, ...row1Tags].map((tag, i) => (
                    <span key={`r1-${i}`} className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border rounded-full whitespace-nowrap ${tag.color}`}>
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                </motion.div>
              </div>
              <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                  className="flex gap-3 w-max"
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                >
                  {[...row2Tags, ...row2Tags].map((tag, i) => (
                    <span key={`r2-${i}`} className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border rounded-full whitespace-nowrap ${tag.color}`}>
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

          </motion.div>

          <motion.div variants={rightAnim} className="flex flex-col h-full mt-4 md:mt-0">

            <motion.div variants={fadeUp} className="flex flex-col items-center mb-4 md:mb-6">
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-display text-2xl md:text-3xl font-bold text-white text-center"
              >
                Team <span className="text-gradient">Hydra Core Digitech</span>
              </motion.h3>
              <div className="h-[2px] w-32 mt-3 bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] rounded-full opacity-80" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
            </motion.div>

            {/* Media Container */}
            <div className="w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                key={currentSlide}
                src={slides[currentSlide]}
                alt="About Me Slide"
                className={`w-full h-full object-contain ${slideDirection === 'right' ? 'animate-[slideInRight_0.5s_ease-out]' : 'animate-[slideInLeft_0.5s_ease-out]'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none z-0"></div>

              {/* Carousel Navigation Arrows Inside Image */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 md:px-4 z-10 pointer-events-none">
                <button onClick={prevSlide} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-dark/40 backdrop-blur-md flex items-center justify-center text-white hover:border-accent hover:bg-accent/40 transition-all pointer-events-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button onClick={nextSlide} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-dark/40 backdrop-blur-md flex items-center justify-center text-white hover:border-accent hover:bg-accent/40 transition-all pointer-events-auto">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Website Link */}
            <div className="mt-6 flex flex-col items-center">
              <a 
                href="https://hydracoredigitech.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(108,99,255,0.5)]"
              >
                Kunjungi Situs Kami
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <div className="h-[2px] w-40 mt-4 bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] rounded-full opacity-80" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
            </div>

            {/* Short Bio / Description */}
            <div className="mt-6 md:mt-8 text-center px-2">
              <p className="text-white/70 text-sm md:text-base leading-relaxed italic">
                "Menyatukan visi kreatif dan eksekusi teknis. Bersama tim ahli kami, saya berkomitmen untuk membangun pengalaman digital yang tidak hanya terlihat indah, tetapi juga berkinerja tinggi dan memberikan dampak nyata."
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ScrollAnimation>
  )
}
