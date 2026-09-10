import { useState } from 'react'
import { motion } from 'framer-motion'
import { site, socials } from '../data/site'
import ParallaxSection from './ParallaxSection'
import { fadeLeft, fadeRight, fadeUp, viewport } from '../lib/motion'

const inputClass = 'field-input'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const text = `Halo, saya ${form.name} (${form.email}).\n\nSubjek: ${form.subject}\n\nPesan:\n${form.message}`
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <ParallaxSection id="contact" className="contact-section">
      <div className="container-page">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <p className="section-label mb-3">Contact</p>
          <h2 className="display-title max-w-2xl">Mari ciptakan karya yang hebat.</h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-5 gap-8">
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
            onSubmit={onSubmit}
            className="md:col-span-3 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={onChange} placeholder="Nama Anda" className={inputClass} required />
              <input type="email" name="email" value={form.email} onChange={onChange} placeholder="Email" className={inputClass} required />
            </div>
            <input name="subject" value={form.subject} onChange={onChange} placeholder="Subjek" className={inputClass} required />
            <textarea name="message" value={form.message} onChange={onChange} placeholder="Pesan" rows={5} className={`${inputClass} resize-none`} required />
            <button type="submit" className="btn-primary">
              Kirim via WhatsApp
            </button>
          </motion.form>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeRight}
            className="md:col-span-2 card-cozy p-6 md:p-8 space-y-6"
          >
            <div>
              <p className="section-label mb-1">Email</p>
              <a href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div>
              <p className="section-label mb-1">Location</p>
              <p className="text-[var(--text)]">{site.location}</p>
            </div>
            <div>
              <p className="section-label mb-3">Social</p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip hover:text-[var(--text)]"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <p className="text-[16px] text-[var(--muted)]">
              Terbuka untuk proyek freelance dan peluang full-time. Biasanya merespon dalam 24 jam.
            </p>
          </motion.div>
        </div>

        <footer className="mt-16 pt-6 border-t border-[#232323] text-center text-[16px] text-[var(--muted)]">
          © 2026 {site.name} — {site.brand}
        </footer>
      </div>
    </ParallaxSection>
  )
}
