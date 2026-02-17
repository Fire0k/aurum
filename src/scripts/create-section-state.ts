import { StateStep } from "../types";


export function createSectionState(steps: StateStep[]) {
    let currentStepIndex: number = 0;
    let inFuture = true;
    let inPast = false;

    function increaseStep() {
        if (inFuture) {
            inFuture = false;

            const newStep = steps[0];
            newStep?.onReachStep?.();

            return;
        } else {
            const currentStep = steps[currentStepIndex];
            currentStep?.beforeNextStep?.();

            if (currentStepIndex === steps.length - 1) {
                inPast = true;
                return
            };

            currentStepIndex++;

            const newStep = steps[currentStepIndex];
            newStep?.onReachStep?.();
        }
    }

    function decreaseStep() {
        if (inPast) {
            inPast = false;

            const newStep = steps.at(-1);
            newStep?.onReachStep?.();

            return;
        } else {
            const currentStep = steps[currentStepIndex];
            currentStep?.beforePreviousStep?.();

            if (currentStepIndex === 0) {
                inFuture = true;
                return
            };

            currentStepIndex--;
            const newStep = steps[currentStepIndex];
            newStep?.onReachStep?.();
        }
    }

    return {
        increaseStep,
        decreaseStep,
    }
}