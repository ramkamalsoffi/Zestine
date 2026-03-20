const CONSENT_KEY = 'cookie-consent';

export type ConsentStatus = 'accepted' | 'declined' | null;

export function getConsent(): ConsentStatus {
    return localStorage.getItem(CONSENT_KEY) as ConsentStatus;
}

export function setConsent(status: 'accepted' | 'declined'): void {
    localStorage.setItem(CONSENT_KEY, status);
}
