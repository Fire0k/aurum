import Swiper from 'swiper'
import { EffectCreative, EffectFade } from 'swiper/modules'


export function initMobileSlider(sliderElement: Element) {
    new Swiper(sliderElement as HTMLElement, {
        modules: [EffectCreative],
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ["-20%", 0, -1],
            },
                next: {
                translate: ["100%", 0, 0],
            },
        },
        // modules: [EffectFade],
        // effect: 'fade',
        // fadeEffect: {
        //     crossFade: true
        // },
        speed: 700,
        loop: true,
    })
}