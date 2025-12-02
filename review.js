document.addEventListener('DOMContentLoaded', function() {
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