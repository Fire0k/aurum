import { StateStep } from "../types";


export function createSectionState(steps: StateStep[]) {
    let currentStepIndex: number = -1;

    function increaseStep() {
        const currentStep = steps[currentStepIndex];
        currentStep?.beforeNextStep?.();

        if (currentStepIndex === steps.length) return;

        currentStepIndex++;
        const newStep = steps[currentStepIndex];
        newStep?.onReachStep?.();
    }

    function decreaseStep() {
        const currentStep = steps[currentStepIndex];
        currentStep?.beforePreviousStep?.();

        if (currentStepIndex === -1) {
            return;
        };

        currentStepIndex--;
        const newStep = steps[currentStepIndex];
        newStep?.onReachStep?.();
    }

    return {
        currentStepIndex,

        increaseStep,
        decreaseStep,
    }
}