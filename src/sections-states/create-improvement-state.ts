import gsap from "gsap";

import { SectionTools } from '../types';


export function createImprovementState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const backgroundElement = sectionElement.querySelector('.section-background')!;
    const filterElement = sectionElement.querySelector('.section-filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(sectionElement, {
        duration: 1.5,
        ease: "none",
        yPercent: -20,
    }, "<").to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
    }, "<")

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(filterElement, { opacity: 0 })

    tl.addLabel(`${startStep + 1}`);

    tl.to(sectionElement, {
        duration: 1.5,
        ease: "none",
        yPercent: -100,
    }).to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 1.1,
    }, "<")

    tl.addLabel(`${startStep + 2}`);

    tl.set(filterElement, { opacity: 1 })

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0.3,
    })

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