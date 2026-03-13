import gsap from "gsap";

import { SectionTools } from '../types';

// Попробовать свг с маской еще раз
export function createFirstScreenDesktopState(
    sectionElement: Element,
    tl: gsap.core.Timeline
): SectionTools {
    const maxStep: number = 1;

    const headerElement = document.querySelector('header');
    const headerLogoElement = headerElement?.querySelector('.logo-main') ?? null;

    const backgroundElement = document.querySelector('.first-section-background');

    const filterElement = document.querySelector('.filter');
    const sloganElement = sectionElement.querySelector('.slogan');
    const maskElement = sectionElement.querySelector('.mask');
    const nextSectionTitleElement = sectionElement.querySelector('.section-title');

    tl.to(filterElement, {
        duration: 1,
        ease: 'none',
        opacity: 0,
    }).to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        scale: 2,
    }, "<")

    tl.set(filterElement, { zIndex: 0, opacity: 1 })
    tl.set(nextSectionTitleElement, { yPercent: 50 })

    tl.addLabel('0');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        scale: 1.5,
    }).to(sloganElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 0,
        yPercent: 50,
    }, "<");

    tl.set(sloganElement, { display: 'none' });

    tl.addLabel("add-mask");
    
    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 1,
    })

    tl.addLabel('1');

    tl.to(maskElement, {
        duration: 1.5,
        ease: "none",
        maskSize: '100% 100%, 0px',
    }).to(headerLogoElement, {
        duration: 1.5,
        ease: "none",
        opacity: 1,
    }, "<")

    tl.set(maskElement, { delay: 0.1, display: 'none' });
    tl.set(backgroundElement, { opacity: 0.1 });
    
    tl.to(nextSectionTitleElement, {
        delay: 0.2,
        duration: 1.5,
        ease: "power1.out",
        opacity: 1,
        yPercent: -50,
    })

    return {
        maxStep,
    }
}

export function createFirstScreenMobileAnimate(): void {
    document.body.classList.add('ready');
}