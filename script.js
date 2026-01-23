// Wait for DOM to be ready before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
});

// Modal elements - will be defined after DOM loads
let modal, modalImg, modalCaption, closeBtn;

// Enhanced fade in animation on scroll with staggered effect
// Show content when it enters the viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px' // Trigger when element is 90% visible from top
};

const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animation for each photo
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150); // 150ms delay between each photo
        } else {
            // Fade out when leaving center viewport
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px) scale(0.9)';
        }
    });
}, observerOptions);

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            // Fade out when leaving center viewport
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

const ceremonyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animation for each ceremony item
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200); // 200ms delay between each ceremony
        } else {
            // Fade out when leaving center viewport
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    // Mark body as JS loaded for CSS to know JavaScript is active
    document.body.classList.add('js-loaded');
    
    // Initialize modal elements
    modal = document.getElementById('photoModal');
    modalImg = document.getElementById('modalImage');
    modalCaption = document.getElementById('modalCaption');
    closeBtn = document.querySelector('.modal-close');
    
    // Initialize navbar
    navbar = document.querySelector('.navbar');
    
    // Navbar background on scroll
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 254, 240, 0.98)';
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 254, 240, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    }
    
    // Enhanced photo animations
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        photoObserver.observe(el);
    });
    
    // Love story text animation
    const loveStoryText = document.querySelector('.love-story-text');
    if (loveStoryText) {
        // Ensure it has animate class to keep it visible
        if (!loveStoryText.classList.contains('animate')) {
            loveStoryText.classList.add('animate');
        }
        
        // Use a more lenient observer for story text
        const storyObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };
        
        const storyTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            });
        }, storyObserverOptions);
        
        storyTextObserver.observe(loveStoryText);
        
        // Also check if already in viewport on load
        setTimeout(() => {
            const rect = loveStoryText.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport) {
                loveStoryText.classList.add('animate');
            }
        }, 100);
    }
    
    // Ceremony animations
    const ceremonyItems = document.querySelectorAll('.ceremony-item');
    ceremonyItems.forEach((el, index) => {
        // Ensure it has animate class to keep it visible
        if (!el.classList.contains('animate')) {
            el.classList.add('animate');
        }
        
        ceremonyObserver.observe(el);
        
        // Check if already in viewport on load and animate immediately
        setTimeout(() => {
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport) {
                setTimeout(() => {
                    el.classList.add('animate');
                }, index * 200);
            }
        }, 100);
    });
    
    // Artistic photos - smooth animations and clickable
    const artisticPhotos = document.querySelectorAll('.artistic-photo');
    
    // Animate photos with staggered effect
    function animateArtisticPhotos() {
        artisticPhotos.forEach((photo, index) => {
            photo.classList.remove('animate');
            // Trigger reflow
            void photo.offsetHeight;
            // Add animate class with staggered timing
            setTimeout(() => {
                photo.classList.add('animate');
            }, index * 300);
        });
    }
    
    const artisticPhotoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate when section comes into view
                animateArtisticPhotos();
            } else {
                // Fade out when leaving viewport
                artisticPhotos.forEach(photo => {
                    photo.classList.remove('animate');
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Check if artistic photos section is already in viewport on load
    setTimeout(() => {
        const artisticPhotosSection = document.querySelector('.artistic-photos-section');
        if (artisticPhotosSection) {
            const rect = artisticPhotosSection.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
            if (isInViewport) {
                animateArtisticPhotos();
            }
        }
    }, 400);
    
    // Observe the photos section
    const artisticPhotosSection = document.querySelector('.artistic-photos-section');
    if (artisticPhotosSection) {
        artisticPhotoObserver.observe(artisticPhotosSection);
    }
    
    // Make photos clickable to open in modal
    artisticPhotos.forEach(photo => {
        // Make photos clickable to open in modal
        photo.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && modal && modalImg && modalCaption) {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                modalCaption.textContent = '';
                
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// Navbar background on scroll - will be initialized in DOMContentLoaded
let navbar;

// Open modal when photo is clicked
document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.photo-caption');
            
            modal.style.display = 'flex';
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalCaption.textContent = caption ? caption.textContent : '';
            
            // Trigger animation
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        });
    });
});

