import { NavLink } from 'react-router-dom'
import { ArrowRight, Clock, Mail, Sparkles, ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import profile from '../data/profile'
import './Home.css'

// Custom SVG icons
const InstagramIcon = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const LinkedinIcon = ({ size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com/lennysundariarnas', label: 'Instagram', id: 'home-instagram' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/lennysundariarnas', label: 'LinkedIn', id: 'home-linkedin' },
  { icon: Mail, href: 'mailto:lenny@email.com', label: 'Email', id: 'home-email' },
]

const highlights = [
  {
    emoji: '💄',
    title: 'Beauty Advisor',
    description: 'Berpengalaman sebagai Brand Ambassador Paragon, ahli makeup dan skincare untuk berbagai jenis kulit.',
  },
  {
    emoji: '📱',
    title: 'Digital Creator',
    description: 'Menciptakan konten kreatif dan inspiratif di media sosial dengan pendekatan autentik dan engaging.',
  },
  {
    emoji: '🛍️',
    title: 'Entrepreneur',
    description: 'Pemilik UMKM kuliner khas Palembang — Cireng dan Pempek Tekwan dengan cita rasa otentik.',
  },
]

const stats = [
  { value: '4+', label: 'Tahun Pengalaman' },
  { value: '2', label: 'Usaha UMKM' },
  { value: '100%', label: 'Dedikasi' },
  { value: '✨', label: 'Beauty Expert' },
]

function HighlightCard({ emoji, title, description, delay }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`home-highlight card animate-on-scroll animate-delay-${delay} ${isVisible ? 'visible' : ''}`}
    >
      <div className="home-highlight__emoji">{emoji}</div>
      <h3 className="home-highlight__title">{title}</h3>
      <p className="home-highlight__desc">{description}</p>
    </div>
  )
}

