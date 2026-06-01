import { useState, useEffect } from 'react'
import { User, BookOpen, Sparkles, ExternalLink, ShieldCheck, Camera } from 'lucide-react'
import { getSkills } from '../lib/supabase'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import profile from '../data/profile'
import './About.css'

const fallbackSkills = [
  { id: 1, name: 'Beauty Consultation', category: 'Kecantikan', level: 95 },
  { id: 2, name: 'Makeup Application', category: 'Kecantikan', level: 92 },
  { id: 3, name: 'Skincare Knowledge', category: 'Kecantikan', level: 90 },
  { id: 4, name: 'Color Analysis', category: 'Kecantikan', level: 85 },
  { id: 5, name: 'Content Creation', category: 'Digital', level: 88 },
  { id: 6, name: 'Social Media Marketing', category: 'Digital', level: 85 },
  { id: 7, name: 'Fotografi Produk', category: 'Digital', level: 80 },
  { id: 8, name: 'Public Speaking', category: 'Komunikasi', level: 87 },
  { id: 9, name: 'Customer Relations', category: 'Komunikasi', level: 92 },
  { id: 10, name: 'Copywriting', category: 'Komunikasi', level: 80 },
  { id: 11, name: 'Manajemen UMKM', category: 'Bisnis', level: 85 },
  { id: 12, name: 'Brand Ambassador', category: 'Bisnis', level: 90 },
]

const categoryColors = {
  Kecantikan: 'badge-rose',
  Digital: 'badge-peach',
  Komunikasi: 'badge-lavender',
  Bisnis: 'badge-sage',
}

const values = [
  { marker: '01', title: 'Authentic Beauty', desc: 'Kecantikan sejati datang dari dalam. Saya membantu orang lain merasa cantik dan percaya diri.' },
  { marker: '02', title: 'Terus Berkembang', desc: 'Setiap hari adalah kesempatan untuk belajar hal baru dan menjadi versi terbaik diri sendiri.' },
  { marker: '03', title: 'Kolaborasi', desc: 'Saya percaya kita bisa mencapai lebih banyak hal ketika bekerja bersama dengan sinergi yang baik.' },
  { marker: '04', title: 'Pantang Menyerah', desc: 'Dari admin klinik hingga beauty advisor hingga wirausahawan, saya selalu semangat menghadapi tantangan.' },
]

const evidenceLinks = [
  {
    label: 'Website E-Portofolio',
    href: '/',
    note: 'Profil profesional, pengalaman, keahlian, dan kontak kolaborasi.',
  },
  {
    label: 'LinkedIn Profesional',
    href: 'https://linkedin.com/in/lennysundariarnas',
    note: 'Media sosial profesional untuk membangun jejaring dan kredibilitas digital.',
  },
]

function ValueCard({ marker, title, desc, delay }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`about-value-card animate-on-scroll animate-delay-${delay} ${isVisible ? 'visible' : ''}`}
    >
      <span className="about-value-card__marker">{marker}</span>
      <h3 className="about-value-card__title">{title}</h3>
      <p className="about-value-card__desc">{desc}</p>
    </div>
  )
}

