import { useRef, useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import zeManageIcon from '../../../Images/product/logo/Ze manage.png';
import zeFacilityIcon from '../../../Images/product/logo/Ze facility.png';
import zeConnectIcon from '../../../Images/product/logo/Ze connect_png.png';
import zbgImg from '../../../Images/product/product bg z.png';
import zemanageImg from '../../../Images/product/zemanage.jpg';
import zefacilityImg from '../../../Images/product/zefacility.jpg';
import zeManageOutline from '../../../Images/product/logo/Ze manage.png';
import zeFacilityOutline from '../../../Images/product/outline logos/Zefacily final_outline & white logo-01.png';
import zeConnectOutline from '../../../Images/product/outline logos/ze connect_outline & white logo-01.png';
import clrbgImg from '../../../Images/product/clrbg.png';
import './ProductsSection.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PRODUCTS = [
    {
        id: 'zemanage',
        label: 'ZeManage',
        description:
            'Govern BIM environments in real-time with centralized monitoring and standards enforcement, without interrupting design workflows.',
        bg: '#ffffff',
        cardBg: '#ffffff',
        textColor: '#0f172a',
        subTextColor: '#475569',
        badgeBg: '#ffe4e6',      // light red-pink pill
        badgeText: '#f43f5e',
        downloadBg: '#f04141',   // Red button
        downloadText: '#ffffff',
        downloadBorder: 'none',
        tabAccent: '#0f172a',
        logo: zeManageOutline,
        tabLogo: zeManageIcon,
        zFilter: 'brightness(0) invert(1) opacity(0.15)',
        image: zemanageImg,
        bgImage: clrbgImg,
    },
    {
        id: 'zefacility',
        label: 'ZeFacility',
        description:
            'Automate schedules, space creation, and documentation to simplify data coordination across project teams.',
        bg: '#074C91',
        cardBg: '#074C91',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.75)',
        badgeBg: '#ffffff',      // white pill on blue card
        badgeText: '#111827',    // dark text
        downloadBg: '#ffffff',   // White button
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#1a4490',
        logo: zeFacilityOutline,
        tabLogo: zeFacilityIcon,
        image: zefacilityImg,
        bgImage: zbgImg,
    },
    {
        id: 'zeconnect',
        label: 'ZeConnect',
        description:
            'Streamline model export and link management with intelligent cloud-enabled integrations.',
        bg: '#FC424F',
        cardBg: '#FC424F',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.80)',
        badgeBg: '#ffffff',      // white pill on red card
        badgeText: '#111827',    // dark text
        downloadBg: '#ffffff',   // White button
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#f04141',
        logo: zeConnectOutline,
        tabLogo: zeConnectIcon,
        image: zemanageImg,
        bgImage: zbgImg,
    },
];

// Each card gets: 1 unit hold + 1 unit transition, plus a final hold for the last card
// GSAP scrub maps the total timeline duration to the total scroll distance evenly.
// So each "chapter" gets exactly equal scroll space = totalScrollVh / totalDuration

