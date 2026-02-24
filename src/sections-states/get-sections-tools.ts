import { SectionTools } from "../types";
import { createFirstScreenState } from './create-first-screen-state';
import { createPremiumClassState } from './create-premium-class-state';
import { createSafetyAndComfortState } from './create-safety-and-comfort-state';
import { createImprovementState } from './create-improvement-state';
import { createDesignAndInteriorState } from './create-design-and-interior-state';
import { createApartmentsState } from './create-apartments-state';
import { createPenthousesState } from './create-penthouses-state';
import { createApplicationFormState } from './create-application-form-state';


export function getSectionsTools(tl: gsap.core.Timeline): SectionTools[] | null {
    const tools: SectionTools[] = [];

    const firstScreenSection = document.getElementById('first-section');
    if (!firstScreenSection) {
        console.error('Не найдена стартовая секция страницы');
        return null;
    } else {
        tools.push(createFirstScreenState(firstScreenSection, tl));
    };

    const premiumClassSection = document.getElementById('premium-class');
    if (!premiumClassSection) {
        console.error('Не найдена секция "«Аурум» — премиум-класс"');
        return null;
    } else {
        tools.push(createPremiumClassState(premiumClassSection, tl, tools[0].maxStep));
    };

    const safetyAndComfortSection = document.getElementById('safety-and-comfort');
    if (!safetyAndComfortSection) {
        console.error('Не найдена секция "Безопасность и комфорт"');
        return null;
    } else {
        tools.push(createSafetyAndComfortState(safetyAndComfortSection, tl, tools[1].maxStep));
    };

    const improvementSection = document.getElementById('improvement');
    if (!improvementSection) {
        console.error('Не найдена секция "Благоустройство"');
        return null;
    } else {
        tools.push(createImprovementState(improvementSection, tl, tools[2].maxStep));
    };

    const designAndInteriorSection = document.getElementById('design-and-interior');
    if (!designAndInteriorSection) {
        console.error('Не найдена секция "Дизайн и интерьер"');
        return null;
    } else {
        tools.push(createDesignAndInteriorState(designAndInteriorSection, tl, tools[3].maxStep));
    };

    const apartmentsSection = document.getElementById('apartments');
    if (!apartmentsSection) {
        console.error('Не найдена секция "Квартиры"');
        return null;
    } else {
        tools.push(createApartmentsState(apartmentsSection, tl, tools[4].maxStep));
    };

    const penthousesSection = document.getElementById('penthouses');
    if (!penthousesSection) {
        console.error('Не найдена секция "Пентхаусы"');
        return null;
    } else {
        tools.push(createPenthousesState(penthousesSection, tl, tools[5].maxStep));
    };

    const applicationFormSection = document.getElementById('application-form');
    if (!applicationFormSection) {
        console.error('Не найдена секция формы обратной связи');
        return null;
    } else {
        tools.push(createApplicationFormState(applicationFormSection, tl, tools[6].maxStep));
    };


    return tools;
}