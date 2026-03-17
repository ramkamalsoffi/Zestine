import React, { useEffect, useRef, useState } from 'react';
import './TestimonialsSection.css';
import bgImage from '../../../Images/banner/banner.jpg';

const TESTIMONIALS = [
    {
        text: '“Zestine’s tools take a very practical approach to BIM automation. They fit naturally into the way our projects already run, and they’ve helped our team simplify several coordination tasks across Revit models.”',
        name: '- Director of BIM',
    },
    {
        text: '“What I appreciate about Zestine is that their tools focus on the everyday challenges BIM teams actually deal with. They integrate smoothly with our existing workflows and make collaboration across the team more efficient.”',
        name: '- Head of Digital Engineering',
    },
    {
        text: '“ZeConnect made it much easier for our team to manage Revit links and export model views for coordination. The whole process feels more structured now, especially when we’re collaborating across multiple teams.”',
        name: '- Senior Digital Delivery Expert',
    },
    {
        text: '“With ZeFacility, managing schedules and space data across multiple Revit models became far more organized. It removed a lot of repetitive manual work our team used to deal with.”',
        name: '- Facility Management Lead',
    },
    {
        text: '“Our coordination work involves constant sharing of model views and linked files. ZeConnect simplified those tasks and helped us maintain better consistency across projects.”',
        name: '- Project BIM Coordinator',
    },
    {
        text: '“ZeFacility improved how we manage room data and schedules in our BIM models. It gave our team a much more reliable way to keep information organized across projects.”',
        name: '- VDC Manager',
    }
];

import NanoParticles from '../../../components/ui/NanoParticles';

export const TestimonialsSection: React.FC = () => {
    const listRef = useRef<HTMLUListElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !listRef.current) return;

        // Clone all children multiple times to ensure no gaps on very large screens
        const originalChildren = Array.from(listRef.current.children);
        // Add 2 sets of clones for safety
        for (let j = 0; j < 2; j++) {
            originalChildren.forEach((child) => {
                const clone = child.cloneNode(true) as HTMLElement;
                listRef.current!.appendChild(clone);
            });
        }

        // Speed → now 80s (was 50s)
        containerRef.current.style.setProperty('--animation-duration', '180s');

        setStarted(true);
    }, []);

    // Intersection Observer to detect when a card overlaps the left column
    useEffect(() => {
        if (!listRef.current || !leftColRef.current) return;

        const checkOverlap = () => {
            if (!leftColRef.current || !listRef.current) return;
            const leftRect = leftColRef.current.getBoundingClientRect();
            const cards = listRef.current.querySelectorAll('.ts-card');

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                // We consider it "overlapping" if the left edge of the card touches the left column
                const cardLeftEdge = rect.left;

                // Transition as soon as it crosses the boundary
                if (cardLeftEdge <= leftRect.right) {
                    card.classList.add('ts-card-light');
                    card.classList.remove('ts-card-dark');
                } else {
                    card.classList.add('ts-card-dark');
                    card.classList.remove('ts-card-light');
                }
            });

            requestAnimationFrame(checkOverlap);
        };

        const animationId = requestAnimationFrame(checkOverlap);
        return () => cancelAnimationFrame(animationId);
    }, [started]);

    return (
        <section id="testimonials" className="ts-section">
            <div className="ts-anim-bg">
                <NanoParticles />
            </div>
            <div className="ts-overlay"></div>

            <div className="ts-content-wrapper">
                <h2 className="ts-title">Trusted by AEC professionals</h2>
                <div className="ts-layout">
                    <div ref={leftColRef} className="ts-left-col" style={{ backgroundImage: `url(${bgImage})` }}>
                        <div className="ts-left-overlay">
                            <div className="ts-quote-icon">“</div>
                            <h3 className="ts-left-text">
                                Zestine was<br />
                                built by<br />
                                professionals<br />
                                who lived those<br />
                                workflows first.
                            </h3>
                        </div>
                    </div>
                    <div className="ts-right-col">
                        <div ref={containerRef} className="ts-scroller" style={{ overflowX: 'auto', scrollBehavior: 'smooth', scrollbarWidth: 'none' }}>
                            <ul ref={listRef} className={`ts-scroller-list${started ? ' animate-scroll' : ''}`}>
                                {TESTIMONIALS.map((item, i) => (
                                    <li key={i} className="ts-card ts-card-dark">
                                        <p className="ts-text" style={{ whiteSpace: 'pre-line' }}>{item.text}</p>
                                        <span className="ts-author-name">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="ts-arrows">
                            <button
                                className="ts-arrow-btn"
                                onClick={() => {
                                    if (containerRef.current) {
                                        containerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
                                    }
                                }}
                            >{'<'}</button>
                            <button
                                className="ts-arrow-btn"
                                onClick={() => {
                                    if (containerRef.current) {
                                        containerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                                    }
                                }}
                            >{'>'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
