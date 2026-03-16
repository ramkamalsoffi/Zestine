import { useState, useEffect } from 'react';
import { useGsapAnimation } from '../../../hooks/useGsapAnimation';
import { heroRevealAnimation } from '../hooks/useHeroAnimation';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import NanoParticles from '../../../components/ui/NanoParticles';
import './HeroSection.css';

export function HeroSection() {
    const { elementRef: containerRef } = useGsapAnimation<HTMLDivElement>({ animation: heroRevealAnimation });
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showWhatsApp, setShowWhatsApp] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowWhatsApp(window.scrollY > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowScrollTop(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        const contactSection = document.getElementById('contact');
        if (contactSection) observer.observe(contactSection);
        return () => {
            if (contactSection) observer.unobserve(contactSection);
        };
    }, []);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <section id="hero" ref={containerRef} className="heroContainer">
                <div className="heroAnimBg">
                    <NanoParticles />
                </div>
                <div className="heroOverlay" />

                <div className="heroContent">
                    <div className="heroLeft">
                        <h1 className="heroTitle">
                            <span className="heroTitleDark">Engineering Intelligence.</span><br />
                            <span className="heroTitleRed">Amplified.</span>
                        </h1>
                        <p className="heroSubhead">
                            Built for the people designing<br />
                            the world we live in.
                        </p>
                    </div>
                    <div className="heroRight">
                        <p className="heroText">
                            Zestine helps AEC organizations move from fragmented
                            workflows to intelligent operations replacing repetitive
                            processes with systems that think, guide, and scale
                            with your projects.
                        </p>
                        <div className="heroButtons">
                            <button
                                className="btnPrimary"
                                onClick={() => {
                                    const el = document.getElementById('products');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Products
                            </button>
                            <button className="btnSecondary">Contact with experts</button>
                        </div>
                    </div>
                </div>
            </section>

            <a
                href="https://wa.me/+18322065663"
                className={`whatsappFloat ${showWhatsApp ? 'visible' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp />
            </a>

            <button
                className={`scrollTopFloat ${showScrollTop ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <FaArrowUp />
            </button>
        </>
    );
}

