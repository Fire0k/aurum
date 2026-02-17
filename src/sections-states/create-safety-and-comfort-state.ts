import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createSafetyAndComfortState(safetyAndComfortSection: Element, sectionsContainer: Element): SectionTools {
    const safetyAndComfortSectionTop = safetyAndComfortSection.getBoundingClientRect().top;

    const safetyAndComfortSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: {
                        y: safetyAndComfortSectionTop,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });

                safetyAndComfortSection.classList.add('show');
            },
            beforePreviousStep: () => {
                safetyAndComfortSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: {
                        y: safetyAndComfortSectionTop + 100,
                    },
                    duration: 1,
                    ease: "power1.inOut",
                });

                safetyAndComfortSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                safetyAndComfortSection.classList.remove('with-filter')
            }
        },
    ];

    const safetyAndComfortController = createSectionState(safetyAndComfortSteps);

    return {
        controller: safetyAndComfortController,
        maxStepIndex: safetyAndComfortSteps.length - 1,
    }
}