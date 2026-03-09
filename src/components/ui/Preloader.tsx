import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent scrolling while preloader is active
        document.body.style.overflow = 'hidden';

        const svg = svgRef.current;
        if (!svg) return;

        // Get all paths
        const paths = svg.querySelectorAll('path');

        // Calculate stroke lengths for each path
        paths.forEach((path) => {
            const length = (path as SVGPathElement).getTotalLength();
            path.style.strokeDasharray = String(length);
            path.style.strokeDashoffset = String(length);
            // Backup the original fill color to use as stroke
            const originalFill = path.getAttribute('fill') || 'black';
            path.setAttribute('data-original-fill', originalFill);

            path.style.stroke = originalFill;
            path.style.fill = 'none';
            path.style.strokeLinecap = 'round';
            path.style.strokeLinejoin = 'round';
            path.style.strokeWidth = '1.5';
        });

        // 1. Draw the lines
        const drawTl = gsap.timeline();
        paths.forEach((path) => {
            drawTl.to(
                path,
                {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: 'power2.inOut',
                },
                0 // All paths start at the same time
            );
        });

        // 2. Fill the shapes with color
        drawTl.to(paths, {
            fill: (_i, target) => target.getAttribute('data-original-fill'),
            stroke: 'transparent',
            duration: 0.5,
            ease: 'power2.inOut'
        });

        // 3. Fade out the entire preloader container
        const mainTl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                onComplete();
            }
        });

        mainTl.add(drawTl);
        mainTl.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            delay: 0.4
        });

        return () => {
            document.body.style.overflow = '';
            drawTl.kill();
            mainTl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="preloader-container">
            <svg
                ref={svgRef}
                width="81"
                height="79"
                viewBox="0 0 81 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="preloader-logo"
            >
                {/* Green path 1 */}
                <path
                    d="M11.586 78.2285C11.5087 78.2285 11.4339 78.2285 11.3566 78.2285C11.2922 78.2285 11.2355 78.2233 11.1813 78.2207H11.1221C10.8978 78.2104 10.6529 78.1923 10.4029 78.1665C4.46944 77.4869 0 72.4608 0 66.4786C0 59.9873 5.2659 54.708 11.7407 54.708H40.8642L19.6872 74.9777C17.4886 77.0812 14.6198 78.2311 11.586 78.2311V78.2285ZM11.7381 55.9975C5.97472 55.9975 1.28619 60.698 1.28619 66.476C1.28619 71.8018 5.26332 76.2749 10.5395 76.8796C10.756 76.9003 10.9726 76.9158 11.1788 76.9235L11.2535 76.9287C11.2973 76.9287 11.3437 76.9339 11.3875 76.9364C14.1532 76.9881 16.7901 75.9622 18.7954 74.0397L37.6449 55.9975H11.7381Z"
                    fill="#7EBA00"
                />
                {/* Green path 2 */}
                <path
                    d="M68.48 23.5412H39.4183L60.5592 3.30767C63.3713 0.615038 67.3227 -0.503878 71.1323 0.315282C71.2431 0.341123 71.341 0.366965 71.4416 0.392806L71.5008 0.40831C71.6658 0.449656 71.8437 0.496168 72.0189 0.54785C76.9291 2.10865 80.2232 6.61532 80.2232 11.7706C80.2232 18.2619 74.9573 23.5412 68.4825 23.5412H68.48ZM42.635 22.2491H68.48C74.2433 22.2491 78.9319 17.5487 78.9319 11.7706C78.9319 7.18124 76.0012 3.16813 71.64 1.78305C71.4957 1.73912 71.3385 1.69778 71.1812 1.65901L71.1116 1.64093C71.0266 1.61767 70.9415 1.59441 70.8539 1.57374C67.4747 0.847606 63.9538 1.84507 61.451 4.24053L42.6376 22.2491H42.635Z"
                    fill="#7EBA00"
                />
                {/* Dark blue path */}
                <path
                    d="M31.134 23.5412H11.7407C8.52907 23.5412 5.53398 22.2672 3.30183 19.9518C1.06969 17.6391 -0.10051 14.5898 0.00774617 11.3675C0.216526 5.09843 5.6113 0 12.0319 0H56.0794C56.3526 0 56.5975 0.162797 56.7006 0.418623C56.8037 0.674449 56.7444 0.961287 56.5511 1.15251L36.204 21.4455C34.8483 22.7969 33.0491 23.5412 31.1366 23.5412H31.134ZM12.0294 1.29464C6.29435 1.29464 1.47952 5.8349 1.29393 11.414C1.19856 14.2823 2.23989 16.9982 4.22459 19.0577C6.21187 21.1173 8.87961 22.2517 11.7381 22.2517H31.1315C32.7012 22.2517 34.1781 21.6418 35.2916 20.5307L54.5793 1.29464H12.0294ZM55.6438 0.235154C55.6438 0.235154 55.6412 0.237739 55.6387 0.240323L55.6438 0.235154Z"
                    fill="#033465"
                />
                {/* Orange path */}
                <path
                    d="M43.6609 50.8939L18.2129 50.8732C16.9834 50.8732 15.9369 50.16 15.4807 49.0178C15.0245 47.8731 15.2925 46.6353 16.1818 45.7851L34.2993 28.4458C34.8509 27.9186 35.5726 27.6292 36.333 27.6292H61.8016C63.0311 27.6292 64.0775 28.3398 64.5363 29.4846C64.9925 30.6294 64.7245 31.8671 63.8352 32.7199L45.6971 50.0825C45.1455 50.6096 44.4238 50.899 43.6635 50.899L43.6609 50.8939ZM36.3304 28.9187C35.9025 28.9187 35.4953 29.0815 35.1859 29.3786L17.0685 46.718C16.4705 47.289 16.4731 48.0333 16.6741 48.5372C16.8752 49.0411 17.3855 49.5811 18.2103 49.5811L43.6583 49.6018C44.0862 49.6018 44.4934 49.439 44.8027 49.1418L62.9408 31.7819C63.5388 31.2082 63.5363 30.4666 63.3352 29.9627C63.1342 29.4588 62.6238 28.9187 61.7964 28.9187H36.3278H36.3304Z"
                    fill="#FFBA00"
                />
                {/* Red path */}
                <path
                    d="M68.6294 78.244H24.6645C24.3912 78.244 24.1489 78.0812 24.0458 77.828C23.9427 77.5748 23.9995 77.2879 24.1902 77.0941L44.2357 57.1035C45.7873 55.5556 47.8468 54.7029 50.0377 54.7029H68.3382C74.7588 54.7029 80.1536 59.8013 80.3624 66.0703C80.4706 69.2927 79.3004 72.3419 77.0683 74.6547C74.8361 76.9701 71.8385 78.244 68.6269 78.244H68.6294ZM26.162 76.952H68.6294C71.4879 76.952 74.1557 75.8176 76.143 73.758C78.1302 71.6985 79.1716 68.9852 79.0762 66.1143C78.8906 60.5352 74.0732 55.9949 68.3408 55.9949H50.0403C48.1948 55.9949 46.4575 56.7133 45.1481 58.0183L26.1646 76.9494L26.162 76.952Z"
                    fill="#FC424F"
                />
            </svg>
        </div>
    );
}
