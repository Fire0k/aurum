import Observer from "gsap/dist/Observer";


export function createPageObserver(onDownCallback: () => void, onUpCallback: () => void) {
    const observer = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        target: window,
        tolerance: 50,
        preventDefault: true,
        ignore: document.getElementById('application-form'),

        onDown() {
            onDownCallback();
        },

        onUp() {
            onUpCallback();
        },
    });

    return observer;
}