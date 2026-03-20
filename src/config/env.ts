export const env = {
    APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Zestine App',

    // Analytics
    CLARITY_PROJECT_ID: import.meta.env.VITE_CLARITY_PROJECT_ID || '',
    GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
} as const;
