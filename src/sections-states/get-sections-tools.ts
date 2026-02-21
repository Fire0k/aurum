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
    const sectionsContainer = document.getElementById("sections-container");
    if (!sectionsContainer) {
        console.error('Не найдены секции страницы');
        return null;
    };

    const tools: SectionTools[] = [];

    const firstScreenSection = sectionsContainer.querySelector('#first-section');
    if (!firstScreenSection) {
        console.error('Не найдена стартовая секция страницы');
        return null;
    } else {
        tools.push(createFirstScreenState(firstScreenSection, sectionsContainer, tl));
    };

    const premiumClassSection = sectionsContainer.querySelector('#premium-class');
    if (!premiumClassSection) {
        console.error('Не найдена секция "«Аурум» — премиум-класс"');
        return null;
    } else {
        tools.push(createPremiumClassState(premiumClassSection, sectionsContainer, tl, tools[0].maxStep));
    };

    const safetyAndComfortSection = sectionsContainer.querySelector('#safety-and-comfort');
    if (!safetyAndComfortSection) {
        console.error('Не найдена секция "Безопасность и комфорт"');
        return null;
    } else {
        tools.push(createSafetyAndComfortState(safetyAndComfortSection, sectionsContainer, tl, tools[1].maxStep));
    };

    const improvementSection = sectionsContainer.querySelector('#improvement');
    if (!improvementSection) {
        console.error('Не найдена секция "Благоустройство"');
        return null;
    } else {
        tools.push(createImprovementState(improvementSection, sectionsContainer));
    };

    const designAndInteriorSection = sectionsContainer.querySelector('#design-and-interior');
    if (!designAndInteriorSection) {
        console.error('Не найдена секция "Дизайн и интерьер"');
        return null;
    } else {
        tools.push(createDesignAndInteriorState(designAndInteriorSection, sectionsContainer));
    };

    const apartmentsSection = sectionsContainer.querySelector('#apartments');
    if (!apartmentsSection) {
        console.error('Не найдена секция "Квартиры"');
        return null;
    } else {
        tools.push(createApartmentsState(apartmentsSection, sectionsContainer));
    };

    const penthousesSection = sectionsContainer.querySelector('#penthouses');
    if (!penthousesSection) {
        console.error('Не найдена секция "Пентхаусы"');
        return null;
    } else {
        tools.push(createPenthousesState(penthousesSection, sectionsContainer));
    };

    const applicationFormSection = sectionsContainer.querySelector('#application-form');
    if (!applicationFormSection) {
        console.error('Не найдена секция формы обратной связи');
        return null;
    } else {
        tools.push(createApplicationFormState(applicationFormSection, sectionsContainer));
    };


    return tools;
}