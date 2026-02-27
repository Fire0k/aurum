import gsap from "gsap";

import { SectionTools } from '../types';
import bg from '../img/safety-and-comfort-section.webp';


export function createPremiumClassState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 6;

    const headerElement = document.querySelector('header');
    const headerGradientElement = headerElement?.querySelector('.gradient') ?? null;

    const backgroundElement = document.querySelector('.premium-class-background')!;

    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.next-section-title');

    const sliderElement = sectionElement.querySelector('.half-slider')!;
    const sliderTextElements = sliderElement.querySelectorAll('.half-slider-text')!;
    const getSlideTextElement = (index: number) => {
        return sliderElement.querySelector(`.half-slider-text[data-slide-index="${index}"]`)!;
    }
    const getSlideImgElement = (index: number) => {
        return sliderElement.querySelector(`.half-slider-img[data-slide-index="${index}"]`)!;
    }

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        scale: 0.9,
        yPercent: -20,
    }, "<")

    tl.set(sliderTextElements, { yPercent: 50 })
    tl.set(getSlideTextElement(1), { display: 'flex' })
    tl.set(getSlideImgElement(1), { display: 'block' })

    tl.addLabel(`${startStep + 1}`);

    tl.to(headerGradientElement, {
        duration: 0.5,
        opacity: 1,
    }).to(backgroundElement, {
        duration: 1.5,
        ease: "none",
        yPercent: -100,
        scale: 1.2,
    }, "<")

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(filterElement, { zIndex: 3 })
    

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

    tl.addLabel(`${startStep + 3}`);

    tl.to(getSlideTextElement(1), {
        duration: 1.5,
        ease: "none",
        yPercent: 0,
        opacity: 1,
    }).to(getSlideImgElement(1), {
        duration: 1.5,
        ease: "none",
        scaleY: 1,
    }, "<")

    tl.addLabel(`${startStep + 4}`);

    tl.to(getSlideTextElement(1), {
        duration: 1.5,
        ease: "none",
        yPercent: 50,
        opacity: 0,
    }).to(getSlideImgElement(1), {
        duration: 1.5,
        ease: "none",
        scaleY: 0,
    }, "<")

    tl.set(getSlideTextElement(1), { display: 'none' })
    tl.set(getSlideImgElement(1), { display: 'none' })
    tl.set(getSlideTextElement(2), { display: 'flex' })
    tl.set(getSlideImgElement(2), { display: 'block' })

    tl.to(getSlideTextElement(2), {
        duration: 1.5,
        ease: "none",
        yPercent: 0,
        opacity: 1,
    }).to(getSlideImgElement(2), {
        duration: 1.5,
        ease: "none",
        scaleY: 1,
    }, "<")

    tl.addLabel(`${startStep + 5}`);

    tl.to(getSlideTextElement(2), {
        duration: 1.5,
        ease: "none",
        yPercent: 50,
        opacity: 0,
    }).to(getSlideImgElement(2), {
        duration: 1.5,
        ease: "none",
        scaleY: 0,
    }, "<")

    tl.set(getSlideTextElement(2), { display: 'none' })
    tl.set(getSlideImgElement(2), { display: 'none' })
    tl.set(sliderElement, { display: 'none' })

    tl.addLabel(`${startStep + 6}`);

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