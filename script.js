// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== MOBILE MENU TOGGLE ====================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// ==================== LOGIN MODAL FUNCTIONS ====================
function openModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    // Simulate login
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Show success message
    alert(`Login successful! Welcome, ${email}`);
    
    // Toggle login/logout buttons
    document.querySelector('.login-btn').style.display = 'none';
    document.querySelector('.logout-btn').style.display = 'flex';
    
    closeModal();
    return false;
}

// Handle Google login
function handleGoogleLogin() {
    alert('Google login initiated! This would redirect to Google OAuth in a real application.');
    
    // Toggle login/logout buttons
    document.querySelector('.login-btn').style.display = 'none';
    document.querySelector('.logout-btn').style.display = 'flex';
    
    closeModal();
}

// Handle logout
function logout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
        alert('Logged out successfully!');
        document.querySelector('.login-btn').style.display = 'flex';
        document.querySelector('.logout-btn').style.display = 'none';
    }
}

// ==================== PRICING TOGGLE ====================
function togglePricing(type) {
    const buttons = document.querySelectorAll('.toggle-btn button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const prices = document.querySelectorAll('.price');
    
    if (type === 'yearly') {
        // Show yearly prices (20% discount)
        prices[0].innerHTML = '$15<span>/month</span>';
        prices[1].innerHTML = '$39<span>/month</span>';
        prices[2].innerHTML = '$79<span>/month</span>';
    } else {
        // Show monthly prices
        prices[0].innerHTML = '$19<span>/month</span>';
        prices[1].innerHTML = '$49<span>/month</span>';
        prices[2].innerHTML = '$99<span>/month</span>';
    }
}

// ==================== REVIEW SLIDER ====================
let currentReview = 0;
const reviewContainer = document.getElementById('reviewContainer');
const totalReviews = document.querySelectorAll('.review-card').length;
let autoSlideInterval;

// Create dots for slider
function createSliderDots() {
    const dotsContainer = document.getElementById('sliderDots');
    for (let i = 0; i < totalReviews; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToReview(i));
        dotsContainer.appendChild(dot);
    }
}

// Update dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentReview) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Change review
function changeReview(direction) {
    currentReview += direction;
    
    if (currentReview < 0) {
        currentReview = totalReviews - 1;
    } else if (currentReview >= totalReviews) {
        currentReview = 0;
    }
    
    updateSlider();
}

// Go to specific review
function goToReview(index) {
    currentReview = index;
    updateSlider();
    resetAutoSlide();
}

// Update slider position
function updateSlider() {
    reviewContainer.style.transform = `translateX(-${currentReview * 100}%)`;
    updateDots();
}

// Auto slide reviews
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentReview = (currentReview + 1) % totalReviews;
        updateSlider();
    }, 5000); // Change every 5 seconds
}

// Reset auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize slider
createSliderDots();
startAutoSlide();

// Pause auto-slide on hover
const reviewSlider = document.querySelector('.review-slider');
reviewSlider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

reviewSlider.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// ==================== FILE UPLOAD ====================
document.getElementById('videoUpload').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        const fileSize = (e.target.files[0].size / (1024 * 1024)).toFixed(2);
        
        alert(`Video uploaded successfully!\nFile: ${fileName}\nSize: ${fileSize} MB`);
        
        // Show upload progress simulation
        const progressDiv = document.querySelector('.upload-progress');
        if (progressDiv) {
            progressDiv.style.display = 'block';
            
            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                document.querySelector('.progress-text').textContent = progress + '%';
                
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        alert('Video processing complete! Your clips are ready.');
                    }, 500);
                }
            }, 300);
        }
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

// Trigger counter animation when in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    animateCounter(counter);
                    counter.classList.add('counted');
                }
            });
        }
    });
}, observerOptions);

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// ==================== BACK TO TOP BUTTON ====================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== ANIMATIONS ON SCROLL ====================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .example-card, .founder-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for animation
document.querySelectorAll('.feature-card, .pricing-card, .example-card, .founder-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ==================== DOWNLOAD BUTTON FUNCTIONALITY ====================
document.querySelectorAll('.download-btn, .download-btn-small').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const clipName = this.closest('.clip-item') ? 
            this.closest('.clip-item').querySelector('h4').textContent : 
            'Clip';
        
        // Simulate download
        alert(`Downloading ${clipName}...`);
        
        // Add download animation
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// ==================== EXAMPLE CARD PLAY BUTTON ====================
document.querySelectorAll('.example-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h4').textContent;
        alert(`Playing: ${title}\n\nIn a real application, this would open a video player.`);
    });
});

// ==================== FOUNDER CARD SOCIAL LINKS ====================
document.querySelectorAll('.founder-overlay .social-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        const platform = this.querySelector('i').classList[1].split('-')[1];
        alert(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)} profile...`);
    });
});

// ==================== PRICING CARD BUTTON ====================
document.querySelectorAll('.pricing-btn').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;
        alert(`Selected ${planName} plan!\n\nRedirecting to checkout...`);
    });
});

// ==================== STUDENT VERIFICATION ====================
document.querySelectorAll('.cta-button').forEach(button => {
    if (button.textContent.includes('Verify Student ID')) {
        button.addEventListener('click', function() {
            const studentID = prompt('Enter your Student ID:');
            if (studentID) {
                alert(`Thank you! Your student ID (${studentID}) has been submitted for verification.\n\nYou will receive an email within 24 hours.`);
            }
        });
    }
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c Welcome to PodClip! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
console.log('%c Made with ❤️ by Vishal, Jatin, Rishabh G & Rishabh S', 'color: #667eea; font-size: 14px;');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('PodClip website loaded successfully!');
    
    // Initial animation trigger
    animateOnScroll();
    
    // Set initial logout button state
    document.querySelector('.logout-btn').style.display = 'none';
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});