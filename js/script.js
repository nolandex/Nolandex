// script.js

// Basic scroll animations (you can enhance these)
const sections = document.querySelectorAll('.section');

function checkSlide() {
    sections.forEach(section => {
        const slideInAt = (window.scrollY + window.innerHeight) - section.offsetHeight / 2;
        const sectionBottom = section.offsetTop + section.offsetHeight;
        const isHalfShown = slideInAt > section.offsetTop;
        const isNotScrolledPast = window.scrollY < sectionBottom;

        if (isHalfShown && isNotScrolledPast) {
            section.classList.add('active'); // You'll need to define CSS rules for .active
        } else {
            section.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', checkSlide);

// Simple smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add more interactive animations or functionalities here
// For example, you could add animations on hover for project cards or skills.

// Example of adding a simple hover effect on project cards using JavaScript
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
