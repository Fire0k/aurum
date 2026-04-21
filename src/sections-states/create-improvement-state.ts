import gsap from "gsap";

import { SectionTools } from '../types';
import { initFullpageSlider } from './init-fullpage-slider';


export function createImprovementDesktopState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const backgroundElement = document.querySelector('.improvement-background')!;

    const filterElement = document.querySelector('.filter');

    const sliderElement = sectionElement.querySelector('.half-slider')!;
    const sliderTextElements = sliderElement.querySelector('.half-slider-text')!;
    const sliderImagesElement = sliderElement.querySelector('.half-slider-img')!;
    const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
    const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));

    images.forEach((wrapper) => {
        const swiper = wrapper.querySelector('.desktop-slider');
        if (!swiper) return;

        const buttons = wrapper.querySelector('.slider-buttons');
        if (!buttons) return;

        initFullpageSlider(swiper, buttons);
    })

    tl.to(backgroundElement, {
        duration: 1,
        ease: 'power1.out',
        scale: 0.9,
        yPercent: -20,
    }, "<")

    tl.addLabel(`${startStep + 1}`);

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "power1.in",
        yPercent: -100,
        scale: 1.2,
    });

    tl.set(filterElement, { zIndex: 9 })

    tl.addLabel(`${startStep + 2}`);

    tl.set(sectionElement, { yPercent: -100 });

    tl.to(backgroundElement, {
        duration: 0.5,
        ease: "power1.in",
        opacity: 0.2,
    }).to(texts[0], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
    }, "<").to(images[0], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
    }, "<")

    tl.addLabel(`${startStep + 3}`);

    tl.to(texts[0], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 0,
        yPercent: 20,
    }).to(sliderImagesElement, {
        duration: 0.5,
        ease: "power1.in",
        height: 0,
    }, "<")

    tl.set(sliderElement, { display: 'none' })

    return {
        maxStep,
    }
}

export function createImprovementMobileState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 3;

    const mobileTitleElement = sectionElement.querySelector('.mobile-section-title-wrapper')!;
    const titleImageElement = mobileTitleElement.querySelector('.mobile-img')!;
    const titleImageWrapperElement = titleImageElement.querySelector('.img-wrapper')!;
    titleImageWrapperElement.querySelector('img')!.style.height = `${titleImageElement.getBoundingClientRect().height}px`;

    const sliderElement = sectionElement.querySelector('.mobile-slider')!;
    const sliders = sliderElement.querySelectorAll('.slide-wrapper');

    sliders.forEach((wrapper) => {
        const swiper = wrapper.querySelector('.mobile-swiper');
        if (!swiper) return;

        const buttons = wrapper.querySelector('.slider-buttons');
        if (!buttons) return;

        initFullpageSlider(swiper, buttons);
    })

    tl.to(sectionElement, { 
        duration: 1.5,
        ease: "none",
        yPercent: -100,
    }, "<").to(titleImageWrapperElement, { 
        duration: 1.5,
        ease: "none",
        height: '100%',
    }, "<");

    tl.addLabel(`${startStep + 1}`);

    tl.to(mobileTitleElement, {
        duration: 1,
        ease: "none",
        opacity: 0,
        height: '30%',
        display: 'none'
    }).fromTo(sliderElement, { yPercent: 100 }, {
        duration: 1,
        ease: "none",
        yPercent: 0,
    })

    tl.addLabel(`${startStep + 2}`);

    tl.to(sliders[0], {
        duration: 1,
        ease: "none",
        yPercent: -5,
    }).to(sliders[0].querySelector('.slide-text'), {
        duration: 1,
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