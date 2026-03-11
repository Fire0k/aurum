import "normalize.css";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import "swiper/css/pagination"

import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";


export function bootstrap() {
    gsap.registerPlugin(Observer, ScrollToPlugin, ScrollTrigger);

    history.scrollRestoration = "manual";
}