import gsap from "gsap";

import { createPageObserver } from "./create-page-observer";
import { createFirstScreenState } from '../sections-states/create-first-screen-state';
import { createPremiumClassState } from '../sections-states/create-premium-class-state';
import { getSectionsTools } from '../sections-states/get-sections-tools';
import { SectionTools } from "../types";


export function createPageState() {
    const sectionsTools = getSectionsTools() as SectionTools[];
    if (!sectionsTools) return;
    
    sectionsTools[0].controller.increaseStep();

    let currentSection = sectionsTools[0];
    let currentSectionIndex = 0;
    let currentSectionStepIndex = 0;

    let isAnimating = false;

    function increaseStep() {
        if (isAnimating) return;

        const isInEnd = currentSectionIndex === sectionsTools.length - 1 && currentSectionStepIndex === currentSection.maxStepIndex;
        if (isInEnd) return;

        isAnimating = true;

        currentSection.controller.increaseStep();
        console.log('inc', currentSection, currentSectionIndex, currentSectionStepIndex);

        if (currentSectionStepIndex === currentSection.maxStepIndex) {
            currentSectionIndex++;
            currentSection = sectionsTools[currentSectionIndex];

            currentSectionStepIndex = 0;

            currentSection.controller.increaseStep();
        } else {
            currentSectionStepIndex++;
        }

        setTimeout(() => (isAnimating = false), 1500);
    }
    function decreaseStep() {
        if (isAnimating) return;

        const isInStart = currentSectionIndex === 0 && currentSectionStepIndex === 0;
        if (isInStart) return;

        isAnimating = true;

        currentSection.controller.decreaseStep();
        console.log('dec', currentSection, currentSectionIndex, currentSectionStepIndex);

        if (currentSectionStepIndex === 0) {
            currentSectionIndex--;
            currentSection = sectionsTools[currentSectionIndex];

            currentSectionStepIndex = currentSection.maxStepIndex;

            currentSection.controller.decreaseStep()
        } else {
            currentSectionStepIndex--;
        }

        setTimeout(() => (isAnimating = false), 1500);
    }

    createPageObserver(
        () => decreaseStep(),
        () => increaseStep(),
    );
}