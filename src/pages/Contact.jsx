import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { sendMessage } from '../lib/supabase'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './Contact.css'

// Custom SVG icons
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'lenny@email.com',
    href: 'mailto:lenny@email.com',
    id: 'contact-info-email',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+62 8xx xxxx xxxx',
    href: 'https://wa.me/62800000000',
    id: 'contact-info-phone',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Palembang, Sumatera Selatan',
    href: null,
    id: 'contact-info-location',
  },
  {
    icon: Clock,
    label: 'Waktu Respons',
    value: 'Dalam 24 jam',
    href: null,
    id: 'contact-info-response',
  },
]

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com/lennysundariarnas', label: 'Instagram', id: 'contact-instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/lennysundariarnas', label: 'LinkedIn', id: 'contact-linkedin' },
  { icon: Mail, href: 'mailto:lenny@email.com', label: 'Email', id: 'contact-email-social' },
]

const collaborationTopics = [
  '💄 Konsultasi Kecantikan & Makeup',
  '📱 Kolaborasi Konten Digital',
  '🛍️ UMKM & Kuliner Khas Palembang',
  '🤝 Brand Ambassador & Endorsement',
  '🎓 Sharing Ilmu & Workshop',
]

function Toast({ type, message, onDismiss }) {
  return (
    <div className={`toast toast-${type}`} role="alert">
      {type === 'success'
        ? <CheckCircle size={18} color="var(--color-success)" />
        : <AlertCircle size={18} color="var(--color-error)" />
      }
      <span>{message}</span>
      <button className="toast-close" onClick={onDismiss} aria-label="Tutup">×</button>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [toast, setToast] = useState(null)
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nama wajib diisi'
    if (!form.email.trim()) errs.email = 'Email wajib diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Format email tidak valid'
    if (!form.message.trim()) errs.message = 'Pesan wajib diisi'
    else if (form.message.trim().length < 10) errs.message = 'Pesan minimal 10 karakter'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setToast({ type: 'success', message: '✨ Pesan terkirim! Saya akan segera membalas ya!' })
    } catch {
      setStatus('error')
      setToast({ type: 'error', message: 'Gagal mengirim pesan. Coba hubungi langsung via WhatsApp ya!' })
    } finally {
      setTimeout(() => {
        setStatus(null)
        setToast(null)
      }, 5000)
    }
  }

  return (
    <div className="contact">
      {toast && (
        <div className="toast-container">
          <Toast type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
        </div>
      )}

      {/* Header */}
      <section className="contact-hero section">
        <div className="contact-hero__bg" aria-hidden="true" />
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <Mail size={12} />
              Hubungi Saya
            </span>
            <h1 className="section-title">Mari Berkolaborasi! 🌸</h1>
            <p className="section-subtitle">
              Punya proyek, ide, atau sekadar ingin ngobrol tentang kecantikan dan kreativitas?
              Saya senang sekali untuk terhubung dengan Anda!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div
              ref={infoRef}
              className={`contact-info animate-on-scroll ${infoVisible ? 'visible' : ''}`}
            >
              <h2 className="contact-info__title">Temukan Saya Di Sini</h2>
              <p className="contact-info__desc">
                Saya terbuka untuk berbagai kolaborasi — mulai dari dunia kecantikan,
                konten digital, hingga bisnis UMKM. Yuk, wujudkan ide kita bersama!
              </p>

              <div className="contact-info__items">
                {contactInfo.map(({ icon: Icon, label, value, href, id }) => (
                  <div key={label} className="contact-info-item" id={id}>
                    <div className="contact-info-item__icon">
                      <Icon size={18} />
                    </div>
                    <div className="contact-info-item__content">
                      <p className="contact-info-item__label">{label}</p>
                      {href ? (
                        <a href={href} className="contact-info-item__value contact-info-item__link">
                          {value}
                        </a>
                      ) : (
                        <p className="contact-info-item__value">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Topics */}
              <div className="contact-topics">
                <p className="contact-topics__title">✨ Topik Kolaborasi</p>
                <div className="contact-topics__list">
                  {collaborationTopics.map(topic => (
                    <span key={topic} className="contact-topic-item">{topic}</span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="contact-availability">
                <div className="contact-availability__dot" />
                <div>
                  <p className="contact-availability__title">Terbuka untuk Kolaborasi</p>
                  <p className="contact-availability__desc">Beauty, Digital Content &amp; UMKM</p>
                </div>
              </div>

              {/* Social */}
              <div className="contact-socials">
                <p className="contact-socials__label">Media Sosial Saya</p>
                <div className="contact-socials__links">
                  {socialLinks.map(({ icon: Icon, href, label, id }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="contact-social-link"
                      id={id}
                    >
                      <Icon size={17} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              ref={formRef}
              className={`contact-form-wrap animate-on-scroll animate-delay-2 ${formVisible ? 'visible' : ''}`}
            >
              <form
                className="contact-form card"
                onSubmit={handleSubmit}
                noValidate
                id="contact-form"
              >
                <h2 className="contact-form__title">Kirim Pesan 💌</h2>
                <p className="contact-form__subtitle">
                  Ceritakan tentang diri Anda dan apa yang ingin kita wujudkan bersama!
                </p>

                <div className="contact-form__row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Nama Anda *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`form-control ${errors.name ? 'form-control--error' : ''}`}
                      placeholder="Nama lengkap Anda"
                      autoComplete="name"
                    />
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'form-control--error' : ''}`}
                      placeholder="email@anda.com"
                      autoComplete="email"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Topik / Subjek</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Contoh: Kolaborasi konten kecantikan"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Pesan *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`form-control ${errors.message ? 'form-control--error' : ''}`}
                    placeholder="Ceritakan lebih lanjut tentang ide atau kebutuhan Anda..."
                    rows={6}
                  />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact-submit-btn"
                  disabled={status === 'loading'}
                  id="contact-submit"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="contact-spinner" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
