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

// Ceremony observer with more lenient options
const ceremonyObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -5% 0px' // More lenient - trigger when 95% visible from top
};

const ceremonyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Get the index of this element among all ceremony items
            const ceremonyItems = document.querySelectorAll('.ceremony-item');
            const index = Array.from(ceremonyItems).indexOf(entry.target);
            // Stagger the animation for each ceremony item
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200); // 200ms delay between each ceremony
        } else {
            // Fade out when leaving viewport
            entry.target.classList.remove('animate');
        }
    });
}, ceremonyObserverOptions);

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
        
        // Check if already in viewport on load and animate immediately
        requestAnimationFrame(() => {
            const rect = loveStoryText.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
            if (isInViewport) {
                loveStoryText.classList.add('animate');
            }
        });
    }
    
    // Ceremony animations
    const ceremonyItems = document.querySelectorAll('.ceremony-item');
    if (ceremonyItems.length > 0) {
        ceremonyItems.forEach((el, index) => {
            ceremonyObserver.observe(el);
            
            // Check if already in viewport on load and animate immediately
            setTimeout(() => {
                const rect = el.getBoundingClientRect();
                const isInViewport = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
                if (isInViewport && !el.classList.contains('animate')) {
                    setTimeout(() => {
                        el.classList.add('animate');
                    }, index * 200);
                }
            }, 300);
        });
    }
    
    // Artistic photos - unique gallery layout
    const artisticPhotoMain = document.querySelectorAll('.artistic-photo-main');
    const artisticPhotosSmall = document.querySelectorAll('.artistic-photo-small');
    const artisticDecorativeLeaf = document.querySelectorAll('.artistic-decorative-leaf');
    const allArtisticPhotos = [...Array.from(artisticPhotoMain), ...Array.from(artisticPhotosSmall)].filter(Boolean);
    
    // Animate photos with staggered effect
    function animateArtisticPhotos() {
        // Animate decorative leaves first
        artisticDecorativeLeaf.forEach((leaf, index) => {
            if (leaf) {
                leaf.classList.remove('animate');
                void leaf.offsetHeight;
                setTimeout(() => {
                    leaf.classList.add('animate');
                }, 100 + (index * 200));
            }
        });
        
        // Animate main photos second
        artisticPhotoMain.forEach((photo, index) => {
            if (photo) {
                photo.classList.remove('animate');
                void photo.offsetHeight;
                setTimeout(() => {
                    photo.classList.add('animate');
                }, 300 + (index * 200));
            }
        });
        
        // Then animate small photos with staggered timing
        artisticPhotosSmall.forEach((photo, index) => {
            photo.classList.remove('animate');
            void photo.offsetHeight;
            setTimeout(() => {
                photo.classList.add('animate');
            }, 600 + (index * 150));
        });
    }
    
    const artisticPhotoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate when section comes into view
                animateArtisticPhotos();
            } else {
                // Fade out when leaving viewport
                artisticDecorativeLeaf.forEach(leaf => {
                    if (leaf) leaf.classList.remove('animate');
                });
                allArtisticPhotos.forEach(photo => {
                    if (photo) photo.classList.remove('animate');
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
    if (modal && modalImg && modalCaption) {
        allArtisticPhotos.forEach(photo => {
            if (photo) {
                photo.addEventListener('click', function() {
                    const img = this.querySelector('img');
                    if (img && modal && modalImg && modalCaption) {
                        modalImg.src = img.src;
                        modalImg.alt = img.alt;
                        modalCaption.textContent = '';
                        modal.style.display = 'flex';
                        
                        // Force reflow to ensure display is applied before adding active class
                        void modal.offsetHeight;
                        
                        setTimeout(() => {
                            modal.classList.add('active');
                        }, 10);
                        
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
    }
    
    // Close modal functions
    function closeModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!modal) {
            console.error('Modal element not found!');
            return;
        }
        
        console.log('Closing modal...'); // Debug log
        
        // Remove active class immediately
        modal.classList.remove('active');
        
        // Hide modal and restore scroll after transition
        setTimeout(() => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                // Reset modal image source to prevent showing old image briefly
                if (modalImg) {
                    modalImg.src = '';
                }
                console.log('Modal closed'); // Debug log
            }
        }, 400);
    }
    
    // Close modal when clicking the X button - use multiple methods to ensure it works
    if (closeBtn) {
        console.log('Close button found, attaching handlers'); // Debug log
        
        // Method 1: Direct onclick
        closeBtn.onclick = function(e) {
            console.log('Close button clicked (onclick)'); // Debug log
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            closeModal(e);
            return false;
        };
        
        // Method 2: addEventListener as backup
        closeBtn.addEventListener('click', function(e) {
            console.log('Close button clicked (addEventListener)'); // Debug log
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            closeModal(e);
            return false;
        }, true); // Use capture phase
        
        // Method 3: mousedown as additional backup
        closeBtn.addEventListener('mousedown', function(e) {
            console.log('Close button mousedown'); // Debug log
            e.preventDefault();
            e.stopPropagation();
            closeModal(e);
            return false;
        });
        
        // Test if button is clickable
        closeBtn.style.pointerEvents = 'auto';
        closeBtn.style.cursor = 'pointer';
    } else {
        console.error('Close button element not found! Modal:', modal);
    }
    
    // Close modal when clicking outside the image (on the dark background)
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Only close if clicking directly on the modal background, not on children
            // Check if the click target is the modal itself or the backdrop
            if (e.target === modal || (e.target.classList && e.target.classList.contains('photo-modal'))) {
                // Make sure we're not clicking on the close button or its children
                if (!e.target.closest('.modal-close')) {
                    closeModal(e);
                }
            }
        });
    }
    
    // Prevent modal content from closing the modal when clicked
    if (modalImg) {
        modalImg.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    if (modalCaption) {
        modalCaption.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal(e);
        }
    });
});

