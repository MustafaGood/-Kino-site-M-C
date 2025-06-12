// Kino-site Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Kino-site loaded successfully!');
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize form validations
    initializeFormValidations();
    
    // Add fade-in animation to main content
    addFadeInAnimation();
    
    // Development mode indicator
    if (isDevelopmentMode()) {
        showDevelopmentBadge();
    }
});

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Initialize form validations
 */
function initializeFormValidations() {
    // Get all forms with validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

/**
 * Add fade-in animation to main content
 */
function addFadeInAnimation() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
}

/**
 * Check if we're in development mode
 */
function isDevelopmentMode() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1';
}

/**
 * Show development mode indicator
 */
function showDevelopmentBadge() {
    const badge = document.createElement('div');
    badge.className = 'dev-badge badge bg-warning text-dark';
    badge.textContent = 'DEV';
    badge.title = 'Development Mode';
    document.body.appendChild(badge);
}

/**
 * Utility function to show loading spinner
 */
function showLoading(container) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (container) {
        container.innerHTML = '<div class="text-center py-4"><div class="spinner"></div><p class="mt-2">Laddar...</p></div>';
    }
}

/**
 * Utility function to show error message
 */
function showError(container, message = 'Ett fel uppstod') {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    
    if (container) {
        container.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
            </div>
        `;
    }
}

/**
 * Utility function to format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Utility function to create star rating display
 */
function createStarRating(rating, maxStars = 5) {
    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star stars"></i>';
        } else {
            stars += '<i class="fas fa-star stars-empty"></i>';
        }
    }
    return stars;
}

/**
 * Smooth scroll to element
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function for search inputs
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

// Export utilities for use in other scripts
window.KinoSite = {
    showLoading,
    showError,
    formatDate,
    createStarRating,
    scrollToElement,
    debounce
};
