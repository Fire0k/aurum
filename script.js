import { g as gsapWithCSS, O as Observer, S as ScrollToPlugin, a as ScrollTrigger, b as Swiper, E as EffectFade, P as Pagination, N as Navigation, I as IMask } from './modules.js';

true              &&(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
}());

function bootstrap() {
  gsapWithCSS.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);
  history.scrollRestoration = "manual";
}

function createPageObserver(onDownCallback, onUpCallback) {
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
    }
  });
}

function createFirstScreenDesktopState(sectionElement, tl) {
  const maxStep = 1;
  const headerElement = document.querySelector("header");
  const headerLogoElement = headerElement?.querySelector(".logo-main") ?? null;
  const backgroundElement = document.querySelector(".first-section-background");
  const filterElement = document.querySelector(".filter");
  const sloganElement = sectionElement.querySelector(".slogan");
  const maskElement = sectionElement.querySelector(".mask");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  tl.to(filterElement, {
    duration: 1,
    ease: "none",
    opacity: 0
  }).to(backgroundElement, {
    duration: 1.5,
    ease: "none",
    scale: 2
  }, "<");
  tl.set(filterElement, { zIndex: 0, opacity: 1 });
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.addLabel("0");
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "none",
    scale: 1.5
  }).to(sloganElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    yPercent: 50
  }, "<");
  tl.set(sloganElement, { display: "none" });
  tl.addLabel("add-mask");
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "none",
    scale: 1
  });
  tl.addLabel("1");
  tl.to(maskElement, {
    duration: 1.5,
    ease: "none",
    maskSize: "100% 100%, 0px"
  }).to(headerLogoElement, {
    duration: 1.5,
    ease: "none",
    opacity: 1
  }, "<");
  tl.set(maskElement, { delay: 0.1, display: "none" });
  tl.set(backgroundElement, { opacity: 0.1 });
  tl.to(nextSectionTitleElement, {
    delay: 0.2,
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  return {
    maxStep
  };
}
function createFirstScreenMobileAnimate() {
  document.body.classList.add("ready");
}

function createPremiumClassDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 7;
  const headerElement = document.querySelector("header");
  const headerGradientElement = headerElement?.querySelector(".gradient") ?? null;
  const backgroundElement = document.querySelector(".premium-class-background");
  const filterElement = document.querySelector(".filter");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  const sliderElement = sectionElement.querySelector(".half-slider");
  const sliderTextElements = sliderElement.querySelector(".half-slider-text");
  const sliderImagesElement = sliderElement.querySelector(".half-slider-img");
  const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
  const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "power1.out",
    scale: 0.9,
    yPercent: -20
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(headerGradientElement, {
    duration: 0.5,
    opacity: 1
  }).to(backgroundElement, {
    duration: 2,
    ease: "power1.in",
    yPercent: -100,
    scale: 1.2
  }, "<");
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.set(filterElement, { zIndex: 3 });
  tl.addLabel(`${startStep + 2}`);
  tl.set(sectionElement, { yPercent: -100 });
  tl.to(backgroundElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0.2
  }).to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<").to(images[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(images[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 0
  }, "<").to(images[1], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }).to(texts[1], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 4}`);
  tl.to(texts[1], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(images[1], {
    duration: 1,
    ease: "power1.in",
    opacity: 0
  }, "<").to(images[2], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }).to(texts[2], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 5}`);
  tl.to(texts[2], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(images[2], {
    duration: 1,
    ease: "power1.in",
    opacity: 0
  }, "<").to(images[3], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }).to(texts[3], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 6}`);
  tl.to(texts[3], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(images[3], {
    duration: 1,
    ease: "power1.in",
    opacity: 0
  }, "<").to(images[4], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }).to(texts[4], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 7}`);
  tl.to(texts[4], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(sliderImagesElement, {
    duration: 1,
    ease: "power1.in",
    height: 0
  }, "<");
  tl.set(sliderElement, { display: "none" });
  tl.to(nextSectionTitleElement, {
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  return {
    maxStep
  };
}

function createSafetyAndComfortDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const backgroundElement = document.querySelector(".safety-and-comfort-background");
  const filterElement = document.querySelector(".filter");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  const sliderElement = sectionElement.querySelector(".half-slider");
  const sliderTextElements = sliderElement.querySelector(".half-slider-text");
  const sliderImagesElement = sliderElement.querySelector(".half-slider-img");
  const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
  const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "power1.out",
    scale: 0.9,
    yPercent: -20
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(backgroundElement, {
    duration: 2,
    ease: "power1.in",
    yPercent: -100,
    scale: 1.2
  });
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.set(filterElement, { zIndex: 6 });
  tl.addLabel(`${startStep + 2}`);
  tl.set(sectionElement, { yPercent: -100 });
  tl.to(backgroundElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0.2
  }).to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<").to(images[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(sliderImagesElement, {
    duration: 1,
    ease: "power1.in",
    height: 0
  }, "<");
  tl.set(sliderElement, { display: "none" });
  tl.to(nextSectionTitleElement, {
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  return {
    maxStep
  };
}

function createImprovementDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const backgroundElement = document.querySelector(".improvement-background");
  const filterElement = document.querySelector(".filter");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  const sliderElement = sectionElement.querySelector(".half-slider");
  const sliderTextElements = sliderElement.querySelector(".half-slider-text");
  const sliderImagesElement = sliderElement.querySelector(".half-slider-img");
  const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
  const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "power1.out",
    scale: 0.9,
    yPercent: -20
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(backgroundElement, {
    duration: 2,
    ease: "power1.in",
    yPercent: -100,
    scale: 1.2
  });
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.set(filterElement, { zIndex: 9 });
  tl.addLabel(`${startStep + 2}`);
  tl.set(sectionElement, { yPercent: -100 });
  tl.to(backgroundElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0.2
  }).to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<").to(images[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(sliderImagesElement, {
    duration: 1,
    ease: "power1.in",
    height: 0
  }, "<");
  tl.set(sliderElement, { display: "none" });
  tl.to(nextSectionTitleElement, {
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  return {
    maxStep
  };
}

function createDesignAndInteriorDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const backgroundElement = document.querySelector(".design-and-interior-background");
  const filterElement = document.querySelector(".filter");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  const sliderElement = sectionElement.querySelector(".half-slider");
  const sliderTextElements = sliderElement.querySelector(".half-slider-text");
  const sliderImagesElement = sliderElement.querySelector(".half-slider-img");
  const texts = Array.from(sliderTextElements.querySelectorAll(`.text-wrapper`));
  const images = Array.from(sliderImagesElement.querySelectorAll(`.img-wrapper`));
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "power1.out",
    scale: 0.9,
    yPercent: -20
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(backgroundElement, {
    duration: 2,
    ease: "power1.in",
    yPercent: -100,
    scale: 1.2
  });
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.set(filterElement, { zIndex: 12 });
  tl.addLabel(`${startStep + 2}`);
  tl.set(sectionElement, { yPercent: -100 });
  tl.to(backgroundElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0.2
  }).to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<").to(images[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 1
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(texts[0], {
    duration: 1,
    ease: "power1.in",
    opacity: 0,
    yPercent: 20
  }).to(sliderImagesElement, {
    duration: 1,
    ease: "power1.in",
    height: 0
  }, "<");
  tl.set(sliderElement, { display: "none" });
  tl.to(nextSectionTitleElement, {
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  return {
    maxStep
  };
}

function initFullpageSlider(backgroundElement, buttonsElement) {
  const slider = backgroundElement.querySelector(".swiper");
  const paginationElement = backgroundElement.querySelector(".slider-pagination");
  buttonsElement.querySelector(".next");
  buttonsElement.querySelector(".prev");
  new Swiper(slider, {
    modules: [EffectFade, Pagination, Navigation],
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 700,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: paginationElement,
      clickable: true
    }
  });
}

function createApartmentsDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 2;
  const backgroundElement = document.querySelector(".apartments-background");
  const filterElement = document.querySelector(".filter");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  const buttonsElement = sectionElement.querySelector(".slider-buttons");
  initFullpageSlider(backgroundElement, sectionElement);
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "power1.out",
    scale: 0.9,
    yPercent: -20
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(backgroundElement, {
    duration: 2,
    ease: "power1.in",
    yPercent: -100,
    scale: 1.2
  });
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.set(filterElement, { zIndex: 15 });
  tl.set(sectionElement, { yPercent: -100 });
  tl.to(buttonsElement, {
    duration: 0.5,
    ease: "none",
    opacity: 1
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(backgroundElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0.2
  }).to(buttonsElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0
  }, "<").to(nextSectionTitleElement, {
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  return {
    maxStep
  };
}

function createPenthousesDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 2;
  const backgroundElement = document.querySelector(".penthouses-background");
  const filterElement = document.querySelector(".filter");
  const buttonsElement = sectionElement.querySelector(".slider-buttons");
  initFullpageSlider(backgroundElement, sectionElement);
  tl.to(backgroundElement, {
    duration: 1.5,
    ease: "power1.out",
    scale: 0.9,
    yPercent: -20
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(backgroundElement, {
    duration: 2,
    ease: "power1.in",
    yPercent: -100,
    scale: 1.2
  });
  tl.set(filterElement, { zIndex: 18 });
  tl.set(sectionElement, { yPercent: -100 });
  tl.to(buttonsElement, {
    duration: 0.5,
    ease: "none",
    opacity: 1
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(backgroundElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0.2
  }).to(buttonsElement, {
    duration: 1,
    ease: "power1.in",
    opacity: 0
  }, "<");
  return {
    maxStep
  };
}

function createApplicationFormDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 1;
  const footerElement = document.querySelector("footer");
  tl.set(sectionElement, { yPercent: -80 });
  tl.to(sectionElement, {
    duration: 2,
    ease: "power1.out",
    yPercent: -100,
    opacity: 1
  }).to(footerElement, {
    duration: 1,
    ease: "power1.out",
    opacity: 1
  });
  tl.addLabel(`${startStep + 1}`);
  return {
    maxStep
  };
}

function initMobileSliderSection(sectionElement) {
  const paginationElement = sectionElement.querySelector(".slider-pagination");
  const nextButtonElements = sectionElement.querySelectorAll(".swiper-button-next");
  const prevButtonElements = sectionElement.querySelectorAll(".swiper-button-prev");
  const siderTexts = sectionElement.querySelectorAll(".mobile-slide-text");
  const filterElement = sectionElement.querySelector(".mobile-slider-filter");
  const titleElement = sectionElement.querySelector(".section-title-wrapper");
  const tl = gsapWithCSS.timeline({ paused: true });
  tl.to([filterElement, titleElement], {
    duration: 1,
    ease: "none",
    opacity: 0
  }).to([nextButtonElements, prevButtonElements, paginationElement, ...siderTexts], {
    duration: 1,
    ease: "none",
    opacity: 1
  }, "<").set([filterElement, titleElement], { display: "none" });
  ScrollTrigger.create({
    trigger: sectionElement,
    start: "top top+=100",
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse()
  });
  initFullpageSlider(sectionElement, sectionElement);
  gsapWithCSS.to(
    sectionElement.querySelectorAll(".img-wrapper"),
    {
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionElement,
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    }
  );
}

function getDesktopSectionsTools(tl) {
  const tools = [];
  tools.push(createFirstScreenDesktopState(document.getElementById("first-section"), tl));
  tools.push(createPremiumClassDesktopState(document.getElementById("premium-class"), tl, tools[0].maxStep));
  tools.push(createSafetyAndComfortDesktopState(document.getElementById("safety-and-comfort"), tl, tools[1].maxStep));
  tools.push(createImprovementDesktopState(document.getElementById("improvement"), tl, tools[2].maxStep));
  tools.push(createDesignAndInteriorDesktopState(document.getElementById("design-and-interior"), tl, tools[3].maxStep));
  tools.push(createApartmentsDesktopState(document.getElementById("apartments"), tl, tools[4].maxStep));
  tools.push(createPenthousesDesktopState(document.getElementById("penthouses"), tl, tools[5].maxStep));
  tools.push(createApplicationFormDesktopState(document.getElementById("application-form"), tl, tools[6].maxStep));
  return tools;
}
function activateMobileAnimate() {
  createFirstScreenMobileAnimate();
  initMobileSliderSection(document.getElementById("premium-class"));
  initMobileSliderSection(document.getElementById("safety-and-comfort"));
  initMobileSliderSection(document.getElementById("improvement"));
  initMobileSliderSection(document.getElementById("design-and-interior"));
}

function createPageState() {
  const isMobile = window.innerWidth <= 992;
  if (!isMobile) {
    let increaseStep = function() {
      if (gsapWithCSS.isTweening(tl)) return;
      if (currentStep === sectionsTools.at(-1).maxStep) return;
      currentStep++;
      tl.tweenTo(`${currentStep}`);
      if (currentStep !== 1) {
        prevStep++;
      }
    }, decreaseStep = function() {
      if (gsapWithCSS.isTweening(tl)) return;
      if (currentStep === 0) return;
      currentStep--;
      tl.tweenTo(`${currentStep}`);
      if (currentStep !== 0) {
        prevStep--;
      }
    };
    const tl = gsapWithCSS.timeline({ paused: true });
    const sectionsTools = getDesktopSectionsTools(tl);
    if (!sectionsTools) return;
    let prevStep = 0;
    let currentStep = 0;
    tl.tweenTo(`${0}`);
    createPageObserver(
      () => decreaseStep(),
      () => increaseStep()
    );
    const firstScreenSection = document.getElementById("first-section");
    const maskElement = document.querySelector(".mask");
    tl.call(() => {
      if (prevStep > currentStep || currentStep === 0) return;
      firstScreenSection.classList.add("with-mask");
    }, void 0, "add-mask");
    tl.call(() => {
      if (prevStep < currentStep) return;
      firstScreenSection.classList.remove("with-mask");
    }, void 0, "1-=0.01");
    tl.call(() => {
      if (prevStep > currentStep || currentStep === 0) return;
      maskElement.style.transitionDuration = "1.5s";
    }, void 0, "1");
    tl.call(() => {
      if (prevStep < currentStep) return;
      maskElement.style.transitionDuration = "unset";
    }, void 0, "1");
  } else {
    activateMobileAnimate();
    const burgerButtonElement = document.querySelector(".burger-menu");
    const burgerCloseButtonElement = document.querySelector(".menu-close-button");
    burgerButtonElement.addEventListener("click", () => {
      document.body.classList.add("show-menu");
    });
    burgerCloseButtonElement.addEventListener("click", () => {
      document.body.classList.remove("show-menu");
    });
    IMask(
      document.getElementById("application-form-tel"),
      {
        mask: "+{7} (000) 000-00-00",
        lazy: false,
        placeholderChar: "_"
      }
    );
  }
}

bootstrap();
window.addEventListener("load", async () => {
  await document.fonts.ready;
  requestAnimationFrame(() => {
    createPageState();
  });
});
