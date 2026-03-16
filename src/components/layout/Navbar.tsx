import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../Images/logo/color-logo.png';
import './Navbar.css';

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setIsMobileMenuOpen(false); // Close menu on mobile after clicking
        }
    };

    // A simple intersection observer to update active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'who-we-are', 'products', 'testimonials', 'contact', 'footer'];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If the section is near the top of the viewport
                    if (rect.top >= -200 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar navbar--visible">
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={() => scrollToSection('hero')}>
                <img src={logoImg} alt="Zestine Logo" className="navbar-logo" />
            </Link>

            <button className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                <li>
                    <button
                        className={`nav-link ${activeSection === 'who-we-are' ? 'active' : ''}`}
                        onClick={() => scrollToSection('who-we-are')}
                    >
                        Who we are
                    </button>
                </li>
                <li>
                    <button
                        className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}
                        onClick={() => scrollToSection('products')}
                    >
                        Products
                    </button>
                </li>
                <li>
                    <button
                        className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`}
                        onClick={() => scrollToSection('testimonials')}
                    >
                        Testimonials
                    </button>
                </li>
                <li>
                    <button
                        className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                        onClick={() => scrollToSection('contact')}
                    >
                        Contact us
                    </button>
                </li>
                <li>
                    <button className="nav-btn" onClick={() => scrollToSection('contact')}>
                        Book a Meeting
                    </button>
                </li>
            </ul>
        </nav>
    );
}
