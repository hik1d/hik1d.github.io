// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

function closeMobileNav() {
  navLinksEl.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-lock');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('nav-lock', isOpen);
});

navLinksEl.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

// Tap-to-expand coursework (touch-friendly alternative to hover)
document.querySelectorAll('.edu-courses-hint').forEach((btn) => {
  btn.addEventListener('click', () => {
    const content = btn.closest('.timeline-content');
    const isOpen = content.classList.toggle('courses-open');
    btn.textContent = isOpen ? 'Hide coursework ▴' : 'Tap to view coursework ▾';
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));

// Project media lightbox
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(type, src) {
  lightboxContent.innerHTML =
    type === 'video'
      ? `<video src="${src}" controls autoplay></video>`
      : `<img src="${src}" alt="" />`;
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxContent.innerHTML = '';
}

document.querySelectorAll('.media-thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    openLightbox(thumb.dataset.type, thumb.dataset.src);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
