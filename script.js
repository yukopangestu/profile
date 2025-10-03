// Initialize language system
let currentLang = localStorage.getItem('preferredLanguage') || 'en';

let swipeFeedbackElement = null;
let swipeFeedbackState = { key: null, replacements: {} };
let loaderElement = null;
let loaderProgressBar = null;
let loaderCompleted = false;

const resolveTranslation = (key, replacements = {}, lang = currentLang) => {
    let template = translations?.[lang]?.[key] || key;
    Object.entries(replacements).forEach(([token, value]) => {
        template = template.replace(`{{${token}}}`, value);
    });
    return template;
};

const renderSwipeFeedback = () => {
    if (!swipeFeedbackElement) {
        return;
    }
    const { key, replacements } = swipeFeedbackState;
    if (!key) {
        swipeFeedbackElement.textContent = '';
        return;
    }
    swipeFeedbackElement.textContent = resolveTranslation(key, replacements);
};

const setSwipeFeedbackElement = element => {
    swipeFeedbackElement = element;
    renderSwipeFeedback();
};

const setSwipeFeedback = (key = null, replacements = {}) => {
    swipeFeedbackState = { key, replacements };
    renderSwipeFeedback();
};

const completeLoaderAnimation = () => {
    if (loaderCompleted) {
        document.body.classList.remove('loading-active');
        return;
    }

    loaderCompleted = true;

    if (loaderProgressBar) {
        loaderProgressBar.style.width = '100%';
    }

    if (loaderElement) {
        loaderElement.classList.add('is-hidden');
        setTimeout(() => {
            loaderElement?.remove();
        }, 600);
    }

    document.body.classList.remove('loading-active');
};

const startLoaderAnimation = () => {
    if (!loaderElement || !loaderProgressBar) {
        document.body.classList.remove('loading-active');
        loaderCompleted = true;
        return;
    }

    loaderProgressBar.style.width = '0%';
    loaderCompleted = false;

    const duration = 2400;
    const startTime = performance.now();

    const step = now => {
        if (loaderCompleted) {
            return;
        }

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        loaderProgressBar.style.width = `${Math.floor(progress * 100)}%`;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            setTimeout(completeLoaderAnimation, 200);
        }
    };

    requestAnimationFrame(step);

    setTimeout(() => {
        if (!loaderCompleted) {
            completeLoaderAnimation();
        }
    }, duration + 800);
};

// Apply translations to all elements with data-i18n attribute
function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'TITLE') {
                element.textContent = translations[lang][key];
            } else {
                element.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    currentLang = lang;

    renderSwipeFeedback();
}

