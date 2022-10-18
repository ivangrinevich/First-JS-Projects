"use strict";

const index = Math.floor(Math.random() * 5);

function slidesPlugin(activeSlide=0) {
    const slides = document.querySelectorAll('.slide');

    slides[activeSlide].classList.add('active');

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            clearActiveSlides();

            slide.classList.add('active');
        });
    });

    function clearActiveSlides() {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
    }
}

slidesPlugin(index);