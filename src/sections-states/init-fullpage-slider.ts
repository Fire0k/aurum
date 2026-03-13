import Swiper from 'swiper'
import { EffectFade, Pagination, Navigation } from 'swiper/modules'


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