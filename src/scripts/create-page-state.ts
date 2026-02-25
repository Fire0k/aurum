import gsap from "gsap";

import { createPageObserver } from "./create-page-observer";
import { getSectionsTools } from '../sections-states/get-sections-tools';
import { SectionTools } from "../types";

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
    const tl = gsap.timeline({ paused: true });

    const sectionsTools = getSectionsTools(tl) as SectionTools[];
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
}