// Navbar background on scroll - will be initialized in DOMContentLoaded
let navbar;

// Open modal when photo is clicked - moved inside main DOMContentLoaded


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
            if (modal && modalImg && modalCaption) {
                modalImg.src = photoSrc;
                modalImg.alt = img.alt;
                modalCaption.textContent = '';
                modal.style.display = 'flex';
                
                // Force reflow to ensure display is applied before adding active class
                void modal.offsetHeight;
                
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                document.body.style.overflow = 'hidden';
            }
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
    
    // Background Music Control
    const backgroundMusic = document.getElementById('background-music');
    const musicControlBtn = document.getElementById('music-control');
    let isPlaying = false;
    let musicStarted = false;
    
    // Function to start music
    function startMusic() {
        if (backgroundMusic && musicControlBtn && !musicStarted) {
            // Ensure audio is loaded
            if (backgroundMusic.readyState < 2) {
                backgroundMusic.load();
            }
            
            backgroundMusic.volume = 0.5; // Set volume to 50%
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isPlaying = true;
                    musicStarted = true;
                    musicControlBtn.classList.add('playing');
                    console.log('Music started successfully');
                }).catch(error => {
                    console.log('Play failed:', error);
                    isPlaying = false;
                });
            }
        }
    }
    
    // Start music when user starts scrolling
    if (backgroundMusic) {
        const scrollHandler = () => {
            if (!musicStarted && backgroundMusic && backgroundMusic.paused) {
                startMusic();
            }
        };
        
        // Listen for scroll events - start music on first scroll
        window.addEventListener('scroll', scrollHandler, { once: true, passive: true });
        
        // Also try to start on other user interactions as backup
        const interactionHandler = () => {
            if (!musicStarted && backgroundMusic && backgroundMusic.paused) {
                startMusic();
            }
        };
        
        document.addEventListener('click', interactionHandler, { once: true });
        document.addEventListener('touchstart', interactionHandler, { once: true });
    }
    
    // Toggle play/pause on button click
    if (musicControlBtn) {
        musicControlBtn.addEventListener('click', () => {
            if (backgroundMusic) {
                if (isPlaying) {
                    backgroundMusic.pause();
                    isPlaying = false;
                    musicControlBtn.classList.remove('playing');
                } else {
                    backgroundMusic.play().then(() => {
                        isPlaying = true;
                        musicControlBtn.classList.add('playing');
                    }).catch(error => {
                        console.log('Play failed:', error);
                    });
                }
            }
        });
    }
    
    // Update button state when music ends or is paused by browser
    if (backgroundMusic) {
        backgroundMusic.addEventListener('pause', () => {
            isPlaying = false;
            if (musicControlBtn) {
                musicControlBtn.classList.remove('playing');
            }
        });
        
        backgroundMusic.addEventListener('play', () => {
            isPlaying = true;
            if (musicControlBtn) {
                musicControlBtn.classList.add('playing');
            }
        });
    }
    
    // Stop music when page becomes hidden (minimized, tab switched, etc.)
    document.addEventListener('visibilitychange', () => {
        if (backgroundMusic && document.hidden) {
            backgroundMusic.pause();
            isPlaying = false;
            if (musicControlBtn) {
                musicControlBtn.classList.remove('playing');
            }
        }
    });
    
    // Stop music when window loses focus (minimized)
    window.addEventListener('blur', () => {
        if (backgroundMusic && isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
            if (musicControlBtn) {
                musicControlBtn.classList.remove('playing');
            }
        }
    });
    
    // Stop music when page is being closed
    window.addEventListener('beforeunload', () => {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    });
    
    // Stop music when page is unloaded
    window.addEventListener('pagehide', () => {
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    });
    
    // Wishes Section Functionality
    initializeWishes();
});

