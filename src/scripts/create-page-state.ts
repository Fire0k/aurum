import gsap from "gsap";

import { createPageObserver } from "./create-page-observer";
import { getDesktopSectionsTools, getMobileSectionTools } from '../sections-states/get-sections-tools';
import { SectionTools } from "../types";
import { createApplicationFormHandler } from './create-application-form-handler';

/**
 * - Используется gsap.Timeline, по дефолту он остановлен.
 * - Анимация осуществляется переходами к лейблам таймлайна
 * - По структуре страницы мы имеем body 100vh\vw и все блоки изначально ниже экрана. Position sticky показывает производительность хуже такого варианта
 * - При выполнении анимации блоки пермещаются снизу во вьюпорт
 * - Для оптимизации анимации местами используются странные решения, но они нужны для повышения производительности. В частности:
 * ---- разнесены по отдельным блокам бэкграунды и контент секций
 * ---- затемнение фона реализуется через увеличение прозрачности картинки, такая перерисовка гораздо более легкая для браузера
 * ---- используется немного страшный механизм менеджмента z-index-ов, но более удобный по коду вариант просаживает производительность
 * ---- маска с логотипом на первой секции анимируется костыльно через css, т.к. Chrome не может её корректно анимировать через js 
 * - Для перехвата и замены нативного скролла на кастомные действия используется gsap.Observer
 */
export function createPageState() {
    createApplicationFormHandler();

    const burgerButtonElement = document.querySelector('.burger-menu')!;
    const burgerCloseButtonElement = document.querySelector('.menu-close-button')!;

    burgerButtonElement.addEventListener('click', () => {
        document.body.classList.add('show-menu')
    })
    burgerCloseButtonElement.addEventListener('click', () => {
        document.body.classList.remove('show-menu')
    })

    const isMobile = window.innerWidth <= 992;

    if (!isMobile) {
        const tl = gsap.timeline({ paused: true });

        const sectionsTools = getDesktopSectionsTools(tl) as SectionTools[];
        if (!sectionsTools) return;

        let prevStep = 0;
        let currentStep = 0;

        function increaseStep() {
            if (gsap.isTweening(tl)) return;

            if (currentStep === sectionsTools.at(-1)!.maxStep) return;

            currentStep++;
            tl.tweenTo(`${currentStep}`);

            if (currentStep !== 1) {
                prevStep++;
            }
        }
        function decreaseStep() {
            if (gsap.isTweening(tl)) return;

            if (currentStep === 0) return;

            currentStep--;
            tl.tweenTo(`${currentStep}`);

            if (currentStep !== 0) {
                prevStep--;
            }
        }

        tl.tweenTo(`${0}`);

        createPageObserver(
            () => decreaseStep(),
            () => increaseStep(),
        );

        /**
         * Анимация маски через js лагает в Chrome,
         * обходной путь для реализации этой анимации через css
         */
        const firstScreenSection = document.getElementById('first-section')!;
        const maskElement = document.querySelector('.mask');
        tl.call(() => {
            if (prevStep > currentStep || currentStep === 0) return;
            firstScreenSection.classList.add('with-mask')
        }, undefined, 'add-mask');
        tl.call(() => {
            if (prevStep < currentStep) return;
            firstScreenSection.classList.remove('with-mask')
        }, undefined, '1-=0.01');

        tl.call(() => {
            if (prevStep > currentStep || currentStep === 0) return;
            (maskElement as HTMLElement).style.transitionDuration = '1.5s';
        }, undefined, '1');
        tl.call(() => {
            if (prevStep < currentStep) return;
            (maskElement as HTMLElement).style.transitionDuration = 'unset';
        }, undefined, '1');

        const smallLogoElement = document.getElementById('anchor-logo');
        smallLogoElement?.addEventListener('click', () => {
            tl.progress(0);
            firstScreenSection.classList.remove('with-mask');
            tl.tweenTo(`${0}`);
            prevStep = 0;
            currentStep = 0;
        })
    } else {
        let ready = false;
        setTimeout(() => ready = true, 2500)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.scroll-area',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                // snap: {
                //     snapTo: (progress, self) => {
                //         const labels = Object.values(self.animation.labels)
                //         const duration = self.animation.duration()

                //         // текущая позиция таймлайна
                //         const currentTime = progress * duration

                //         if (self.direction > 0) {
                //             // 🔽 скролл вниз → ищем следующий label
                //             for (let i = 0; i < labels.length; i++) {
                //             if (labels[i] > currentTime) {
                //                 return labels[i] / duration
                //             }
                //             }
                //             return 1 // если в конце
                //         } else {
                //             // 🔼 скролл вверх → ищем предыдущий label
                //             for (let i = labels.length - 1; i >= 0; i--) {
                //             if (labels[i] < currentTime) {
                //                 return labels[i] / duration
                //             }
                //             }
                //             return 0 // если в начале
                //         }
                //     },
                //     duration: 0.5,
                //     delay: 0,
                //     ease: "none"
                // },
                // snapTo: (progress, self) => {
                //     const tl = self.animation
                //     const duration = tl.duration()
                //     const currentTime = progress * duration

                //     const labels = Object.values(tl.labels)

                //     const threshold = 2 // 🔥 зона прилипания (в секундах таймлайна)

                //     let closest = null
                //     let minDistance = Infinity

                //     for (let i = 0; i < labels.length; i++) {
                //         const dist = Math.abs(labels[i] - currentTime)

                //         if (dist < minDistance) {
                //         minDistance = dist
                //         closest = labels[i]
                //         }
                //     }

                //     // 👉 если близко к лейблу — снапим
                //     if (minDistance <= threshold) {
                //         return closest / duration
                //     }

                //     // 👉 если далеко — НЕ снапим (остаёмся где есть)
                //     return progress
                // }
            }
        });

        const sectionsTools = getMobileSectionTools(tl) as SectionTools[];
        if (!sectionsTools) return;

        let prevStep = 0;
        let currentStep = 0;

        function increaseStep() {
            if (gsap.isTweening(tl) || !ready) return;

            if (currentStep === sectionsTools.at(-1)!.maxStep) {
                // observer.disable();
                return;
            };

            currentStep++;
            tl.tweenTo(`${currentStep}`);

            if (currentStep !== 1) {
                prevStep++;
            }
        }
        function decreaseStep() {
            if (gsap.isTweening(tl)) return;

            if (currentStep === 0) return;

            currentStep--;
            tl.tweenTo(`${currentStep}`);

            if (currentStep !== 0) {
                prevStep--;
            }
        }

        tl.tweenTo(`${0}`);

        // createPageObserver(decreaseStep, increaseStep);

        const firstScreenSection = document.getElementById('first-section')!;
        const smallLogoElement = document.getElementById('anchor-logo');
        smallLogoElement?.addEventListener('click', () => {
            tl.progress(0);
            firstScreenSection.classList.remove('with-mask');
            tl.tweenTo(`${0}`);
            prevStep = 0;
            currentStep = 0;
        })
    }
}