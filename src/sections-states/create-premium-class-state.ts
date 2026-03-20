import gsap from "gsap";

import { SectionTools } from '../types';
import { initFullpageSlider } from './init-fullpage-slider';


export function createPremiumClassDesktopState(
    sectionElement: Element,
    tl: gsap.core.Timeline,
    startStep: number,
): SectionTools {
    const maxStep: number = startStep + 6;

    const headerElement = document.querySelector('header');
    const headerGradientElement = headerElement?.querySelector('.gradient') ?? null;

    const backgroundElement = document.querySelector('.premium-class-background')!;

    const filterElement = document.querySelector('.filter');
    const nextSectionTitleElement = sectionElement.querySelector('.section-title');

    const sliderElement = sectionElement.querySelector('.half-slider')!;
    const sliderTextElements = sliderElement.querySelector('.half-slider-text')!;
    const sliderImagesElement = sliderElement.querySelector('.half-slider-img')!;

    const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
    const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));

    images.forEach((wrapper) => {
        const swiper = wrapper.querySelector('.desktop-slider');
        if (!swiper) return;

        const buttons = wrapper.querySelector('.desktop-slider-buttons');
        if (!buttons) return;

        initFullpageSlider(swiper, buttons);
    })

    tl.to(backgroundElement, {
        duration: 1.5,
        ease: "power1.out",
        scale: 0.9,
        yPercent: -20,
    }, "<")

    tl.addLabel(`${startStep + 1}`);

    tl.to(headerGradientElement, {
        duration: 0.5,
        opacity: 1,
    }).to(backgroundElement, {
        duration: 2,
        ease: "power1.in",
        yPercent: -100,
        scale: 1.2,
    }, "<")

    tl.set(nextSectionTitleElement, { yPercent: 50 })
    tl.set(filterElement, { zIndex: 3 })
    
    tl.addLabel(`${startStep + 2}`);

    tl.set(sectionElement, { yPercent: -100 });

    tl.to(backgroundElement, {
        duration: 1,
        ease: "power1.in",
        opacity: 0.2,
    }).to(texts[0], {
        duration: 1,
        ease: "power1.in",
        opacity: 1,
    }, "<").to(images[0], {
        duration: 1,
        ease: "power1.in",
        opacity: 1,
        zIndex: 1,
    }, "<")

    tl.addLabel(`${startStep + 3}`);

    tl.to(texts[0], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        yPercent: 20,
    }).to(images[0], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        zIndex: 0,
    }, "<").to(images[1], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
        zIndex: 1,
    }).to(texts[1], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
    }, "<")

    tl.addLabel(`${startStep + 4}`);

    tl.to(texts[1], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        yPercent: 20,
    }).to(images[1], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        zIndex: 0,
    }, "<").to(images[2], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
        zIndex: 1,
    }).to(texts[2], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
    }, "<")

    tl.addLabel(`${startStep + 5}`);

    tl.to(texts[2], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        yPercent: 20,
    }).to(images[2], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        zIndex: 0,
    }, "<").to(images[3], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
        zIndex: 1,
    }).to(texts[3], {
        duration: 0.5,
        ease: "power1.in",
        opacity: 1,
    }, "<")

    tl.addLabel(`${startStep + 6}`);

    tl.to(texts[3], {
        duration: 1,
        ease: "power1.in",
        opacity: 0,
        yPercent: 20,
    }).to(sliderImagesElement, {
        duration: 1,
        ease: "power1.in",
        height: 0,
    }, "<")

    tl.set(sliderElement, { display: 'none' })

    tl.to(nextSectionTitleElement, {
        duration: 1.5,
        ease: 'power1.out',
        opacity: 1,
        yPercent: -50,
    })

    return {
        maxStep,
    }
}