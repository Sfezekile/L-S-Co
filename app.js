// Optimized JavaScript

// Removed unused functions and event listeners
// Consolidated repetitive code

// Main script
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open")
    menuBtnIcon.setAttribute("class", "ri-menu-line");
})


// Booking Modal
const modal = document.getElementById('booking-modal');
const bookNowBtn = document.getElementById('book-now'); // changed btn to bookNowBtn
const closeBtn = document.getElementsByClassName('close')[0]; // changed span to closeBtn
const bookingForm = document.getElementById('booking-form'); // add this code

// Open modal when Book Now button is clicked
bookNowBtn.onclick = function () {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}
// Close modal when X is clicked
closeBtn.onclick = function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}
// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}
// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Form Submission
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'event-type', 'event-date', 'start-time', 'end-time', 'guest-count', 'description'];
    let isValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        alert('Please fill out all required fields.');
        return;
    }

    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';
    submitBtn.disabled = true;

    // Prepare email parameters
    const templateParams = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        event_type: document.getElementById('event-type').value,
        event_date: document.getElementById('event-date').value,
        start_time: document.getElementById('start-time').value,
        end_time: document.getElementById('end-time').value,
        guest_count: document.getElementById('guest-count').value,
        description: document.getElementById('description').value,
    };

    // Send email
    emailjs.send("service_2alu9pj", "template_9m46xk6", templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your booking request! We\'ll contact you within 24 hours.');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            bookingForm.reset();

            // Reset button state
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }, function (error) {
            console.log('FAILED...', error);
            alert('There was an error submitting your request. Please try again or contact us directly.');

            // Reset button state
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        });
});


// Reset field borders when user starts typing
const formInputs = bookingForm.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', function () {
        this.style.borderColor = '#ddd';
    });
});

// Set minimum date to today for event date
const eventDateInput = document.getElementById('event-date');
const today = new Date().toISOString().split('T')[0];
eventDateInput.min = today;

/*
btn.onclick = function() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}*/

// Form Submission
/*document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'event-type', 'event-date', 'start-time', 'end-time', 'guest-count', 'inspiration', 'description' ];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        alert('Please fill out all required fields.');
        return;
    }

    // Prepare email parameters
    const templateParams = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        event_type: document.getElementById('event-type').value,
        event_date: document.getElementById('event-date').value,
        start_time: document.getElementById('start-time').value,
        end_time: document.getElementById('end-time').value,
        guest_count: document.getElementById('guest-count').value,
        inspiration: document.getElementById('inspiration').value,
        description: document.getElementById('description').value,
    };

    // Send email
    emailjs.send("service_2alu9pj","template_9m46xk6", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your booking request! We\'ll contact you within 24 hours.');
            modal.style.display = 'none';
            this.reset();
        }.bind(this), function(error) {
            console.log('FAILED...', error);
            alert('There was an error submitting your request. Please try again or contact us directly.');
        });
});*/
/*
// Event Type Selection
const eventTypeCards = document.querySelectorAll('.event-type-card');
const eventTypeInput = document.getElementById('event-type');

eventTypeCards.forEach(card => {
    card.addEventListener('click', function() {
        eventTypeCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        eventTypeInput.value = this.getAttribute('data-value');
    });
});

// File Upload Interaction
const inspirationUpload = document.querySelector('.inspiration-upload');
const inspirationFiles = document.getElementById('inspiration-files');

inspirationUpload.addEventListener('click', function() {
    inspirationFiles.click();
});

inspirationFiles.addEventListener('change', function() {
    if (this.files.length > 0) {
        inspirationUpload.innerHTML = `
            <i class="fas fa-check-circle" style="color: var(--gold); font-size: 2rem;"></i>
            <p>${this.files.length} file(s) selected</p>
        `;
    }
});

// Multi-step Form Navigation
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');

nextButtons.forEach(button => {
    button.addEventListener('click', function() {
        const currentSection = this.closest('.form-section');
        const nextSectionId = this.getAttribute('data-next');
        
        currentSection.classList.remove('active');
        document.getElementById(nextSectionId).classList.add('active');
        
        // Update step indicator
        const stepNumber = parseInt(nextSectionId.split('-')[1]);
        updateStepIndicator(stepNumber);
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', function() {
        const currentSection = this.closest('.form-section');
        const prevSectionId = this.getAttribute('data-prev');
        
        currentSection.classList.remove('active');
        document.getElementById(prevSectionId).classList.add('active');
        
        // Update step indicator
        const stepNumber = parseInt(prevSectionId.split('-')[1]);
        updateStepIndicator(stepNumber);
    });
});

function updateStepIndicator(activeStep) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNumber = step.querySelector('.step-number');
        if (index < activeStep - 1) {
            stepNumber.style.backgroundColor = 'var(--gold)';
        } else if (index === activeStep - 1) {
            stepNumber.style.backgroundColor = 'var(--gold)';
        } else {
            stepNumber.style.backgroundColor = '#ddd';
        }
    });
}*/



// Main JS functionality
// Eleven Eleven Events - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initHeroSlideshow();
    initReviewsSlider();
    initBookingModal();
    initContactForm();
    initScrollAnimations();
    initMiscellaneous();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');

        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}


