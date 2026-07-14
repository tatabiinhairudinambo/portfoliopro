import { motion } from 'framer-motion'

const labels = ['Home', 'About', 'Skills', 'Portfolio', 'Experience', 'Testimonials', 'Contact']

export default function ScrollIndicator({ activeIndex, scrollTo, sections }) {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3">
      {sections.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(i)}
          className="group relative flex items-center justify-center"
          aria-label={labels[i]}
        >
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
            activeIndex === i
              ? 'bg-accent shadow-[0_0_12px_rgba(108,99,255,0.6)]'
              : 'bg-white/20 hover:bg-white/40'
          }`}
          />
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-5 px-3 py-1 rounded-lg bg-dark-200 border border-white/5 text-white/60 text-[10px] font-medium whitespace-nowrap pointer-events-none"
          >
            {labels[i]}
          </motion.span>
        </button>
      ))}
    </div>
  )
}
