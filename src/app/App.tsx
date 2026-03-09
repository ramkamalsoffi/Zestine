import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Preloader from '../components/ui/Preloader';
import { HeroSection } from '../features/hero';
import { FAQSection } from '../features/hero';
import { WhoWeAreSection } from '../features/whoWeAre';
import { ProductsSection } from '../features/products';
import { DeliveryStatsSection } from '../features/deliveryStats';
import { TestimonialsSection } from '../features/testimonials';
import { Footer } from '../components/layout/Footer';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <BrowserRouter>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSection />
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
        </BrowserRouter>
    );
}

export default App;
