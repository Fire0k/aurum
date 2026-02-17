import Observer from "gsap/dist/Observer";


export function createPageObserver(onDownCallback: () => void, onUpCallback: () => void) {
    Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        target: window,
        tolerance: 10,
        preventDefault: true,

        onDown() {
            onDownCallback();
        },

        onUp() {
            onUpCallback();
        },
    });
}