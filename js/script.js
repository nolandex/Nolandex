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

// Header Background on Scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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

// Typing Animation for Hero Section
const typingText = ["Web Developer", "Designer", "Creative Thinker"];
let typingIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector('.typing');

function type() {
    if (charIndex < typingText[typingIndex].length) {
        typingElement.textContent += typingText[typingIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = typingText[typingIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        typingIndex = (typingIndex + 1) % typingText.length;
        setTimeout(type, 500);
    }
}

type();

// Particle Effect for Hero Background
const particles = [];
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('particles-js').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (let i = 0; i < 100; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 123, 255, 0.5)';
        ctx.fill();

        particles.forEach(p2 => {
            const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(0, 123, 255, ${1 - dist / 100})`;
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Circular Progress Animation
const circularProgressBars = document.querySelectorAll('.circular-progress');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percentage = entry.target.getAttribute('data-percentage');
            entry.target.style.background = `conic-gradient(#007bff ${percentage * 3.6}deg, #333 ${percentage * 3.6}deg)`;
            entry.target.querySelector('.percentage').textContent = `${percentage}%`;
        }
    });
}, { threshold: 0.5 });

circularProgressBars.forEach(bar => observer.observe(bar));

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Modal and Carousel for Projects
const modal = document.getElementById('project-modal');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalLink = modal.querySelector('.modal-link');
const carouselImg = modal.querySelector('.carousel-img');
const closeModal = modal.querySelector('.modal-close');
const prevBtn = modal.querySelector('.carousel-prev');
const nextBtn = modal.querySelector('.carousel-next');

const projects = {
    project1: {
        title: 'E-commerce Site',
        description: 'Built a responsive online store with payment integration.',
        images: ['assets/images/project1.jpg', 'assets/images/project2.jpg'],
        link: 'https://github.com/your-username/project1'
    },
    project2: {
        title: 'Task Manager App',
        description: 'A productivity app for task management with reminders.',
        images: ['assets/images/project2.jpg', 'assets/images/project3.jpg'],
        link: 'https://github.com/your-username/project2'
    },
    project3: {
        title: 'Portfolio Site',
        description: 'Personal portfolio with animations and responsive design.',
        images: ['assets/images/project3.jpg', 'assets/images/project4.jpg'],
        link: 'https://github.com/your-username/project3'
    },
    project4: {
        title: 'Weather App',
        description: 'Real-time weather updates using an API.',
        images: ['assets/images/project4.jpg', 'assets/images/project1.jpg'],
        link: 'https://github.com/your-username/project4'
    }
};

let currentProject = null;
let currentImageIndex = 0;

document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        currentProject = projects[projectId];
        currentImageIndex = 0;

        modalTitle.textContent = currentProject.title;
        modalDescription.textContent = currentProject.description;
        modalLink.href = currentProject.link;
        carouselImg.src = currentProject.images[currentImageIndex];
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
    carouselImg.src = currentProject.images[currentImageIndex];
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
    carouselImg.src = currentProject.images[currentImageIndex];
});

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

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
