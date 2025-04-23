// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formStatus = document.getElementById('form-status');

// Validation Functions
function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Name is required';
        nameError.style.display = 'block';
        return false;
    } else if (name.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        nameError.style.display = 'block';
        return false;
    } else {
        nameError.style.display = 'none';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailError.textContent = 'Email is required';
        emailError.style.display = 'block';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email';
        emailError.style.display = 'block';
        return false;
    } else {
        emailError.style.display = 'none';
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        messageError.textContent = 'Message is required';
        messageError.style.display = 'block';
        return false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageError.style.display = 'block';
        return false;
    } else {
        messageError.style.display = 'none';
        return true;
    }
}

// Event Listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.classList.add('success');
                formStatus.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again later.';
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
});
