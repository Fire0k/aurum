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