// DOM Elements
const navToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Video Player Functionality
const videoThumbnails = document.querySelectorAll('.video-thumbnail');
const videoModal = document.createElement('div');
videoModal.className = 'video-modal';
videoModal.innerHTML = `
    <div class="video-modal-content">
        <span class="video-modal-close">&times;</span>
        <div class="video-modal-body">
            <iframe id="video-iframe" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
`;
document.body.appendChild(videoModal);

// Add modal CSS
const modalStyles = `
    .video-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        animation: fadeIn 0.3s ease;
    }
    
    .video-modal-content {
        position: relative;
        width: 80%;
        height: 80%;
        max-width: 900px;
        margin: 5% auto;
        background: #000;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .video-modal-close {
        position: absolute;
        top: 20px;
        right: 30px;
        color: #ffffff;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 2001;
        background: rgba(255, 51, 51, 0.8);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .video-modal-close:hover {
        background: #ff3333;
        transform: scale(1.1);
    }
    
    .video-modal-body {
        width: 100%;
        height: 100%;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .video-modal-content {
            width: 95%;
            height: 60%;
            margin: 20% auto;
        }
    }
`;

const modalStyleSheet = document.createElement('style');
modalStyleSheet.textContent = modalStyles;
document.head.appendChild(modalStyleSheet);

// Video thumbnail click handlers
videoThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const videoId = thumbnail.getAttribute('data-video-id') || 'dQw4w9WgXcQ'; // Default video ID
        const iframe = document.getElementById('video-iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close video modal
document.querySelector('.video-modal-close').addEventListener('click', () => {
    const iframe = document.getElementById('video-iframe');
    iframe.src = '';
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        const iframe = document.getElementById('video-iframe');
        iframe.src = '';
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.createElement('div');
galleryModal.className = 'gallery-modal';
galleryModal.innerHTML = `
    <div class="gallery-modal-content">
        <span class="gallery-modal-close">&times;</span>
        <div class="gallery-modal-body">
            <img id="gallery-image" src="" alt="Gallery Image">
            <div class="gallery-modal-info">
                <h3 id="gallery-title"></h3>
                <p id="gallery-description"></p>
            </div>
        </div>
        <div class="gallery-modal-nav">
            <button class="gallery-modal-prev">&lt;</button>
            <button class="gallery-modal-next">&gt;</button>
        </div>
    </div>
`;
document.body.appendChild(galleryModal);

// Add gallery modal CSS
const galleryModalStyles = `
    .gallery-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        animation: fadeIn 0.3s ease;
    }
    
    .gallery-modal-content {
        position: relative;
        width: 90%;
        height: 90%;
        max-width: 1200px;
        margin: 5% auto;
        display: flex;
        flex-direction: column;
    }
    
    .gallery-modal-close {
        position: absolute;
        top: 20px;
        right: 30px;
        color: #ffffff;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 2001;
        background: rgba(255, 51, 51, 0.8);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .gallery-modal-close:hover {
        background: #ff3333;
        transform: scale(1.1);
    }
    
    .gallery-modal-body {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 2rem;
    }
    
    #gallery-image {
        flex: 1;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
    }
    
    .gallery-modal-info {
        flex: 0 0 300px;
        color: #ffffff;
    }
    
    .gallery-modal-info h3 {
        color: #ff3333;
        margin-bottom: 1rem;
    }
    
    .gallery-modal-nav {
        display: flex;
        justify-content: center;
        gap: 2rem;
        padding: 1rem;
    }
    
    .gallery-modal-prev,
    .gallery-modal-next {
        background: #ff3333;
        color: #ffffff;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    
    .gallery-modal-prev:hover,
    .gallery-modal-next:hover {
        background: #ff6666;
        transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
        .gallery-modal-body {
            flex-direction: column;
        }
        
        .gallery-modal-info {
            flex: 1;
            text-align: center;
        }
        
        .gallery-modal-nav {
            padding: 0.5rem;
        }
        
        .gallery-modal-prev,
        .gallery-modal-next {
            padding: 0.5rem 1rem;
            font-size: 1.2rem;
        }
    }
`;

const galleryModalStyleSheet = document.createElement('style');
galleryModalStyleSheet.textContent = galleryModalStyles;
document.head.appendChild(galleryModalStyleSheet);

let currentGalleryIndex = 0;
const galleryImages = [];

// Gallery functionality
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push({
        src: img.src,
        title: `Gallery Image ${index + 1}`,
        description: 'The Drinkers live performance moment'
    });
    
    item.addEventListener('click', () => {
        currentGalleryIndex = index;
        openGalleryModal();
    });
});

function openGalleryModal() {
    const image = galleryImages[currentGalleryIndex];
    document.getElementById('gallery-image').src = image.src;
    document.getElementById('gallery-title').textContent = image.title;
    document.getElementById('gallery-description').textContent = image.description;
    galleryModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.querySelector('.gallery-modal-close').addEventListener('click', closeGalleryModal);

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeGalleryModal();
    }
});

