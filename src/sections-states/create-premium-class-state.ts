import gsap from "gsap";

import { createSectionState } from '../scripts/create-section-state';
import { StateStep, SectionTools } from '../types';


export function createPremiumClassState(premiumClassSection: Element, sectionsContainer: Element): SectionTools {
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

    return {
        controller: premiumClassController,
        maxStepIndex: premiumClassSteps.length - 1,
    }
}