export default function Home() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
  const { ref: highlightsRef, isVisible: highlightsVisible } = useScrollAnimation()

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero section">
        <div className="home-hero__bg" aria-hidden="true">
          <div className="home-hero__blob home-hero__blob--1" />
          <div className="home-hero__blob home-hero__blob--2" />
          <div className="home-hero__blob home-hero__blob--3" />
          <div className="home-hero__petals" aria-hidden="true">
            {['🌸', '✨', '🌷', '💫', '🌸'].map((p, i) => (
              <span key={i} className={`home-hero__petal home-hero__petal--${i + 1}`}>{p}</span>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="home-hero__inner">
            {/* Text Content */}
            <div className="home-hero__content">
              <div className="home-hero__badge animate-on-scroll visible">
                <span className="badge badge-rose">
                  <Sparkles size={11} />
                  Beauty Advisor · Digital Creator · Entrepreneur
                </span>
              </div>

              <h1 className="home-hero__greeting animate-on-scroll visible">
                Halo, Saya{' '}
                <span className="text-gradient">Lenny</span>
                <span className="home-hero__wave"> 🌸</span>
              </h1>

              <p className="home-hero__fullname animate-on-scroll visible animate-delay-1">
                Lenny Sundari Arnas
              </p>

              <p className="home-hero__title animate-on-scroll visible animate-delay-1">
                Menyebarkan Kecantikan, Kreativitas,
                <br />
                <span className="home-hero__title-accent">dan Semangat Berwirausaha</span>
              </p>

              <p className="home-hero__desc animate-on-scroll visible animate-delay-2">
                Mahasiswi Ilmu Komunikasi asal Palembang yang passionate di bidang kecantikan,
                digital content creation, dan UMKM. Siap berkolaborasi dan membawa dampak positif! ✨
              </p>

              <div className="home-hero__actions animate-on-scroll visible animate-delay-3">
                <NavLink to="/contact" className="btn btn-primary" id="hero-contact-btn">
                  Mari Berkolaborasi
                  <ArrowRight size={17} />
                </NavLink>
                <NavLink to="/about" className="btn btn-outline" id="hero-about-btn">
                  Kenali Saya
                </NavLink>
                {profile.cvUrl ? (
                  <a
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    id="hero-cv-btn"
                  >
                    <Clock size={17} />
                    CV Saya
                  </a>
                ) : (
                  <button type="button" className="btn btn-outline" id="hero-cv-btn" disabled>
                    <Clock size={17} />
                    {profile.cvStatusText}
                  </button>
                )}
              </div>

              {/* Social Links */}
              <div className="home-hero__socials animate-on-scroll visible animate-delay-4">
                {socialLinks.map(({ icon: Icon, href, label, id }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-hero__social"
                    aria-label={label}
                    id={id}
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Photo */}
            <div className="home-hero__photo animate-on-scroll visible animate-delay-2">
              <div className="home-hero__photo-frame">
                <div className="home-hero__photo-ring home-hero__photo-ring--outer" />
                <div className="home-hero__photo-ring home-hero__photo-ring--inner" />
                <div className="home-hero__photo-placeholder">
                  <div className="home-hero__avatar">
                    <span className="home-hero__avatar-initials">LS</span>
                  </div>
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="home-hero__photo-img"
                    onError={(event) => { event.currentTarget.style.display = 'none' }}
                  />
                </div>
                {/* Floating badges */}
                <div className="home-hero__float home-hero__float--1">
                  💄 Beauty Expert
                </div>
                <div className="home-hero__float home-hero__float--2">
                  📍 Palembang
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="container">
          <div
            ref={statsRef}
            className={`home-stats__grid animate-on-scroll ${statsVisible ? 'visible' : ''}`}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className={`home-stats__item animate-delay-${i + 1}`}>
                <span className="home-stats__value">{stat.value}</span>
                <span className="home-stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section">
        <div className="container">
          <div
            ref={highlightsRef}
            className={`section-header animate-on-scroll ${highlightsVisible ? 'visible' : ''}`}
          >
            <span className="section-label">
              ✨ Yang Saya Tawarkan
            </span>
            <h2 className="section-title">Apa yang Membuat Saya Berbeda?</h2>
            <p className="section-subtitle">
              Kombinasi unik antara keahlian kecantikan, komunikasi, kreativitas digital, dan jiwa wirausaha
              yang siap memberikan nilai terbaik.
            </p>
          </div>

          <div className="home-highlights__grid">
            {highlights.map((item, i) => (
              <HighlightCard key={item.title} {...item} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Paragon Weblog Banner Section */}
      <section className="home-paragon-promo section">
        <div className="container">
          <div className="home-paragon-promo__inner">
            <div className="home-paragon-promo__blobs" aria-hidden="true">
              <div className="home-paragon-promo__blob home-paragon-promo__blob--1" />
              <div className="home-paragon-promo__blob home-paragon-promo__blob--2" />
            </div>

            <div className="home-paragon-promo__content">
              <div className="home-paragon-promo__badge">
                <span>🌸</span>
                <span>Weblog Perusahaan · Tugas SKOM4332</span>
              </div>
              <h2 className="home-paragon-promo__title">
                Kampanye{' '}
                <span className="text-gradient">"Beauty</span>
                {' '}with{' '}
                <span style={{ color: '#2da9a0' }}>Purpose"</span>
              </h2>
              <p className="home-paragon-promo__desc">
                Jelajahi weblog lengkap tentang PT Paragon Technology and Innovation —
                perusahaan kosmetik terkemuka Indonesia yang mengelola brand Wardah, Make Over,
                dan Emina. Temukan visi, misi, kampanye pemasaran terpadu, program CSR,
                dan lebih banyak lagi!
              </p>
              <div className="home-paragon-promo__brands">
                <span className="home-paragon-promo__brand home-paragon-promo__brand--wardah">🌸 Wardah</span>
                <span className="home-paragon-promo__brand home-paragon-promo__brand--makeover">💙 Make Over</span>
                <span className="home-paragon-promo__brand home-paragon-promo__brand--emina">🌻 Emina</span>
              </div>
              <a
                href="https://paragon.lenysundariarnas.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-paragon"
                id="paragon-weblog-btn"
              >
                <span>Kunjungi Weblog Paragon</span>
                <ExternalLink size={17} />
              </a>
            </div>

            <div className="home-paragon-promo__visual">
              <div className="home-paragon-promo__card">
                <div className="home-paragon-promo__card-icon">🌸</div>
                <div className="home-paragon-promo__card-title">PT Paragon</div>
                <div className="home-paragon-promo__card-sub">Technology &amp; Innovation</div>
                <div className="home-paragon-promo__stats">
                  <div className="home-paragon-promo__stat">
                    <span className="home-paragon-promo__stat-val">3+</span>
                    <span className="home-paragon-promo__stat-lbl">Brand</span>
                  </div>
                  <div className="home-paragon-promo__stat">
                    <span className="home-paragon-promo__stat-val">30+</span>
                    <span className="home-paragon-promo__stat-lbl">Tahun</span>
                  </div>
                  <div className="home-paragon-promo__stat">
                    <span className="home-paragon-promo__stat-val">7</span>
                    <span className="home-paragon-promo__stat-lbl">Misi</span>
                  </div>
                </div>
                <div className="home-paragon-promo__tag">
                  ✨ Beauty with Purpose
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
