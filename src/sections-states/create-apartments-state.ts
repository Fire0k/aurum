import gsap from "gsap";

import { SectionTools } from '../types';
import bg from '../img/penthouses-section.webp';


export function createApartmentsState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const prevBackgroundElement = document.querySelector('.section-background')!;
    const backgroundElement = document.querySelector('.section-background-next')!;

    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
        yPercent: -20,
    }, "<")

    tl.addLabel(`${startStep + 1}`);

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        yPercent: -100,
        scale: 1.2,
    });

    tl.set(prevBackgroundElement, {
        top: '100%',
        opacity: 1,
        yPercent: 0,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundImage: `url("${bg}")`,
        zIndex: 8,
        scale: 0.8,
    })
    tl.set(backgroundElement, { zIndex: 7 })
    tl.set(sectionElement, { zIndex: 7 })
    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(filterElement, { zIndex: 7, opacity: 1 })

    tl.addLabel(`${startStep + 2}`);

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0.2,
    })
    tl.set(sectionElement, {
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