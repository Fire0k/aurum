import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

import { initFullpageSlider } from './init-fullpage-slider';


export function initMobileSliderSection(sectionElement: Element) {
    const paginationElement = sectionElement.querySelector('.slider-pagination')!;
    const nextButtonElements = sectionElement.querySelectorAll('.swiper-button-next')!;
    const prevButtonElements = sectionElement.querySelectorAll('.swiper-button-prev')!;
    const siderTexts = sectionElement.querySelectorAll('.mobile-slide-text')

    const filterElement = sectionElement.querySelector('.mobile-slider-filter');

    const titleElement = sectionElement.querySelector('.section-title-wrapper');

    const tl = gsap.timeline({ paused: true });
    tl.to([filterElement, titleElement], {
        duration: 1,
        ease: 'none',
        opacity: 0,
    }).to([nextButtonElements, prevButtonElements, paginationElement, ...siderTexts], {
        duration: 1,
        ease: 'none',
        opacity: 1,
    }, "<").set([filterElement, titleElement], { display: 'none' })

    ScrollTrigger.create({
        trigger: sectionElement,
        start: "top top+=100",

        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse()
    })

    // initFullpageSlider(sectionElement);

    gsap.to(
        sectionElement.querySelectorAll('.img-wrapper'),
        {
            scale: 1.2,
            ease: "none",

            scrollTrigger: {
                trigger: sectionElement,

                start: "top bottom",
                end: "top top",

                scrub: true
            }
        }
    )
}