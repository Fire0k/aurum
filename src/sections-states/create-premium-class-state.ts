import gsap from "gsap";

import { SectionTools } from '../types';


export function createPremiumClassState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const prevBackgroundElement = document.querySelector('.section-background')!;
    const backgroundElement = document.querySelector('.section-background-next')!;
    const filterElement = document.querySelector('.filter');
    const headerElement = document.querySelector('header');
    const headerGradientElement = headerElement?.querySelector('.gradient') ?? null;
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');
    const maskElement = sectionElement.querySelector('.mask');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
        yPercent: -20,
    }, "<")

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(sectionElement, { zIndex: 5 })

    tl.addLabel(`${startStep + 1}`);

    tl.to(headerGradientElement, {
        duration: 0.5,
        opacity: 1,
    }).to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        yPercent: -100,
        scale: 1.1,
    }, "<")

    tl.set(filterElement, { zIndex: 4, opacity: 1, })

    tl.set(prevBackgroundElement, {
        top: '100%',
        opacity: 1,
        yPercent: 0,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundImage: 'url("/src/img/safety-and-comfort-section.webp")',
        zIndex: 6,
        scale: 0.8,
    })

    tl.addLabel(`${startStep + 2}`);

    tl.set(maskElement, { display: 'none' })

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0.3,
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