// script.js
// Navbar Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
            link.style.animation = nav.classList.contains('active')
                ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
                : '';
        });
    });
};

// Smooth Scroll
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// Dark Mode Toggle
const darkModeToggle = () => {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }
};

// Project Filter
const projectFilter = () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            cards.forEach(card => {
                card.style.display = filter === 'all' || card.dataset.category === filter ? 'block' : 'none';
            });
        });
    });
};

// Modal Functionality
const modals = () => {
    const buttons = document.querySelectorAll('.project-btn');
    const modals = document.querySelectorAll('.modal');
    const closes = document.querySelectorAll('.modal-close');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal;
            document.getElementById(modalId).style.display = 'flex';
        });
    });

    closes.forEach(close => {
        close.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            modals.forEach(modal => modal.style.display = 'none');
        }
    });
};

// Form Validation and Submission
const handleForm = () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();

        if (name && email && message) {
            alert('Message sent! (This is a demo)');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
};

// Scroll Animations
const scrollReveal = () => {
    const elements = document.querySelectorAll('.section, .section *');
    const options = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
};

// Back to Top Button
const backToTop = () => {
    const button = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        button.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// Initialize Functions
navSlide();
smoothScroll();
darkModeToggle();
projectFilter();
modals();
handleForm();
scrollReveal();
backToTop();

// Additional CSS for Animations
const style = document.createElement('style');
style.innerHTML = `
    .hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
    @keyframes navLinkFade {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);
