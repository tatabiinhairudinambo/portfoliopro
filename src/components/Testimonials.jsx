import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { albums } from '../data/site'
import ParallaxSection from './ParallaxSection'
import { fadeUp, viewport } from '../lib/motion'

export default function Testimonials() {
  const [albumIndex, setAlbumIndex] = useState(null)
  const [mediaIndex, setMediaIndex] = useState(0)

  const album = albumIndex !== null ? albums[albumIndex] : null
  const media = album ? album.media[mediaIndex] : null

  const open = (i) => {
    setAlbumIndex(i)
    setMediaIndex(0)
  }

  const close = () => {
    setAlbumIndex(null)
    setMediaIndex(0)
  }

  return (
    <>
    <ParallaxSection id="testimonials">
      <div className="container-page">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <p className="section-label mb-3">Life & process</p>
          <h2 className="display-title">Momen & karya</h2>
          <p className="mt-4 max-w-xl text-[var(--muted)]">
            Dokumentasi di balik layar, proses kreatif, dan suasana kerja bersama tim.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px] md:auto-rows-[220px] lg:auto-rows-[260px]">
          {albums.map((item, i) => (
            <motion.button
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.08, duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => open(i)}
              className={`relative flex items-center justify-center overflow-hidden text-left group border border-[#232323] bg-[#080808] transition-transform duration-[220ms] ease-token hover:-translate-y-0.5 ${item.className}`}
              style={{ borderRadius: 2 }}
            >
              <img src={item.thumbnail} alt={item.title} className="max-w-full max-h-full w-auto h-auto object-contain object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                {item.type === 'video' && (
                  <span className="mb-3 w-12 h-12 rounded-full bg-[#FFFFFF] text-[#080808] flex items-center justify-center">▶</span>
                )}
                <h3 className="display-kicker">{item.title}</h3>
                <p className="text-[var(--muted)] text-[16px]">{item.media.length} items</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </ParallaxSection>

      <AnimatePresence>
        {album && media && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#080808]/95 flex items-center justify-center p-4"
            onClick={close}
          >
            <div className="absolute top-6 left-6 right-6 flex justify-between text-[var(--text)]">
              <div>
                <h3 className="display-kicker">{album.title}</h3>
                <p className="text-[var(--muted)] text-[16px]">
                  {mediaIndex + 1} of {album.media.length}
                </p>
              </div>
              <button onClick={close} className="w-11 h-11 rounded-full bg-[#000] border border-[#232323] text-[#E8E8E2]" aria-label="Close">
                ×
              </button>
            </div>

            {album.media.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#000] border border-[#232323] text-[#E8E8E2]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMediaIndex((prev) => (prev === 0 ? album.media.length - 1 : prev - 1))
                  }}
                >
                  ‹
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#000] border border-[#232323] text-[#E8E8E2]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMediaIndex((prev) => (prev + 1) % album.media.length)
                  }}
                >
                  ›
                </button>
              </>
            )}

            <div className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              {media.type === 'video' ? (
                <video src={media.url} controls autoPlay className="max-h-[65vh]" style={{ borderRadius: 2 }} />
              ) : (
                <img src={media.url} alt={media.caption} className="max-h-[65vh] object-contain" style={{ borderRadius: 2 }} />
              )}
              <p className="mt-4 text-[var(--text)]">{media.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
