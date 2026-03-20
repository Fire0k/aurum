import Swiper from 'swiper'
import { EffectFade, Navigation } from 'swiper/modules'


export function initFullpageSlider(sliderElement: Element, buttonsElement: Element) {
    const nextBtn = buttonsElement.querySelector('.next') as HTMLElement | null;
    const prevBtn = buttonsElement.querySelector('.prev') as HTMLElement | null;

    new Swiper(sliderElement as HTMLElement, {
        modules: [EffectFade, Navigation],
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 700,
        loop: true,

        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
    })
}