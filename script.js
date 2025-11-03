// Swipe feedback state (no i18n)
let swipeFeedbackElement = null;
let swipeFeedbackState = { message: null, replacements: {} };
let loaderElement = null;
let loaderProgressBar = null;
let loaderCompleted = false;

// Simple template formatter for feedback messages
const formatMessage = (template, replacements = {}) => {
    let result = template || '';
    $.each(replacements, function(token, value) {
        result = result.replace(`{{${token}}}`, value);
    });
    return result;
};

const renderSwipeFeedback = () => {
    if (!swipeFeedbackElement) {
        return;
    }
    const { message, replacements } = swipeFeedbackState;
    if (!message) {
        $(swipeFeedbackElement).text('');
        return;
    }
    $(swipeFeedbackElement).text(formatMessage(message, replacements));
};

const setSwipeFeedbackElement = element => {
    swipeFeedbackElement = element;
    renderSwipeFeedback();
};

const setSwipeFeedback = (message = null, replacements = {}) => {
    swipeFeedbackState = { message, replacements };
    renderSwipeFeedback();
};

const completeLoaderAnimation = () => {
    if (loaderCompleted) {
        $('body').removeClass('loading-active');
        return;
    }

    loaderCompleted = true;

    if (loaderProgressBar) {
        $(loaderProgressBar).css('width', '100%');
    }

    if (loaderElement) {
        $(loaderElement).addClass('is-hidden');
        setTimeout(() => {
            $(loaderElement).remove();
        }, 600);
    }

    $('body').removeClass('loading-active');
};