document.querySelector('.gallery-modal-prev').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    openGalleryModal();
});

document.querySelector('.gallery-modal-next').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    openGalleryModal();
});

// Contact Form Handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> POŠILJANJE...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Sporočilo uspešno poslano! Odgovorili vam bomo v najkrajšem možnem času.', 'success');
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Newsletter Form Handler
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show loading state
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> PRIJAVLJANJE...';
        submitBtn.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            // Show success message
            showNotification('Uspešno ste se prijavili na naše novice! Preverite svoj email.', 'success');
            
            // Reset form
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: #ffffff;
            font-weight: bold;
            z-index: 3000;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
            max-width: 400px;
        }
        
        .notification-success {
            background: linear-gradient(45deg, #28a745, #34ce57);
            border-left: 4px solid #28a745;
        }
        
        .notification-error {
            background: linear-gradient(45deg, #dc3545, #e4606d);
            border-left: 4px solid #dc3545;
        }
        
        .notification-info {
            background: linear-gradient(45deg, #17a2b8, #20c997);
            border-left: 4px solid #17a2b8;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const notificationStyleSheet = document.createElement('style');
        notificationStyleSheet.id = 'notification-styles';
        notificationStyleSheet.textContent = notificationStyles;
        document.head.appendChild(notificationStyleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .latest-release, .tour-date, .merch-item, .member, .gallery-item');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Audio Player for Music Section
const albumCover = document.querySelector('.album-cover');
const playOverlay = document.querySelector('.play-overlay');
const tracks = document.querySelectorAll('.track');
let isPlaying = false;

if (albumCover && playOverlay) {
    albumCover.addEventListener('click', () => {
        if (!isPlaying) {
            // Simulate playing
            playOverlay.innerHTML = '<i class="fas fa-pause"></i>';
            showNotification('Predvajanje: Whiskey Nights', 'info');
            isPlaying = true;
        } else {
            // Simulate pause
            playOverlay.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
    });
}

// Track click handlers
tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
        const trackName = track.querySelector('.track-name').textContent;
        showNotification(`Predvajanje: ${trackName}`, 'info');
        
        // Update play overlay
        if (playOverlay) {
            playOverlay.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
        
        // Highlight current track
        tracks.forEach(t => t.style.background = 'transparent');
        track.style.background = 'rgba(255, 51, 51, 0.1)';
    });
});

// Merch Add to Cart functionality
const merchButtons = document.querySelectorAll('.merch-item .btn-primary');
merchButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const merchName = button.closest('.merch-item').querySelector('h4').textContent;
        showNotification(`${merchName} dodan v košarico!`, 'success');
        
        // Add loading state
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading"></span> DODAJANJE...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    });
});

// Tour Date Ticket Purchase
const ticketButtons = document.querySelectorAll('.tour-date .btn-small');
ticketButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const venue = button.closest('.tour-date').querySelector('h4').textContent;
        showNotification(`Nakup vstopnic za ${venue}...`, 'info');
    });
});

// Lazy Loading for Images
const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 300px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, imageOptions);

// Observe all images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modals
        if (videoModal.style.display === 'block') {
            document.querySelector('.video-modal-close').click();
        }
        if (galleryModal.style.display === 'block') {
            document.querySelector('.gallery-modal-close').click();
        }
    }
    
    // Gallery navigation with arrow keys
    if (galleryModal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.gallery-modal-prev').click();
        }
        if (e.key === 'ArrowRight') {
            document.querySelector('.gallery-modal-next').click();
        }
    }
});

// Performance optimization - Debounce scroll events
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

// Debounced scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and navigation updates
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('The Drinkers website loaded successfully!');
    
    // Add smooth page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
