import gsap from "gsap";

import { SectionTools } from '../types';
import bg from '../img/design-and-interior-section.webp';


export function createImprovementState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const backgroundElement = document.querySelector('.improvement-background')!;

    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    const sliderElement = sectionElement.querySelector('.half-slider')!;
    const sliderTextElements = sliderElement.querySelector('.half-slider-text')!;
    const sliderImagesElement = sliderElement.querySelector('.half-slider-img')!;
    const getSlideTextElement = (index: number) => {
        return sliderTextElements.querySelector(`.text-wrapper[data-slide-index="${index}"]`)!;
    }
    const getSlideImgElement = (index: number) => {
        return sliderImagesElement.querySelector(`.img-wrapper[data-slide-index="${index}"]`)!;
    }

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
    tl.set(filterElement, { zIndex: 9 })

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

    tl.to(getSlideTextElement(1), {
        duration: 1.5,
        ease: "none",
        opacity: 1,
    }).to(getSlideImgElement(1), {
        duration: 1.5,
        ease: "none",
        height: '100%',
    }, "<")

    tl.addLabel(`${startStep + 3}`);

    tl.to(getSlideTextElement(1), {
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