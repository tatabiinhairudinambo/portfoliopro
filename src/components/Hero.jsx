import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const nameTop = {
  hidden: { y: '-120%', rotateX: -20, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const slideLeft = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const nameBottom = {
  hidden: { y: '120%', rotateX: 20, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const nameRight = {
  hidden: { x: '120%', rotateZ: 5, opacity: 0 },
  visible: {
    x: 0,
    rotateZ: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const photoReveal = {
  hidden: { opacity: 0, x: 120, scale: 0.7, rotateY: 40 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const SocialIcons = () => (
  <div className="flex items-center justify-around w-full max-w-[70%] mb-2.5 z-20">
    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-all pointer-events-auto" style={{ filter: 'drop-shadow(1.5px 1.5px 0px #fe2c55) drop-shadow(-1.5px -1.5px 0px #25f4ee)' }}>
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.39-2.92 5.71-1.74 1.28-4.04 1.72-6.14 1.16-2.11-.53-3.83-2.01-4.73-3.95-.91-1.92-1-4.17-.22-6.14.77-1.96 2.37-3.48 4.35-4.18 1.95-.7 4.15-.65 6.03.18.01 1.48-.01 2.97.02 4.45-1.02-.45-2.2-.55-3.26-.26-1.07.28-1.99.98-2.51 1.95-.53.96-.64 2.13-.3 3.17.34 1.05 1.14 1.89 2.17 2.27 1.05.38 2.25.32 3.25-.18 1-.5 1.73-1.41 1.97-2.5.07-.33.1-.67.1-1.01-.01-5.75-.01-11.49.02-17.24z"/></svg>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all pointer-events-auto">
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="url(#ig-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all pointer-events-auto">
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none">
        <rect x="2" y="2" width="20" height="20" fill="white" />
        <path fill="#0A66C2" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    </a>
  </div>
)

export default function Hero({ scrollTo }) {


  return (
    <motion.section id="hero" className="section-panel relative overflow-hidden bg-dark flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >

      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '1.5s' }} />
      </div>



      {/* Layer 1: Solid Text (Background) */}
      <div className="absolute inset-0 flex items-center justify-center mb-[75vh] md:mb-[65vh] z-10 pointer-events-none select-none overflow-hidden">
        <motion.h1
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-[18vw] md:text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap text-center w-full"
        >
          <span className="text-white/5">PORT</span><span className="text-blue-500/10">FOLIO</span>
        </motion.h1>
      </div>

      {/* Layer 2 - Centered Image */}
      <motion.div
        variants={photoReveal}
        animate="visible"
        className="relative flex flex-col items-center justify-center z-40 pointer-events-none mt-16 md:mt-0 md:pr-10 lg:pr-0 [@media(max-height:800px)]:scale-90 [@media(max-height:650px)]:scale-75 [@media(max-height:500px)]:scale-50 origin-center transition-transform"
      >
        <motion.div
          className="relative flex flex-col items-center pointer-events-auto -mt-8 md:-mt-24 cursor-pointer"
          style={{ transformOrigin: 'top center' }}
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          {/* The 3D Flipping Container (Strings + Clip + Card) */}
          <div className="relative w-44 sm:w-56 md:w-72 lg:w-80 perspective-[1000px] z-10 flex flex-col items-center">
            <motion.div
              className="w-full relative flex flex-col items-center"
              animate={{ rotateY: [0, 180, 180, 0, 0] }}
              transition={{ repeat: Infinity, duration: 10, times: [0, 0.1, 0.5, 0.6, 1], ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* The Strings */}
              <div className="relative w-10 md:w-20 h-10 md:h-20 flex justify-center z-0 pointer-events-none" style={{ transform: 'translateZ(-2px)' }}>
                <div className="absolute -top-8 left-1 md:left-2 w-1 md:w-1.5 h-20 md:h-40 bg-[#1a1a1a] origin-top-left -rotate-[15deg] shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] rounded-full z-0"></div>
                <div className="absolute -top-8 right-1 md:right-2 w-1 md:w-1.5 h-20 md:h-40 bg-[#1a1a1a] origin-top-right rotate-[15deg] shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)] rounded-full z-0"></div>
              </div>
              {/* The Modern Metal Clip */}
              <div className="relative w-5 h-8 md:w-6 md:h-10 flex flex-col items-center z-30" style={{ transform: 'translateZ(10px)' }}>
                <div className="w-4 md:w-5 h-2.5 md:h-3 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 rounded-t-md shadow-md"></div>
                <div className="w-2.5 md:w-3 h-4 md:h-5 bg-gradient-to-b from-gray-400 to-gray-500 shadow-sm border-x border-gray-400/50"></div>
                <div className="w-3.5 md:w-4 h-3 md:h-3.5 border-[2.5px] border-gray-400 rounded-b-full shadow-sm mt-[-1px]"></div>
              </div>

              {/* The Card */}
              <div className="relative w-full h-[20rem] sm:h-[24rem] md:h-[34rem] -mt-1 md:-mt-2" style={{ transformStyle: 'preserve-3d' }}>
                {/* FRONT FACE */}
                <div className="absolute inset-0 bg-dark rounded-[1.25rem] md:rounded-[1.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border border-accent/40" style={{ backfaceVisibility: 'hidden' }}>
                  <img
                    src="/profile.jpg"
                    alt="Tatabiin Hairudin Ambo"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-dark to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent"></div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-dark/60 rounded-full shadow-inner z-20 backdrop-blur-sm border border-white/20"></div>
                  <div className="absolute top-8 md:top-10 inset-x-0 flex flex-col items-center z-20">
                    <div className="w-full max-w-[60%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full mb-2" style={{ animation: 'gradientRotate 3s linear infinite' }}></div>
                    <h3 className="text-white/90 font-display font-bold text-[10px] sm:text-xs md:text-base tracking-widest uppercase drop-shadow-md">
                      Tatabiin Hairudin Ambo
                    </h3>
                  </div>

                  {/* Bottom Text Front Face */}
                  <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex flex-col items-center">
                    <SocialIcons />
                    <div className="w-full max-w-[80%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full mb-3 sm:mb-4" style={{ animation: 'gradientRotate 3s linear infinite' }}></div>
                    <p className="text-white font-body text-[9px] sm:text-[11px] md:text-xs uppercase tracking-[0.15em] font-medium leading-relaxed px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
                      Developer <span className="text-blue-400 mx-1">|</span> Creator <span className="text-blue-400 mx-1">|</span> Tech Enthusiast
                    </p>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 bg-dark rounded-[1.25rem] md:rounded-[1.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border border-accent/40 flex flex-col justify-center items-center" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                  <img
                    src="/belakang.jpg"
                    alt="ID Card Back"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark/40 z-10"></div>
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-dark/90 to-transparent z-10"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/90 to-transparent z-10"></div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-dark/60 rounded-full shadow-inner z-20 backdrop-blur-sm border border-white/20"></div>

                  {/* Top Text Back Face */}
                  <div className="absolute top-8 md:top-10 inset-x-0 flex flex-col items-center z-20">
                    <div className="w-full max-w-[60%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full mb-2" style={{ animation: 'gradientRotate 3s linear infinite' }}></div>
                    <h3 className="text-white/90 font-display font-bold text-[8px] sm:text-[10px] md:text-[11px] tracking-widest uppercase drop-shadow-md text-center">
                      Developer <span className="text-blue-400 mx-1">|</span> Creator <span className="text-blue-400 mx-1">|</span> Tech Enthusiast
                    </h3>
                  </div>

                  {/* Back Face Content */}
                  <div className="relative z-20 flex flex-col items-center justify-center h-full w-full p-4 text-center">
                    <h3 className="text-white font-display font-bold text-lg sm:text-xl md:text-2xl tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1">
                      ATTA DEV
                    </h3>
                    <p className="text-white/95 font-body text-[10px] sm:text-xs md:text-sm font-light tracking-wide mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Indonesia | Cileungsi, Jawa Barat
                    </p>
                    <div className="text-white/95 font-body font-medium text-xs sm:text-sm md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      <span>+62822-1384-0415</span>
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex flex-col items-center">
                    <SocialIcons />
                    <div className="w-full max-w-[80%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full mb-3 sm:mb-4" style={{ animation: 'gradientRotate 3s linear infinite' }}></div>
                    <p className="text-white font-body text-[9px] sm:text-[11px] md:text-xs uppercase tracking-[0.15em] font-medium leading-relaxed px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
                      Developer <span className="text-blue-400 mx-1">|</span> Creator <span className="text-blue-400 mx-1">|</span> Tech Enthusiast
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        {/* Title */}
        <div className="flex flex-col items-center mt-3 md:mt-6 pointer-events-auto px-4 w-full">
          <h2 className="font-body text-sm sm:text-lg md:text-2xl font-light tracking-wide text-center flex justify-center items-center gap-1.5 md:gap-2">
            <motion.span
              className="text-white/50 inline-block"
              animate={{
                y: [0, -4, 0, 4, 0],
                rotate: [0, -2, 2, -1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }}
            >
              Freelance Full
            </motion.span>
            <motion.span
              className="text-accent inline-block"
              animate={{
                y: [0, 4, 0, -4, 0],
                rotate: [0, 2, -2, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut"
              }}
            >
              Stack Developer.
            </motion.span>
          </h2>
          <div className="h-[2px] w-full mt-3 bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] rounded-full opacity-80" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
        </div>

        {/* Running Text */}
        <div className="w-full max-w-[90vw] md:max-w-2xl mt-2 md:mt-3 overflow-hidden pointer-events-auto relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            <p className="text-white/90 font-body text-[11px] sm:text-sm md:text-base font-light tracking-wide pr-10 italic">
              Saya membantu bisnis, UMKM, dan startup untuk bertumbuh di era digital dengan solusi website yang modern, interaktif, dan berkinerja tinggi. Mari wujudkan ide cemerlang Anda menjadi nyata!
            </p>
            <p className="text-white/90 font-body text-[11px] sm:text-sm md:text-base font-light tracking-wide pr-10 italic">
              Saya membantu bisnis, UMKM, dan startup untuk bertumbuh di era digital dengan solusi website yang modern, interaktif, dan berkinerja tinggi. Mari wujudkan ide cemerlang Anda menjadi nyata!
            </p>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div variants={fadeUp} className="flex gap-3 md:gap-4 mt-4 md:mt-6 pointer-events-auto px-6 w-full justify-center">
          <button onClick={() => scrollTo(3)} className="relative hover-running-border btn-primary shadow-lg text-xs sm:text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3 flex items-center gap-2">
            View Projects
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button onClick={() => scrollTo(6)} className="relative hover-running-border btn-outline bg-dark-200/50 backdrop-blur-md text-xs sm:text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3">
            Hubungi Saya
          </button>
        </motion.div>

        {/* Scroll to explore */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center mt-4 md:mt-10 text-white/30 z-40 pointer-events-none"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center mb-1.5">Scroll to explore</span>
          <div className="h-[2px] w-24 mb-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] rounded-full opacity-80" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
          <span className="w-px h-5 sm:h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Layer 3 - Outlined Text (Foreground) */}
      <div className="absolute inset-0 flex items-center justify-center mb-[75vh] md:mb-[65vh] z-30 pointer-events-none select-none overflow-hidden">
        <motion.h1
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-[18vw] md:text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap text-center w-full"
          style={{ color: 'transparent' }}
        >
          <span className="animate-text-stroke-port" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>PORT</span><span className="animate-text-stroke-folio" style={{ WebkitTextStroke: '2px rgba(59,130,246,0.6)' }}>FOLIO</span>
        </motion.h1>
      </div>

    </motion.section>
  )
}
