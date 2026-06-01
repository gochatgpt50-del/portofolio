import { useState, useEffect } from 'react'
import { Briefcase, GraduationCap, Clock, MapPin, Calendar, Star } from 'lucide-react'
import { getWorkExperience, getEducation } from '../lib/supabase'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import profile from '../data/profile'
import './Resume.css'

// Data pengalaman Lenny
const fallbackWork = [
  {
    id: 1,
    company: 'Paragon Technology and Innovation',
    position: 'Beauty Advisor (Brand Ambassador)',
    location: 'Palembang, Sumatera Selatan',
    start_date: '2022-01-01',
    end_date: '2024-12-31',
    is_current: false,
    description: 'Bertugas sebagai Brand Ambassador produk kecantikan Paragon (Wardah, Make Over, Emina, dll). Memberikan konsultasi kecantikan, demo makeup, dan edukasi produk skincare kepada pelanggan. Mencapai target penjualan secara konsisten dan membangun loyalitas pelanggan melalui pendekatan personal yang hangat.',
    technologies: ['Makeup Artistry', 'Skincare Consultation', 'Sales', 'Customer Service', 'Brand Communication'],
  },
  {
    id: 2,
    company: 'Klinik Kecantikan / Kesehatan',
    position: 'Admin Klinik',
    location: 'Palembang, Sumatera Selatan',
    start_date: '2020-01-01',
    end_date: '2022-01-01',
    is_current: false,
    description: 'Mengelola administrasi klinik termasuk penjadwalan pasien, pengelolaan rekam medis, dan koordinasi dengan tenaga medis. Memberikan pelayanan prima kepada pasien dan memastikan operasional klinik berjalan lancar. Meningkatkan kepuasan pelanggan melalui komunikasi yang efektif dan responsif.',
    technologies: ['Administrasi', 'Customer Service', 'Manajemen Data', 'Komunikasi', 'Koordinasi Tim'],
  },
]

const fallbackEducation = [
  {
    id: 1,
    institution: 'Universitas (Dalam Proses)',
    degree: 'S1 Ilmu Komunikasi',
    field: 'Komunikasi',
    start_year: profile.educationStartYear,
    end_year: null,
    gpa: null,
    description: 'Mendalami ilmu komunikasi massa, hubungan masyarakat, komunikasi interpersonal, dan media digital. Aktif dalam kegiatan kampus dan pengembangan soft skill komunikasi untuk mendukung karir profesional.',
  },
]

// Skills display untuk resume
const resumeSkills = [
  { category: '💄 Kecantikan', skills: ['Makeup Artistry', 'Skincare', 'Color Analysis', 'Beauty Consulting', 'Brand Ambassador'] },
  { category: '📱 Digital', skills: ['Content Creation', 'Social Media', 'Fotografi Produk', 'Digital Marketing'] },
  { category: '🗣️ Komunikasi', skills: ['Public Speaking', 'Customer Service', 'Copywriting', 'Presentasi'] },
  { category: '🛍️ Bisnis', skills: ['UMKM Management', 'Kewirausahaan', 'Strategi Pemasaran', 'Networking'] },
]

// UMKM Section
const umkm = [
  {
    name: 'Cireng Khas Palembang',
    emoji: '🥟',
    description: 'Usaha kuliner cireng dengan bumbu khas dan berbagai varian rasa yang digemari pelanggan setia.',
    highlight: 'Produk Andalan',
  },
  {
    name: 'Pempek Tekwan',
    emoji: '🍲',
    description: 'Pempek dan tekwan autentik khas Palembang dengan resep turun-temurun yang menjaga kualitas cita rasa.',
    highlight: 'Kuliner Khas',
  },
]

function formatDate(dateStr) {
  if (!dateStr) return 'Sekarang'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
}

function WorkCard({ item, index }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`timeline-item animate-on-scroll ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="timeline-dot">
        <div className="timeline-dot__inner" />
      </div>
      <div className="timeline-card card">
        <div className="timeline-card__header">
          <div>
            <h3 className="timeline-card__position">{item.position}</h3>
            <p className="timeline-card__company">{item.company}</p>
          </div>
        </div>
        <div className="timeline-card__meta">
          <span className="timeline-meta-item">
            <Calendar size={13} />
            {formatDate(item.start_date)} — {item.is_current ? 'Sekarang' : formatDate(item.end_date)}
          </span>
          {item.location && (
            <span className="timeline-meta-item">
              <MapPin size={13} />
              {item.location}
            </span>
          )}
        </div>
        {item.description && (
          <p className="timeline-card__desc">{item.description}</p>
        )}
        {item.technologies?.length > 0 && (
          <div className="timeline-card__tech">
            {item.technologies.map(tech => (
              <span key={tech} className="badge badge-rose">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EduCard({ item, index }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`timeline-item animate-on-scroll ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="timeline-dot">
        <div className="timeline-dot__inner timeline-dot__inner--edu" />
      </div>
      <div className="timeline-card card">
        <div className="timeline-card__header">
          <div>
            <h3 className="timeline-card__position">{item.degree}</h3>
            <p className="timeline-card__company">{item.institution}</p>
          </div>
          {!item.end_year && (
            <span className="badge badge-rose">Aktif</span>
          )}
        </div>
        <div className="timeline-card__meta">
          <span className="timeline-meta-item">
            <Calendar size={13} />
            {item.start_year} — {item.end_year || 'Sekarang'}
          </span>
          {item.field && (
            <span className="timeline-meta-item">📚 {item.field}</span>
          )}
        </div>
        {item.description && (
          <p className="timeline-card__desc">{item.description}</p>
        )}
      </div>
    </div>
  )
}

