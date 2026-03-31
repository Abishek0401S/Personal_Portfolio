// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');

        // Start animations after preloader
        setTimeout(initTypewriter, 500);
        initCounters();
        initSkillBars();
        initCustomCursor();
    }, 1500);
});

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category-card, .stat-item, .about-card, .theme-toggle, .menu-toggle');

    if (!cursorOuter || !cursorInner) return;

    window.addEventListener('mousemove', (e) => {
        cursorOuter.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('hover');
            cursorInner.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('hover');
            cursorInner.classList.remove('hover');
        });
    });
}

// ==================== SCROLL PROGRESS ====================
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress-bar');
    if (scrollProgress) {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
});

// ==================== 3D TILT EFFECT ====================
const tiltElements = document.querySelectorAll('.stat-item, .about-card, .skill-category-card, .project-card, .achievement-card, .featured-project-compact');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 10;
        const tiltY = (centerX - x) / 10;
        
        el.style.setProperty('--tilt-x', `${tiltX}deg`);
        el.style.setProperty('--tilt-y', `${tiltY}deg`);
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.setProperty('--tilt-x', `0deg`);
        el.style.setProperty('--tilt-y', `0deg`);
    });
});

// ==================== MOBILE MENU ====================
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== SCROLL TO TOP ====================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== REVEAL ON SCROLL ====================
const revealElements = document.querySelectorAll(
    '.about-card, .skill-category, .project-card, .timeline-item, .stat-item, .achievement-card, .featured-project-compact'
);

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealOnScroll.observe(el);
});

// Section reveal
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.classList.add('reveal');
    sectionObserver.observe(section);
});

// ==================== TYPEWRITER EFFECT ====================
const typewriterElement = document.getElementById('typewriter');
const roles = ['Software Developer', 'Full Stack .NET Developer', 'Certified Scrum Master', '.NET Core Expert'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function initTypewriter() {
    type();
}

function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before new word
    }

    setTimeout(type, typingSpeed);
}

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number');
let countersInitialized = false;

function initCounters() {
    const statsSection = document.querySelector('.stats-section');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersInitialized) {
                countersInitialized = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        counterObserver.observe(statsSection);
    }
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };

    updateCounter();
}

// ==================== SKILL PROGRESS BARS ====================
const skillProgressBars = document.querySelectorAll('.skill-progress-fill');
let skillBarsInitialized = false;

function initSkillBars() {
    const skillsContainer = document.querySelector('.skills-progress-container');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillBarsInitialized) {
                skillBarsInitialized = true;
                skillProgressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
            }
        });
    }, { threshold: 0.3 });

    if (skillsContainer) {
        skillsObserver.observe(skillsContainer);
    }
}

// ==================== PARTICLES CANVAS ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let animationId;

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(0, 210, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 210, 255, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }

    // Only start particles on desktop for performance
    if (window.innerWidth > 768) {
        initParticles();
        animateParticles();
    }
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const closeIcon = document.querySelector('.close');
const progress = document.querySelector('.progress');

let timer1, timer2;

const showToast = () => {
    if (toast) {
        toast.classList.add('active');
        if (progress) progress.classList.add('active');

        timer1 = setTimeout(() => {
            toast.classList.remove('active');
        }, 5000);

        timer2 = setTimeout(() => {
            if (progress) progress.classList.remove('active');
        }, 5300);
    }
};

if (closeIcon) {
    closeIcon.addEventListener('click', () => {
        toast.classList.remove('active');
        setTimeout(() => {
            if (progress) progress.classList.remove('active');
        }, 300);
        clearTimeout(timer1);
        clearTimeout(timer2);
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formspree.io/f/xzdkrvza', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            setTimeout(() => {
                showToast();
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1000);

        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            alert('Something went wrong. Please try again.');
        }
    });
}

// ==================== SMOOTH SCROLL FOR NAV LINKS ====================
document.querySelectorAll('.nav-links a, .mobile-nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== PARALLAX EFFECT FOR HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroBgGlow = document.querySelector('.hero-bg-glow');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }

    if (heroBgGlow && scrolled < window.innerHeight) {
        heroBgGlow.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0005})`;
    }
});

// ==================== SKILL BADGE HOVER EFFECT ====================
const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach(badge => {
    badge.addEventListener('mousemove', (e) => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        badge.style.setProperty('--x', x + 'px');
        badge.style.setProperty('--y', y + 'px');
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== ADD ACTIVE STATE STYLE FOR NAV ====================
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color);
    }
    .nav-links a.active::before {
        width: 100%;
    }
`;
document.head.appendChild(activeNavStyle);

// ==================== IMAGE MODAL FOR DIAGRAMS ====================
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalCaption = document.getElementById('modal-caption');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const viewDiagramBtns = document.querySelectorAll('.btn-view-diagram, .btn-fp-expand');

const diagrams = [
    { id: 'flow-diagram', src: 'VP Project Flow Diagram.png', caption: 'Vendor Portal - Project Flow Diagram' },
    { id: 'architecture-diagram', src: 'VP Architecture Diagram.png', caption: 'Vendor Portal - Architecture Diagram' }
];

let currentDiagramIndex = 0;

// Open modal when clicking view diagram buttons
viewDiagramBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const diagramId = btn.getAttribute('data-diagram');
        currentDiagramIndex = diagrams.findIndex(d => d.id === diagramId);
        openModal(currentDiagramIndex);
    });
});

// Also allow clicking on the diagram images directly
document.querySelectorAll('.diagram-image, .fp-diagram-img').forEach(img => {
    img.addEventListener('click', () => {
        const diagramId = img.id;
        currentDiagramIndex = diagrams.findIndex(d => d.id === diagramId);
        openModal(currentDiagramIndex);
    });
});

function openModal(index) {
    if (imageModal && modalImage && modalCaption) {
        const diagram = diagrams[index];
        modalImage.src = diagram.src;
        modalCaption.textContent = diagram.caption;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showPrevDiagram() {
    currentDiagramIndex = (currentDiagramIndex - 1 + diagrams.length) % diagrams.length;
    openModal(currentDiagramIndex);
}

function showNextDiagram() {
    currentDiagramIndex = (currentDiagramIndex + 1) % diagrams.length;
    openModal(currentDiagramIndex);
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModal();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevDiagram();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextDiagram();
    });
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (imageModal && imageModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevDiagram();
        } else if (e.key === 'ArrowRight') {
            showNextDiagram();
        }
    }
});

// ==================== PROJECT CARD ANIMATION ON SCROLL ====================
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// ==================== ACHIEVEMENT CARD ANIMATION ====================
const achievementCards = document.querySelectorAll('.achievement-card');

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 150);
        }
    });
}, {
    threshold: 0.1
});

achievementCards.forEach(card => {
    achievementObserver.observe(card);
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for any initial animations
    document.body.classList.add('loaded');
    
    // Initialize any lazy-loaded images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
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

// Optimize scroll event listeners
const optimizedScrollHandler = debounce(() => {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Focus trap for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

if (imageModal) {
    trapFocus(imageModal);
}
