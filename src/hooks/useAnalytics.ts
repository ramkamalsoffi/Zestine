import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initClarity, initGA4, trackPageView } from '@/services/analyticsService';
import { getConsent } from '@/services/consentService';

/**
 * Initializes analytics services and tracks SPA page views on route changes.
 * Only activates after the user has accepted cookie consent.
 * Must be called from a component inside <BrowserRouter>.
 */
export function useAnalytics(consentGiven: boolean): void {
    useEffect(() => {
        if (consentGiven || getConsent() === 'accepted') {
            initClarity();
            initGA4();
        }
    }, [consentGiven]);

    const location = useLocation();

    useEffect(() => {
        if (consentGiven || getConsent() === 'accepted') {
            trackPageView(location.pathname + location.search);
        }
    }, [location, consentGiven]);
}
