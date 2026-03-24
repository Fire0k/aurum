import { g as gsapWithCSS, O as Observer, S as ScrollToPlugin, a as ScrollTrigger, b as Swiper, E as EffectFade, N as Navigation, I as IMask } from './modules.js';

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
  const observer = Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    target: window,
    tolerance: 50,
    preventDefault: true,
    ignore: document.getElementById("application-form"),
    onDown() {
      onDownCallback();
    },
    onUp() {
      onUpCallback();
    }
  });
  return observer;
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
function createFirstScreenMobileState(sectionElement, tl) {
  document.body.classList.add("ready");
  const maxStep = 1;
  const backgroundElement = document.querySelector(".first-section-background");
  const filterElement = document.querySelector(".filter");
  const maskElement = sectionElement.querySelector(".mask");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  tl.set(filterElement, { zIndex: 0, opacity: 1 });
  tl.set(nextSectionTitleElement, { yPercent: 50 });
  tl.addLabel("0");
  tl.to(maskElement, {
    duration: 1.5,
    ease: "none",
    maskSize: "100% 100%, auto 0%"
  });
  tl.set(maskElement, { delay: 0.1, display: "none" });
  tl.set(backgroundElement, { opacity: 0.1 });
  tl.to(nextSectionTitleElement, {
    delay: 0.2,
    duration: 1.5,
    ease: "power1.out",
    opacity: 1,
    yPercent: -50
  });
  tl.addLabel("1");
  tl.to(backgroundElement, {
    duration: 1,
    ease: "none",
    opacity: 0
  }).to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
  }, "<");
  return {
    maxStep
  };
}

function initFullpageSlider(sliderElement, buttonsElement) {
  const nextBtn = buttonsElement.querySelector(".next");
  const prevBtn = buttonsElement.querySelector(".prev");
  new Swiper(sliderElement, {
    modules: [EffectFade, Navigation],
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 700,
    loop: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn
    }
  });
}

function initMobileSlider(sliderElement) {
  new Swiper(sliderElement, {
    // modules: [EffectCreative],
    // effect: 'creative',
    // creativeEffect: {
    //     prev: {
    //         translate: ["-20%", 0, -1],
    //     },
    //         next: {
    //         translate: ["100%", 0, 0],
    //     },
    // },
    modules: [EffectFade],
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 700,
    loop: true
  });
}

function createPremiumClassDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 6;
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
  images.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".desktop-slider");
    if (!swiper) return;
    const buttons = wrapper.querySelector(".desktop-slider-buttons");
    if (!buttons) return;
    initFullpageSlider(swiper, buttons);
  });
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
    opacity: 1,
    zIndex: 1
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
    opacity: 0,
    zIndex: 0
  }, "<").to(images[1], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1,
    zIndex: 1
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
    opacity: 0,
    zIndex: 0
  }, "<").to(images[2], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1,
    zIndex: 1
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
    opacity: 0,
    zIndex: 0
  }, "<").to(images[3], {
    duration: 0.5,
    ease: "power1.in",
    opacity: 1,
    zIndex: 1
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
function createPremiumClassMobileState(sectionElement, tl, startStep) {
  const maxStep = startStep + 9;
  const mobileTitleElement = sectionElement.querySelector(".mobile-section-title-wrapper");
  const titleImageElement = mobileTitleElement.querySelector(".mobile-img");
  const titleImageWrapperElement = titleImageElement.querySelector(".img-wrapper");
  titleImageWrapperElement.querySelector("img").style.height = `${titleImageElement.getBoundingClientRect().height}px`;
  const sliderElement = sectionElement.querySelector(".mobile-slider");
  const sliders = sliderElement.querySelectorAll(".slide-wrapper");
  sliders.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".mobile-swiper");
    if (!swiper) return;
    initMobileSlider(swiper);
  });
  tl.to(sectionElement, {
    duration: 1.5,
    delay: 0.5,
    ease: "none",
    yPercent: -100
  }, "<").to(titleImageWrapperElement, {
    duration: 1.5,
    ease: "none",
    height: "100%"
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(mobileTitleElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: "30%",
    display: "none"
  }).fromTo(sliderElement, { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[0].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    yPercent: -10,
    display: "none"
  }).fromTo(sliders[1], { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 4}`);
  tl.to(sliders[1], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[1].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 5}`);
  tl.to(sliders[1], {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    yPercent: -10,
    display: "none"
  }).fromTo(sliders[2], { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 6}`);
  tl.to(sliders[2], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[2].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 7}`);
  tl.to(sliders[2], {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    yPercent: -10,
    display: "none"
  }).fromTo(sliders[3], { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 8}`);
  tl.to(sliders[3], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[3].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 9}`);
  tl.to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
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
function createSafetyAndComfortMobileState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const mobileTitleElement = sectionElement.querySelector(".mobile-section-title-wrapper");
  const titleImageElement = mobileTitleElement.querySelector(".mobile-img");
  const titleImageWrapperElement = titleImageElement.querySelector(".img-wrapper");
  titleImageWrapperElement.querySelector("img").style.height = `${titleImageElement.getBoundingClientRect().height}px`;
  const sliderElement = sectionElement.querySelector(".mobile-slider");
  const sliders = sliderElement.querySelectorAll(".slide-wrapper");
  tl.to(sectionElement, {
    duration: 1.5,
    delay: 0.5,
    ease: "none",
    yPercent: -100
  }, "<").to(titleImageWrapperElement, {
    duration: 1.5,
    ease: "none",
    height: "100%"
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(mobileTitleElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: "30%",
    display: "none"
  }).fromTo(sliderElement, { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[0].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
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
  images.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".desktop-slider");
    if (!swiper) return;
    const buttons = wrapper.querySelector(".desktop-slider-buttons");
    if (!buttons) return;
    initFullpageSlider(swiper, buttons);
  });
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
function createImprovementMobileState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const mobileTitleElement = sectionElement.querySelector(".mobile-section-title-wrapper");
  const titleImageElement = mobileTitleElement.querySelector(".mobile-img");
  const titleImageWrapperElement = titleImageElement.querySelector(".img-wrapper");
  titleImageWrapperElement.querySelector("img").style.height = `${titleImageElement.getBoundingClientRect().height}px`;
  const sliderElement = sectionElement.querySelector(".mobile-slider");
  const sliders = sliderElement.querySelectorAll(".slide-wrapper");
  sliders.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".mobile-swiper");
    if (!swiper) return;
    initMobileSlider(swiper);
  });
  tl.to(sectionElement, {
    duration: 1.5,
    delay: 0.5,
    ease: "none",
    yPercent: -100
  }, "<").to(titleImageWrapperElement, {
    duration: 1.5,
    ease: "none",
    height: "100%"
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(mobileTitleElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: "30%",
    display: "none"
  }).fromTo(sliderElement, { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[0].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
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
  images.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".desktop-slider");
    if (!swiper) return;
    const buttons = wrapper.querySelector(".desktop-slider-buttons");
    if (!buttons) return;
    initFullpageSlider(swiper, buttons);
  });
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
function createDesignAndInteriorMobileState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const mobileTitleElement = sectionElement.querySelector(".mobile-section-title-wrapper");
  const titleImageElement = mobileTitleElement.querySelector(".mobile-img");
  const titleImageWrapperElement = titleImageElement.querySelector(".img-wrapper");
  titleImageWrapperElement.querySelector("img").style.height = `${titleImageElement.getBoundingClientRect().height}px`;
  const sliderElement = sectionElement.querySelector(".mobile-slider");
  const sliders = sliderElement.querySelectorAll(".slide-wrapper");
  sliders.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".mobile-swiper");
    if (!swiper) return;
    initMobileSlider(swiper);
  });
  tl.to(sectionElement, {
    duration: 1.5,
    delay: 0.5,
    ease: "none",
    yPercent: -100
  }, "<").to(titleImageWrapperElement, {
    duration: 1.5,
    ease: "none",
    height: "100%"
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(mobileTitleElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: "30%",
    display: "none"
  }).fromTo(sliderElement, { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[0].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
  });
  return {
    maxStep
  };
}

function createApartmentsDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 2;
  const backgroundElement = document.querySelector(".apartments-background");
  const filterElement = document.querySelector(".filter");
  const nextSectionTitleElement = sectionElement.querySelector(".section-title");
  const sliderElement = backgroundElement.querySelector(".desktop-slider");
  const buttonsElement = sectionElement.querySelector(".desktop-slider-buttons");
  initFullpageSlider(sliderElement, buttonsElement);
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
function createApartmentsMobileState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const mobileTitleElement = sectionElement.querySelector(".mobile-section-title-wrapper");
  const titleImageElement = mobileTitleElement.querySelector(".mobile-img");
  const titleImageWrapperElement = titleImageElement.querySelector(".img-wrapper");
  titleImageWrapperElement.querySelector("img").style.height = `${titleImageElement.getBoundingClientRect().height}px`;
  const sliderElement = sectionElement.querySelector(".mobile-slider");
  const sliders = sliderElement.querySelectorAll(".slide-wrapper");
  sliders.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".mobile-swiper");
    if (!swiper) return;
    initMobileSlider(swiper);
  });
  tl.to(sectionElement, {
    duration: 1.5,
    delay: 0.5,
    ease: "none",
    yPercent: -100
  }, "<").to(titleImageWrapperElement, {
    duration: 1.5,
    ease: "none",
    height: "100%"
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(mobileTitleElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: "30%",
    display: "none"
  }).fromTo(sliderElement, { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[0].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
  });
  return {
    maxStep
  };
}

