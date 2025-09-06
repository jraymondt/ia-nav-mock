document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.getElementById('menuOverlay');
  
  // Fix: More inclusive selector to get ALL navigation links including the logo
  const allNavLinks = Array.from(document.querySelectorAll('a[data-section]'));

  if (!hamburger || !navLinks) return;

  const setAria = (open) => {
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    navLinks.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  const openMenu = () => {
    navLinks.classList.add('active');
    hamburger.classList.add('active');
    overlay && overlay.classList.add('active');
    setAria(true);
    const first = navLinks.querySelector('a');
    first && first.focus();
  };

  const closeMenu = () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    overlay && overlay.classList.remove('active');
    setAria(false);
    hamburger.focus();
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.contains('active') ? closeMenu() : openMenu();
  });

  overlay && overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
  });

  // Content switching function (extracted for clarity)
  const switchContent = (targetId) => {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
    
    // Update active link states
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === targetId) {
        link.classList.add('active');
      }
    });
  };

  // Add click handlers to ALL navigation links
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.section;
      if (targetId) {
        switchContent(targetId);
        if (window.innerWidth <= 768) {
          closeMenu(); // Only close menu if in mobile view
        }
      }
    });
  });
});
// Optional: Add functionality to toggle between hamburger and sidebar navigation
// Navigation Style Toggle
const navToggle = document.getElementById('navToggle');
const body = document.body;
let isSidebarMode = false;

if (navToggle) {
    navToggle.addEventListener('click', () => {
        isSidebarMode = !isSidebarMode;

        if (isSidebarMode) {
            body.classList.add('sidebar-nav');
            navToggle.innerHTML = '<span class="toggle-icon">←</span> Switch to Top Nav';

            // Update hamburger behavior for mobile sidebar
            if (window.innerWidth <= 768) {
                const navbar = document.querySelector('.navbar');
                hamburger.addEventListener('click', () => {
                    navbar.classList.toggle('mobile-open');
                });
            }
        } else {
            body.classList.remove('sidebar-nav');
            navToggle.innerHTML = '<span class="toggle-icon">☰</span> Switch to Sidebar';

            // Reset mobile navbar state
            const navbar = document.querySelector('.navbar');
            navbar.classList.remove('mobile-open');
        }
    });
}

// Handle window resize to manage mobile sidebar behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isSidebarMode) {
        const navbar = document.querySelector('.navbar');
        navbar.classList.remove('mobile-open');
    }
});
