import gsap from "gsap";

import { SectionTools } from '../types';


export function createImprovementState(
    sectionElement: Element,
    sectionsContainer: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const sectionTop = sectionElement.getBoundingClientRect().top;

    const backgroundElement = document.querySelector('.improvement-background')!;
    const backgroundElementTop = backgroundElement.getBoundingClientRect().top;
    const filterElement = sectionsContainer.querySelector('.sections-filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
    }, "<")
    tl.set(nextSectionTitleElement, { yPercent: 50 })

    tl.addLabel(`${startStep + 1}`);

    tl.to(sectionsContainer, {
        scrollTo: { y: backgroundElementTop },
        duration: 2,
        ease: "power1.in",
    }).to(backgroundElement, {
        duration: 2,
        scale: 1.2,
        ease: "power1.in",
    }, "<");

    tl.set(filterElement, { zIndex: 10, opacity: 0, })

    tl.addLabel(`${startStep + 2}`);

    tl.to(filterElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0.7,
    }).to(sectionsContainer, {
        duration: 0,
        ease: "none",
        scrollTo: {
            y: sectionTop,
        },
    });

    tl.addLabel(`${startStep + 3}`);

    tl.to(nextSectionTitleElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 1,
        yPercent: -50,
    }).to(sectionsContainer, {
        duration: 1.5,
        ease: "none",
        scrollTo: {
            y: sectionTop + 200,
        },
    }, "<")

    return {
        maxStep,
    }
}