export function ProductsSection() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const activeIndexRef = useRef(0);
    const lastScrollRef = useRef(Date.now());
    const [activeTab, setActiveTabState] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Auto-advance logic
    useEffect(() => {
        const handleInteraction = () => {
            lastScrollRef.current = Date.now();
        };

        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        const interval = setInterval(() => {
            const now = Date.now();
            const idleTime = now - lastScrollRef.current;

            // 12 seconds of idle
            if (idleTime >= 12000) {
                const trigger = ScrollTrigger.getById('products-trigger');
                if (trigger && trigger.isActive) {
                    const nextIndex = (activeIndexRef.current + 1) % PRODUCTS.length;
                    handleTabClick(nextIndex);
                    // Reset timer so it doesn't immediately trigger again
                    lastScrollRef.current = now;
                }
            }
        }, 2000); // Check every 2s

        return () => {
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            clearInterval(interval);
        };
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        setIsSubmitted(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Add a slight delay before resetting form state to allow close animation (if any)
        setTimeout(() => setIsSubmitted(false), 300);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    const setActiveTab = (index: number) => {
        activeIndexRef.current = index;
        setActiveTabState(index);
        tabRefs.current.forEach((tab, i) => {
            if (!tab) return;
            const isActive = i === index;
            tab.style.borderColor = isActive ? PRODUCTS[i].tabAccent : 'transparent';
            tab.style.color = isActive ? PRODUCTS[i].tabAccent : '#6b7280';
            tab.style.fontWeight = isActive ? '600' : '400';
        });
    };

    const handleTabClick = (index: number) => {
        if (!wrapperRef.current) return;

        // Calculate the progress needed for this card
        const numChapters = 2 * (PRODUCTS.length - 1) + 1;
        // The center of the hold chapter for card index `i` is at chapter `2*i`.
        // We add 0.5 to land perfectly in the middle of it.
        const chapterCenter = 2 * index + 0.5;
        let progress = chapterCenter / numChapters;

        // Minor tweak since index 0 might just be top, index 2 might be bottom
        if (index === 0) progress = 0.05;
        if (index === PRODUCTS.length - 1) progress = 0.95;

        // Try to get precise scroll via ScrollTrigger, otherwise fallback
        const trigger = ScrollTrigger.getAll().find(t => t.trigger === wrapperRef.current);

        if (trigger) {
            const scrollY = trigger.start + (trigger.end - trigger.start) * progress;
            gsap.to(window, { duration: 1, scrollTo: scrollY, ease: 'power2.out' });
        } else {
            const startY = wrapperRef.current.offsetTop;
            const scrollDistance = wrapperRef.current.offsetHeight - window.innerHeight;
            const scrollY = startY + (scrollDistance * progress);
            gsap.to(window, { duration: 1, scrollTo: scrollY, ease: 'power2.out' });
        }
    };

    useGSAP(() => {
        if (!wrapperRef.current || !stickyRef.current) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        // Stack all cards: first one visible, rest hidden below (slide only, no fade)
        gsap.set(cards, { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });
        gsap.set(cards[0], { y: 0, opacity: 1, scale: 1, zIndex: 10 });
        cards.slice(1).forEach((card, i) => {
            gsap.set(card, { y: '150vh', opacity: 1, scale: 1, zIndex: 10 + i + 1 });
        });

        // Single timeline covering the entire sticky scroll range
        // Structure: [hold card0] [transition 0→1] [hold card1] [transition 1→2] ... [hold lastCard]
        // Each phase has duration: 1, so total = 2*(n-1) + 1 units for n cards
        // Initialise first tab as active
        setActiveTab(0);

        const tl = gsap.timeline({
            scrollTrigger: {
                id: 'products-trigger',
                trigger: wrapperRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
                refreshPriority: 5, // Calculate after WhoWeAre pin space
                onUpdate: (self) => {
                    // There are 3 cards, so progress maps linearly:
                    // 0.0 - 0.33 -> 0
                    // 0.33 - 0.66 -> 1
                    // 0.66 - 1.0 -> 2
                    let newIndex = Math.min(
                        cards.length - 1,
                        Math.floor(self.progress * cards.length)
                    );

                    if (activeIndexRef.current !== newIndex) {
                        setActiveTab(newIndex);
                    }
                }
            }
        });

        // Build the timeline chapters
        // Timeline sequence: [hold card0] → [0→1 transition] → [hold card1] → [1→2 transition] → [hold card2]
        // Rule: hold plays sequentially (no position), transition pairs use '<' only on prevCard
        cards.forEach((card, index) => {
            if (index === 0) {
                // First card: just hold it visible
                tl.to({}, { duration: 1 });
                return;
            }

            const prevCard = cards[index - 1];

            // ── Transition phase: incoming card slides up from below (no fade) ──
            tl.to(card, {
                y: 0,
                duration: 1,
                ease: 'power2.inOut',
            });

            // Previous card slides up and out — concurrent with incoming card (no fade)
            tl.to(prevCard, {
                scale: 0.95,
                y: -10, // Reduced from -80 to prevent overlapping the tabs menu
                duration: 1,
                ease: 'power2.inOut',
            }, '<');

            // ── Hold phase: new card is fully visible, nothing moves ──
            tl.to({}, { duration: 1 });
        });

    }, { scope: wrapperRef });

    // Wrapper height = (2*(n-1) + 1) chapters × 100vh each
    // So: 3 cards → 5 chapters → 500vh total
    const numChapters = 2 * (PRODUCTS.length - 1) + 1;
    const totalScrollVh = numChapters * 100;

    return (
        /* Outer wrapper: sets the total scroll distance so next section is pushed down */
        <div
            id="products"
            ref={wrapperRef}
            className="ps-scroll-wrapper"
            style={{ height: `${totalScrollVh}vh` }}
        >
            {/* Inner sticky pane: stays fixed while outer wrapper scrolls */}
            <div ref={stickyRef} className="ps-sticky-pane">
                {/* Tab row: active tab border matches the current card accent */}
                <div className="ps-tabs">
                    {PRODUCTS.map((prod, i) => {
                        // Calculate CSS order to keep active tab in center (order 2)
                        // This ensures that regardless of which index is active, 
                        // it stays in the middle of the 3-tab layout.
                        let order = 1;
                        if (i === activeTab) {
                            order = 2; // Middle
                        } else if (i === (activeTab + 1) % PRODUCTS.length) {
                            order = 3; // Right
                        } else {
                            order = 1; // Left
                        }

                        return (
                            <div
                                key={prod.id}
                                className={`ps-tab-wrapper ${i !== activeTab ? 'ps-tab-hidden-mobile' : ''}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    order: order
                                }}
                                onClick={() => handleTabClick(i)}
                            >
                                <img
                                    src={prod.tabLogo}
                                    alt=""
                                    className={`ps-tab-logo ${i !== activeTab ? 'ps-tab-logo-inactive' : ''}`}
                                />
                                <button
                                    ref={(el) => { if (el) tabRefs.current[i] = el; }}
                                    className="ps-tab"
                                    style={{
                                        color: i === activeTab ? prod.tabAccent : '#6b7280',
                                        borderColor: i === activeTab ? prod.tabAccent : 'transparent',
                                        fontWeight: i === activeTab ? '600' : '400',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    {prod.label}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="ps-cards-container">
                    {PRODUCTS.map((p, i) => (
                        <div
                            ref={(el) => { if (el) cardRefs.current[i] = el; }}
                            className="ps-card"
                            key={p.id}
                            style={(() => {
                                const bg = 'bgImage' in p ? (p as any).bgImage : null;
                                return {
                                    background: bg
                                        ? `url('${bg}') 70% center / 35% no-repeat, ${p.cardBg}`
                                        : p.cardBg
                                };
                            })()}
                        >
                            {/* Top row: badge + logo */}
                            <div className="ps-card-top">
                                <span
                                    className="ps-badge"
                                    style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                                >
                                    Product
                                </span>
                                <img src={p.logo} alt="Zestine logo" className="ps-logo" />
                            </div>

                            {/* Product name */}
                            <h2 className="ps-product-name" style={{ color: p.textColor }}>
                                {p.label}
                            </h2>

                            {/* Bottom row: text + image */}
                            <div className="ps-card-bottom">
                                <div className="ps-card-text">
                                    <p className="ps-description" style={{ color: p.subTextColor }}>
                                        {p.description}
                                    </p>
                                    <button
                                        className="ps-download-btn btn-zestine"
                                        onClick={openModal}
                                        style={{
                                            border: p.downloadBorder,
                                        }}
                                    >
                                        Download <FaDownload />
                                    </button>
                                </div>

                                {/* Tilted image */}
                                <div className="ps-image-wrap">
                                    <img src={p.image} alt={p.label} className="ps-product-image" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Download Form Modal Overlay */}
            {isModalOpen && (
                <div className="ps-modal-overlay">
                    <div className="ps-modal-content">
                        <button className="ps-modal-close" onClick={closeModal}>
                            <FaTimes />
                        </button>

                        {!isSubmitted ? (
                            <>
                                <h3 className="ps-modal-title">Download Request</h3>
                                <p className="ps-modal-desc">Please fill out the form below to initiate your download.</p>

                                <form className="ps-modal-form" onSubmit={handleFormSubmit}>
                                    <div className="ps-form-group">
                                        <input type="text" placeholder="Name" required className="ps-form-input" />
                                    </div>
                                    <div className="ps-form-group">
                                        <input type="email" placeholder="Email" required className="ps-form-input" />
                                    </div>
                                    <div className="ps-form-group">
                                        <input type="text" placeholder="Company" required className="ps-form-input" />
                                    </div>
                                    <div className="ps-form-group">
                                        <input type="text" placeholder="Location" required className="ps-form-input" />
                                    </div>
                                    <button type="submit" className="ps-form-submit btn-zestine">
                                        Submit
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="ps-modal-success">
                                <FaCheckCircle className="ps-success-icon" />
                                <h3 className="ps-modal-title">Download Ready!</h3>
                                <p className="ps-modal-desc">Your download will begin shortly. Thank you for choosing Zestine.</p>
                                <button className="ps-form-submit btn-zestine" onClick={closeModal} style={{ marginTop: '2rem' }}>
                                    Okay
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
