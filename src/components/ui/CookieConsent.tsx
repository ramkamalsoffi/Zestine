import { useState } from 'react';
import { getConsent, setConsent } from '@/services/consentService';
import './CookieConsent.css';

interface CookieConsentProps {
    onAccept: () => void;
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
    const [visible, setVisible] = useState(getConsent() === null);

    if (!visible) return null;

    const handleAccept = () => {
        setConsent('accepted');
        setVisible(false);
        onAccept();
    };

    const handleDecline = () => {
        setConsent('declined');
        setVisible(false);
    };

    return (
        <div className="cookie-banner">
            <div className="cookie-banner-content">
                <p className="cookie-banner-text">
                    We use cookies to analyze site usage and improve your experience.
                </p>
                <div className="cookie-banner-actions">
                    <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
                        Reject
                    </button>
                    <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
