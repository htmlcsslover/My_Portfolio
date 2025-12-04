// script.js (FINAL CONSOLIDATED VERSION)

// =========================================================================
// GLOBAL ELEMENT SELECTIONS 
// =========================================================================
// Desktop theme button selection (ID="themeToggleBtn")
const themeToggleBtnDesktop = document.querySelector('#themeToggleBtn');
// Mobile theme button selection (NEW ID="themeToggleBtnMobile")
const themeToggleBtnMobile = document.querySelector('#themeToggleBtnMobile'); 
const body = document.body;

// Get icons from both buttons to update them simultaneously
const toggleIconDesktop = themeToggleBtnDesktop ? themeToggleBtnDesktop.querySelector('i') : null;
const toggleIconMobile = themeToggleBtnMobile ? themeToggleBtnMobile.querySelector('i') : null; 

// Other elements
const contactForm = document.querySelector('#contactForm');
const msgBox = document.querySelector('#msgBox');
const counterSpan = document.querySelector('#counter');
const mobileMenuBtn = document.querySelector('#menu-btn');
const mobileMenu = document.querySelector('#mobile-menu');

// Image Swap Selectors
const darkImage = document.querySelector('#darkImage');
const lightImage = document.querySelector('#lightImage');

const MAX_CHARS = msgBox ? parseInt(msgBox.getAttribute('maxlength')) : 200;


// =========================================================================
// EXTRA FEATURE: Profile Image Swap
// =========================================================================

/**
 * Toggles the visibility/opacity of the profile images based on the theme mode.
 * @param {boolean} isLightMode - True if light mode is active.
 */
function toggleProfileImage(isLightMode) {
    if (!darkImage || !lightImage) return;

    if (isLightMode) {
        // Light Mode is ON: Show light image, hide dark image
        lightImage.classList.remove('opacity-0');
        darkImage.classList.add('opacity-0');
    } else {
        // Dark Mode is ON: Show dark image, hide light image
        darkImage.classList.remove('opacity-0');
        lightImage.classList.add('opacity-0');
    }
}


// =========================================================================
// TASK A: Change Theme (Dark/Light Mode) & Icon Sync
// =========================================================================

/**
 * Syncs the icon class (sun/moon) across both mobile and desktop buttons.
 * @param {boolean} isLightMode 
 */
function syncToggleIcons(isLightMode) {
    const iconClass = isLightMode 
        ? 'fa-solid fa-moon text-black text-3xl' // Switch to Dark Mode signal
        : 'fa-solid fa-sun text-white text-3xl'; // Switch to Light Mode signal

    if (toggleIconDesktop) {
        toggleIconDesktop.className = iconClass;
    }
    if (toggleIconMobile) {
        toggleIconMobile.className = iconClass;
    }
}


function setInitialMode() {
    if (!body) return;
    const savedMode = localStorage.getItem('theme');
    
    const isSystemLight = body.classList.contains('bg-[#f0f2f5]'); 
    const isLight = (savedMode === 'light' || (!savedMode && isSystemLight));

    if (isLight) {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }

    // Initialize the correct icon and image
    syncToggleIcons(isLight);
    toggleProfileImage(isLight); 
}

function toggleMode() {
    if (!body) return;
    
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');

    if (isLightMode) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    
    // Update theme visuals
    syncToggleIcons(isLightMode);
    toggleProfileImage(isLightMode);

    if (typeof updateCharCounter === 'function') {
        updateCharCounter();
    }
}

// Attach listener to BOTH theme toggle buttons
if (themeToggleBtnDesktop) {
    themeToggleBtnDesktop.addEventListener('click', toggleMode);
}
if (themeToggleBtnMobile) {
    themeToggleBtnMobile.addEventListener('click', toggleMode);
}


// =========================================================================
// Task D/E: Character Counter (Stub)
// =========================================================================
function updateCharCounter() { 
    if (!msgBox || !counterSpan) return;
    const max = isNaN(MAX_CHARS) ? 200 : MAX_CHARS; 
    const currentLength = msgBox.value.length;
    counterSpan.textContent = max - currentLength;
    if (max - currentLength <= 10) {
        counterSpan.style.color = 'red';
    } else {
        counterSpan.style.color = 'inherit'; 
    }
}

// =========================================================================
// Mobile Menu Toggle (Your original code)
// =========================================================================

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains("show")) {
            mobileMenu.classList.remove("show");
            setTimeout(() => {
                mobileMenu.classList.remove("flex");
            }, 300);
        } else {
            mobileMenu.classList.add("flex");
            setTimeout(() => {
                mobileMenu.classList.add("show");
            }, 10);
        }
        mobileMenuBtn.classList.toggle("active");
    });
    
    // Global click listener to close menu 
    document.addEventListener("click", (e) => {
        if (
            mobileMenu && mobileMenu.classList.contains("show") &&
            !mobileMenu.contains(e.target) &&
            e.target !== mobileMenuBtn
        ) {
            mobileMenu.classList.remove("show");
            setTimeout(() => {
                mobileMenu.classList.remove("flex");
            }, 300); 
            mobileMenuBtn.classList.remove("active");
        }
    });

    // Close menu when clicking on a link
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("show");
            setTimeout(() => {
                mobileMenu.classList.remove("flex");
            }, 300);
            mobileMenuBtn.classList.remove("active");
        });
    });
}


// =========================================================================
// Skills Carousel Slider (Your original code)
// =========================================================================
const slider = document.getElementById("slider");
let position = 0;
let animationId;
let isPaused = false;
let firstSetWidth = 0;

// Calculate width after page loads
window.addEventListener("load", () => {
    const icons = slider ? slider.children : [];
    firstSetWidth = Array.from(icons)
        .slice(0, 6)
        .reduce((total, icon) => {
            const gap = slider ? parseFloat(getComputedStyle(slider).gap) : 0;
            return (
                total + icon.offsetWidth + gap
            );
        }, 0);
});

function animate() {
    if (!isPaused && firstSetWidth > 0 && slider) {
        position -= 0.3; // Speed of scroll

        // Reset position smoothly when first set is scrolled out
        if (Math.abs(position) >= firstSetWidth) {
            position = position + firstSetWidth;
        }

        slider.style.transform = `translateX(${position}px)`;
    }
    animationId = requestAnimationFrame(animate);
}

// Start animation only if slider exists
if (slider) {
    animate();
    
    // Pause on hover
    slider.addEventListener("mouseenter", () => {
        isPaused = true;
    });

    slider.addEventListener("mouseleave", () => {
        isPaused = false;
    });
}

// Remove cursor after typewriter animation completes
setTimeout(() => {
    const typewriterElement = document.querySelector(".animate-typewriter");
    if (typewriterElement) {
        typewriterElement.classList.add("finished");
    }
}, 2000); // Match the animation duration


// =========================================================================
// INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    setInitialMode();
    if (msgBox) updateCharCounter();
});