// Wishes Section Functionality
function initializeWishes() {
    const wishButton = document.getElementById('wishButton');
    const wishModal = document.getElementById('wishModal');
    const wishModalClose = document.querySelector('.wish-modal-close');
    const wishForm = document.getElementById('wishForm');
    const wishesSlideshow = document.getElementById('wishesSlideshow');
    const wishPrev = document.getElementById('wishPrev');
    const wishNext = document.getElementById('wishNext');
    const wishIndicators = document.getElementById('wishIndicators');
    
    // Load wishes from localStorage
    let wishes = JSON.parse(localStorage.getItem('weddingWishes')) || [];
    let currentWishIndex = 0;
    let wishInterval = null;
    
    // Initialize wishes display
    function loadWishes() {
        if (wishes.length === 0) {
            // Show default sample wish if no wishes exist
            wishes = [{
                name: 'Sample Wish',
                message: 'May your love story be as beautiful as your wedding day. Wishing you both a lifetime of happiness and joy together. ❤️',
                date: new Date().toISOString()
            }];
        }
        renderWishes();
        updateIndicators();
        startSlideshow();
    }
    
    // Render wishes in slideshow
    function renderWishes() {
        wishesSlideshow.innerHTML = '';
        wishes.forEach((wish, index) => {
            const slide = document.createElement('div');
            slide.className = `wish-slide ${index === currentWishIndex ? 'active' : ''}`;
            slide.innerHTML = `
                <div class="wish-card">
                    <p class="wish-message">${escapeHtml(wish.message)}</p>
                    <p class="wish-author">— ${escapeHtml(wish.name)}</p>
                </div>
            `;
            wishesSlideshow.appendChild(slide);
        });
    }
    
    // Update indicators
    function updateIndicators() {
        wishIndicators.innerHTML = '';
        wishes.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `wish-indicator ${index === currentWishIndex ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToWish(index));
            wishIndicators.appendChild(indicator);
        });
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Show specific wish
    function showWish(index) {
        if (index < 0) index = wishes.length - 1;
        if (index >= wishes.length) index = 0;
        
        currentWishIndex = index;
        
        const slides = document.querySelectorAll('.wish-slide');
        const indicators = document.querySelectorAll('.wish-indicator');
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        resetSlideshow();
    }
    
    // Navigate to next wish
    function nextWish() {
        showWish(currentWishIndex + 1);
    }
    
    // Navigate to previous wish
    function prevWish() {
        showWish(currentWishIndex - 1);
    }
    
    // Go to specific wish
    function goToWish(index) {
        showWish(index);
    }
    
    // Start automatic slideshow
    function startSlideshow() {
        if (wishInterval) clearInterval(wishInterval);
        if (wishes.length <= 1) return;
        
        wishInterval = setInterval(() => {
            nextWish();
        }, 5000); // Change wish every 5 seconds
    }
    
    // Reset slideshow timer
    function resetSlideshow() {
        startSlideshow();
    }
    
    // Open wish modal
    function openWishModal() {
        wishModal.style.display = 'flex';
        void wishModal.offsetHeight; // Force reflow
        setTimeout(() => {
            wishModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
    
    // Close wish modal
    function closeWishModal() {
        wishModal.classList.remove('active');
        setTimeout(() => {
            wishModal.style.display = 'none';
            document.body.style.overflow = '';
            wishForm.reset();
        }, 400);
    }
    
    // Handle form submission
    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('wishName').value.trim();
            const message = document.getElementById('wishMessage').value.trim();
            
            if (!name || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Add new wish
            const newWish = {
                name: name,
                message: message,
                date: new Date().toISOString()
            };
            
            // Remove sample wish if it exists and this is the first real wish
            if (wishes.length === 1 && wishes[0].name === 'Sample Wish') {
                wishes = [];
            }
            
            wishes.push(newWish);
            localStorage.setItem('weddingWishes', JSON.stringify(wishes));
            
            // Update display
            currentWishIndex = wishes.length - 1;
            renderWishes();
            updateIndicators();
            showWish(currentWishIndex);
            
            // Close modal and show success message
            closeWishModal();
            
            // Show thank you message
            const thankYouMsg = document.createElement('div');
            thankYouMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(107, 68, 35, 0.95);
                color: #FFFEF0;
                padding: 2rem 3rem;
                border-radius: 15px;
                font-family: 'Cormorant Garamond', serif;
                font-size: 1.3rem;
                z-index: 4000;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                text-align: center;
            `;
            thankYouMsg.innerHTML = 'Thank you for your beautiful wish! ❦';
            document.body.appendChild(thankYouMsg);
            
            setTimeout(() => {
                thankYouMsg.style.opacity = '0';
                thankYouMsg.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(thankYouMsg);
                }, 500);
            }, 2000);
        });
    }
    
    // Event listeners
    if (wishButton) {
        wishButton.addEventListener('click', openWishModal);
    }
    
    if (wishModalClose) {
        wishModalClose.addEventListener('click', closeWishModal);
    }
    
    if (wishModal) {
        wishModal.addEventListener('click', (e) => {
            if (e.target === wishModal) {
                closeWishModal();
            }
        });
    }
    
    if (wishPrev) {
        wishPrev.addEventListener('click', () => {
            prevWish();
        });
    }
    
    if (wishNext) {
        wishNext.addEventListener('click', () => {
            nextWish();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (wishModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeWishModal();
            }
        } else {
            // Only allow arrow navigation when modal is not open
            if (e.key === 'ArrowLeft') {
                prevWish();
            } else if (e.key === 'ArrowRight') {
                nextWish();
            }
        }
    });
    
    // Pause slideshow on hover
    const slideshowContainer = document.querySelector('.wishes-slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            if (wishInterval) clearInterval(wishInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
    
    // Initialize on load
    loadWishes();
}

