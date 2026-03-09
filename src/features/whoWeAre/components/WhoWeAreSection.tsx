import { useRef } from 'react';
import blueprintImg from '../../../Images/who are we/Rectangle 7.png';
import buildingImg from '../../../Images/who are we/Rectangle 8.png';
import successImg from '../../../Images/who are we/Rectangle 9.png';
import { useWhoWeAreAnimation } from '../hooks/useWhoWeAreAnimation';
import './WhoWeAre.css';

export function WhoWeAreSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);

    // Arrays for refs
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const textsRef = useRef<(HTMLDivElement | null)[]>([]);

    useWhoWeAreAnimation({
        sectionRef,
        pinContainerRef,
        imagesRef,
        textsRef,
    });

    // Helper for ref assignment to satisfy valid return type
    const assignImageRef = (index: number) => (el: HTMLDivElement | null) => {
        imagesRef.current[index] = el;
    };
    const assignTextRef = (index: number) => (el: HTMLDivElement | null) => {
        textsRef.current[index] = el;
    };

    return (
        <section className="wwa-section" id="who-we-are" ref={sectionRef}>
            <div className="wwa-pin-container" ref={pinContainerRef}>
                <div className="wwa-bg-word" aria-hidden="true">ZESTINE</div>

                <div className="wwa-container">
                    <header className="wwa-header">
                        <h2 className="wwa-main-title">Who We Are</h2>
                    </header>

                    <div className="wwa-content-grid">

                        {/* Left Column: Images (Stacked) */}
                        <div className="wwa-image-col">
                            <div className="wwa-image-frame" ref={assignImageRef(0)}>
                                <img
                                    src={blueprintImg}
                                    alt="Engineering blueprint"
                                />
                            </div>
                            <div className="wwa-image-frame" ref={assignImageRef(1)}>
                                <img
                                    src={buildingImg}
                                    alt="Corporate building"
                                />
                            </div>
                            <div className="wwa-image-frame" ref={assignImageRef(2)}>
                                <img
                                    src={successImg}
                                    alt="Team success"
                                />
                            </div>
                        </div>

                        {/* Right Column: Texts (Stacked) */}
                        <div className="wwa-text-col">
                            {/* Block 1 */}
                            <div className="wwa-text-content wwa-stacked-text" ref={assignTextRef(0)}>
                                <h3 className="wwa-heading">
                                    <span className="letter-wrapper"><span className="red-circle"></span>B</span>orn in Engineering. Built<br />for Operations.
                                </h3>
                                <div className="wwa-paragraphs">
                                    <p>Zestine was built by professionals who lived those workflows first.</p>
                                    <p>It started inside an engineering office where highly capable teams were still caught in manual coordination, disconnected data, and repetitive execution.</p>
                                </div>
                            </div>

                            {/* Block 2 */}
                            <div className="wwa-text-content wwa-stacked-text" ref={assignTextRef(1)}>
                                <h3 className="wwa-heading">
                                    <span className="letter-wrapper"><span className="red-circle"></span>D</span>espite powerful AEC tools, real-world project<br />delivery remained slowed by:
                                </h3>
                                <ul className="wwa-list">
                                    <li><span className="letter-wrapper"><span className="red-circle small"></span>W</span>orkflow friction</li>
                                    <li><span className="letter-wrapper"><span className="red-circle small"></span>I</span>mplementation gaps</li>
                                    <li><span className="letter-wrapper"><span className="red-circle small"></span>M</span>anual documentation</li>
                                    <li><span className="letter-wrapper"><span className="red-circle small"></span>R</span>epetitive operational tasks</li>
                                </ul>
                            </div>

                            {/* Block 3 */}
                            <div className="wwa-text-content wwa-stacked-text" ref={assignTextRef(2)}>
                                <h3 className="wwa-heading">
                                    <span className="letter-wrapper"><span className="red-circle"></span>W</span>e saw a disconnect.
                                </h3>
                                <div className="wwa-paragraphs spacing-sm">
                                    <p>Software was being built for engineering - without engineering.</p>
                                    <p>So we reversed the model.</p>
                                    <p>Domain experts led the design.</p>
                                    <p>Technology became the accelerator. What began as internal tools to reduce coordination effort quickly became adopted by BIM professionals across projects - shaping the foundation for scalable digital systems built around engineering reality.</p>
                                    <p>Today, Zestine builds intelligent platforms that help AEC teams operate with clarity, precision, and control - from model governance to data coordination.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