const initSwipeDeck = () => {
    const deckEl = document.getElementById('swipeDeck');
    const feedbackEl = document.getElementById('swipeFeedback');

    if (!deckEl || !feedbackEl) {
        return;
    }

    const cards = Array.from(deckEl.querySelectorAll('.swipe-card'));

    if (!cards.length) {
        return;
    }

    setSwipeFeedbackElement(feedbackEl);

    const activeCards = [...cards];
    const history = [];
    let draggingCard = null;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationInProgress = false;
    const swipeThreshold = 120;

    const resetCardTransform = card => {
        card.style.transition = 'transform 0.35s ease';
        card.style.transform = '';
        card.addEventListener('transitionend', () => {
            card.style.transition = '';
        }, { once: true });
    };

    const getCardTitle = card => card.querySelector('h3')?.textContent.trim() || '';

    const applyStackStyles = () => {
        cards.forEach(card => {
            card.classList.remove('is-top', 'is-next', 'is-queue', 'is-hidden', 'is-active');
            card.style.zIndex = '';
        });

        activeCards.forEach((card, index) => {
            card.classList.remove('is-inactive');
            card.removeAttribute('aria-hidden');
            card.style.zIndex = activeCards.length - index;

            if (index === 0) {
                card.classList.add('is-top');
            } else if (index === 1) {
                card.classList.add('is-next');
            } else if (index === 2) {
                card.classList.add('is-queue');
            } else {
                card.classList.add('is-hidden');
            }
        });

        cards.forEach(card => {
            if (!activeCards.includes(card)) {
                card.classList.add('is-hidden');
                card.setAttribute('aria-hidden', 'true');
            }
        });
    };

    const finalizeSwipe = card => {
        card.style.transition = '';
        card.style.transform = '';
        card.classList.remove('is-inactive', 'is-active');
        card.style.zIndex = '';
        animationInProgress = false;
        applyStackStyles();
    };

    const animateSwipe = (card, direction) => {
        const exitX = direction === 'accept' ? deckEl.offsetWidth : -deckEl.offsetWidth;
        const exitY = currentY;
        const exitRotation = direction === 'accept' ? 24 : -24;

        card.style.transition = 'transform 0.4s ease';
        card.style.transform = `translate(${exitX}px, ${exitY}px) rotate(${exitRotation}deg)`;
    };

    const processSwipe = direction => {
        if (!activeCards.length) {
            setSwipeFeedback('swipe.feedback.complete');
            return;
        }

        const card = activeCards[0];

        if (!card || animationInProgress) {
            return;
        }

        animationInProgress = true;
        const title = getCardTitle(card);

        animateSwipe(card, direction);
        card.classList.add('is-inactive');
        activeCards.shift();
        history.push({ card, title });
        setSwipeFeedback(direction === 'accept' ? 'swipe.feedback.accept' : 'swipe.feedback.reject', { title });

        card.addEventListener('transitionend', () => {
            card.classList.add('is-hidden');
            card.setAttribute('aria-hidden', 'true');
            finalizeSwipe(card);
        }, { once: true });

        if (!activeCards.length) {
            animationInProgress = false;
            setTimeout(() => {
                setSwipeFeedback('swipe.feedback.complete');
            }, 350);
        }
    };

    const replayLastCard = () => {
        if (!history.length) {
            setSwipeFeedback('swipe.feedback.none');
            return;
        }

        if (animationInProgress) {
            return;
        }

        const { card, title } = history.pop();

        if (activeCards.includes(card)) {
            return;
        }

        card.classList.remove('is-hidden', 'is-inactive');
        card.removeAttribute('aria-hidden');
        activeCards.unshift(card);
        setSwipeFeedback('swipe.feedback.replay', { title });
        applyStackStyles();
    };

    const onPointerDown = event => {
        if (animationInProgress) {
            return;
        }

        const card = event.currentTarget;

        if (card !== activeCards[0]) {
            return;
        }

        draggingCard = card;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        currentX = 0;
        currentY = 0;
        card.setPointerCapture(pointerId);
        card.classList.add('is-active');
    };

    const onPointerMove = event => {
        if (!draggingCard || event.pointerId !== pointerId) {
            return;
        }

        currentX = event.clientX - startX;
        currentY = event.clientY - startY;

        const rotation = currentX / 20;
        draggingCard.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
    };

    const handlePointerEnd = event => {
        if (!draggingCard || event.pointerId !== pointerId) {
            return;
        }

        draggingCard.releasePointerCapture(pointerId);
        draggingCard.classList.remove('is-active');

        const deltaX = currentX;

        if (deltaX > swipeThreshold) {
            processSwipe('accept');
        } else if (deltaX < -swipeThreshold) {
            processSwipe('reject');
        } else {
            resetCardTransform(draggingCard);
        }

        draggingCard = null;
        pointerId = null;
    };

    const handleActionClick = action => {
        switch (action) {
            case 'accept':
                processSwipe('accept');
                break;
            case 'reject':
                processSwipe('reject');
                break;
            case 'replay':
                replayLastCard();
                break;
            default:
                break;
        }
    };

    const onKeyDown = event => {
        if (animationInProgress) {
            return;
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            processSwipe('accept');
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            processSwipe('reject');
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            replayLastCard();
        }
    };

    cards.forEach(card => {
        card.addEventListener('pointerdown', onPointerDown);
        card.addEventListener('pointermove', onPointerMove);
        card.addEventListener('pointerup', handlePointerEnd);
        card.addEventListener('pointercancel', handlePointerEnd);
    });

    document.querySelectorAll('.swipe-button').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            handleActionClick(action);
        });
    });

    deckEl.addEventListener('keydown', onKeyDown);

    applyStackStyles();
};

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    loaderElement = document.getElementById('loader');
    loaderProgressBar = document.getElementById('loaderProgress');
    startLoaderAnimation();

    // Apply saved language preference
    applyTranslations(currentLang);

    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            applyTranslations(lang);
        });
    });

    initSwipeDeck();
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero title
let heroTitle;
let text;
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    heroTitle = document.querySelector('.hero-content h1');
    text = heroTitle.textContent;
    heroTitle.textContent = '';
    i = 0;
    
    setTimeout(typeWriter, 500);
    
    // Animate skill bars
    setTimeout(() => {
        animateSkillBars();
    }, 1500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = 0.5;
    parallax.style.transform = `translateY(${scrolled * speed}px)`;
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.setProperty('--level', level + '%');
            bar.classList.add('animate');
        }, index * 200);
    });
}

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});
