document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const backBtn = document.getElementById('backToTop');
    if (window.scrollY > 700) backBtn.classList.add('show');
    else backBtn.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal (generic) + Wall signature animation ---------- */
  const revealTargets = document.querySelectorAll(
    '.product-card, .feature-card, .process-step, .about-copy, .coverage-copy, .coverage-map, .contact-info, .contact-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const wallStage = document.getElementById('wallStage');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(el => io.observe(el));
  if (wallStage) io.observe(wallStage);

  /* ---------- Process video play/pause toggle ---------- */
  const processVideo = document.getElementById('processVideo');
  const videoToggle = document.getElementById('videoToggle');
  if (processVideo && videoToggle) {
    videoToggle.addEventListener('click', () => {
      if (processVideo.paused) {
        processVideo.play();
        videoToggle.textContent = '❚❚';
      } else {
        processVideo.pause();
        videoToggle.textContent = '▶';
      }
    });
  }

  /* ---------- Contact form -> WhatsApp handoff ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const phone = contactForm.phone.value.trim();
      const message = contactForm.message.value.trim();

      const text = `Hi Mahadev ACC Blocks, I'm ${name} (${phone}). ${message}`;
      const url = `https://wa.me/919023587092?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener');
    });
  }

});
