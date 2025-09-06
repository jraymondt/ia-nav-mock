
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.getElementById('menuOverlay');
  const navLinkButtons = Array.from(document.querySelectorAll('.nav-link[data-section]'));

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
    // move focus to first link for keyboard users
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

  // Close when clicking overlay
  overlay && overlay.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) closeMenu();
  });

  // Close nav when a nav link is clicked, and switch sections (if present)
  navLinkButtons.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.section;
      if (targetId) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(targetId);
        target && target.classList.add('active');
      }
      document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
      link.classList.add('active');
      closeMenu();
    });
  });
});


