// Import CSS so Vite bundles it and injects it in the head
import '../css/styles.css';

// Import GSAP and plugins from npm
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Initialize ScrollSmoother
let smoother;

// Full-screen overlay menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create ScrollSmoother instance
    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.8,
        effects: true,
        smoothTouch: 0.1
    });
    const menuToggle = document.querySelector('.fold-out-menu-toggle');
    const menu = document.querySelector('.fold-out-menu');
    const menuLinks = document.querySelectorAll('.fold-out-menu-item a');
    const body = document.body;

    // Toggle menu
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            const isActive = menu.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
            
            // Update aria-expanded for accessibility
            menuToggle.setAttribute('aria-expanded', !isActive);
        });

        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when clicking outside (on the overlay)
        menu.addEventListener('click', function(e) {
            if (e.target === menu) {
                closeMenu();
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    function openMenu() {
        menu.classList.add('active');
        menuToggle.classList.add('active');
        body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        // Trap focus within menu for better accessibility
        menu.querySelector('a').focus();
    }

    function closeMenu() {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        // Return focus to menu toggle
        menuToggle.focus();
    }

    // Smooth scroll for anchor links with navbar offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20; // 20px extra padding
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize fade-up animations
    initScrollAnimations();
});

// Fade-up animations with ScrollTrigger
function initScrollAnimations() {
    // Check if mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);

    // Animate sections
    gsap.utils.toArray('section').forEach((section) => {
        // Skip hero section (already has animations)
        if (section.classList.contains('hero')) return;
        
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none reset',
                once: false
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Animate service cards with stagger and mobile hover activation
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });

        // Activate hover state on mobile when card reaches center
        if (isMobile) {
            ScrollTrigger.create({
                trigger: card,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter: () => {
                    card.classList.add('active-mobile');
                },
                onLeave: () => {
                    card.classList.remove('active-mobile');
                },
                onEnterBack: () => {
                    card.classList.add('active-mobile');
                },
                onLeaveBack: () => {
                    card.classList.remove('active-mobile');
                }
            });
        }
    });

    // Animate bike cards with stagger
    gsap.utils.toArray('.bike-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 0.7,
            delay: (index % 12) * 0.08,
            ease: 'power3.out'
        });
    });

    // Animate contact cards
    gsap.utils.toArray('.contact-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });

    // Animate section titles
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Animate about content
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutText) {
        gsap.from(aboutText, {
            scrollTrigger: {
                trigger: aboutText,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    if (aboutImage) {
        gsap.from(aboutImage, {
            scrollTrigger: {
                trigger: aboutImage,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // Animate CTA buttons
    gsap.utils.toArray('.cta-buttons').forEach((btns) => {
        // Set initial state
        gsap.set(btns.children, { y: 30, opacity: 0 });
        
        // Create ScrollTrigger animation
        ScrollTrigger.create({
            trigger: btns,
            start: 'top bottom-=100',
            onEnter: () => {
                gsap.to(btns.children, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
        
        // If already in view on load, trigger immediately
        const rect = btns.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            gsap.to(btns.children, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });
        }
    });

    // Animate page headers
    gsap.utils.toArray('.page-header').forEach((header) => {
        gsap.from(header.children, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });
}
