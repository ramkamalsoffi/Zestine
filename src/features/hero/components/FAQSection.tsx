import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './FAQSection.css';

const faqs = [
    { id: 1, question: "What is Zestine Technologies?", answer: "Zestine develops intelligent BIM platforms that transform fragmented data and complex workflows into streamlined project delivery." },
    { id: 2, question: "Who is Zestine built for?", answer: "Zestine serves AEC organizations and BIM professionals who design the built world, helping teams move from fragmented, repetitive processes to intelligent operations that scale across projects." },
    { id: 3, question: "What expertise does Zestine bring to AEC?", answer: "With over 10 years of experience across AEC and BIM workflows, Zestine brings real-world insight to identify bottlenecks early. Its 20+ workflow accelerators are trusted by 2000+ users to improve model accuracy and reduce repetitive tasks." },
    { id: 4, question: "What is the Zestine product suite?", answer: "Zestine’s product suite includes:\n\nZeManage - improves model performance, streamlines workflows, and proactively mitigates risks.\nZeFacility - automates schedules and space documentation.\nZeConnect - enables seamless model exports and cloud integrations.\nZeDiag - instantly diagnoses crashes and uncovers recurring issues automatically.\nAll products are built to support modern engineering operations." },
    { id: 5, question: "How does Zestine improve AEC workflows?", answer: "Zestine replaces repetitive tasks with systems that reduce operational friction, eliminate manual documentation, improve model governance, boost data reliability, and support faster project execution." },
    { id: 6, question: "Can Zestine integrate with existing AEC tools?", answer: "Yes. Zestine products are designed to integrate into existing AEC environments and support teams working across multiple systems and data formats." }
];

export function FAQSection() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (id: number) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <section id="contact" className="faq-container">
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
                        <h3 className="form-title">Get Started with Zestine</h3>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" placeholder="Name *" required />
                            <input 
                                type="email" 
                                placeholder="Email *" 
                                required 
                                onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('please enter proper email')}
                                onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                            />
                            <input type="tel" placeholder="Phone Number" />
                            <input type="text" placeholder="Company Name *" required />
                            <textarea placeholder="Tell us about your requirements / problems" rows={4} required></textarea>
                            <p className="form-privacy-notice">Your information is safe with us. We respect your privacy and never spam.</p>
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
