import { SectionTools } from "../types";
import { createFirstScreenDesktopState, createFirstScreenMobileState } from './create-first-screen-state';
import { createPremiumClassDesktopState, createPremiumClassMobileState } from './create-premium-class-state';
import { createSafetyAndComfortDesktopState, createSafetyAndComfortMobileState } from './create-safety-and-comfort-state';
import { createImprovementDesktopState, createImprovementMobileState } from './create-improvement-state';
import { createApplicationFormDesktopState, createApplicationFormMobileState } from './create-application-form-state';


function getSections() {
    const firstScreenSection = document.getElementById('first-section')!;
    const premiumClassSection = document.getElementById('premium-class')!;
    const safetyAndComfortSection = document.getElementById('safety-and-comfort')!;
    const improvementSection = document.getElementById('improvement')!;
    const applicationFormSection = document.getElementById('application-form')!;

    if (![
        firstScreenSection,
        premiumClassSection,
        safetyAndComfortSection,
        improvementSection,
        applicationFormSection
    ].every((sectionEl) => !!sectionEl)) return null;

    return {
        firstScreenSection,
        premiumClassSection,
        safetyAndComfortSection,
        improvementSection,
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
    tools.push(createApplicationFormDesktopState(sections.applicationFormSection, tl, tools[3].maxStep));

    return tools;
}

export function getMobileSectionTools(tl: gsap.core.Timeline): SectionTools[] | null {
    const sections = getSections();
    if (!sections) return null;

    const tools: SectionTools[] = [];

    tools.push(createFirstScreenMobileState(sections.firstScreenSection, tl));
    tools.push(createPremiumClassMobileState(sections.premiumClassSection, tl, tools[0].maxStep));
    tools.push(createSafetyAndComfortMobileState(sections.safetyAndComfortSection, tl, tools[1].maxStep));
    tools.push(createImprovementMobileState(sections.improvementSection, tl, tools[2].maxStep));
    tools.push(createApplicationFormMobileState(sections.applicationFormSection, tl, tools[3].maxStep));

    return tools;
}