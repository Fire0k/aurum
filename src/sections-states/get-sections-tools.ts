import { SectionTools } from "../types";
import { createFirstScreenDesktopState } from './create-first-screen-state';
import { createPremiumClassDesktopState } from './create-premium-class-state';
import { createSafetyAndComfortDesktopState } from './create-safety-and-comfort-state';
import { createImprovementDesktopState } from './create-improvement-state';
import { createDesignAndInteriorDesktopState } from './create-design-and-interior-state';
import { createApartmentsDesktopState } from './create-apartments-state';
import { createPenthousesDesktopState } from './create-penthouses-state';
import { createApplicationFormDesktopState } from './create-application-form-state';
import { initMobileSection } from "./init-fullpage-slider";


export function getDesktopSectionsTools(tl: gsap.core.Timeline): SectionTools[] | null {
    const tools: SectionTools[] = [];

    tools.push(createFirstScreenDesktopState(document.getElementById('first-section')!, tl));
    tools.push(createPremiumClassDesktopState(document.getElementById('premium-class')!, tl, tools[0].maxStep));
    tools.push(createSafetyAndComfortDesktopState(document.getElementById('safety-and-comfort')!, tl, tools[1].maxStep));
    tools.push(createImprovementDesktopState(document.getElementById('improvement')!, tl, tools[2].maxStep));
    tools.push(createDesignAndInteriorDesktopState(document.getElementById('design-and-interior')!, tl, tools[3].maxStep));
    tools.push(createApartmentsDesktopState(document.getElementById('apartments')!, tl, tools[4].maxStep));
    tools.push(createPenthousesDesktopState(document.getElementById('penthouses')!, tl, tools[5].maxStep));
    tools.push(createApplicationFormDesktopState(document.getElementById('application-form')!, tl, tools[6].maxStep));

    return tools;
}

export function activateMobileAnimate(): void {
    initMobileSection(document.getElementById('premium-class')!);
    initMobileSection(document.getElementById('safety-and-comfort')!);
    initMobileSection(document.getElementById('improvement')!);
    initMobileSection(document.getElementById('design-and-interior')!);
}