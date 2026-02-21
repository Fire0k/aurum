import gsap from "gsap";

import { SectionTools } from '../types';


export function createSafetyAndComfortState(
    sectionElement: Element,
    sectionsContainer: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    let currentStep: number = 0;
    const maxStep: number = 2;

    const sectionTop = sectionElement.getBoundingClientRect().top;

    const backgroundElement = sectionElement.querySelector('.section-background');

    tl.addLabel("step0");

    tl.to(sectionsContainer, {
        scrollTo: { y: sectionTop },
        duration: 1,
        ease: "power1.inOut",
    }).to(backgroundElement, {
        duration: 1,
        scale: 1.2,
        ease: "power1.inOut",
    }, "<");

    tl.addLabel("step1");

    tl.to(sectionsContainer, {
        scrollTo: { y: sectionTop + 100 },
        duration: 1,
        ease: "power1.inOut",
    });

    tl.addLabel("step2");

    return {
        maxStep,
    }
}