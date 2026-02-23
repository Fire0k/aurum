import gsap from "gsap";

import { SectionTools } from '../types';


export function createDesignAndInteriorState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const prevBackgroundElement = document.querySelector('.section-background-next')!;
    const backgroundElement = document.querySelector('.section-background')!;
    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
        y: -200,
    }, "<")

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(sectionElement, { zIndex: 11 })

    tl.addLabel(`${startStep + 1}`);

    tl.to(backgroundElement, {
        duration: 2,
        ease: "power1.in",
        yPercent: -100,
        scale: 1.2,
    });

    tl.set(filterElement, { opacity: 0, zIndex: 11 })

    tl.set(prevBackgroundElement, {
        top: '100%',
        y: 0,
        yPercent: 0,
        backgroundImage: 'url("/src/img/apartments-section.webp")',
        zIndex: 12,
        scale: 0.8,
    })

    tl.addLabel(`${startStep + 2}`);

    tl.to(filterElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0.7,
    }).to(sectionElement, {
        duration: 0,
        ease: "none",
        yPercent: -100,
    });

    tl.addLabel(`${startStep + 3}`);

    tl.to(nextSectionTitleElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 1,
        yPercent: -50,
    })

    return {
        maxStep,
    }
}