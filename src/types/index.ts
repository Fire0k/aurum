export type StateStep = { 
    onReachStep?: () => void,
    beforeNextStep?: () => void,
    beforePreviousStep?: () => void,
}

export type SectionTools = {
    controller: {
        increaseStep: () => void;
        decreaseStep: () => void;
    };
    maxStepIndex: number;
}

