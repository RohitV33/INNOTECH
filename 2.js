// Add these animation functions at the beginning of your file

// Loader Animation
function initLoader() {
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.loader-progress');
    
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 45;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            gsap.to(loader, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                }
            });
        }
        progress.style.width = width + '%';
    }, 100);
}

// Page Animations
function initAnimations() {
    const tl = gsap.timeline();

    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.3');

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.vision-text, .counter-wrapper').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.5
        });
    });

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            innerHTML: target,
            duration: 1.5,
            snap: { innerHTML: 1 },
            ease: 'power1.out'
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: target,
                ease: 'power2.inOut'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const criticalImages = [
        'tree.png.png',
        'bg.jpg'
    ];

    Promise.all(criticalImages.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    }))
    .then(() => {
        initLoader();
        initProductMenu();
    })
    .catch(() => {
        initLoader();
        initProductMenu();
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                scrollTimeout = null;
            }, 10);
        }
    }, { passive: true });
});

// Product Navigation Enhancements
function initProductMenu() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const productMenu = document.querySelector('.product-menu');
    const dropdown = document.querySelector('.dropdown');

    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            productMenu.style.opacity = '1';
            productMenu.style.visibility = 'visible';
            productMenu.style.transform = 'translateY(0) scale(1)';
            
            requestAnimationFrame(() => {
                dropdownItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 50}ms`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                });
            });
        });

        dropdown.addEventListener('mouseleave', () => {
            productMenu.style.opacity = '0';
            productMenu.style.visibility = 'hidden';
            productMenu.style.transform = 'translateY(20px) scale(0.95)';
            
            dropdownItems.forEach(item => {
                item.style.transitionDelay = '0s';
                item.style.opacity = '0';
                item.style.transform = 'translateX(-10px)';
            });
        });
    }

    const featuredProduct = document.querySelector('.featured-product');
    if (featuredProduct) {
        featuredProduct.addEventListener('mouseenter', () => {
            featuredProduct.style.transform = 'scale(1.02)';
        });

        featuredProduct.addEventListener('mouseleave', () => {
            featuredProduct.style.transform = 'scale(1)';
        });
    }
}