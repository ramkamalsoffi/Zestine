import { lazy, Suspense, useState, useEffect } from 'react';
import { useGsapAnimation } from '../../../hooks/useGsapAnimation';
import { heroRevealAnimation } from '../hooks/useHeroAnimation';
import { FaWhatsapp } from 'react-icons/fa';
import './HeroSection.css';

// Lazy-load the heavy Three.js canvas so it doesn't block the initial render
const Antigravity = lazy(() => import('../../../components/3d/Antigravity'));

export function HeroSection() {
    const { elementRef: containerRef } = useGsapAnimation<HTMLDivElement>({ animation: heroRevealAnimation });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <section ref={containerRef} className="heroContainer">

                {/* ── Full-screen Antigravity animation background ── */}
                <div className="heroAnimBg">
                    <Suspense fallback={<div className="heroAnimFallback" />}>
                        <Antigravity
                            count={isMobile ? 150 : 500}
                            magnetRadius={10}
                            ringRadius={10}
                            waveSpeed={0.4}
                            waveAmplitude={3.4}
                            particleSize={0.5}
                            lerpSpeed={0.1}
                            color="#FC424F"
                            color2="#033465"
                            autoAnimate={false}
                            particleVariance={1}
                            rotationSpeed={0}
                            depthFactor={1}
                            pulseSpeed={3}
                            particleShape="capsule"
                            fieldStrength={10}
                        />
                    </Suspense>
                </div>

                {/* ── Dark overlay to keep text readable over animation ── */}
                <div className="heroOverlay" />

                {/* ── Text content — centered ── */}
                <div className="heroContent">
                    <h1 className="heroTitle">
                        Engineering Intelligence.<br />Amplified.
                    </h1>
                    <p className="heroSubhead">
                        Built for the people designing the world we live in.
                    </p>
                    <p className="heroText">
                        Zestine helps AEC organizations move from fragmented workflows
                        to intelligent operations — replacing repetitive processes with
                        systems that think, guide, and scale with your projects.
                    </p>
                    <div className="heroButtons">
                        <button className="btnPrimary">Products</button>
                        <button className="btnSecondary">Connect with Experts</button>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp button */}
            <a
                href="https://wa.me/something"
                className="whatsappFloat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp />
            </a>
        </>
    );
}
