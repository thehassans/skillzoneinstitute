import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isActive = (path) => location.pathname === path

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.png" alt="Skill Zone Institutes" />
                    <span>Skill Zone</span>
                </Link>

                <ul className={`navbar-nav ${mobileOpen ? 'open' : ''}`}>
                    <li>
                        <Link
                            to="/"
                            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/courses"
                            className={`navbar-link ${isActive('/courses') || location.pathname.startsWith('/courses/') ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                <div className="navbar-actions">
                    <a href="tel:+923167471183" className="navbar-phone">
                        <span className="phone-icon">📞</span>
                        <span className="phone-number">+923167471183</span>
                    </a>
                    <Link to="/courses" className="btn btn-primary">Get Started</Link>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