export default function Resume() {
  const [work, setWork] = useState(fallbackWork)
  const [education, setEducation] = useState(fallbackEducation)
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()
  const { ref: umkmRef, isVisible: umkmVisible } = useScrollAnimation()

  useEffect(() => {
    Promise.all([getWorkExperience(), getEducation()])
      .then(([w, e]) => {
        if (w?.length) setWork(w)
        if (e?.length) setEducation(e)
      })
      .catch(() => { /* use fallback */ })
  }, [])

  return (
    <div className="resume">
      {/* Header */}
      <section className="resume-hero section">
        <div className="resume-hero__bg" aria-hidden="true" />
        <div className="container">
          <div
            ref={headerRef}
            className={`resume-hero__inner animate-on-scroll ${headerVisible ? 'visible' : ''}`}
          >
            <div className="section-header" style={{ marginBottom: 0, textAlign: 'left' }}>
              <span className="section-label">
                <Briefcase size={12} />
                Resume Saya
              </span>
              <h1 className="section-title" style={{ textAlign: 'left' }}>
                Pengalaman &amp; Pendidikan
              </h1>
              <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
                Perjalanan profesional yang penuh warna — dari admin klinik, beauty advisor, hingga wirausahawan.
              </p>
            </div>
            {profile.cvUrl ? (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary resume-download-btn"
                id="resume-download"
              >
                <Clock size={17} />
                Lihat CV ATS
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-primary resume-download-btn"
                id="resume-download"
                disabled
              >
                <Clock size={17} />
                {profile.cvStatusText}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="resume-grid">
            {/* Work Experience */}
            <div className="resume-section">
              <div className="resume-section__header">
                <div className="resume-section__icon">
                  <Briefcase size={19} />
                </div>
                <h2 className="resume-section__title">Pengalaman Kerja</h2>
              </div>
              <div className="timeline">
                {work.map((item, i) => (
                  <WorkCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="resume-section">
              {/* Education */}
              <div className="resume-section__header">
                <div className="resume-section__icon resume-section__icon--edu">
                  <GraduationCap size={19} />
                </div>
                <h2 className="resume-section__title">Pendidikan</h2>
              </div>
              <div className="timeline">
                {education.map((item, i) => (
                  <EduCard key={item.id} item={item} index={i} />
                ))}
              </div>

              {/* Skills */}
              <div
                ref={skillsRef}
                className={`resume-skills animate-on-scroll ${skillsVisible ? 'visible' : ''}`}
              >
                <div className="resume-section__header" style={{ marginBottom: 16 }}>
                  <div className="resume-section__icon">
                    <Star size={19} />
                  </div>
                  <h2 className="resume-section__title">Keahlian</h2>
                </div>
                {resumeSkills.map(({ category, skills }) => (
                  <div key={category} className="resume-skill-group">
                    <p className="resume-skill-category">{category}</p>
                    <div className="resume-skill-tags">
                      {skills.map(s => (
                        <span key={s} className="badge badge-rose">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* UMKM Section */}
          <div
            ref={umkmRef}
            className={`resume-umkm animate-on-scroll ${umkmVisible ? 'visible' : ''}`}
          >
            <div className="resume-section__header" style={{ marginBottom: 24 }}>
              <div className="resume-section__icon resume-section__icon--umkm">
                🛍️
              </div>
              <div>
                <h2 className="resume-section__title">Usaha UMKM Kuliner</h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginTop: 4 }}>
                  Wirausaha mandiri kuliner khas Palembang
                </p>
              </div>
            </div>
            <div className="resume-umkm__grid">
              {umkm.map((u, i) => (
                <div
                  key={u.name}
                  className={`resume-umkm-card animate-on-scroll animate-delay-${i + 1} ${umkmVisible ? 'visible' : ''}`}
                >
                  <div className="resume-umkm-card__emoji">{u.emoji}</div>
                  <div>
                    <div className="resume-umkm-card__header">
                      <h3 className="resume-umkm-card__name">{u.name}</h3>
                      <span className="badge badge-peach">{u.highlight}</span>
                    </div>
                    <p className="resume-umkm-card__desc">{u.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
