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
            
            // ===== PROJECT FILTERING =====
            const projectFilters = document.querySelectorAll('.project-filter');
            const projectCards = document.querySelectorAll('.project-card');
            
            projectFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    // Update active state
                    projectFilters.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Filter projects
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // ===== SKILL BARS ANIMATION =====
            const skillProgressBars = document.querySelectorAll('.skill-progress');
            
            function animateSkillBars() {
                skillProgressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                });
            }
            
            // Animate skill bars when they come into view
            const skillsSection = document.getElementById('skills');
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            };
            
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            skillsObserver.observe(skillsSection);
            
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
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simple validation
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;
                    
                    if (name && email && subject && message) {
                        // In a real application, you would send this to a server
                        alert('Thank you for your message! I will get back to you soon.');
                        contactForm.reset();
                    } else {
                        alert('Please fill in all fields.');
                    }
                });
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