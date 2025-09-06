// Navigation link click handler
    function handleNavClick(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        if (!sectionId) return;

        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));

        // Show the selected section
        const target = document.getElementById(sectionId);
        if (target) target.classList.add('active');

        // Update active link in both navs
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.nav-link[data-section="' + sectionId + '"]').forEach(link => link.classList.add('active'));

        // Close hamburger menu if open
        overlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    }

    // Attach click events to all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });


//hamburg  
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.getElementById('menuOverlay');

function openMenu() {
  navLinks.classList.add('active');
  overlay.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Hamburger click
hamburger.addEventListener('click', openMenu);

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    closeMenu();
  }
});

