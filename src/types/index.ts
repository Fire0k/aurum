export interface StateStep { 
    onReachStep?: () => void,
    beforeNextStep?: () => void,
    beforePreviousStep?: () => void,
}

