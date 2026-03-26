import { SectionTools } from "../types";
import { createFirstScreenDesktopState, createFirstScreenMobileState } from './create-first-screen-state';
import { createPremiumClassDesktopState, createPremiumClassMobileState } from './create-premium-class-state';
import { createSafetyAndComfortDesktopState, createSafetyAndComfortMobileState } from './create-safety-and-comfort-state';
import { createImprovementDesktopState, createImprovementMobileState } from './create-improvement-state';
import { createDesignAndInteriorDesktopState, createDesignAndInteriorMobileState } from './create-design-and-interior-state';
import { createApartmentsDesktopState, createApartmentsMobileState } from './create-apartments-state';
import { createPenthousesDesktopState, createPenthousesMobileState } from './create-penthouses-state';
import { createApplicationFormDesktopState, createApplicationFormMobileState } from './create-application-form-state';


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

export function getMobileSectionTools(tl: gsap.core.Timeline): SectionTools[] | null {
    const sections = getSections();
    if (!sections) return null;

    const tools: SectionTools[] = [];

    tools.push(createFirstScreenMobileState(sections.firstScreenSection, tl));
    tools.push(createPremiumClassMobileState(sections.premiumClassSection, tl, tools[0].maxStep));
    tools.push(createSafetyAndComfortMobileState(sections.safetyAndComfortSection, tl, tools[1].maxStep));
    tools.push(createImprovementMobileState(sections.improvementSection, tl, tools[2].maxStep));
    tools.push(createDesignAndInteriorMobileState(sections.designAndInteriorSection, tl, tools[3].maxStep));
    tools.push(createApartmentsMobileState(sections.apartmentsSection, tl, tools[4].maxStep));
    tools.push(createPenthousesMobileState(sections.penthousesSection, tl, tools[5].maxStep));
    tools.push(createApplicationFormMobileState(sections.applicationFormSection, tl, tools[6].maxStep));

    return tools;
}