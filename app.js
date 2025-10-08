// Modern Portfolio Interactive Features

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initParticles();
        this.initScrollAnimations();
        this.initTypingEffect();
        this.initSkillBars();
        this.handleNavigation();
    }

    setupEventListeners() {
        // Navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(targetId);
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Contact form
        const contactForm = document.getElementById('contact-form');
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(e.target);
        });

        // Resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            // Handle navbar background
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
        }

        // Animate elements on scroll
        this.animateOnScroll();
    }

    initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(31, 184, 205, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation CSS
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes floatParticle {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title .name');
        if (!heroTitle) return;

        const text = 'Shekhar Singh';
        heroTitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Add cursor blink effect
                heroTitle.style.borderRight = '2px solid var(--color-primary)';
                heroTitle.style.animation = 'blink 1s infinite';
                
                // Add blink animation
                if (!document.getElementById('blink-styles')) {
                    const style = document.createElement('style');
                    style.id = 'blink-styles';
                    style.textContent = `
                        @keyframes blink {
                            0%, 50% { border-color: transparent; }
                            51%, 100% { border-color: var(--color-primary); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }, 100);
    }

    initSkillBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    const progress = progressBar?.getAttribute('data-progress');
                    if (progressBar && progress) {
                        setTimeout(() => {
                            progressBar.style.width = `${progress}%`;
                        }, Math.random() * 500);
                    }
                }
            });
        }, { threshold: 0.5 });

        skillCards.forEach(card => observer.observe(card));
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .about-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    async handleContactForm(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Client-side validation
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateEmailSend(data);
            
            this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    }

    validateForm(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.subject || data.subject.trim().length < 5) {
            errors.push('Subject must be at least 5 characters long');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        if (errors.length > 0) {
            this.showMessage(errors.join('. '), 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async simulateEmailSend(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real application, this would send to your backend
        console.log('Contact form submission:', data);
        
        // Store in localStorage for demo purposes
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Network error'));
        }
    }

    showMessage(text, type = 'info') {
        const container = document.getElementById('message-container');
        if (!container) return;

        const message = document.createElement('div');
        message.className = `message message--${type}`;
        message.innerHTML = `
            <span>${text}</span>
            <button class="message-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add close button styles
        if (!document.getElementById('message-close-styles')) {
            const style = document.createElement('style');
            style.id = 'message-close-styles';
            style.textContent = `
                .message {
                    position: relative;
                    padding-right: 50px;
                }
                .message-close {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: inherit;
                    cursor: pointer;
                    font-size: 14px;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                .message-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }

        container.appendChild(message);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentElement) {
                message.style.animation = 'slideOutRight 0.3s ease-out forwards';
                setTimeout(() => message.remove(), 300);
            }
        }, 5000);
    }

    handleResize() {
        // Handle responsive changes
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    }

    // Interactive project card effects
    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Add smooth entrance animations
    initEntranceAnimations() {
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
        
        // Initially hide elements
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
        });
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => observer.observe(element));
    }

    // Add interactive hover effects for buttons
    initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                    left: 50%;
                    top: 50%;
                    width: 0;
                    height: 0;
                    transform: translate(-50%, -50%);
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                // Add ripple animation
                if (!document.getElementById('ripple-styles')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-styles';
                    style.textContent = `
                        @keyframes ripple {
                            to {
                                width: 300px;
                                height: 300px;
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // Add stats counter animation
    initStatsCounter() {
        const stats = [
            { element: '.projects-count', target: 4, suffix: '+' },
            { element: '.skills-count', target: 10, suffix: '+' },
            { element: '.experience-years', target: 2, suffix: '+' }
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const element = document.querySelector(stat.element);
                        if (element && !element.classList.contains('counted')) {
                            element.classList.add('counted');
                            this.animateCounter(element, 0, stat.target, stat.suffix);
                        }
                    });
                }
            });
        });

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }

    animateCounter(element, start, end, suffix = '') {
        const duration = 2000;
        const increment = (end - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
}

// Utility functions for enhanced interactions
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = 0;
            }
            if (element.style.opacity < 1) {
                element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, duration / 10);
    },

    slideIn(element, direction = 'up', duration = 300) {
        const directions = {
            up: 'translateY(20px)',
            down: 'translateY(-20px)',
            left: 'translateX(20px)',
            right: 'translateX(-20px)'
        };

        element.style.transform = directions[direction];
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translate(0)';
            element.style.opacity = '1';
        });
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Initialize additional features
    app.initProjectCards();
    app.initEntranceAnimations();
    app.initButtonEffects();
    app.initStatsCounter();
    
    // Add loading screen fade out
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 1000);
    }

    console.log('🚀 Portfolio App Initialized Successfully!');
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Utils };
}