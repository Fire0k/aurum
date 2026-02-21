import gsap from "gsap";

import { SectionTools } from '../types';


export function createPremiumClassState(
    sectionElement: Element,
    sectionsContainer: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 2;

    const sectionTop = sectionElement.getBoundingClientRect().top;

    const backgroundElement = sectionElement.querySelector('.section-background');
    const filterElement = backgroundElement?.querySelector('.filter') ?? null;
    const headerElement = document.querySelector('header');
    const headerGradientElement = headerElement?.querySelector('.gradient') ?? null;

    const firstScreenSection = sectionsContainer.querySelector('#first-section');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
    }, "<")

    tl.addLabel(`${startStep + 1}`);

    tl.to(headerGradientElement, {
        duration: 0.5,
        opacity: 1,
    }).to(sectionsContainer, {
        scrollTo: { y: sectionTop },
        duration: 2,
        ease: "power1.in",
    }, "<").to(backgroundElement, {
        duration: 2,
        scale: 1.2,
        ease: "power1.in",
    }, "<");

    tl.addLabel(`${startStep + 2}`);

    // tl.to(filterElement, {
    //     duration: 1.5,
    //     ease: "none",
    //     opacity: 0.7,
    // })
    tl.to(sectionsContainer, {
        duration: 1.5,
        ease: "none",
        scrollTo: {
            y: sectionTop + 200,
        },
    });

    return {
        maxStep,
    }
}