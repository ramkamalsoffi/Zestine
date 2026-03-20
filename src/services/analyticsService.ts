import clarity from '@microsoft/clarity';
import { env } from '@/config/env';

// ---- Microsoft Clarity ----

let clarityInitialized = false;

export function initClarity(): void {
    if (clarityInitialized || !env.CLARITY_PROJECT_ID) return;
    clarity.init(env.CLARITY_PROJECT_ID);
    clarity.consent();
    clarityInitialized = true;
}

// ---- Google Analytics 4 ----

let ga4Initialized = false;

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}

export function initGA4(): void {
    if (ga4Initialized || !env.GA4_MEASUREMENT_ID) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${env.GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', env.GA4_MEASUREMENT_ID, {
        send_page_view: false,
    });

    ga4Initialized = true;
}

// ---- Page View Tracking ----

export function trackPageView(path: string): void {
    if (ga4Initialized && window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: path,
            page_title: document.title,
        });
    }
}

// ---- Custom Event Tracking ----

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (ga4Initialized && window.gtag) {
        window.gtag('event', eventName, params);
    }
    if (clarityInitialized) {
        clarity.event(eventName);
    }
}
