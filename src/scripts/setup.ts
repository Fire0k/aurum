import "normalize.css";

import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";


export function bootstrap() {
    gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

    history.scrollRestoration = "manual";
}