function SkillBar({ skill, isVisible }) {
  return (
    <div className="skill-item">
      <div className="skill-item__header">
        <span className="skill-item__name">{skill.name}</span>
        <span className="skill-item__level">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar__fill"
          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

function SkillGroup({ category, skills, isVisible, delay }) {
  const { ref, isVisible: groupVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`skill-group animate-on-scroll animate-delay-${delay} ${groupVisible ? 'visible' : ''}`}
    >
      <div className="skill-group__header">
        <span className={`badge ${categoryColors[category] || 'badge-rose'}`}>{category}</span>
      </div>
      <div className="skill-group__list">
        {skills.map(skill => (
          <SkillBar key={skill.id} skill={skill} isVisible={groupVisible && isVisible} />
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const [skills, setSkills] = useState(fallbackSkills)
  const { ref: bioRef, isVisible: bioVisible } = useScrollAnimation()
  const { ref: summaryRef, isVisible: summaryVisible } = useScrollAnimation()
  const { ref: evidenceRef, isVisible: evidenceVisible } = useScrollAnimation()
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation()

  useEffect(() => {
    getSkills()
      .then(data => { if (data?.length) setSkills(data) })
      .catch(() => { /* use fallback */ })
  }, [])

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="about">
      <section className="about-hero section">
        <div className="about-hero__bg" aria-hidden="true">
          <div className="about-hero__blob" />
        </div>
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <User size={12} />
              Tentang Saya
            </span>
            <h1 className="section-title">Mengenal Lenny Lebih Dekat</h1>
            <p className="section-subtitle">
              Perempuan penuh semangat yang percaya bahwa kecantikan, kreativitas,
              dan keberanian berwirausaha bisa berjalan beriringan.
            </p>
          </div>
        </div>
      </section>

      <section className="about-summary-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            ref={summaryRef}
            className={`about-summary animate-on-scroll ${summaryVisible ? 'visible' : ''}`}
          >
            <div className="about-summary__label">
              <span className="section-label">
                <BookOpen size={12} />
                Profil Profesional
              </span>
            </div>
            <div className="about-summary__card">
              <div className="about-summary__quote">"</div>
              <p className="about-summary__text">
                Saya <strong>Lenny Sundari Arnas</strong>, mahasiswi <strong>Ilmu Komunikasi</strong> asal Palembang
                yang memiliki pengalaman profesional di bidang kecantikan, administrasi, dan kewirausahaan.
                Sebagai mantan <strong>Beauty Advisor Paragon</strong> dan pemilik UMKM kuliner khas Palembang,
                saya menggabungkan keahlian komunikasi, estetika, dan jiwa wirausaha untuk menciptakan dampak
                positif di sekitar saya. Saya aktif sebagai <strong>Digital Creator</strong> yang percaya bahwa
                setiap perempuan berhak tampil percaya diri dan berdaya melalui kecantikan serta kreativitas.
              </p>
              <div className="about-summary__divider">- - -</div>
              <div className="about-summary__tags">
                <span className="badge badge-rose">Beauty Advisor</span>
                <span className="badge badge-peach">Digital Creator</span>
                <span className="badge badge-sage">Entrepreneur</span>
                <span className="badge badge-lavender">Ilmu Komunikasi</span>
                <span className="badge badge-rose">Palembang</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-evidence-section section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div
            ref={evidenceRef}
            className={`about-evidence animate-on-scroll ${evidenceVisible ? 'visible' : ''}`}
          >
            <div className="about-evidence__content">
              <span className="section-label" style={{ alignSelf: 'flex-start' }}>
                <ExternalLink size={12} />
                Bukti E-Portofolio
              </span>
              <h2 className="about-evidence__title">Link dan Screenshot Presentasi Diri</h2>
              <p className="about-evidence__desc">
                Website ini digunakan sebagai media siber untuk menampilkan profil profesional,
                pengalaman, keahlian, dan peluang kolaborasi tanpa membagikan data pribadi sensitif.
              </p>
              <div className="about-evidence__links">
                {evidenceLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="about-evidence-link"
                  >
                    <ExternalLink size={16} />
                    <span>
                      <strong>{link.label}</strong>
                      <small>{link.note}</small>
                    </span>
                  </a>
                ))}
              </div>
              <div className="about-privacy-note">
                <ShieldCheck size={18} />
                <span>
                  Privasi dijaga dengan menampilkan lokasi umum, tautan profesional, dan formulir kontak,
                  bukan nomor pribadi, alamat lengkap, NIK, tanggal lahir lengkap, atau data keluarga.
                </span>
              </div>
            </div>

            <div className="about-screenshot" aria-label="Screenshot tampilan website portofolio">
              <div className="about-screenshot__bar">
                <span />
                <span />
                <span />
              </div>
              <div className="about-screenshot__body">
                <div className="about-screenshot__badge">
                  <Camera size={14} />
                  Screenshot Website
                </div>
                <h3>Lenny Sundari Arnas</h3>
                <p>Beauty Advisor | Digital Creator | Entrepreneur</p>
                <div className="about-screenshot__grid">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div
            ref={bioRef}
            className={`about-bio animate-on-scroll ${bioVisible ? 'visible' : ''}`}
          >
            <div className="about-bio__photo">
              <div className="about-bio__photo-wrap">
                <div className="about-bio__avatar">
                  <span>LS</span>
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="about-bio__photo-img"
                    onError={(event) => { event.currentTarget.style.display = 'none' }}
                  />
                </div>
                <div className="about-bio__experience-badge">
                  <span className="about-bio__exp-num">ID</span>
                  <span className="about-bio__exp-label">Palembang,<br />Indonesia</span>
                </div>
              </div>
            </div>

            <div className="about-bio__content">
              <span className="section-label" style={{ alignSelf: 'flex-start' }}>
                <BookOpen size={12} />
                Kisah Saya
              </span>
              <h2 className="about-bio__title">
                Dari Palembang untuk
                <span className="text-gradient"> Dunia</span>
              </h2>
              <div className="about-bio__text">
                <p>
                  Halo! Perkenalkan, saya <strong>Lenny Sundari Arnas</strong>, perempuan asal
                  Palembang yang saat ini menempuh studi di jurusan
                  <strong> Ilmu Komunikasi</strong>. Saya percaya bahwa komunikasi adalah kunci
                  dari segala hal yang bermakna dalam kehidupan profesional maupun personal.
                </p>
                <p>
                  Perjalanan profesional saya dimulai sebagai <strong>Admin Klinik (2020-2022)</strong>,
                  di mana saya belajar tentang manajemen, layanan pelanggan, dan dunia
                  kesehatan kecantikan. Kemudian saya berkembang menjadi <strong>Beauty Advisor
                  Paragon (2022-2024)</strong>, salah satu brand kecantikan terbesar Indonesia,
                  di mana saya mengasah keahlian makeup, skincare, dan brand communication.
                </p>
                <p>
                  Di samping itu, saya juga seorang <strong>Digital Creator</strong> dan
                  entrepreneur yang mengelola usaha UMKM kuliner khas Palembang:
                  <strong> Cireng</strong> dan <strong>Pempek Tekwan</strong>.
                  Saya percaya setiap perempuan bisa berdaya dan menginspirasi.
                </p>
              </div>

              <div className="about-bio__traits">
                {['Beauty Expert', 'Digital Creator', 'Komunikator', 'Entrepreneur', 'Palembang Pride'].map(trait => (
                  <span key={trait} className="badge badge-rose">{trait}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-skills section">
        <div className="container">
          <div
            ref={skillsRef}
            className={`section-header animate-on-scroll ${skillsVisible ? 'visible' : ''}`}
          >
            <span className="section-label">
              <Sparkles size={12} />
              Keahlian
            </span>
            <h2 className="section-title">Skill &amp; Kompetensi</h2>
            <p className="section-subtitle">
              Keahlian yang diasah melalui pengalaman nyata, passion, dan dedikasi.
            </p>
          </div>

          <div className="about-skills__grid">
            {Object.entries(groupedSkills).map(([category, categorySkills], i) => (
              <SkillGroup
                key={category}
                category={category}
                skills={categorySkills}
                isVisible={skillsVisible}
                delay={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-values">
            <div className="about-values__content">
              <span className="section-label" style={{ alignSelf: 'flex-start' }}>
                <Sparkles size={12} />
                Nilai-Nilai Saya
              </span>
              <h2 className="about-values__title">
                Yang Mendorong Saya Maju
              </h2>
              <p className="about-values__desc">
                Saya percaya bahwa kecantikan bukan hanya tentang penampilan,
                tetapi tentang rasa percaya diri, ketulusan, dan keberanian
                untuk terus berkembang dan memberi dampak positif bagi orang lain.
              </p>
            </div>
            <div className="about-values__grid">
              {values.map((val, i) => (
                <ValueCard key={val.title} {...val} delay={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
