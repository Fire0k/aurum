import "normalize.css";

import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

history.scrollRestoration = "manual";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);
gsap.config({
  force3D: true
});

const sectionsContainer = document.querySelector('.main-page');
let sections = Array.from(sectionsContainer!.querySelectorAll(".animate-show-block"));
let stepsTops: { top: number; element?: Element }[] = sections.flatMap((el) => {
	const top = el.getBoundingClientRect().top;

	return [
		{ top, element: el },
		{ top: top + 100 }
	]
})

let currentIndex = 0;

let isAnimating = false;

function goToSection(index: number, direction: 'up' | 'down') {
    if (isAnimating) return;

    if (index < 0 || index >= stepsTops.length) return;

    currentIndex = index;

    isAnimating = true;

	const el = stepsTops[index].element;
	let duration: number = 1;
	if (direction === 'up') {
		duration = stepsTops[index].element ? 1 : 1;
	}
	if (direction === 'down') {
		duration = stepsTops[index + 1].element ? 1 : 1;
	}

    gsap.to(sectionsContainer, {
        scrollTo: {
            y: stepsTops[index].top,
        },
        duration,
        ease: "power1.inOut",
        onComplete: () => {
            setTimeout(() => isAnimating = false, 900);
        },
    });

	if (direction === 'down') {
		const prevEl = stepsTops[index + 1].element;
		if (prevEl) {
			prevEl.classList.remove('show');
		};
		if (el) {
			el.classList.remove('with-filter')
		}
	} 
	if (direction === 'up') {
		if (el) {
			el.classList.add('show');
		} else {
			const prevEl = stepsTops[index - 1].element;
			prevEl?.classList.add('with-filter')
		}
	}
}

Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    target: window,
    tolerance: 10,
    preventDefault: true,

    onDown() {
        goToSection(currentIndex - 1, 'down');
    },

    onUp() {
        goToSection(currentIndex + 1, 'up');
    },
});

