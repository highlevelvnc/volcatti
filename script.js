/* ============================================================
   VOLCATTI · Premium Site Interactions
   ============================================================ */

(() => {
  'use strict';

  /* ───────── Loading curtain ───────── */
  const curtain = document.getElementById('curtain');
  if (curtain) {
    const dismiss = () => {
      curtain.classList.add('is-done');
      setTimeout(() => curtain.remove(), 1800);
    };
    if (document.readyState === 'complete') {
      setTimeout(dismiss, 400);
    } else {
      window.addEventListener('load', () => setTimeout(dismiss, 400), { once: true });
    }
  }

  /* ───────── Scroll progress ───────── */
  const progress = document.getElementById('scrollProgress');

  /* ───────── Header scroll state ───────── */
  const header = document.getElementById('siteHeader');
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header.dataset.state = y > 60 ? 'scrolled' : 'top';

        // Scroll progress bar
        if (progress) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const p = max > 0 ? (y / max) * 100 : 0;
          progress.style.setProperty('--p', p.toFixed(2) + '%');
        }

        // Parallax on data-parallax elements — anchored to scroll progress through viewport
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          const rect = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (!inView) return;
          // progress = -1 (just entered from below) → 0 (centered) → 1 (just leaving top)
          const elCenter = rect.top + rect.height / 2;
          const denom = window.innerHeight / 2 + rect.height / 2;
          const progress = (elCenter - window.innerHeight / 2) / denom;
          const offset = -progress * rect.height * speed;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ───────── Mobile menu ───────── */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ───────── Reveal on scroll ───────── */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-line, .reveal-stagger, .timeline, .feature--electric'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ───────── Smooth scroll for anchor links ───────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ───────── Gallery filter ───────── */
  const filters = document.querySelectorAll('.filter');
  const gItems = document.querySelectorAll('.g-item');

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;

      gItems.forEach((item) => {
        const cat = item.dataset.cat;
        const show = filter === 'all' || cat === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ───────── Counter animation for stats ───────── */
  const stats = document.querySelectorAll('.authority__stats .num');
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const fullText = el.textContent;
          const match = fullText.match(/^(\d+)/);
          if (match) {
            const target = parseInt(match[1], 10);
            const suffix = el.querySelector('.num-suf');
            const sufText = suffix ? suffix.outerHTML : '';
            let cur = 0;
            const duration = 1600;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              cur = Math.floor(eased * target);
              el.innerHTML = cur + sufText;
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach((s) => statObserver.observe(s));

  /* ───────── Year ───────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ───────── Active nav link on scroll ───────── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav a[data-link]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              'is-current',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((s) => navObserver.observe(s));
})();
