import gsap from "gsap";

import { createPageObserver } from "./create-page-observer";
import { createSectionState } from './create-section-state';
import { StateStep } from '../types';


export function createPageState() {
    const sectionsContainer = document.querySelector(".main-page");
    if (!sectionsContainer) return;

    let currentIndex = 0;

    let isAnimating = false;

    const firstScreenSection = sectionsContainer.querySelector('#first-section');
    if (!firstScreenSection) return;

    const firstScreenSectionTop = firstScreenSection.getBoundingClientRect().top;
    const firstScreenSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: {
                        y: firstScreenSectionTop,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: {
                        y: firstScreenSectionTop + 100,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });

                firstScreenSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                firstScreenSection.classList.remove('with-filter')
            }
        },
    ];
    const firstScreenController = createSectionState(firstScreenSteps);

    const premiumClassSection = sectionsContainer.querySelector('#premium-class');
    if (!premiumClassSection) return;

    const premiumClassSectionTop = premiumClassSection.getBoundingClientRect().top;
    const premiumClassSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: {
                        y: premiumClassSectionTop,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });

                premiumClassSection.classList.add('show');
            },
            beforePreviousStep: () => {
                premiumClassSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: {
                        y: premiumClassSectionTop + 100,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });

                premiumClassSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                premiumClassSection.classList.remove('with-filter')
            }
        },
    ];
    const premiumClassController = createSectionState(premiumClassSteps);

    function increaseStep() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex++;
        console.log('incr', currentIndex)

        if (currentIndex === 1 || currentIndex === 0) {
            firstScreenController.increaseStep()
        } else {
            firstScreenController.increaseStep()
            premiumClassController.increaseStep()
        }

        setTimeout(() => (isAnimating = false), 1500);
    }
    function decreaseStep() {
        if (isAnimating) return;
        isAnimating = true;

        if (currentIndex === 0) {
            setTimeout(() => (isAnimating = false), 1500);
            return
        };
        currentIndex--;
        console.log('decr', currentIndex)

        if (currentIndex === 3) {
            premiumClassController.decreaseStep()
        } else if (currentIndex === 2) {
            premiumClassController.decreaseStep()
        } else if (currentIndex === 1) {
            premiumClassController.decreaseStep()
            firstScreenController.decreaseStep()
        } else {
            firstScreenController.decreaseStep()
        }

        setTimeout(() => (isAnimating = false), 1500);
    }

    firstScreenController.increaseStep()

    createPageObserver(
        () => decreaseStep(),
        () => increaseStep(),
    );
}