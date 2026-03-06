import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationRefs {
    sectionRef: RefObject<HTMLElement | null>;
    pinContainerRef: RefObject<HTMLDivElement | null>;
    imagesRef: RefObject<(HTMLDivElement | null)[]>;
    textsRef: RefObject<(HTMLDivElement | null)[]>;
}

export function useWhoWeAreAnimation(refs: AnimationRefs) {
    const { sectionRef, pinContainerRef, imagesRef, textsRef } = refs;

    useEffect(() => {
        let ctx = gsap.context(() => {
            const images = imagesRef.current.filter(Boolean);
            const texts = textsRef.current.filter(Boolean);

            if (images.length === 0 || texts.length === 0) return;

            // Setup initial text states (shared across all breakpoints)
            gsap.set(texts[0], { opacity: 1, autoAlpha: 1, yPercent: -50, y: 0 });
            gsap.set(texts.slice(1), { opacity: 0, autoAlpha: 0, yPercent: -50, y: 40 });

            // Create matchMedia instance
            let mm = gsap.matchMedia();

            // ==========================================
            // DESKTOP: Diagonal Entrance 
            // ==========================================
            mm.add("(min-width: 1025px)", () => {
                // Setup images for desktop
                gsap.set(images[0], { xPercent: 0, yPercent: 0, opacity: 1 });
                gsap.set(images.slice(1), { xPercent: 100, yPercent: 100 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinContainerRef.current,
                        start: 'top top',
                        end: '+=3000',
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1
                    }
                });

                // Desktop Step 1
                tl.to(texts[0], { autoAlpha: 0, y: -40, duration: 1 })
                    .to(images[0], { xPercent: 100, yPercent: -100, duration: 1 }, "<")
                    .to(images[1], { xPercent: 0, yPercent: 0, duration: 1 }, "<")
                    .to(texts[1], { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

                tl.to({}, { duration: 0.5 });

                // Desktop Step 2
                tl.to(texts[1], { autoAlpha: 0, y: -40, duration: 1 })
                    .to(images[1], { xPercent: 100, yPercent: -100, duration: 1 }, "<")
                    .to(images[2], { xPercent: 0, yPercent: 0, duration: 1 }, "<")
                    .to(texts[2], { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

                tl.to({}, { duration: 0.5 });
            });

            // ==========================================
            // MOBILE / TABLET: Horizontal Entrance
            // ==========================================
            mm.add("(max-width: 1024px)", () => {
                // Setup images for mobile
                gsap.set(images[0], { xPercent: 0, yPercent: 0, opacity: 1 });
                gsap.set(images.slice(1), { xPercent: 120, yPercent: 0 }); // Offscreen to the right

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinContainerRef.current,
                        start: 'top 10%', // Keep it slightly below the top of viewport so heading isn't cut off by navbar
                        end: '+=2000', // Slightly shorter duration for mobile for better scroll feel
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1
                    }
                });

                // Mobile Step 1 - Old image left, new image right
                tl.to(texts[0], { autoAlpha: 0, y: -40, duration: 1 })
                    .to(images[0], { xPercent: -120, duration: 1 }, "<")
                    .to(images[1], { xPercent: 0, duration: 1 }, "<")
                    .to(texts[1], { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

                tl.to({}, { duration: 0.5 });

                // Mobile Step 2
                tl.to(texts[1], { autoAlpha: 0, y: -40, duration: 1 })
                    .to(images[1], { xPercent: -120, duration: 1 }, "<")
                    .to(images[2], { xPercent: 0, duration: 1 }, "<")
                    .to(texts[2], { autoAlpha: 1, y: 0, duration: 1 }, "-=0.5");

                tl.to({}, { duration: 0.5 });
            });

            // Background Parallax runs unconditionally
            gsap.to('.wwa-bg-word', {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);
}
