import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createFirstScreenState(firstScreenSection: Element, sectionsContainer: Element): SectionTools {
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

    return {
        controller: firstScreenController,
        maxStepIndex: firstScreenSteps.length - 1,
    }
}