import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './FAQSection.css';

const faqs = [
    { id: 1, question: "How does BIM Coordination improve project efficiency?", answer: "By centralizing model data and automating clash detection, BIM coordination minimizes rework, aligns schedules, and ensures all stakeholders are working from a single source of truth." },
    { id: 2, question: "Can Zestine integrate with my existing software stack?", answer: "Yes, Zestine is built with open APIs and direct plugins for major AEC tools like Revit, Navisworks, and AutoCAD, creating a seamless data flow." },
    { id: 3, question: "Is the platform suitable for both small and large teams?", answer: "Absolutely. Zestine scales dynamically. Small teams benefit from out-of-the-box workflows, while enterprise teams can leverage advanced governance and custom reporting." },
    { id: 4, question: "How long does it take to deploy Zestine on a new project?", answer: "Most teams are up and running within a few days. Our templates and intuitive UI minimize the learning curve compared to traditional dense BIM software." },
    { id: 5, question: "What kind of support is included?", answer: "Every tier includes dedicated technical support from AEC professionals who understand your specific challenges, not just generic IT helpdesk agents." }
];

export function FAQSection() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <section className="faq-container">
            <div className="faq-content">

                {/* Left Side: FAQ List */}
                <div className="faq-left">
                    <h2 className="faq-title">FAQ's</h2>
                    <div className="faq-list">
                        {faqs.map((faq) => {
                            const isActive = activeFaq === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className={`faq-item ${isActive ? 'active' : ''}`}
                                    onClick={() => toggleFaq(faq.id)}
                                >
                                    <div className="faq-item-header">
                                        <span className="faq-question">{faq.question}</span>
                                        <span className={`faq-icon ${isActive ? 'rotate' : ''}`}>
                                            <FiArrowUpRight />
                                        </span>
                                    </div>
                                    <div className="faq-answer-wrapper" style={{ height: isActive ? 'auto' : 0 }}>
                                        <div className="faq-answer-inner">
                                            <p className="faq-answer-text">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="faq-right">
                    <div className="contact-form-card">
                        <h3 className="form-title">Talk to us</h3>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="tel" placeholder="Phone Number" required />
                            <input type="text" placeholder="Company Name" />
                            <textarea placeholder="Your Suggestion" rows={4} required></textarea>
                            <div className="form-submit-wrapper">
                                <button type="submit" className="form-submit-btn btn-zestine">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}
