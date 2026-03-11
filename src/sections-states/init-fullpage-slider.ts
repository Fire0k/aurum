import gsap from "gsap";
import Swiper from 'swiper'
import { EffectFade, Pagination, Navigation } from 'swiper/modules'
import ScrollTrigger from "gsap/ScrollTrigger";


export function initFullpageSlider(
    backgroundElement: Element,
    buttonsElement: Element,
) {
    const slider = backgroundElement.querySelector('.swiper') as HTMLElement;
    const paginationElement = backgroundElement.querySelector('.slider-pagination') as HTMLElement | null;
    const nextBtn = buttonsElement.querySelector('.next') as HTMLElement | null;
    const prevBtn = buttonsElement.querySelector('.prev') as HTMLElement | null;

    const swiper = new Swiper(slider, {
        modules: [EffectFade, Pagination, Navigation],
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 700,
        loop: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: paginationElement,
            clickable: true
        }
    })
}

export function initMobileSection(sectionElement: Element) {
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

    initFullpageSlider(sectionElement, sectionElement);

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