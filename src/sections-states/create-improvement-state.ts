import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createImprovementState(improvementSection: Element, sectionsContainer: Element): SectionTools {
    const improvementSectionTop = improvementSection.getBoundingClientRect().top;

    const improvementSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: improvementSectionTop },
                    duration: 1,
                    ease: "power1.inOut",
                });

                improvementSection.classList.add('show');
            },
            beforePreviousStep: () => {
                improvementSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: improvementSectionTop + 100 },
                    duration: 1,
                    ease: "power1.inOut",
                });

                improvementSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                improvementSection.classList.remove('with-filter')
            }
        },
    ];

    const improvementController = createSectionState(improvementSteps);

    return {
        controller: improvementController,
        maxStepIndex: improvementSteps.length - 1,
    }
}