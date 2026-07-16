import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const albums = [
  {
    title: 'view story',
    type: 'video', // Indicates primary content or thumbnail type
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    className: 'md:col-span-2 md:row-span-2',
    media: [
      { type: 'video', url: 'http://unggah.web.id/rFl_hsMZp5dm.mp4', caption: 'saat meeting hydra core digitech' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', caption: 'Team Discussion' }
    ]
  },
  {
    title: 'Live Streaming',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    className: 'md:col-span-1 md:row-span-1',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80', caption: 'Live Stream Setup' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80', caption: 'Camera Angles' },
      { type: 'video', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80', caption: 'Behind the Stream' }
    ]
  },
  {
    title: 'vibe coding',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80',
    className: 'md:col-span-1 md:row-span-1',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80', caption: 'Workspace Setup' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80', caption: 'Coffee Break' },
      { type: 'image', url: 'https://unggah.web.id/PlEP7ywUSqNB.jpeg', caption: 'Vibe Coding' }
    ]
  },
  {
    title: 'Ruang Kerja & Suasana',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80',
    className: 'md:col-span-2 md:row-span-1',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80', caption: 'Office Panorama' }
    ]
  }
]

const stagger = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const itemEntrance = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Testimonials({ active }) {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(null)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const selectedAlbum = selectedAlbumIndex !== null ? albums[selectedAlbumIndex] : null
  const currentMedia = selectedAlbum ? selectedAlbum.media[currentMediaIndex] : null

  const openAlbum = (index) => {
    setSelectedAlbumIndex(index)
    setCurrentMediaIndex(0)
  }

  const closeAlbum = () => {
    setSelectedAlbumIndex(null)
    setCurrentMediaIndex(0)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    if (selectedAlbum) {
      setCurrentMediaIndex((prev) => (prev + 1) % selectedAlbum.media.length)
    }
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    if (selectedAlbum) {
      setCurrentMediaIndex((prev) => (prev === 0 ? selectedAlbum.media.length - 1 : prev - 1))
    }
  }

  return (
    <section id="testimonials" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center h-full py-12 md:py-20"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <motion.p variants={fadeUp} className="section-label !mb-3">Brand Gallery</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">
              Momen & Karya
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} className="text-white/50 text-sm md:text-base max-w-sm">
            Jelajahi berbagai album dokumentasi, di balik layar, dan proses kreatif tim kami.
          </motion.div>
        </div>

        <motion.div 
          variants={fadeUp} 
          className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-[250px] md:auto-rows-[220px] lg:auto-rows-[280px] w-full"
        >
          {albums.map((album, i) => (
            <motion.div
              key={i}
              variants={itemEntrance}
              onClick={() => openAlbum(i)}
              className={`card overflow-hidden group ${album.className} cursor-pointer`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${album.thumbnail})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-5 md:p-6 lg:p-8">
                {album.type === 'video' && (
                  <div className="mb-4 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(108,99,255,0.6)] transition-all duration-500 cursor-pointer">
                    <svg className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4l12 6-12 6z" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col items-center w-full text-center">
                  <div className="inline-flex items-center gap-2 bg-accent/30 backdrop-blur-md border border-accent/40 text-white font-medium px-5 py-2.5 rounded-full shadow-[0_4_15px_rgba(108,99,255,0.2)] mb-1">
                    {album.title}
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <p className="text-white/90 font-medium text-sm mt-1 drop-shadow-md">{album.media.length} items</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Album Lightbox Modal */}
      <AnimatePresence>
        {selectedAlbum && currentMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-md p-4 md:p-8"
            onClick={closeAlbum}
          >
            {/* Top Bar with Title and Close Button */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-8 flex justify-between items-center bg-gradient-to-b from-dark/80 to-transparent z-20">
              <div className="text-white">
                <h3 className="font-display text-xl md:text-2xl font-bold">{selectedAlbum.title}</h3>
                <p className="text-white/60 text-sm md:text-base">
                  {currentMediaIndex + 1} of {selectedAlbum.media.length}
                </p>
              </div>
              <button 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); closeAlbum(); }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Prev Button (Only show if multiple items) */}
            {selectedAlbum.media.length > 1 && (
              <button 
                className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-20"
                onClick={handlePrev}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next Button (Only show if multiple items) */}
            {selectedAlbum.media.length > 1 && (
              <button 
                className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors z-20"
                onClick={handleNext}
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Media Content */}
            <motion.div 
              key={currentMediaIndex} // Force re-render/animation on change
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[75vh] flex flex-col items-center justify-center mt-12"
              onClick={(e) => e.stopPropagation()}
            >
              {currentMedia.type === 'video' ? (
                <video 
                  src={currentMedia.url} 
                  controls
                  autoPlay
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <img 
                  src={currentMedia.url} 
                  alt={currentMedia.caption} 
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
                />
              )}
              <div className="mt-4 text-center">
                <h4 className="text-white/90 font-medium text-lg">{currentMedia.caption}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
