import gsap from "gsap";

import { createPageObserver } from "./create-page-observer";
import { getSectionsTools } from '../sections-states/get-sections-tools';
import { SectionTools } from "../types";


export function createPageState() {
    const tl = gsap.timeline({ paused: true });

    const sectionsTools = getSectionsTools(tl) as SectionTools[];
    if (!sectionsTools) return;

    let prevStep = 0;
    let currentStep = 0;

    function increaseStep() {
        if (gsap.isTweening(tl)) return;

        // if (currentStep === sectionsTools.at(-1)!.maxStep) return;

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
    const sectionsContainer = document.getElementById("sections-container")!;
    const firstScreenSection = sectionsContainer.querySelector('#first-section')!;
    const maskElement = firstScreenSection.querySelector('.mask');
    tl.call(() => {
        if (prevStep > currentStep || currentStep === 0) return;
        firstScreenSection.classList.add('with-mask')
    }, undefined, 'add-mask');
    tl.call(() => {
        if (prevStep < currentStep) return;
        firstScreenSection.classList.remove('with-mask')
    }, undefined, '1-=0.1');

    tl.call(() => {
        if (prevStep > currentStep || currentStep === 0) return;
        (maskElement as HTMLElement).style.transitionDuration = '1.5s';
    }, undefined, '1');
    tl.call(() => {
        if (prevStep < currentStep) return;
        (maskElement as HTMLElement).style.transitionDuration = 'unset';
    }, undefined, '1');
}