// Close modal functions
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 400);
    }
}

// Close modal when clicking the X button
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside the image
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal with ESC key
if (modal) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Floating Photos Animation
const imagePhotos = [
    'photos/Image--8.jpeg',
    'photos/Image-1.jpeg',
    'photos/Image-10.jpeg',
    'photos/Image-11.jpeg',
    'photos/Image-12.jpeg',
    'photos/Image-13.jpeg',
    'photos/Image-14.jpeg',
    'photos/Image-15.jpeg',
    'photos/Image-16.jpeg',
    'photos/Image-17.jpeg',
    'photos/Image-18.jpeg',
    'photos/Image-19.jpeg',
    'photos/Image-2.jpeg',
    'photos/Image-3.jpeg',
    'photos/Image-4.jpeg',
    'photos/Image-5.jpeg',
    'photos/Image-6.jpeg',
    'photos/Image-7.jpeg',
    'photos/Image-9.jpeg'
];

let floatingPhotoElements = [];
let activePhotos = [];
let photoTimers = new Map(); // Track timers for each active photo
let sideCounter = { left: 0, right: 0 }; // Track which side to show next

function createFloatingPhotos() {
    const container = document.getElementById('floatingPhotos');
    if (!container) return;

    imagePhotos.forEach((photoSrc, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'floating-photo';
        photoDiv.dataset.photoSrc = photoSrc; // Store photo source
        
        const img = document.createElement('img');
        img.src = photoSrc;
        img.alt = 'Floating Memory';
        photoDiv.appendChild(img);
        
        // Make photos clickable to open in modal
        photoDiv.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = photoSrc;
            modalImg.alt = img.alt;
            modalCaption.textContent = '';
            
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        });
        
        container.appendChild(photoDiv);
        floatingPhotoElements.push(photoDiv);
    });
}

function showPhotoOnSide(side) {
    if (floatingPhotoElements.length === 0) return;
    
    // Check if mobile - on mobile, show photos randomly across the space
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, allow up to 4 photos total, randomly positioned
        if (activePhotos.length >= 4) return;
    } else {
        // On desktop, count photos on each side
        const photosOnSide = activePhotos.filter(p => 
            (side === 'left' && p.classList.contains('left')) ||
            (side === 'right' && p.classList.contains('right'))
        );
        // Allow up to 3 photos per side
        if (photosOnSide.length >= 3) return;
    }
    
    // Find a photo that's not currently visible
    const availablePhotos = floatingPhotoElements.filter(photo => !activePhotos.includes(photo));
    
    if (availablePhotos.length === 0) return;
    
    const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];
    showPhoto(randomPhoto, side);
}

