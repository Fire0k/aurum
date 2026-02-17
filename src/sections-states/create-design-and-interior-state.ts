import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createDesignAndInteriorState(designAndInteriorSection: Element, sectionsContainer: Element): SectionTools {
    const designAndInteriorSectionTop = designAndInteriorSection.getBoundingClientRect().top;

    const designAndInteriorSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: designAndInteriorSectionTop },
                    duration: 1,
                    ease: "power1.inOut",
                });

                designAndInteriorSection.classList.add('show');
            },
            beforePreviousStep: () => {
                designAndInteriorSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: designAndInteriorSectionTop + 100 },
                    duration: 1,
                    ease: "power1.inOut",
                });

                designAndInteriorSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                designAndInteriorSection.classList.remove('with-filter')
            }
        },
    ];

    const designAndInteriorController = createSectionState(designAndInteriorSteps);

    return {
        controller: designAndInteriorController,
        maxStepIndex: designAndInteriorSteps.length - 1,
    }
}