// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
            
            // Adjust card body layout on window resize
            function adjustCardBody() {
        const cardBody = document.querySelector('.id-card-body');
        if (!cardBody) return;
        
        if (window.innerWidth <= 480) {
            // Extra small screens
            cardBody.classList.add('xs-screen');
            cardBody.classList.remove('sm-screen', 'md-screen');
        } else if (window.innerWidth <= 768) {
            // Small screens
            cardBody.classList.add('sm-screen');
            cardBody.classList.remove('xs-screen', 'md-screen');
        } else {
            // Medium and larger screens
            cardBody.classList.add('md-screen');
            cardBody.classList.remove('xs-screen', 'sm-screen');
        }
            }
            
            // Initial adjustment
            adjustCardBody();
            
            // Adjust on resize
            window.addEventListener('resize', adjustCardBody);
});

// Add a subtle animation to skill cards on hover
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Update footer year dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize animations with intersection observer
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all timeline items, skill cards, and contact cards
    document.querySelectorAll('.timeline-item, .skill-card, .contact-card, .tech-category, .education-card, .award-card').forEach(item => {
        item.classList.add('animate-item');
        observer.observe(item);
    });
    
    // Initialize particles JS for the hero background
    initParticles();
    
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// Initialize particles.js for the hero section background
function initParticles() {
    // Check if particles.js script is already loaded
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            }
        });
    } else {
        // Load particles.js dynamically if not already loaded
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            initParticles();
        };
        document.head.appendChild(script);
    }
}
