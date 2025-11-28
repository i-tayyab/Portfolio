 // ===== JAVASCRIPT FUNCTIONALITY =====
        document.addEventListener('DOMContentLoaded', function() {
            
            // ===== NAVIGATION =====
            const header = document.getElementById('navbar');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const navLinksItems = document.querySelectorAll('.nav-link');
            
            // Sticky header on scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Mobile menu toggle
            mobileMenuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
            });
            
            // Close mobile menu when clicking on a link
            navLinksItems.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                });
            });
            
            // ===== PORTFOLIO FILTERING =====
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Update active state
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-selected', 'false');
                    });
                    this.classList.add('active');
                    this.setAttribute('aria-selected', 'true');
                    
                    // Filter items
                    const filterValue = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // ===== PORTFOLIO EXPAND =====
            const expandPortfolioBtn = document.getElementById('expandPortfolioBtn');
            const hiddenPortfolioItems = document.querySelectorAll('.portfolio-item--hidden');
            let isExpanded = false;
            
            expandPortfolioBtn.addEventListener('click', function() {
                isExpanded = !isExpanded;
                
                hiddenPortfolioItems.forEach(item => {
                    if (isExpanded) {
                        item.classList.remove('portfolio-item--hidden');
                        expandPortfolioBtn.querySelector('span').textContent = 'View Less Projects';
                        expandPortfolioBtn.setAttribute('aria-expanded', 'true');
                    } else {
                        item.classList.add('portfolio-item--hidden');
                        expandPortfolioBtn.querySelector('span').textContent = 'View More Projects';
                        expandPortfolioBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Rotate icon
                const icon = expandPortfolioBtn.querySelector('.btn-icon');
                icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0)';
            });
            
            // ===== TESTIMONIAL SLIDER =====
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const sliderDots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;
            
            function showSlide(index) {
                // Hide all slides
                testimonialSlides.forEach(slide => {
                    slide.classList.remove('active');
                });
                
                // Remove active state from all dots
                sliderDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show current slide and activate corresponding dot
                testimonialSlides[index].classList.add('active');
                sliderDots[index].classList.add('active');
                currentSlide = index;
            }
            
            // Add click events to dots
            sliderDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showSlide(index);
                });
            });
            
            // Auto slide every 5 seconds
            setInterval(function() {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= testimonialSlides.length) {
                    nextSlide = 0;
                }
                showSlide(nextSlide);
            }, 5000);
            
            // ===== SCROLL REVEAL ANIMATION =====
            const revealElements = document.querySelectorAll('.reveal');
            
            function checkReveal() {
                const windowHeight = window.innerHeight;
                const revealPoint = 150;
                
                revealElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    
                    if (elementTop < windowHeight - revealPoint) {
                        element.classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', checkReveal);
            window.addEventListener('load', checkReveal);
            
            // ===== SMOOTH SCROLLING =====
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // ===== FORM VALIDATION =====
            const newsletterForm = document.querySelector('.newsletter-form');
            
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('input[type="email"]');
                    
                    if (emailInput.value && isValidEmail(emailInput.value)) {
                        // In a real application, you would send this to a server
                        alert('Thank you for subscribing to our newsletter!');
                        emailInput.value = '';
                    } else {
                        alert('Please enter a valid email address.');
                        emailInput.focus();
                    }
                });
            }
            
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
            
            // ===== ACTIVE NAV LINK ON SCROLL =====
            function setActiveNavLink() {
                const sections = document.querySelectorAll('section[id]');
                const scrollY = window.pageYOffset;
                
                sections.forEach(section => {
                    const sectionHeight = section.offsetHeight;
                    const sectionTop = section.offsetTop - 100;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
                    } else {
                        document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
                    }
                });
            }
            
            window.addEventListener('scroll', setActiveNavLink);
        });