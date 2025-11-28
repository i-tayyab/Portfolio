// script.js - Portfolio Website JavaScript

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Animate hamburger icon
        const icon = menuToggle.textContent;
        menuToggle.textContent = icon === '☰' ? '✕' : '☰';
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide/show header on scroll (optional)
    // Uncomment below if you want auto-hide header
    /*
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
    */
});

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .certificate-card, .achievement-card, .goal-card, .want-item, .community-item, .language-card, .timeline-item');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

//read more 
const readMoreBtn = document.getElementById('readMoreBtn');
const aboutParagraph = document.getElementById('about-paragraph');

readMoreBtn.addEventListener('click', () => {
    aboutParagraph.classList.toggle('expanded');
    if (aboutParagraph.classList.contains('expanded')) {
        readMoreBtn.textContent = 'Show Less';
    } else {
        readMoreBtn.textContent = 'Read More';
    }
});
 
// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// LANGUAGE BARS ANIMATION
// ============================================
const languageBars = document.querySelectorAll('.language-fill');

const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            languageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

languageBars.forEach(bar => {
    languageObserver.observe(bar);
});

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================
const statBoxes = document.querySelectorAll('.stat-box h3');

function animateCounter(element) {
    const target = element.textContent;
    const number = parseInt(target);
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statBoxes.forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// FORM VALIDATION
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    const submitBtn = contactForm.querySelector('.btn-primary');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });
    
    function validateInput(input) {
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            input.classList.remove('valid');
            return false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            return false;
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            return true;
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Form submission
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
        } else {
            showNotification('Please fill in all fields correctly.', 'error');
        }
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// TYPING EFFECT FOR HERO SUBTITLE
// ============================================
const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    const typingSpeed = 100;
    const roles = text.split('|').map(role => role.trim());
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = typingSpeed;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Uncomment to enable typing effect
    // typeEffect();
}



// //---------------------------------------
// // Lightbox functionality
// function openLightbox(img) {
//     const lightbox = document.getElementById('lightbox');
//     const lightboxImg = document.getElementById('lightbox-img');
//     lightbox.style.display = 'flex';
//     lightboxImg.src = img.src;
// }

// function closeLightbox() {
//     document.getElementById('lightbox').style.display = 'none';
// }

// // Contact form submit (just demo)
// document.getElementById('contact-form').addEventListener('submit', function(e){
//     e.preventDefault();
//     alert("Thank you! Your message has been sent.");
//     this.reset();
// });

//--------------------------------------
//skill section expansion

document.addEventListener('DOMContentLoaded', function() {
            const exploreBtn = document.getElementById('exploreSkills');
            const skillsSection = document.getElementById('skills');
            
            exploreBtn.addEventListener('click', function() {
                // Toggle the detailed skills section
                skillsSection.classList.toggle('active');
                
                // Scroll to the skills section if it's being shown
                if (skillsSection.classList.contains('active')) {
                    skillsSection.scrollIntoView({ behavior: 'smooth' });
                    exploreBtn.textContent = 'Hide Detailed Analysis';
                } else {
                    exploreBtn.textContent = 'Explore Detailed Analysis';
                }
            });
            
            // Add click functionality to skill tags
            const skillTags = document.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.addEventListener('click', function() {
                    // Show the detailed skills section if it's hidden
                    if (!skillsSection.classList.contains('active')) {
                        skillsSection.classList.add('active');
                        exploreBtn.textContent = 'Hide Detailed Analysis';
                        skillsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Here you could add functionality to highlight or filter
                    // the specific skill category that was clicked
                    const skillType = this.className.split(' ')[1]; // Get the skill class (web, ai, etc.)
                    console.log(`Clicked on ${skillType} skills`);
                });
            });
        });



// ============================================
// PROJECT CARD TILT EFFECT
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ============================================
// DARK MODE TOGGLE (Optional)
// ============================================
function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'dark-mode-toggle';
    toggle.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
}

// Uncomment to enable dark mode toggle
// createDarkModeToggle();

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    
    // Add initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
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

// Apply debounce to scroll handlers if needed
// Example: window.addEventListener('scroll', debounce(yourFunction, 100));

console.log('🚀 Portfolio JavaScript loaded and ready!');