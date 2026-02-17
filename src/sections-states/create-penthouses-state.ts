import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createPenthousesState(penthousesSection: Element, sectionsContainer: Element): SectionTools {
    const penthousesSectionTop = penthousesSection.getBoundingClientRect().top;

    const penthousesSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: penthousesSectionTop },
                    duration: 1,
                    ease: "power1.inOut",
                });

                penthousesSection.classList.add('show');
            },
            beforePreviousStep: () => {
                penthousesSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: penthousesSectionTop + 100 },
                    duration: 1,
                    ease: "power1.inOut",
                });

                penthousesSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                penthousesSection.classList.remove('with-filter')
            }
        },
    ];

    const penthousesController = createSectionState(penthousesSteps);

    return {
        controller: penthousesController,
        maxStepIndex: penthousesSteps.length - 1,
    }
}