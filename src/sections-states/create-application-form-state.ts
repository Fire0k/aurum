import gsap from "gsap";

import { SectionTools } from '../types';


export function createApplicationFormDesktopState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 1;

    const footerElement = document.querySelector('footer');

    tl.set(sectionElement, { yPercent: -80 });

    tl.to(sectionElement, {
        duration: 2,
        ease: 'power1.out',
        yPercent: -100,
        opacity: 1,
    }).to(footerElement, {
        duration: 1,
        ease: 'power1.out',
        opacity: 1,
    })

    tl.addLabel(`${startStep + 1}`);

    return {
        maxStep,
    }
}