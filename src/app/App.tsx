import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getConsent } from '@/services/consentService';
import Navbar from '../components/layout/Navbar';
import Preloader from '../components/ui/Preloader';
import CookieConsent from '../components/ui/CookieConsent';
import { HeroSection, FAQSection } from '../features/hero';
import { WhoWeAreSection } from '../features/whoWeAre';
import { ProductsSection } from '../features/products';
import { DeliveryStatsSection } from '../features/deliveryStats';
import { TestimonialsSection } from '../features/testimonials';
import { Footer } from '../components/layout/Footer';
import group17Img from '../Images/Group 17.svg';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [consentGiven, setConsentGiven] = useState(getConsent() === 'accepted');

    useAnalytics(consentGiven);

    return (
        <>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSection />
                            <div className="section-divider-svg">
                                <img src={group17Img} alt="Zestine Icon" />
                            </div>
                            <WhoWeAreSection />
                            <ProductsSection />
                            <DeliveryStatsSection />
                            <TestimonialsSection />
                            <FAQSection />
                        </>
                    } />
                </Routes>
            </main>
            <Footer />
            <CookieConsent onAccept={() => setConsentGiven(true)} />
        </>
    );
}

export default App;
