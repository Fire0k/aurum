import 'normalize.css';


import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";

history.scrollRestoration = "manual";

gsap.registerPlugin(Observer, ScrollToPlugin)

let sections = Array.from(document.querySelectorAll(".section-wrapper")).map(section => section.getBoundingClientRect().top);
let currentIndex = 0
let isAnimating = false

function goToSection(index: number) {
  if (isAnimating) return;

  if (index < 0 || index >= sections.length) return

  currentIndex = index;

  isAnimating = true

  gsap.to(window, {
    scrollTo: {
      y: sections[index],
    },
    duration: 1.5,
    ease: "power3.inOut",
    onComplete: () => {
      console.log('complete')
      isAnimating = false
    }
  })
}

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  target: window,
  tolerance: 10,
  preventDefault: true,

  onDown() {
    console.log('down')
    goToSection(currentIndex - 1)
  },

  onUp() {
    console.log('up')
    goToSection(currentIndex + 1)
  },
})