function createPenthousesDesktopState(sectionElement, tl, startStep) {
  const maxStep = startStep + 2;
  const backgroundElement = document.querySelector(".penthouses-background");
  const filterElement = document.querySelector(".filter");
  const sliderElement = backgroundElement.querySelector(".desktop-slider");
  const buttonsElement = sectionElement.querySelector(".desktop-slider-buttons");
  initFullpageSlider(sliderElement, buttonsElement);
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
function createPenthousesMobileState(sectionElement, tl, startStep) {
  const maxStep = startStep + 3;
  const mobileTitleElement = sectionElement.querySelector(".mobile-section-title-wrapper");
  const titleImageElement = mobileTitleElement.querySelector(".mobile-img");
  const titleImageWrapperElement = titleImageElement.querySelector(".img-wrapper");
  titleImageWrapperElement.querySelector("img").style.height = `${titleImageElement.getBoundingClientRect().height}px`;
  const sliderElement = sectionElement.querySelector(".mobile-slider");
  const sliders = sliderElement.querySelectorAll(".slide-wrapper");
  sliders.forEach((wrapper) => {
    const swiper = wrapper.querySelector(".mobile-swiper");
    if (!swiper) return;
    initMobileSlider(swiper);
  });
  tl.to(sectionElement, {
    duration: 1.5,
    delay: 0.5,
    ease: "none",
    yPercent: -100
  }, "<").to(titleImageWrapperElement, {
    duration: 1.5,
    ease: "none",
    height: "100%"
  }, "<");
  tl.addLabel(`${startStep + 1}`);
  tl.to(mobileTitleElement, {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: "30%",
    display: "none"
  }).fromTo(sliderElement, { yPercent: 100 }, {
    duration: 1.5,
    ease: "none",
    yPercent: 0
  });
  tl.addLabel(`${startStep + 2}`);
  tl.to(sliders[0], {
    duration: 1.5,
    ease: "none",
    yPercent: -5
  }).to(sliders[0].querySelector(".slide-text"), {
    duration: 1.5,
    ease: "none",
    opacity: 0,
    height: 0
  }, "<");
  tl.addLabel(`${startStep + 3}`);
  tl.to(sectionElement, {
    duration: 1,
    ease: "none",
    opacity: 0
  });
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

function getSections() {
  const firstScreenSection = document.getElementById("first-section");
  const premiumClassSection = document.getElementById("premium-class");
  const safetyAndComfortSection = document.getElementById("safety-and-comfort");
  const improvementSection = document.getElementById("improvement");
  const designAndInteriorSection = document.getElementById("design-and-interior");
  const apartmentsSection = document.getElementById("apartments");
  const penthousesSection = document.getElementById("penthouses");
  const applicationFormSection = document.getElementById("application-form");
  if (![
    firstScreenSection,
    premiumClassSection,
    safetyAndComfortSection,
    improvementSection,
    designAndInteriorSection,
    apartmentsSection,
    penthousesSection,
    applicationFormSection
  ].every((sectionEl) => !!sectionEl)) return null;
  return {
    firstScreenSection,
    premiumClassSection,
    safetyAndComfortSection,
    improvementSection,
    designAndInteriorSection,
    apartmentsSection,
    penthousesSection,
    applicationFormSection
  };
}
function getDesktopSectionsTools(tl) {
  const sections = getSections();
  if (!sections) return null;
  const tools = [];
  tools.push(createFirstScreenDesktopState(sections.firstScreenSection, tl));
  tools.push(createPremiumClassDesktopState(sections.premiumClassSection, tl, tools[0].maxStep));
  tools.push(createSafetyAndComfortDesktopState(sections.safetyAndComfortSection, tl, tools[1].maxStep));
  tools.push(createImprovementDesktopState(sections.improvementSection, tl, tools[2].maxStep));
  tools.push(createDesignAndInteriorDesktopState(sections.designAndInteriorSection, tl, tools[3].maxStep));
  tools.push(createApartmentsDesktopState(sections.apartmentsSection, tl, tools[4].maxStep));
  tools.push(createPenthousesDesktopState(sections.penthousesSection, tl, tools[5].maxStep));
  tools.push(createApplicationFormDesktopState(sections.applicationFormSection, tl, tools[6].maxStep));
  return tools;
}
function getMobileSectionTools(tl) {
  const sections = getSections();
  if (!sections) return null;
  const tools = [];
  tools.push(createFirstScreenMobileState(sections.firstScreenSection, tl));
  tools.push(createPremiumClassMobileState(sections.premiumClassSection, tl, tools[0].maxStep));
  tools.push(createSafetyAndComfortMobileState(sections.safetyAndComfortSection, tl, tools[1].maxStep));
  tools.push(createImprovementMobileState(sections.improvementSection, tl, tools[2].maxStep));
  tools.push(createDesignAndInteriorMobileState(sections.designAndInteriorSection, tl, tools[3].maxStep));
  tools.push(createApartmentsMobileState(sections.apartmentsSection, tl, tools[4].maxStep));
  tools.push(createPenthousesMobileState(sections.penthousesSection, tl, tools[5].maxStep));
  tools.push(createApplicationFormDesktopState(sections.applicationFormSection, tl, tools[6].maxStep));
  return tools;
}

function createApplicationFormHandler() {
  const phoneMask = IMask(
    document.getElementById("application-form-tel"),
    {
      mask: "+{7} (000) 000-00-00",
      lazy: false,
      placeholderChar: "_"
    }
  );
  const form = document.getElementById("request-form");
  const summitElement = form.querySelector('[type="submit"]');
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    if (!formData.get("name") || !formData.get("phone") || !phoneMask.masked.isComplete) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    formData.set("phone", phoneMask.unmaskedValue);
    summitElement.disabled = true;
    try {
      const response = await fetch("/local/ajax/form.php", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error();
      }
      const result = await response.json();
      if (result.success) {
        alert("Заявка успешно отправлена!");
        form.reset();
      } else {
        alert(result.message || "Ошибка. Пожалуйста, повторите попытку позже");
      }
      summitElement.disabled = false;
    } catch {
      alert("Ошибка. Пожалуйста, повторите попытку позже");
      summitElement.disabled = false;
    }
  });
}

