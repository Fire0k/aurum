import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createApartmentsState(apartmentsSection: Element, sectionsContainer: Element): SectionTools {
    const apartmentsSectionTop = apartmentsSection.getBoundingClientRect().top;

    const apartmentsSteps: StateStep[] = [
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: apartmentsSectionTop },
                    duration: 1,
                    ease: "power1.inOut",
                });

                apartmentsSection.classList.add('show');
            },
            beforePreviousStep: () => {
                apartmentsSection.classList.remove('show');
            }
        },
        {
            onReachStep: () => {
                gsap.to(sectionsContainer, {
                    scrollTo: { y: apartmentsSectionTop + 100 },
                    duration: 1,
                    ease: "power1.inOut",
                });

                apartmentsSection.classList.add('with-filter')
            },
            beforePreviousStep: () => {
                apartmentsSection.classList.remove('with-filter')
            }
        },
    ];

    const apartmentsController = createSectionState(apartmentsSteps);

    return {
        controller: apartmentsController,
        maxStepIndex: apartmentsSteps.length - 1,
    }
}