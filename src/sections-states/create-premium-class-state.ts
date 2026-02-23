import gsap from "gsap";

import { SectionTools } from '../types';


export function createPremiumClassState(
    sectionElement: Element,
    sectionsContainer: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const sectionTop = sectionElement.getBoundingClientRect().top;

    const backgroundElement = document.querySelector('.premium-class-background')!;
    const backgroundElementTop = backgroundElement.getBoundingClientRect().top;
    const filterElement = sectionsContainer.querySelector('.sections-filter');
    const headerElement = document.querySelector('header');
    const headerGradientElement = headerElement?.querySelector('.gradient') ?? null;
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
    }, "<")

    tl.set(filterElement, { zIndex: 4 })
    tl.set(nextSectionTitleElement, { yPercent: 50 })

    tl.addLabel(`${startStep + 1}`);

    tl.to(headerGradientElement, {
        duration: 0.5,
        opacity: 1,
    }).to(sectionsContainer, {
        scrollTo: { y: backgroundElementTop },
        duration: 2,
        ease: "power1.in",
    }, "<").to(backgroundElement, {
        duration: 2,
        scale: 1.2,
        ease: "power1.in",
    }, "<");

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