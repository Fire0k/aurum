import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createApplicationFormState(applicationFormSection: Element, sectionsContainer: Element): SectionTools {
    const applicationFormSectionTop = applicationFormSection.getBoundingClientRect().top;

    const applicationFormSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: applicationFormSectionTop },
                    duration: 1,
                    ease: "power1.inOut",
                });

                applicationFormSection.classList.add('show');
            },
            beforePreviousStep: () => {
                applicationFormSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: applicationFormSectionTop + 100 },
                    duration: 1,
                    ease: "power1.inOut",
                });

                applicationFormSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                applicationFormSection.classList.remove('with-filter')
            }
        },
    ];

    const applicationFormController = createSectionState(applicationFormSteps);

    return {
        controller: applicationFormController,
        maxStepIndex: applicationFormSteps.length - 1,
    }
}