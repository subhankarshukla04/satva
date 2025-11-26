/**
 * Satva Sustainability - Enhanced Interactive JavaScript
 * World-class interactions and animations
 */

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initPageEntrance();
    initWelcomeScreen();
    initNavigation();
    initHeroAnimations();
    initCounterAnimations();
    initProblemCards();
    initJourneyCards();
    initProcessTabs();
    initAccordions();
    initModals();
    initBackToTop();
    initScrollAnimations();
    initParallax();
    initFormValidation();
});

// ===================================
// PAGE ENTRANCE ANIMATIONS
// ===================================

function initPageEntrance() {
    // Add page entrance fade to body
    document.body.classList.add('page-entrance');

    // Animate hero sections
    const heroSections = document.querySelectorAll('.hero-section, .page-hero');
    heroSections.forEach(hero => {
        hero.classList.add('hero-animated');
    });

    // Animate sections with stagger
    setTimeout(() => {
        const sections = document.querySelectorAll('section:not(.hero-section)');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('section-reveal');
            }, index * 100);
        });
    }, 300);

    // Add shimmer effect to main titles
    const mainTitles = document.querySelectorAll('.hero-section h1, .page-hero h1');
    mainTitles.forEach(title => {
        title.classList.add('title-shimmer');
    });

    // Stagger animate cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.problem-card, .journey-card, .diff-card, .stat-card, .article-card');
        cards.forEach(card => {
            card.classList.add('animate-stagger');
        });
    }, 500);
}

// ===================================
// WELCOME SCREEN
// ===================================

function initWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');

    if (!welcomeScreen) return;

    // Hide welcome screen after animation completes (4 seconds)
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        // Trigger main page animations
        document.body.classList.add('welcome-complete');
    }, 4200);

    // Allow users to skip by clicking
    welcomeScreen.addEventListener('click', () => {
        welcomeScreen.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            document.body.classList.add('welcome-complete');
        }, 300);
    });
}

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const nav = document.getElementById('main-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let lastScroll = 0;

    // Sticky navigation with hide/show on scroll
    window.addEventListener('scroll', debounce(function() {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide nav on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }, 100));

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===================================
// HERO ANIMATIONS
// ===================================

function initHeroAnimations() {
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.fade-in-up');

    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Parallax effect on hero background
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroBackground = heroSection.querySelector('.hero-background');
            if (heroBackground && scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// ===================================
// COUNTER ANIMATIONS
// ===================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===================================
// PROBLEM CARDS
// ===================================

function initProblemCards() {
    const problemCards = document.querySelectorAll('.problem-card');

    problemCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');

        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation();

                // Close other cards
                problemCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                        const otherBtn = otherCard.querySelector('.expand-btn');
                        if (otherBtn) otherBtn.textContent = 'Learn More →';
                    }
                });

                // Toggle current card
                card.classList.toggle('expanded');
                expandBtn.textContent = card.classList.contains('expanded') ? 'Show Less ←' : 'Learn More →';
            });
        }
    });
}

// ===================================
// JOURNEY CARDS
// ===================================

function initJourneyCards() {
    const journeyCards = document.querySelectorAll('.journey-card');

    journeyCards.forEach(card => {
        const header = card.querySelector('.journey-header');

        if (header) {
            header.addEventListener('click', function() {
                // Close other cards
                journeyCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('expanded');
                    }
                });

                // Toggle current card
                card.classList.toggle('expanded');
            });
        }
    });
}

function toggleJourneyCard(header) {
    const card = header.closest('.journey-card');
    card.classList.toggle('expanded');
}

// ===================================
// PROCESS TABS
// ===================================

function initProcessTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');

                // Trigger animation
                activePane.style.opacity = '0';
                setTimeout(() => {
                    activePane.style.opacity = '1';
                }, 50);
            }
        });
    });
}

// ===================================
// ACCORDIONS
// ===================================

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            toggleAccordion(this);
        });
    });
}

