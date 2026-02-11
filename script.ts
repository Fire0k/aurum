import "normalize.css";

import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

history.scrollRestoration = "manual";

gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

let sections = Array.from(document.querySelectorAll(".animate-show-block"));
let sectionsTops = sections.map(
    (section) => section.getBoundingClientRect().top,
);
let currentIndex = 0;
let isAnimating = false;

// const exampleSection = document.getElementById('premium-class');
// const exampleSectionInner = exampleSection?.querySelector('.section-background');
// const showTween = gsap.to(exampleSectionInner!, {
// 	scale: 1.2,
// 	duration: 1,
// 	ease: "power1.inOut",
// });
// showTween.pause();

function goToSection(index: number, direction: 'up' | 'down') {
    if (isAnimating) return;

    if (index < 0 || index >= sections.length) return;

    currentIndex = index;

    isAnimating = true;

    gsap.to(window, {
        scrollTo: {
            y: sectionsTops[index],
        },
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => {
            setTimeout(() => isAnimating = false, 500);
        },
    });

	if (direction === 'down') {
		sections[index + 1].classList.remove('show');
	} 
	if (direction === 'up') {
		sections[index].classList.add('show');
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

// const exampleTrigger = ScrollTrigger.create({
// 	trigger: exampleSection,
// 	start: 'top bottom',
// 	onEnter: () => console.log('enter trigger'),
// 	onUpdate: (event) => {
// 		if (isAnimating2) return;

// 		if (event.direction === 1) {
// 			showTween.restart();
// 		};

// 		if (event.direction === -1) {
// 			showTween.reverse(0)
// 		};

// 		isAnimating2 = true;
// 	},
// 	onLeave: () => console.log('leave trigger'),
// });

