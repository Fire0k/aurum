import gsap from "gsap";

import { SectionTools } from '../types';


export function createFirstScreenState(
    sectionElement: Element,
    tl: gsap.core.Timeline
): SectionTools {
    const maxStep: number = 1;

    const backgroundElement = document.querySelector('.section-background');
    const bodyFilterElement = document.querySelector('.body-filter');
    const sloganElement = sectionElement.querySelector('.slogan');
    // const maskElement = sectionElement.querySelector('.mask');
    const filterElement = document.querySelector('.section-filter');
    const headerElement = document.querySelector('header');
    const headerLogoElement = headerElement?.querySelector('.logo-main') ?? null;
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    tl.to(bodyFilterElement, {
        duration: 1,
        delay: 1,
        ease: 'none',
        opacity: 0,
    }).to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        scale: 2,
    }, "<").set(nextSectionTitleElement, { yPercent: 50 })

    tl.set(filterElement, { opacity: 0 })

    tl.tweenTo('"0"');

    tl.addLabel('0');

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        scale: 1.5,
    }).to(sloganElement, {
        duration: 1,
        ease: 'none',
        opacity: 0,
        yPercent: 50,
    }, "<");

    // tl.addLabel("add-mask");
    
    tl.to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        scale: 1,
    })

    tl.addLabel('1');

    tl.set(filterElement, { opacity: 1 })

    // tl.to(maskElement, {
    //     duration: 1.5,
    //     ease: 'none',
    //     maskSize: '100% 100%, 0px',
    // })
    tl.to(backgroundElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 0.3,
    }).to(headerLogoElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 1,
    }, "<").to(nextSectionTitleElement, {
        duration: 1.5,
        ease: 'none',
        opacity: 1,
        yPercent: -50,
    })

    return {
        maxStep,
    }
}