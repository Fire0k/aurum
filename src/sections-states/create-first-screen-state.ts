import gsap from "gsap";

import { SectionTools } from '../types';


export function createFirstScreenState(
    sectionElement: Element, 
    sectionsContainer: Element, 
    tl: gsap.core.Timeline
): SectionTools {
    const maxStep: number = 1;

    const sectionTop = sectionElement.getBoundingClientRect().top;

    const backgroundElement = sectionElement.querySelector('.section-background');
    const sloganElement = sectionElement.querySelector('.slogan');
    const maskElement = sectionElement.querySelector('.mask');
    const headerElement = document.querySelector('header');
    const headerLogoElement = headerElement?.querySelector('.logo-main') ?? null;
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(backgroundElement, {
        duration: 1.5,
        delay: 1,
        ease: 'none',
        scale: 2,
    }).set(nextSectionTitleElement, { yPercent: 50 })
    tl.tweenTo('"0"');

    tl.addLabel('0');

    tl.to(backgroundElement, {
        duration: 1,
        ease: 'none',
        scale: 1.5,
    }).to(sloganElement, {
        duration: 1,
        ease: 'none',
        opacity: 0,
        yPercent: 50,
    }, "<");

    tl.addLabel("add-mask");
    
    tl.to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        scale: 1,
    })

    tl.addLabel('1');

    tl.to(maskElement, {
        duration: 1.5,
        ease: 'none',
        maskSize: '100% 100%, 0px',
    }).to(headerLogoElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 1,
    }, "<").to(nextSectionTitleElement, {
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