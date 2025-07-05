let slideIndex = 1;
let isTransitioning = false;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(n) {
    if (isTransitioning) return;
    
    if (n > totalSlides) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = totalSlides;
    }

    const oldSlide = document.querySelector('.slide.active');
    
    isTransitioning = true;
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.disabled = true);

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    const newSlide = slides[slideIndex - 1];
    newSlide.classList.add('active');
    dots[slideIndex - 1].classList.add('active');

    setTimeout(() => {
        const customEvent = new CustomEvent('slideshow:change', {
            detail: {
                old: oldSlide,
                current: newSlide,
                oldIndex: oldSlide ? Array.from(slides).indexOf(oldSlide) + 1 : null,
                currentIndex: slideIndex
            }
        });
        
        document.dispatchEvent(customEvent);
        
        isTransitioning = false;
        buttons.forEach(btn => btn.disabled = false);
    }, 500);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
}

document.addEventListener('slideshow:change', function(event) {
    const { old, current, oldIndex, currentIndex } = event.detail;
    // Logic gì đó chưa nghĩ ra nữa
});

showSlide(slideIndex);