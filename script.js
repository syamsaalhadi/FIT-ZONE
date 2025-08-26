// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX - 20 + 'px';
        cursorFollower.style.top = e.clientY - 20 + 'px';
    }, 100);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = section.offsetTop - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation on scroll
ScrollTrigger.create({
    trigger: '.stats',
    start: 'top 80%',
    once: true,
    onEnter: animateCounters
});

// GSAP Animations for sections
gsap.from('.hero-content', {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: 'power3.out',
    delay: 2.2
});

gsap.from('.floating-card', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 2.8
});

gsap.utils.toArray('.program-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });
});

gsap.utils.toArray('.pricing-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Success animation
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Message Sent! ✓';
        button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 1000);
});

// Pricing button interactions
document.querySelectorAll('.plan-button').forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
        
        // Animation effect
        gsap.to(this, {
            duration: 0.1,
            scale: 0.95,
            yoyo: true,
            repeat: 1
        });
        
        setTimeout(() => {
            alert(`Excellent choice! You selected the ${planName} plan. Redirecting to registration...`);
        }, 200);
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Intersection Observer for active navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Console welcome message
console.log(`
🚀 Welcome to FitZone - Next Generation Fitness! 🚀
================================================
💪 Transform Your Body, Elevate Your Mind
🎨 Built with cutting-edge web technologies
⚡ Optimized performance & modern animations
🔥 Blockchain-inspired futuristic design

Ready to revolutionize your fitness journey?
`);