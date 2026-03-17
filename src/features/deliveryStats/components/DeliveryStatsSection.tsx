import React, { useEffect, useRef, useState } from 'react';
import './DeliveryStatsSection.css';

const STATS = [
    { value: '10+', label: 'Years on AEC' },
    { value: '30%', label: 'project costs are reduced' },
    { value: '2000+', label: 'Trusted Users' },
    { value: '100%', label: 'AEC-Focused' },
    { value: '90%', label: 'of manual workflows automated' },
    { value: '5★', label: 'Client Satisfaction' },
];

export const DeliveryStatsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !listRef.current) return;

        // Clone all children to create the seamless loop
        const children = Array.from(listRef.current.children);
        children.forEach((child) => {
            const clone = child.cloneNode(true) as HTMLElement;
            listRef.current!.appendChild(clone);
        });

        // Direction  → right means reverse
        containerRef.current.style.setProperty('--animation-direction', 'reverse');
        // Speed → now 100s (was 80s)
        containerRef.current.style.setProperty('--animation-duration', '20s');

        setStarted(true);
    }, []);

    return (
        <section className="ds-section">
            <div className="ds-container">
                <h2 className="ds-title">
                    Designed for Real<br />World Delivery
                </h2>

                <div className="ds-watermark"></div>

                {/* Scroller — Aceternity mask-fade style */}
                <div ref={containerRef} className="ds-scroller">
                    <ul
                        ref={listRef}
                        className={`ds-scroller-list${started ? ' animate-scroll' : ''}`}
                    >
                        {STATS.map((stat, i) => (
                            <li key={i} className="ds-card">
                                <h3 className="ds-card-value">{stat.value}</h3>
                                <p className="ds-card-label">{stat.label}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
