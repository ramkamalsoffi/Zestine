import { useRef, useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { sendProductRequestEmail } from '../../../services/emailService';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import zeManageIcon from '../../../Images/product/logo/Ze manage.png';
import zeFacilityIcon from '../../../Images/product/logo/Ze facility.png';
import zeConnectIcon from '../../../Images/product/logo/Ze connect_png.png';
import zemanageImg from '../../../Images/product/zemanage.jpg';
import zColorLogo from '../../../Images/product/logo-color.png';
import zBWLogo from '../../../Images/product/logo = bw.png';
import zeManageOutline from '../../../Images/product/logo/Ze manage.png';
import zeFacilityOutline from '../../../Images/product/outline logos/Zefacily final_outline & white logo-01.png';
import zeConnectOutline from '../../../Images/product/outline logos/ze connect_outline & white logo-01.png';
import zeDiagTopLogo from '../../../Images/product/outline logos/Ze Diag Logo.png';
import zeDiagBgLogo from '../../../Images/product/outline logos/Ze Diag Inverse Logo Png.png';
import zeConnectGif from '../../../Images/product/GIF Animation Final/GIF_animation-ZE-CONNECT.gif';
import zeDiagGif from '../../../Images/product/GIF Animation Final/GIF_animation-ZE-DIAG.gif';
import zeFacilityGif from '../../../Images/product/GIF Animation Final/GIF_animation-ZE-FACILITY.gif';
import './ProductsSection.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PRODUCTS = [
    {
        id: 'zemanage',
        label: 'ZeManage',
        description:
            'An intelligent BIM platform that improves model performance and streamlines workflows. By revealing potential issues early, it helps teams mitigate risks proactively and maintain efficient, reliable BIM project environments.',
        tagline: 'Clear visibility, confident project delivery.\nSmarter BIM environments, lower project risks.\nProactive insights, automate workflows.',
        bg: '#ffffff',
        cardBg: '#ffffff',
        textColor: '#0f172a',
        subTextColor: '#475569',
        badgeBg: '#ffe4e6',
        badgeText: '#f43f5e',
        downloadBg: '#f04141',
        downloadText: '#ffffff',
        downloadBorder: 'none',
        tabAccent: '#0f172a',
        logo: zColorLogo,
        tabLogo: zeManageIcon,
        btnText: 'Join Waitlist',
        status: 'Coming soon!!',
        zFilter: 'grayscale(1) opacity(0.7)',
        image: zemanageImg,
        bgImage: zeManageOutline,
    },
    {
        id: 'zefacility',
        label: 'ZeFacility',
        description:
            'Automate schedule generation, import/export data, and manage spaces effortlessly across Revit models with intuitive controls.',
        tagline: 'Smarter schedules, simpler facility management.\nOrganized spaces, automated workflows.\nStructured COBie data, smoother operations.',
        bg: '#074C91',
        cardBg: '#074C91',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.75)',
        badgeBg: '#ffffff',
        badgeText: '#111827',
        downloadBg: '#ffffff',
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#1a4490',
        logo: zBWLogo,
        tabLogo: zeFacilityIcon,
        btnText: 'Join Waitlist',
        status: 'Coming soon!!',
        image: zeFacilityGif,
        bgImage: zeFacilityOutline,
    },
    {
        id: 'zeconnect',
        label: 'ZeConnect',
        description:
            'Streamline Revit workflows by exporting 3D views and managing links effortlessly, all from a centralized BIM hub.',
        tagline: 'Seamless connections, smarter workflows.\nConnect teams, simplify processes.\nOne link, total control.',
        bg: '#FC424F',
        cardBg: '#FC424F',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.80)',
        badgeBg: '#ffffff',
        badgeText: '#111827',
        downloadBg: '#ffffff',
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#f04141',
        logo: zBWLogo,
        tabLogo: zeConnectIcon,
        btnText: 'Join Waitlist',
        status: 'Coming soon!!',
        image: zeConnectGif,
        bgImage: zeConnectOutline,
    },
    {
        id: 'zediag',
        label: 'ZeDiag',
        description:
            'Instantly diagnose Revit crashes by analyzing journal files and uncover recurring issues without manual log scanning.',
        tagline: 'Turn crash logs into insights.\nDiagnose Revit issues instantly.\nUnderstand crashes. Fix faster.',
        bg: '#7eba00',
        cardBg: '#7eba00',
        textColor: '#ffffff',
        subTextColor: 'rgba(255,255,255,0.75)',
        badgeBg: '#ffffff',
        badgeText: '#111827',
        downloadBg: '#ffffff',
        downloadText: '#111827',
        downloadBorder: 'none',
        tabAccent: '#7eba00',
        logo: zBWLogo,
        tabLogo: zeDiagTopLogo,
        btnText: 'Know More',
        status: 'Fast Growing',
        image: zeDiagGif,
        bgImage: zeDiagBgLogo,
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
    const [taglineIndex, setTaglineIndex] = useState(0);

    // Dynamic Tagline Rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % 3); // All products have 3 taglines
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Auto-advance logic
    useEffect(() => {
        const handleInteraction = () => {
            lastScrollRef.current = Date.now();
        };

        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        const interval = setInterval(() => {
            if (isModalOpen) {
                lastScrollRef.current = Date.now(); // Keep resetting while modal is open
                return;
            }

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
    }, [isModalOpen]);

    const openModal = () => {
        lastScrollRef.current = Date.now();
        setIsModalOpen(true);
        setIsSubmitted(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Add a slight delay before resetting form state to allow close animation (if any)
        setTimeout(() => setIsSubmitted(false), 300);
    };

    const [isError, setIsError] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            company: formData.get('company') as string,
            location: formData.get('location') as string,
            product: PRODUCTS[activeTab].label,
        };

        try {
            const response = await sendProductRequestEmail(data);

            if (response.status === 200) {
                setIsSubmitted(true);
                setIsError(false);
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setIsError(true);
        }
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
                    const totalDuration = 2 * (cards.length - 1) + 1;
                    const currentTime = self.progress * totalDuration;

                    // Each card i gets a hold at [2*i - 0.5, 2*i + 1.5]
                    // This is a robust way to map currentTime to activeIndex
                    let newIndex = Math.floor((currentTime + 0.5) / 2);
                    newIndex = Math.max(0, Math.min(newIndex, cards.length - 1));

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
    // So: 4 cards → 7 chapters → 700vh total
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
                        return (
                            <div
                                key={prod.id}
                                className="ps-tab-wrapper"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleTabClick(i)}
                            >
                                <img
                                    src={prod.tabLogo}
                                    alt=""
                                    className={`ps-tab-logo ${i !== activeTab ? 'ps-tab-logo-inactive' : ''}`}
                                    style={{
                                        width: prod.id === 'zediag' ? '70px' : '100px',
                                        height: 'auto'
                                    }}
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
                            style={{ backgroundColor: p.cardBg }}
                        >
                            {/* Background Logo Overlay */}
                            <div
                                className="ps-card-bg-logo"
                                style={{
                                    backgroundImage: `url('${(p as any).bgImage}')`,
                                    filter: p.id === 'zemanage' ? (p as any).zFilter : 'none'
                                }}
                            />
                            {/* Top row: badge + logo */}
                            <div className="ps-card-top">
                                <span
                                    className="ps-badge"
                                    style={{ backgroundColor: p.badgeBg, color: p.badgeText }}
                                >
                                    {(p as any).status || 'Product'}
                                </span>
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
                                        onClick={() => {
                                            if (p.id === 'zediag') {
                                                window.location.href = 'http://www.zestinetech.com/products/zediag';
                                            } else {
                                                openModal();
                                            }
                                        }}
                                        style={{
                                            border: p.downloadBorder,
                                        }}
                                    >
                                        {(p as any).btnText || 'Action'}{' '}
                                        {p.id === 'zediag' ? <FiArrowUpRight /> : <FaDownload />}
                                    </button>
                                </div>

                                {/* Right Side: Tagline Block + Image */}
                                <div className="ps-card-right">
                                    {/* Dynamic Tagline Standalone Block - straightened for all products */}
                                    {p.tagline && (
                                        <div className="ps-dynamic-tagline-block ps-tagline-straight">
                                            {p.tagline.split('\n').map((line: string, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className={`ps-dynamic-tagline-item ${idx === taglineIndex ? 'active' : ''}`}
                                                    style={{ color: p.textColor }}
                                                >
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tilted image - straightened and moved up for all products */}
                                    <div className="ps-image-wrap ps-image-straight">
                                        <img src={p.image} alt={p.label} className="ps-product-image" />
                                    </div>
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
                                <h3 className="ps-modal-title">
                                    {PRODUCTS[activeTab].btnText === 'Join Waitlist'
                                        ? `${PRODUCTS[activeTab].label} is Coming Soon!`
                                        : `Request for ${PRODUCTS[activeTab].label}`}
                                </h3>
                                <p className="ps-modal-desc">
                                    {PRODUCTS[activeTab].btnText === 'Join Waitlist'
                                        ? 'Please fill out the form to join the waitlist.'
                                        : 'Please fill out the form to get in touch.'}
                                </p>

                                <form className="ps-modal-form" onSubmit={handleFormSubmit}>
                                    <div className="ps-form-group">
                                        <input name="name" type="text" placeholder="Name *" required className="ps-form-input" />
                                    </div>
                                    <div className="ps-form-group">
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Email *"
                                            required
                                            className="ps-form-input"
                                            onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('please enter proper email')}
                                            onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                                        />
                                    </div>
                                    <div className="ps-form-group">
                                        <input name="company" type="text" placeholder="Company *" required className="ps-form-input" />
                                    </div>
                                    <div className="ps-form-group">
                                        <input name="location" type="text" placeholder="Location" className="ps-form-input" />
                                    </div>
                                    {isError && <p className="ps-form-error">Failed to send request. Please try again.</p>}
                                    <button type="submit" className="ps-form-submit btn-zestine">
                                        Submit
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="ps-modal-success">
                                <FaCheckCircle className="ps-success-icon" />
                                <h3 className="ps-modal-title">
                                    {PRODUCTS[activeTab].btnText === 'Join Waitlist'
                                        ? 'Waitlist Joined!'
                                        : 'Request Received!'}
                                </h3>
                                <p className="ps-modal-desc">
                                    {PRODUCTS[activeTab].btnText === 'Join Waitlist'
                                        ? `Thank you for your interest. We will notify you when ${PRODUCTS[activeTab].label} is ready.`
                                        : PRODUCTS[activeTab].id === 'zediag'
                                            ? `Thank you. Our team will contact you soon with more details about ${PRODUCTS[activeTab].label}.`
                                            : `Thank you. We have received your request for ${PRODUCTS[activeTab].label} and will get back to you shortly.`}
                                </p>
                                <button
                                    className="ps-form-submit btn-zestine"
                                    onClick={closeModal}
                                    style={{ marginTop: '2rem' }}
                                >
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
