import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
]

const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C12 2 10 7 7 9C4 11 2 12 2 12C2 12 4 13 7 15C10 17 12 22 12 22C12 22 14 17 17 15C20 13 22 12 22 12C22 12 20 11 17 9C14 7 12 2 12 2Z"/>
  </svg>
)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" id="navbar-logo">
          <div className="navbar__logo-icon">
            <LogoIcon />
          </div>
          <span className="navbar__logo-text">
            <span className="text-gradient">Lenny</span>
            <span className="navbar__logo-sub"> Sundari</span>
          </span>
        </NavLink>

        <nav className="navbar__links" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={link.path === '/'}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <NavLink to="/contact" className="btn btn-primary btn-sm" id="nav-cta">
            Hubungi Saya
          </NavLink>
          <button
            className="navbar__burger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="nav-burger"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
            end={link.path === '/'}
            id={`nav-mobile-${link.label.toLowerCase()}`}
          >
            {link.label}
          </NavLink>
        ))}
        <NavLink to="/contact" onClick={() => setIsOpen(false)} className="btn btn-primary" id="nav-mobile-cta">
          Hubungi Saya
        </NavLink>
      </div>
    </header>
  )
}
