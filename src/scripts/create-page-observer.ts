import Observer from "gsap/dist/Observer";


export function createPageObserver(onDownCallback: () => void, onUpCallback: () => void) {
    const observer = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        target: window,
        tolerance: 50,
        preventDefault: true,

        onDown() {
            onDownCallback();
            observer.disable();
            setTimeout(() => observer.enable(), 1200);
        },

        onUp() {
            onUpCallback();
            observer.disable();
            setTimeout(() => observer.enable(), 1200);
        },
    });

    return observer;
}