function createPageState() {
  createApplicationFormHandler();
  const burgerButtonElement = document.querySelector(".burger-menu");
  const burgerCloseButtonElement = document.querySelector(".menu-close-button");
  burgerButtonElement.addEventListener("click", () => {
    document.body.classList.add("show-menu");
  });
  burgerCloseButtonElement.addEventListener("click", () => {
    document.body.classList.remove("show-menu");
  });
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
    const smallLogoElement = document.getElementById("anchor-logo");
    smallLogoElement?.addEventListener("click", () => {
      tl.progress(0);
      firstScreenSection.classList.remove("with-mask");
      tl.tweenTo(`${0}`);
      prevStep = 0;
      currentStep = 0;
    });
  } else {
    let increaseStep = function() {
      if (gsapWithCSS.isTweening(tl) || !ready) return;
      if (currentStep === sectionsTools.at(-1).maxStep) {
        return;
      }
      currentStep++;
      tl.tweenTo(`${currentStep}`);
      window.scrollBy({ top: 1 });
    }, decreaseStep = function() {
      if (gsapWithCSS.isTweening(tl)) return;
      if (currentStep === 0) return;
      currentStep--;
      tl.tweenTo(`${currentStep}`);
    };
    let ready = false;
    setTimeout(() => ready = true, 2500);
    const tl = gsapWithCSS.timeline({ paused: true });
    const sectionsTools = getMobileSectionTools(tl);
    if (!sectionsTools) return;
    let currentStep = 0;
    tl.tweenTo(`${0}`);
    createPageObserver(decreaseStep, increaseStep);
    const firstScreenSection = document.getElementById("first-section");
    const smallLogoElement = document.getElementById("anchor-logo");
    smallLogoElement?.addEventListener("click", () => {
      tl.progress(0);
      firstScreenSection.classList.remove("with-mask");
      tl.tweenTo(`${0}`);
      currentStep = 0;
    });
  }
}

bootstrap();
window.addEventListener("load", async () => {
  await document.fonts.ready;
  requestAnimationFrame(() => {
    createPageState();
  });
});
