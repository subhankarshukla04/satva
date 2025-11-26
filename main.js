/**
 * Satva Sustainability - Main JavaScript
 * Handles navigation, form validation, and interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');

            // Update aria-expanded for accessibility
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = mobileMenuButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===========================
    // Smooth Scrolling for Anchor Links
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle if it's not just "#"
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    // Account for fixed header height
                    const headerHeight = 64; // 16 * 4 = 64px
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        if (mobileMenuButton) {
                            mobileMenuButton.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
        });
    });

    // ===========================
    // Form Validation (Contact Form)
    // ===========================
    const contactForm = document.querySelector('form[name="contact"]');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const company = document.getElementById('company');
            const title = document.getElementById('title');

            // Basic validation
            let isValid = true;
            let errorMessage = '';

            // Name validation
            if (name && name.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }

            // Email validation
            if (email && email.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your email.\n';
            } else if (email && !isValidEmail(email.value)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }

            // Company validation
            if (company && company.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your company name.\n';
            }

            // Title validation
            if (title && title.value.trim() === '') {
                isValid = false;
                errorMessage += 'Please enter your title/role.\n';
            }

            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            } else {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="inline-block">Sending...</span>';
                }
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===========================
    // Newsletter Form Handling
    // ===========================
    const newsletterForms = document.querySelectorAll('footer form');

    newsletterForms.forEach(form => {
        // Skip the contact form
        if (form.getAttribute('name') === 'contact') return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput && isValidEmail(emailInput.value)) {
                // In a real implementation, you'd send this to a newsletter service
                alert('Thank you for subscribing! You will receive monthly CSRD insights.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });

    // ===========================
    // Scroll-based Animations (Intersection Observer)
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with specific classes for animation
    const animatedElements = document.querySelectorAll('.bg-lightgray > div, .bg-white > div, section > div');
    animatedElements.forEach(element => {
        // Only observe if element is not already visible
        const rect = element.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            observer.observe(element);
        }
    });

    // ===========================
    // Active Navigation Highlight
    // ===========================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href]');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Highlight current page in navigation
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            // Already handled in HTML with conditional classes
        }
    });

    // ===========================
    // URL Parameter Handling (for resource downloads)
    // ===========================
    const urlParams = new URLSearchParams(window.location.search);
    const resourceType = urlParams.get('resource');
    const interestType = urlParams.get('interest');

    // If coming from a resource download link, pre-fill the service field
    if (contactForm && resourceType) {
        const serviceSelect = document.getElementById('service');
        const messageTextarea = document.getElementById('message');

        if (messageTextarea) {
            let resourceName = '';
            switch(resourceType) {
                case 'csrd-guide':
                    resourceName = 'CSRD Compliance Guide for US Mid-Market Companies';
                    break;
                case 'materiality-guide':
                    resourceName = 'Double Materiality Assessment: Practical Methodology';
                    break;
                case 'scope3-guide':
                    resourceName = 'Scope 3 Emissions Measurement Guide';
                    break;
                case 'nj-guide':
                    resourceName = 'NJ Climate Policy & Sustainability Incentives';
                    break;
            }

            if (resourceName) {
                messageTextarea.value = `I would like to download the "${resourceName}" resource. Please send me the link.`;
            }
        }
    }

    // If coming from webinar signup
    if (contactForm && interestType === 'webinar') {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = 'I am interested in signing up for the monthly CSRD webinar series. Please send me updates on upcoming sessions.';
        }
    }

    // ===========================
    // Accessibility: Skip to main content
    // ===========================
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-white px-4 py-2 z-50';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add id to main content if not present
    const mainElement = document.querySelector('main');
    if (mainElement && !mainElement.id) {
        mainElement.id = 'main-content';
    }

    // ===========================
    // Console welcome message
    // ===========================
    console.log('%cSatva Sustainability', 'color: #10B981; font-size: 24px; font-weight: bold;');
    console.log('%cशिव संकल्पमस्तु - May there be noble intentions', 'color: #1E3A8A; font-size: 14px;');
    console.log('Website built with integrity and purpose.');

});

// ===========================
// Utility Functions
// ===========================

/**
 * Debounce function to limit how often a function can run
 * Useful for scroll and resize events
 */
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

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}