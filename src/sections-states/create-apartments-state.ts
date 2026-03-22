import gsap from "gsap";

import { SectionTools } from '../types';
import { initFullpageSlider } from './init-fullpage-slider';


export function createApartmentsDesktopState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 2;

    const backgroundElement = document.querySelector('.apartments-background')!;

    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.section-title');

    const sliderElement = backgroundElement.querySelector('.desktop-slider')!;
    const buttonsElement = sectionElement.querySelector('.desktop-slider-buttons')!;

    initFullpageSlider(sliderElement, buttonsElement);

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: 'power1.out',
        scale: 0.9,
        yPercent: -20,
    }, "<")

    tl.addLabel(`${startStep + 1}`);

    tl.to(backgroundElement, {
        duration: 2,
        ease: "power1.in",
        yPercent: -100,
        scale: 1.2,
    });

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(filterElement, { zIndex: 15 })
    tl.set(sectionElement, { yPercent: -100 });

    tl.to(buttonsElement, {
        duration: 0.5,
        ease: "none",
        opacity: 1,
    })

    tl.addLabel(`${startStep + 2}`);

    tl.to(backgroundElement, {
        duration: 1,
        ease: "power1.in",
        opacity: 0.2,
    }).to(buttonsElement, {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
    }, "<").to(nextSectionTitleElement, {
        duration: 1.5,
        ease: 'power1.out',
        opacity: 1,
        yPercent: -50,
    })

    return {
        maxStep,
    }
}

export function createApartmentsMobileState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const mobileTitleElement = sectionElement.querySelector('.mobile-section-title-wrapper')!;
    const titleImageElement = mobileTitleElement.querySelector('.img-wrapper')!;

    const sliderElement = sectionElement.querySelector('.mobile-slider')!;
    const sliders = sliderElement.querySelectorAll('.slide-wrapper');

    tl.to(sectionElement, { 
        duration: 1.5,
        delay: 0.5,
        ease: "none",
        yPercent: -100,
    }, "<").to(titleImageElement, { 
        duration: 1.5,
        ease: "none",
        height: '75vh',
    }, "<");

    tl.addLabel(`${startStep + 1}`);

    tl.to(mobileTitleElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0,
        height: '30%',
        display: 'none'
    }).fromTo(sliderElement, { yPercent: 100 }, {
        duration: 1.5,
        ease: "none",
        yPercent: 0,
    })

    tl.addLabel(`${startStep + 2}`);

    tl.to(sliders[0], {
        duration: 1.5,
        ease: "none",
        yPercent: -5,
    }).to(sliders[0].querySelector('.slide-text'), {
        duration: 1.5,
        ease: "none",
        opacity: 0,
        height: 0,
    }, "<")

    tl.addLabel(`${startStep + 3}`);

    tl.to(sectionElement, {
        duration: 1,
        ease: "none",
        opacity: 0,
    })

    return {
        maxStep,
    }
}