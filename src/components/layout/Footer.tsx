import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logoImg from '../../Images/logo/Group 174.png';
import footerPattern from '../../Images/footer/Group 162.png';
import './Footer.css';

import gsap from 'gsap';

export function Footer() {


    return (
        <footer id="footer" className="footer-container" style={{ backgroundColor: '#002145' }}>
            <div className="footer-backgrounds">
                {/* Background Pattern overlaying the entire footer */}
                <div
                    className="footer-pattern"
                    style={{ '--bg-pattern': `url('${footerPattern}')` } as React.CSSProperties}
                />


            </div>

            <div className="footer-content">
                {/* Top Section - Grid */}
                <div className="footer-grid">
                    {/* Column 1: Logo & Description */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo">
                            <img src={logoImg} alt="Zestine" />
                        </Link>
                        <p className="footer-description">
                            Engineering-first SaaS products designed for real-world AEC project workflows.
                        </p>
                        <div className="footer-socials">
                            <a href="#"><FaXTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaYoutube /></a>
                            <a href="https://www.linkedin.com/company/zestine-technologies/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div className="footer-col nav-col">
                        <h3 className="footer-heading">Explore</h3>
                        <div className="footer-heading-underline" />
                        <nav className="footer-nav">
                            <a href="#hero" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('hero');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Home</a>
                            <a href="#who-we-are" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('who-we-are');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Who We Are</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('products');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Products</a>
                            <a href="#contact" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById('contact');
                                if (el) gsap.to(window, { duration: 1, scrollTo: el, ease: 'power3.inOut' });
                            }}>Contact us</a>
                        </nav>
                    </div>

                    {/* Column 3: Products */}
                    <div className="footer-col nav-col">
                        <h3 className="footer-heading">Products</h3>
                        <div className="footer-heading-underline" />
                        <nav className="footer-nav">
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('zestine-navigate-product', { detail: { index: 0 } }));
                            }}>ZeManage</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('zestine-navigate-product', { detail: { index: 1 } }));
                            }}>ZeFacility</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('zestine-navigate-product', { detail: { index: 2 } }));
                            }}>ZeConnect</a>
                            <a href="#products" onClick={(e) => {
                                e.preventDefault();
                                window.dispatchEvent(new CustomEvent('zestine-navigate-product', { detail: { index: 3 } }));
                            }}>ZeDiag</a>
                        </nav>
                    </div>

                    {/* Column 4: Locations */}
                    <div className="footer-col location-col">
                        <h3 className="footer-heading">Find us at</h3>
                        <div className="footer-heading-underline" />
                        <ul className="footer-list">
                            <li><FaMapMarkerAlt className="footer-icon" /> 295 Millers Run Rd Ste 2 Bridgeville, <br />PA, 15017-1361 United States</li>
                        </ul>
                    </div>

                    {/* Column 5: Contact */}
                    <div className="footer-col contact-col">
                        <h3 className="footer-heading">Contact Us</h3>
                        <div className="footer-heading-underline" />
                        <ul className="footer-list">
                            <li><FaPhoneAlt className="footer-icon" /> <a href="tel:+18322069137" className="footer-link">+1 832 206 9137</a></li>
                            <li><FaPhoneAlt className="footer-icon" /> <a href="tel:+18322065663" className="footer-link">+1 832 206 5663</a></li>
                            <li><FaEnvelope className="footer-icon" /> <a href="mailto:info@zestinetech.com" className="footer-link">info@zestinetech.com</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Action Card */}
                <div className="footer-action-card">
                    <div className="action-col">
                        <h2>Get in touch with us</h2>
                        <p>Have questions about Zestine? Our team is ready to help!</p>
                    </div>
                    <div className="action-col flex-row">
                        <div className="action-item">
                            <span className="action-label">Email</span>
                            <a href="mailto:info@zestinetech.com" className="action-value footer-link">
                                <FaEnvelope />
                                info@zestinetech.com
                            </a>
                        </div>
                        <div className="action-item">
                            <span className="action-label">Phone Number</span>
                            <a href="tel:+18322069137" className="action-value footer-link">
                                <FaPhoneAlt />
                                +1 832 206 9137
                            </a>
                        </div>
                    </div>
                </div>
            </div>


        </footer>
    );
}
