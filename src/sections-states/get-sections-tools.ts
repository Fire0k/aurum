import { SectionTools } from "../types";
import { createFirstScreenDesktopState, createFirstScreenMobileAnimate } from './create-first-screen-state';
import { createPremiumClassDesktopState } from './create-premium-class-state';
import { createSafetyAndComfortDesktopState } from './create-safety-and-comfort-state';
import { createImprovementDesktopState } from './create-improvement-state';
import { createDesignAndInteriorDesktopState } from './create-design-and-interior-state';
import { createApartmentsDesktopState } from './create-apartments-state';
import { createPenthousesDesktopState } from './create-penthouses-state';
import { createApplicationFormDesktopState } from './create-application-form-state';
import { initMobileSliderSection } from "./init-mobile-slider-section";


function getSections() {
    const firstScreenSection = document.getElementById('first-section')!;
    const premiumClassSection = document.getElementById('premium-class')!;
    const safetyAndComfortSection = document.getElementById('safety-and-comfort')!;
    const improvementSection = document.getElementById('improvement')!;
    const designAndInteriorSection = document.getElementById('design-and-interior')!;
    const apartmentsSection = document.getElementById('apartments')!;
    const penthousesSection = document.getElementById('penthouses')!;
    const applicationFormSection = document.getElementById('application-form')!;

    if (![
        firstScreenSection,
        premiumClassSection,
        safetyAndComfortSection,
        improvementSection,
        designAndInteriorSection,
        apartmentsSection,
        penthousesSection,
        applicationFormSection
    ].every((sectionEl) => !!sectionEl)) return null;

    return {
        firstScreenSection,
        premiumClassSection,
        safetyAndComfortSection,
        improvementSection,
        designAndInteriorSection,
        apartmentsSection,
        penthousesSection,
        applicationFormSection
    }
}

export function getDesktopSectionsTools(tl: gsap.core.Timeline): SectionTools[] | null {
    const sections = getSections();
    if (!sections) return null;

    const tools: SectionTools[] = [];

    tools.push(createFirstScreenDesktopState(sections.firstScreenSection, tl));
    tools.push(createPremiumClassDesktopState(sections.premiumClassSection, tl, tools[0].maxStep));
    tools.push(createSafetyAndComfortDesktopState(sections.safetyAndComfortSection, tl, tools[1].maxStep));
    tools.push(createImprovementDesktopState(sections.improvementSection, tl, tools[2].maxStep));
    tools.push(createDesignAndInteriorDesktopState(sections.designAndInteriorSection, tl, tools[3].maxStep));
    tools.push(createApartmentsDesktopState(sections.apartmentsSection, tl, tools[4].maxStep));
    tools.push(createPenthousesDesktopState(sections.penthousesSection, tl, tools[5].maxStep));
    tools.push(createApplicationFormDesktopState(sections.applicationFormSection, tl, tools[6].maxStep));

    return tools;
}

export function activateMobileAnimate(): void {
    const sections = getSections();
    if (!sections) return;

    createFirstScreenMobileAnimate();
    initMobileSliderSection(sections.premiumClassSection);
    initMobileSliderSection(sections.safetyAndComfortSection);
    initMobileSliderSection(sections.improvementSection);
    initMobileSliderSection(sections.designAndInteriorSection);
}