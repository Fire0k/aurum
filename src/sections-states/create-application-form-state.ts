import gsap from "gsap";

import { SectionTools } from '../types';


export function createApplicationFormState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 1;

    const footerElement = document.querySelector('footer');

    tl.set(sectionElement, { zIndex: 8, yPercent: -50 });

    tl.to(sectionElement, {
        duration: 1.5,
        ease: 'none',
        yPercent: -100,
        opacity: 1,
    }).to(footerElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 1,
    })

    tl.addLabel(`${startStep + 1}`);

    return {
        maxStep,
    }
}