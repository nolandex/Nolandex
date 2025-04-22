// Smooth Scrolling
document.querySelectorAll('.nav-link, .scroll-top').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Scroll to Top Button
const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Contact Form Validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        alert('Message sent successfully!');
        form.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Animation on Scroll
const animateElements = document.querySelectorAll('.about-img, .about-text, .portfolio-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.2 });

animateElements.forEach(el => observer.observe(el));

// Add animate class to CSS for scroll-triggered animations
const style = document.createElement('style');
style.innerHTML = `
    .about-img.animate, .about-text.animate, .portfolio-item.animate {
        animation: fadeInUp 1s ease forwards;
    }
`;
document.head.appendChild(style);