function toggleAccordion(header) {
    const accordionItem = header.closest('.accordion-item');
    const isExpanded = accordionItem.classList.contains('expanded');

    // Close all accordions in the same parent
    const parent = accordionItem.parentElement;
    parent.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('expanded');
    });

    // Toggle current accordion
    if (!isExpanded) {
        accordionItem.classList.add('expanded');
    }
}

// ===================================
// MODALS
// ===================================

function initModals() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');

    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(type) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');

    if (!modalOverlay || !modalBody) return;

    let content = '';

    if (type === 'assessment') {
        content = getAssessmentFormHTML();
    } else if (type === 'guide') {
        content = getGuideFormHTML();
    }

    modalBody.innerHTML = content;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize form validation for modal form
    const modalForm = modalBody.querySelector('form');
    if (modalForm) {
        initModalFormValidation(modalForm);
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function getAssessmentFormHTML() {
    return `
        <h2 style="color: var(--color-blue); margin-bottom: 1rem;">Schedule Your Free CSRD Assessment</h2>
        <p style="color: var(--color-gray); margin-bottom: 2rem;">Get a comprehensive evaluation of your CSRD readiness. No obligation, no cost.</p>

        <form id="assessment-form" class="modal-form">
            <div class="form-group">
                <label for="modal-name">Full Name *</label>
                <input type="text" id="modal-name" name="name" required>
            </div>

            <div class="form-group">
                <label for="modal-email">Email *</label>
                <input type="email" id="modal-email" name="email" required>
            </div>

            <div class="form-group">
                <label for="modal-company">Company Name *</label>
                <input type="text" id="modal-company" name="company" required>
            </div>

            <div class="form-group">
                <label for="modal-title">Your Title *</label>
                <input type="text" id="modal-title" name="title" required placeholder="e.g., CFO, VP Sustainability">
            </div>

            <div class="form-group">
                <label for="modal-phone">Phone</label>
                <input type="tel" id="modal-phone" name="phone" placeholder="(555) 123-4567">
            </div>

            <div class="form-group">
                <label for="modal-revenue">Company Revenue Range</label>
                <select id="modal-revenue" name="revenue">
                    <option value="">Select range...</option>
                    <option value="<$10M">Less than $10M</option>
                    <option value="$10-50M">$10M - $50M</option>
                    <option value="$50-100M">$50M - $100M</option>
                    <option value="$100-250M">$100M - $250M</option>
                    <option value="$250-500M">$250M - $500M</option>
                    <option value=">$500M">More than $500M</option>
                </select>
            </div>

            <div class="form-group">
                <label for="modal-eu">Do you have European operations or customers?</label>
                <select id="modal-eu" name="eu-operations">
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not Sure">Not Sure</option>
                </select>
            </div>

            <div class="form-group">
                <label for="modal-message">Additional Details</label>
                <textarea id="modal-message" name="message" rows="3" placeholder="Tell us about your CSRD compliance needs..."></textarea>
            </div>

            <button type="submit" class="btn-primary btn-large" style="width: 100%;">Schedule Free Assessment</button>
        </form>
    `;
}

function getGuideFormHTML() {
    return `
        <h2 style="color: var(--color-blue); margin-bottom: 1rem;">Download CSRD Compliance Guide</h2>
        <p style="color: var(--color-gray); margin-bottom: 2rem;">Get our comprehensive guide for mid-market companies navigating CSRD compliance.</p>

        <div style="background-color: var(--color-gray-light); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
            <h3 style="color: var(--color-blue); margin-bottom: 0.5rem;">What's Inside:</h3>
            <ul style="margin-left: 1.5rem; color: var(--color-charcoal);">
                <li>CSRD applicability criteria and timeline</li>
                <li>Step-by-step compliance roadmap</li>
                <li>Budget planning guidance</li>
                <li>Common pitfalls and how to avoid them</li>
                <li>Technology vendor comparison</li>
            </ul>
        </div>

        <form id="guide-form" class="modal-form">
            <div class="form-group">
                <label for="guide-name">Full Name *</label>
                <input type="text" id="guide-name" name="name" required>
            </div>

            <div class="form-group">
                <label for="guide-email">Work Email *</label>
                <input type="email" id="guide-email" name="email" required>
            </div>

            <div class="form-group">
                <label for="guide-company">Company Name *</label>
                <input type="text" id="guide-company" name="company" required>
            </div>

            <div class="form-group">
                <label for="guide-title">Your Title</label>
                <input type="text" id="guide-title" name="title" placeholder="e.g., CFO, Director of ESG">
            </div>

            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" name="newsletter" value="yes" checked>
                    <span>Yes, send me monthly CSRD insights and updates</span>
                </label>
            </div>

            <button type="submit" class="btn-primary btn-large" style="width: 100%;">Download Guide</button>

            <p style="font-size: 0.75rem; color: var(--color-gray); text-align: center; margin-top: 1rem;">
                We respect your privacy. Your information will never be shared.
            </p>
        </form>
    `;
}

function initModalFormValidation(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Processing...';

        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            console.log('Form submitted:', data);

            // Show success message
            form.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 2rem;">
                    <svg style="width: 60px; height: 60px; color: var(--color-teal); margin-bottom: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3 style="color: var(--color-blue); margin-bottom: 0.5rem;">Success!</h3>
                    <p style="color: var(--color-gray);">We'll be in touch within 1 business day.</p>
                    <button onclick="closeModal()" class="btn-primary" style="margin-top: 1.5rem;">Close</button>
                </div>
            `;
        }, 1500);
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', debounce(function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger animations for children
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });

    // Observe cards
    const cards = document.querySelectorAll('.problem-card, .diff-card, .journey-card, .stat-card, .article-card');
    cards.forEach(card => {
        card.classList.add('stagger-child');
    });
}

// ===================================
// PARALLAX EFFECTS
// ===================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===================================
// FORM VALIDATION
// ===================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;

            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');

    // Remove previous error
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Check if required field is empty
    if (required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Phone validation (optional)
    if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

// ===================================
// NEWSLETTER FORM
// ===================================

function handleNewsletterSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;

    if (!email) {
        alert('Please enter your email address');
        return;
    }

    // Simulate subscription
    console.log('Newsletter subscription:', email);

    // Show success message
    form.innerHTML = `
        <div style="color: var(--color-white); text-align: center; padding: 1rem;">
            <svg style="width: 30px; height: 30px; margin-bottom: 0.5rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p>Thank you for subscribing!</p>
        </div>
    `;
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// ANALYTICS & TRACKING
// ===================================

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-white')) {
        const buttonText = e.target.textContent.trim();
        console.log('Button clicked:', buttonText);
        // Add your analytics tracking here (Google Analytics, etc.)
    }
});

// Track form submissions
document.addEventListener('submit', function(e) {
    const formId = e.target.id || 'unknown-form';
    console.log('Form submitted:', formId);
    // Add your analytics tracking here
});

// ===================================
// CONSOLE BRANDING
// ===================================

console.log('%c🌿 Satva Sustainability', 'color: #2d9f94; font-size: 24px; font-weight: bold;');
console.log('%cशिव संकल्पमस्तु - May there be noble intentions', 'color: #1e3a5f; font-size: 14px; font-style: italic;');
console.log('%cBuilt with precision and purpose for mid-market CSRD compliance.', 'color: #6b7280; font-size: 12px;');
console.log('%c\nInterested in our tech stack? We\'re hiring! contact@satvasustainability.com', 'color: #2d9f94; font-size: 11px;');

// ===================================
// PROGRESSIVE WEB APP SETUP (Optional)
// ===================================

// Service worker registration (uncomment when ready)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    });
}
*/

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-teal);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Add visible focus indicator when using keyboard
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// DYNAMIC THEME (Future Enhancement)
// ===================================

// Check for user's preferred color scheme
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// This can be expanded for dark mode support if needed

// ===================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ===================================

window.openModal = openModal;
window.closeModal = closeModal;
window.scrollToTop = scrollToTop;
window.toggleJourneyCard = toggleJourneyCard;
window.toggleAccordion = toggleAccordion;
window.handleNewsletterSubmit = handleNewsletterSubmit;