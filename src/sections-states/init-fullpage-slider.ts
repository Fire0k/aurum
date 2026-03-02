import gsap from "gsap";


export function initFullpageSlider(
    backgroundElement: Element,
    buttonsElement: Element,
) {
    const slides = backgroundElement.querySelectorAll('.img-wrapper') as NodeListOf<HTMLElement>;
    const nextBtn = buttonsElement.querySelector('.next')!
    const prevBtn = buttonsElement.querySelector('.prev')!

    let current = 0
    let isAnimating = false

    slides[current].style.zIndex = '1'
    slides[current].style.height = '100%'

    function goTo(newIndex: number) {
        if (isAnimating || newIndex === current) return

        isAnimating = true

        const prevSlide = slides[current]
        const nextSlide = slides[newIndex]

        prevSlide.style.zIndex = '1'
        nextSlide.style.zIndex = '2'

        gsap.killTweensOf(nextSlide)

        gsap.fromTo(
            nextSlide,
            { height: 0 },
            {
                duration: 1.5,
                ease: 'none',
                height: '100%',
                onComplete: () => {
                    current = newIndex
                    isAnimating = false
                }
            }
        )
    }

    function goNext() {
        const newIndex = (current + 1) % slides.length
        goTo(newIndex)
    }

    function goPrev() {
    const newIndex =
        (current - 1 + slides.length) % slides.length
        goTo(newIndex)
    }

    nextBtn.addEventListener('click', goNext)
    prevBtn.addEventListener('click', goPrev)
}