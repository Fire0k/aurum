import gsap from "gsap";

import { SectionTools } from '../types';
import bg from '../img/apartments-section.webp';


export function createDesignAndInteriorState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const backgroundElement = document.querySelector('.design-and-interior-background')!;

    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    const sliderElement = sectionElement.querySelector('.half-slider')!;
    const sliderTextElements = sliderElement.querySelector('.half-slider-text')!;
    const sliderImagesElement = sliderElement.querySelector('.half-slider-img')!;
    const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
    const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));

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

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(filterElement, { zIndex: 12 })

    tl.addLabel(`${startStep + 2}`);

    tl.set(sectionElement, { yPercent: -100 });

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        opacity: 0.2,
    }).to(texts[0], {
        duration: 1.5,
        ease: "none",
        opacity: 1,
    }, "<").to(images[0], {
        duration: 1.5,
        ease: "none",
        opacity: 1,
    }, "<")

    tl.addLabel(`${startStep + 3}`);

    tl.to(texts[0], {
        duration: 1.5,
        ease: "none",
        opacity: 0,
        yPercent: 20,
    }).to(sliderImagesElement, {
        duration: 1.5,
        ease: "none",
        height: 0,
    }, "<")

    tl.set(sliderElement, { display: 'none' })

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