function showPhoto(photo, side) {
    if (activePhotos.includes(photo)) return;
    
    // Check if mobile screen (width <= 768px)
    const isMobile = window.innerWidth <= 768;
    
    let leftPosition, topPosition;
    let attempts = 0;
    let validPosition = false;
    
    // On mobile, position randomly across the entire space (collage style)
    if (isMobile) {
        do {
            // Random horizontal position (10% to 90% to avoid edges)
            leftPosition = Math.random() * 80 + 10;
            // Random vertical position (10% to 80% to avoid bottom)
            topPosition = Math.random() * 70 + 10;
            
            // Check if this position overlaps with existing photos
            validPosition = !activePhotos.some(p => {
                const existingLeft = parseFloat(p.style.left);
                const existingTop = parseFloat(p.style.top);
                const distance = Math.sqrt(
                    Math.pow(existingLeft - leftPosition, 2) + 
                    Math.pow(existingTop - topPosition, 2)
                );
                return distance < 25; // At least 25% apart
            });
            
            attempts++;
        } while (!validPosition && attempts < 30);
        
        if (!validPosition) return; // Couldn't find a valid position
        
        photo.style.left = `${leftPosition}%`;
        photo.style.right = 'auto';
        photo.style.top = `${topPosition}%`;
        photo.classList.add('left', 'right', 'mobile-random');
    } else {
        // Desktop: Set position based on side
        if (side === 'left') {
            photo.style.left = '5%';
            photo.style.right = 'auto';
            photo.classList.add('left');
            photo.classList.remove('right');
        } else {
            photo.style.right = '5%';
            photo.style.left = 'auto';
            photo.classList.add('right');
            photo.classList.remove('left');
        }
        
        // Vertical position for desktop
        const photosToCheck = activePhotos.filter(p => 
            (side === 'left' && p.classList.contains('left')) ||
            (side === 'right' && p.classList.contains('right'))
        );
        
        do {
            topPosition = Math.random() * 70 + 5; // 5% to 75%
            attempts++;
        } while (attempts < 20 && photosToCheck.some(p => {
            const existingTop = parseFloat(p.style.top);
            return Math.abs(existingTop - topPosition) < 20;
        }));
        
        photo.style.top = `${topPosition}%`;
    }
    
    // Random rotation
    const rotation = (Math.random() - 0.5) * 20; // Increased rotation range
    photo.style.transform = isMobile ? 
        `scale(0) translateX(-50%) rotate(${rotation}deg)` : 
        `scale(0) rotate(${rotation}deg)`;
    
    activePhotos.push(photo);
    photo.classList.add('visible', 'floating');
    
    // Update transform with rotation
    setTimeout(() => {
        photo.style.transform = isMobile ? 
            `scale(1) translateX(-50%) rotate(${rotation}deg)` : 
            `scale(1) rotate(${rotation}deg)`;
    }, 10);
    
    // Set timer to hide this photo after 4 seconds and show a new one
    const timer = setTimeout(() => {
        hidePhoto(photo);
        // Show a new photo on the same side
        setTimeout(() => {
            showPhotoOnSide(side);
        }, 300); // Small delay for smooth transition
    }, 4000); // Changed to 4 seconds
    
    photoTimers.set(photo, timer);
}

function hidePhoto(photo) {
    const index = activePhotos.indexOf(photo);
    if (index > -1) {
        activePhotos.splice(index, 1);
    }
    
    // Clear timer if exists
    if (photoTimers.has(photo)) {
        clearTimeout(photoTimers.get(photo));
        photoTimers.delete(photo);
    }
    
    photo.classList.remove('visible', 'floating');
    
    setTimeout(() => {
        photo.style.transform = 'scale(0) rotate(0deg)';
    }, 10);
}

function startFloatingPhotoLoop() {
    // Initial delay
    setTimeout(() => {
        // Show initial photos on both sides
        showPhotoOnSide('left');
        showPhotoOnSide('left');
        showPhotoOnSide('right');
        showPhotoOnSide('right');
        
        // Continuously show new photos on both sides every 2 seconds
        // Left side - show a new photo every 2 seconds
        setInterval(() => {
            showPhotoOnSide('left');
        }, 2000);
        
        // Right side - show a new photo every 2 seconds (offset by 1s for variety)
        setTimeout(() => {
            setInterval(() => {
                showPhotoOnSide('right');
            }, 2000);
        }, 1000);
    }, 1000);
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinkItems = navLinksContainer.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinksContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Hero content animations
// Hero content observer - same pattern as ceremonies
const heroContentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animation for hero names and date (same as ceremonies)
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200); // 200ms delay between each element (same as ceremonies)
        } else {
            // Fade out when leaving center viewport
            entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Set up observer for hero content (names and date) - same as ceremonies
    const heroNames = document.querySelector('.hero-image-content .hero-names');
    const heroDate = document.querySelector('.hero-image-content .hero-date');
    
    if (heroNames) {
        heroContentObserver.observe(heroNames);
    }
    if (heroDate) {
        heroContentObserver.observe(heroDate);
    }
    
    // Initialize floating photos
    createFloatingPhotos();
    startFloatingPhotoLoop();
});

