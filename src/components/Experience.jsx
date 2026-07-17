import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experience = [
  {
    period: '2022-2026',
    role: 'Senior UI/UX Designer',
    company: 'Design Studio Co.',
    desc: 'Memimpin strategi desain untuk klien perusahaan (enterprise). Mengelola tim beranggotakan 4 desainer dan menetapkan standar sistem desain.',
    type: 'work',
    image: '/hydracoredigitech.jpg',
    details: 'Sertifikat Kepemimpinan & Manajemen Desain'
  },
  {
    period: '2022-2026',
    role: 'UI/UX Designer',
    company: 'TechVentures Inc.',
    desc: 'Merancang dan meluncurkan lebih dari 12 produk untuk web dan mobile. Meningkatkan retensi pengguna sebesar 40% melalui inisiatif riset UX.',
    type: 'work',
    image: 'https://picsum.photos/seed/cert2/800/600',
    details: 'Penghargaan UI/UX Terbaik 2024'
  },
  {
    period: '2023- Now',
    role: 'Universitas Ipwija',
    company: 'Sistem Informasi - Freelance',
    desc: 'Saat ini masih menempuh perkuliahan. Mengkhususkan diri dalam desain interaksi dan seni media baru.',
    type: 'education',
    image: '/ipwija.jpg.jpg',
    details: 'Kartu Tanda Mahasiswa (KTM) Aktif'
  },
  {
    period: '2018-2026',
    role: 'Fullstack Developer',
    company: 'CreativeLab Agency',
    desc: 'Membangun dan merancang arsitektur aplikasi web secara end-to-end (frontend & backend). Berpengalaman dalam pengembangan REST API, pengelolaan database, dan optimasi performa sistem.',
    type: 'work',
    image: 'https://picsum.photos/seed/cert3/800/600',
    details: 'Sertifikat Fullstack Web Development'
  },
]

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

const timelineSlide = (i) => ({
  hidden: { opacity: 0, x: 80, scale: 0.9, transition: { duration: 0.4 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.15 + 0.5,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

const dotPulse = {
  hidden: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

function ExperienceModal({ item, onClose }) {
  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-dark border border-white/10 rounded-3xl"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="relative h-64 md:h-80 bg-black">
          <img src={item.image} alt={item.details} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors z-10">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-6 pr-6">
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${item.type === 'education'
              ? 'bg-accent/20 text-accent'
              : 'bg-emerald-500/20 text-emerald-400'
              }`}>
              {item.type === 'education' ? 'Pendidikan' : 'Pekerjaan'} • {item.period}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{item.role}</h3>
            <p className="text-accent text-sm md:text-base font-medium">{item.company}</p>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-white font-semibold mb-2 text-lg">Deskripsi</h4>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">{item.desc}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-lg">Dokumen / Sertifikat</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm md:text-base">{item.details}</p>
                <p className="text-white/40 text-xs">Klik gambar di atas untuk melihat resolusi penuh (Contoh)</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience({ active }) {
  const [selectedExperience, setSelectedExperience] = useState(null)
  return (
    <>
      <motion.section id="experience" className="section-panel"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
        <motion.div
          className="container-custom flex flex-col justify-center"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
        >
          <motion.div variants={fadeUp} className="flex flex-col w-full mb-6 md:mb-8">
            <p className="section-label !mb-2">Pengalaman</p>
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
          </motion.div>
          <motion.div variants={fadeUp} className="mb-6 md:mb-12 flex flex-col items-start w-full">
            <h2 className="section-title mb-2 md:mb-3">
              Perjalanan Karir
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-[5px] md:left-6 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-transparent via-blue-500 to-transparent bg-[length:100%_200%] opacity-80"
              style={{ animation: 'gradientRotateVertical 2.5s linear infinite' }}
            />

            <div className="space-y-5 md:space-y-10 pl-8 md:pl-16">
              {experience.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={timelineSlide(i)}
                  className="relative group"
                >
                  <motion.div
                    variants={dotPulse}
                    className={`absolute -left-[19px] md:-left-[34px] top-1 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 bg-dark z-10 border-emerald-400 group-hover:bg-emerald-500 transition-colors duration-300`}
                    style={{ boxShadow: '0 0 10px rgba(16,185,129,0.3)' }}
                  />

                  <div
                    className="card p-4 md:p-6 cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setSelectedExperience(item)}
                  >
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-1.5 md:gap-2">
                      <div>
                        <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400`}>
                          {item.type === 'education' ? 'Pendidikan' : 'Pekerjaan'}
                        </span>
                      </div>
                      <span className="text-green-400 text-[11px] md:text-sm font-mono">{item.period}</span>
                    </div>
                    <h3 className="font-display text-sm md:text-lg font-semibold text-white mt-2">{item.role}</h3>
                    <p className="text-accent/80 text-xs md:text-base font-medium mb-1.5 md:mb-2">{item.company}</p>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceModal item={selectedExperience} onClose={() => setSelectedExperience(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