// Booking modal functionality
function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const bookingBtns = document.querySelectorAll('#nav-book-btn, #hero-book-btn');
    const closeBtn = document.getElementById('modal-close');
    const bookingForm = document.getElementById('booking-form');

    // Open modal
    bookingBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Manifesting Your Event...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showMessage('Booking request sent! We\'ll contact you within 24 hours to discuss your dream event.', 'success');
                this.reset();
                closeModal();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showMessage('Message sent! Thank you for reaching out. We\'ll get back to you soon.', 'success');
                this.reset();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-title, .about-content, .gallery-item, .review-card, .contact-form, .contact-info');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Miscellaneous functionality
function initMiscellaneous() {
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Preload images for better performance
    const imageUrls = [
        'Img/Vibrant\ Party\ Ideas_\ How\ to\ Throw\ a\ Colorful\ Outdoor\ Birthday\ Bash.jpeg',
        'Img/Img/8\ Retro\ Party\ Ideas_\ Get\ the\ Time\ Machine\ Effect\ With\ Our\ Tips\ •\ The\ Naptime\ Reviewer.jpeg',
        'Img/Img/40\ BEST\ OUTDOOR\ GRADUATION\ PARTY\ IDEAS\ FOR\ GUYS\ -\ Anuris\ Journey.jpeg',
        'src/assets/gallery-kids.jpg',
        'src/assets/gallery-celebration.jpg',
        'src/assets/gallery-cherry.jpg'
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });

    // Add loading states to buttons
    document.addEventListener('click', function (e) {
        if (e.target.matches('.btn:not([type="submit"])')) {
            e.target.classList.add('loading');
            setTimeout(() => {
                e.target.classList.remove('loading');
            }, 300);
        }
    });
}

// Utility function to show messages
function showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;

    // Insert at top of page
    document.body.insertBefore(message, document.body.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);

    // Add click to dismiss
    message.addEventListener('click', () => {
        message.remove();
    });
}

// Performance optimizations
window.addEventListener('load', function () {
    // Add loaded class for animations
    document.body.classList.add('loaded');

    // Initialize any remaining functionality that depends on full page load
    initAdvancedFeatures();
});

function initAdvancedFeatures() {
    // Add parallax effect to hero section (optional)
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 16));
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function (e) {
    // Handle any state changes if needed
    console.log('Navigation state changed');
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Email functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your User ID
    (function () {
        emailjs.init('_m7xwbrp_m5xpeKHH');
    })();

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('booking-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Disable the submit button to prevent multiple submissions
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

        // Clear previous messages
        formMessage.style.display = 'none';
        formMessage.textContent = '';

        // Send the email using EmailJS
        emailjs.sendForm('service_mdnt86i', 'template_9m46xk6', this)
            .then(function () {
                // Show success message
                formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset the form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function (error) {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later or contact us directly. Error: ' + error.text;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                // Log the error for debugging
                console.error('EmailJS Error:', error);
            })
            .finally(function () {
                // Re-enable the submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
            });
    });

    formMessage.addEventListener('submit', function (e) {
        e.preventDefault();

        // Disable the submit button to prevent multiple submissions
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

        // Clear previous messages
        formMessage.style.display = 'none';
        formMessage.textContent = '';

        // Send the email using EmailJS
        emailjs.sendForm('service_mdnt86i', 'template_9m46xk6', this)
            .then(function () {
                // Show success message
                formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';

                // Reset the form
                formMessage.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function (error) {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later or contact us directly. Error: ' + error.text;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';

                // Log the error for debugging
                console.error('EmailJS Error:', error);
            })
            .finally(function () {
                // Re-enable the submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
            });
    });

    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
            }
        });
    });
});

// Review functionality
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.reviews-slider');
    const cards = Array.from(document.querySelectorAll('.review-card'));
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
        if (index === 0) {
            dot.classList.add('active');
            dot.setAttribute('aria-selected', 'true');
        }
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    let currentIndex = 0;
    let autoSlideInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Touch event handlers for mobile swipe
    cards.forEach(card => {
        card.addEventListener('touchstart', touchStart);
        card.addEventListener('touchend', touchEnd);
        card.addEventListener('touchmove', touchMove);
    });

    function touchStart(e) {
        isDragging = true;
        startPos = e.touches[0].clientX;
        prevTranslate = currentTranslate;
        clearInterval(autoSlideInterval);
    }

    function touchEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < cards.length - 1) {
            currentIndex += 1;
        }

        if (movedBy > 50 && currentIndex > 0) {
            currentIndex -= 1;
        }

        updateSlider();
        startAutoSlide();
    }

    function touchMove(e) {
        if (isDragging) {
            const currentPosition = e.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 30; // card width + gap
        slider.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });

        updateDots();
        updateAria();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
        });
    }

    function updateAria() {
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        }, 5000);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
        clearInterval(autoSlideInterval);
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
        clearInterval(autoSlideInterval);
        startAutoSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('review-card')) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % cards.length;
                updateSlider();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateSlider();
            }
        }
    });

    // Initialize
    updateAria();
    startAutoSlide();

    // Pause auto-slide on hover/focus
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', startAutoSlide);

    // Intersection Observer for lazy loading images
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });

        document.querySelectorAll('.author-avatar img').forEach(img => {
            img.setAttribute('data-src', img.src);
            img.removeAttribute('src');
            observer.observe(img);
        });
    }
});