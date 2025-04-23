// Scroll Animation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            if (isInViewport(element)) {
                // Get animation delay if exists
                const delay = element.getAttribute('data-animate-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animate');
                    
                    // Add additional delay classes if needed
                    if (delay > 0) {
                        element.classList.add(`delay-${delay}`);
                    }
                }, delay);
            }
        });
    }
    
    // Run once on page load
    handleScrollAnimations();
    
    // Run on scroll
    window.addEventListener('scroll', handleScrollAnimations);
});