const startLoaderAnimation = () => {
    if (!loaderElement || !loaderProgressBar) {
        $('body').removeClass('loading-active');
        loaderCompleted = true;
        return;
    }

    $(loaderProgressBar).css('width', '0%');
    loaderCompleted = false;

    const duration = 2400;
    const startTime = performance.now();

    const step = now => {
        if (loaderCompleted) {
            return;
        }

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        $(loaderProgressBar).css('width', `${Math.floor(progress * 100)}%`);

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

// Swipe deck messages (English only)
const swipeMessages = {
    accept: 'Saved "{{title}}"',
    reject: 'Skipped "{{title}}"',
    replay: 'Replaying "{{title}}"',
    none: 'No cards left to replay',
    complete: "You're all caught up!"
};

const initSwipeDeck = () => {
    const deckEl = $('#swipeDeck')[0];
    const feedbackEl = $('#swipeFeedback')[0];

    if (!deckEl || !feedbackEl) {
        return;
    }

    const cards = Array.from($('#swipeDeck .swipe-card'));

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
        $(card).css('transition', 'transform 0.35s ease')
              .css('transform', '');
        $(card).one('transitionend', () => {
            $(card).css('transition', '');
        });
    };

    const getCardTitle = card => $(card).find('h3').text().trim() || '';

    const applyStackStyles = () => {
        $(cards).removeClass('is-top is-next is-queue is-hidden is-active')
                .css('zIndex', '');

        $.each(activeCards, function(index, card) {
            $(card).removeClass('is-inactive')
                   .removeAttr('aria-hidden')
                   .css('zIndex', activeCards.length - index);

            if (index === 0) {
                $(card).addClass('is-top');
            } else if (index === 1) {
                $(card).addClass('is-next');
            } else if (index === 2) {
                $(card).addClass('is-queue');
            } else {
                $(card).addClass('is-hidden');
            }
        });

        $.each(cards, function(i, card) {
            if (!activeCards.includes(card)) {
                $(card).addClass('is-hidden')
                       .attr('aria-hidden', 'true');
            }
        });
    };

    const finalizeSwipe = card => {
        $(card).css({ 'transition': '', 'transform': '', 'zIndex': '' })
               .removeClass('is-inactive is-active');
        animationInProgress = false;
        applyStackStyles();
    };

    const animateSwipe = (card, direction) => {
        const exitX = direction === 'accept' ? $(deckEl).width() : -$(deckEl).width();
        const exitY = currentY;
        const exitRotation = direction === 'accept' ? 24 : -24;

        $(card).css('transition', 'transform 0.4s ease')
               .css('transform', `translate(${exitX}px, ${exitY}px) rotate(${exitRotation}deg)`);
    };

    const processSwipe = direction => {
        if (!activeCards.length) {
            setSwipeFeedback(swipeMessages.complete);
            return;
        }

        const card = activeCards[0];

        if (!card || animationInProgress) {
            return;
        }

        animationInProgress = true;
        const title = getCardTitle(card);

        animateSwipe(card, direction);
        $(card).addClass('is-inactive');
        activeCards.shift();
        history.push({ card, title });
        setSwipeFeedback(direction === 'accept' ? swipeMessages.accept : swipeMessages.reject, { title });

        $(card).one('transitionend', () => {
            $(card).addClass('is-hidden')
                   .attr('aria-hidden', 'true');
            finalizeSwipe(card);
        });

        if (!activeCards.length) {
            animationInProgress = false;
            setTimeout(() => {
                setSwipeFeedback(swipeMessages.complete);
            }, 350);
        }
    };

    const replayLastCard = () => {
        if (!history.length) {
            setSwipeFeedback(swipeMessages.none);
            return;
        }

        if (animationInProgress) {
            return;
        }

        const { card, title } = history.pop();

        if (activeCards.includes(card)) {
            return;
        }

        $(card).removeClass('is-hidden is-inactive')
               .removeAttr('aria-hidden');
        activeCards.unshift(card);
        setSwipeFeedback(swipeMessages.replay, { title });
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
        $(card).addClass('is-active');
    };

    const onPointerMove = event => {
        if (!draggingCard || event.pointerId !== pointerId) {
            return;
        }

        currentX = event.clientX - startX;
        currentY = event.clientY - startY;

        const rotation = currentX / 20;
        $(draggingCard).css('transform', `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`);
    };

    const handlePointerEnd = event => {
        if (!draggingCard || event.pointerId !== pointerId) {
            return;
        }

        draggingCard.releasePointerCapture(pointerId);
        $(draggingCard).removeClass('is-active');

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

    $.each(cards, function(i, card) {
        card.addEventListener('pointerdown', onPointerDown);
        card.addEventListener('pointermove', onPointerMove);
        card.addEventListener('pointerup', handlePointerEnd);
        card.addEventListener('pointercancel', handlePointerEnd);
    });

    $('.swipe-button').each(function() {
        $(this).on('click', function() {
            const action = $(this).attr('data-action');
            handleActionClick(action);
        });
    });

    $(deckEl).on('keydown', onKeyDown);

    applyStackStyles();
};

// App init
$(document).ready(function() {
    loaderElement = $('#loader')[0];
    loaderProgressBar = $('#loaderProgress')[0];
    startLoaderAnimation();

    initSwipeDeck();
});

// Navigation scroll effect
$(window).on('scroll', function() {
    const $navbar = $('#navbar');
    if ($(window).scrollTop() > 50) {
        $navbar.addClass('scrolled');
    } else {
        $navbar.removeClass('scrolled');
    }
});

// Mobile menu toggle with Bootstrap
const $menuToggle = $('#menuToggle');
const $navLinks = $('#navLinks');

$menuToggle.on('click', function() {
    $navLinks.toggleClass('show');
    const $icon = $menuToggle.find('i');
    $icon.toggleClass('fa-bars fa-times');
});

// Close mobile menu when clicking on a link
$('.nav-link').each(function() {
    $(this).on('click', function() {
        if ($navLinks.hasClass('show')) {
            $navLinks.removeClass('show');
            const $icon = $menuToggle.find('i');
            $icon.addClass('fa-bars').removeClass('fa-times');
        }
    });
});

// Smooth scrolling for navigation links
$('a[href^="#"]').each(function() {
    $(this).on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const $target = $(target);
        if ($target.length) {
            const navHeight = $('nav').outerHeight();
            const targetPosition = $target.offset().top - navHeight - 20;
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800);
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    $.each(entries, function(i, entry) {
        if (entry.isIntersecting) {
            $(entry.target).addClass('visible');
        }
    });
}, observerOptions);

$('.fade-in').each(function() {
    observer.observe(this);
});

// Typing effect for hero title
let heroTitle;
let text;
let i = 0;

function typeWriter() {
    if (i < text.length) {
        $(heroTitle).text($(heroTitle).text() + text.charAt(i));
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
$(window).on('load', function() {
    heroTitle = $('.hero-content h1')[0];
    text = $(heroTitle).text();
    $(heroTitle).text('');
    i = 0;

    setTimeout(typeWriter, 500);

    // Animate skill bars
    setTimeout(function() {
        animateSkillBars();
    }, 1500);
});

// Add parallax effect to hero section (reduced for smoother transitions)
$(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    const $parallax = $('.hero');
    const speed = 0.2;
    // Only apply parallax while hero is visible
    if (scrolled < $(window).height()) {
        $parallax.css('transform', `translateY(${scrolled * speed}px)`);
    }
});

// Add hover effect to project cards
$('.project-card').each(function() {
    $(this).on('mouseenter', function() {
        $(this).css('transform', 'translateY(-10px) rotateX(5deg)');
    });

    $(this).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0) rotateX(0)');
    });
});

// Animate skill bars
function animateSkillBars() {
    const $skillBars = $('.skill-bar');

    $skillBars.each(function(index) {
        const $bar = $(this);
        const level = $bar.attr('data-level');
        setTimeout(function() {
            $bar.css('--level', level + '%');
            $bar.addClass('animate');
        }, index * 200);
    });
}

// Add hover effect to skill items
$('.skill-item').each(function() {
    $(this).on('mouseenter', function() {
        const $icon = $(this).find('.skill-icon i');
        $icon.css('transform', 'scale(1.2) rotate(10deg)');
    });

    $(this).on('mouseleave', function() {
        const $icon = $(this).find('.skill-icon i');
        $icon.css('transform', 'scale(1) rotate(0deg)');
    });
});

// Set current year in footer
$('#currentYear').text(new Date().getFullYear());
