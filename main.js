/* =========================================
   SITEMIZ — Main JavaScript
   ========================================= */

'use strict';

/* =========================================
   STATE
   ========================================= */
let currentLang    = 'en';
let counterFired   = false;

/* =========================================
   LOADER
   ========================================= */
(function initLoader() {
  const loader    = document.getElementById('loader');
  const loaderPct = document.getElementById('loaderPct');
  if (!loader) return;

  let pct = 0;

  const pctInterval = setInterval(() => {
    pct = Math.min(pct + Math.floor(Math.random() * 18 + 5), 99);
    loaderPct.textContent = pct + '%';
  }, 120);

  const finish = () => {
    clearInterval(pctInterval);
    loaderPct.textContent = '100%';
    setTimeout(() => loader.classList.add('hidden'), 400);
  };

  window.addEventListener('load', finish);
  setTimeout(finish, 2800); // fallback
})();

/* =========================================
   CUSTOM CURSOR
   ========================================= */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  const animateRing = () => {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  };
  animateRing();

  const hoverTargets = [
    'a', 'button',
    '.service-card', '.portfolio-item',
    '.team-card',    '.pricing-card',
    '.blog-card',    '.faq-item'
  ].join(', ');

  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '60px';
      ring.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '40px';
      ring.style.height = '40px';
    });
  });
})();

/* =========================================
   NAV — scroll shadow & active link
   ========================================= */
(function initNav() {
  const nav      = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-links a');

  /* sticky shadow */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('scrollTop')
      ?.classList.toggle('show', window.scrollY > 500);
  });

  /* active highlight */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--gold)';
        }
      });
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s));
})();

/* =========================================
   SCROLL REVEAL
   ========================================= */
(function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((r) => io.observe(r));
})();

/* =========================================
   COUNTER ANIMATION
   ========================================= */
function animateCounters() {
  document.querySelectorAll('.stat-big-num[data-target]').forEach((el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current    = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, step);
  });
}

(function initCounters() {
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !counterFired) {
        counterFired = true;
        animateCounters();
      }
    });
  }, { threshold: 0.4 }).observe(statsSection);
})();

/* =========================================
   PORTFOLIO FILTER
   ========================================= */
function filterPortfolio(btn, cat) {
  /* update active button */
  document.querySelectorAll('.pf-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  const grid  = document.getElementById('portfolioGrid');
  const items = grid.querySelectorAll('.portfolio-item');

  /* reset or remove hero span */
  if (cat === 'all') {
    items[0].style.gridRow   = 'span 2';
    items[0].style.minHeight = '760px';
  } else {
    items.forEach((i) => {
      i.style.gridRow   = '';
      i.style.minHeight = '380px';
    });
  }

  items.forEach((item) => {
    const match = cat === 'all' || item.dataset.category === cat;
    item.classList.toggle('p-hidden', !match);
  });
}

/* =========================================
   FAQ ACCORDION
   ========================================= */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');

  /* close all */
  document.querySelectorAll('.faq-item.open').forEach((i) => {
    i.classList.remove('open');
  });

  /* open clicked if it was closed */
  if (!isOpen) {
    item.classList.add('open');
    /* swap text for current lang */
    const answer = item.querySelector('.faq-a');
    const text   = answer.getAttribute('data-' + currentLang);
    if (text) answer.textContent = text;
  }
}

/* =========================================
   FORM — chip toggle
   ========================================= */
function toggleChip(el) {
  el.classList.toggle('selected');
}

/* =========================================
   FORM — validation & submit
   ========================================= */
function submitForm() {
  const lang    = currentLang;
  const nameVal = document.getElementById('fName').value.trim();
  const emailVal= document.getElementById('fEmail').value.trim();
  const msgVal  = document.getElementById('fMessage').value.trim();

  const errName  = document.getElementById('errName');
  const errEmail = document.getElementById('errEmail');
  const errMsg   = document.getElementById('errMsg');
  const nameEl   = document.getElementById('fName');
  const emailEl  = document.getElementById('fEmail');
  const msgEl    = document.getElementById('fMessage');

  /* reset */
  [errName, errEmail, errMsg].forEach((e) => (e.textContent = ''));
  [nameEl, emailEl, msgEl].forEach((i) => i.classList.remove('error'));

  let valid = true;

  if (!nameVal) {
    errName.textContent = lang === 'fa' ? 'نام الزامی است.' : 'Name is required.';
    nameEl.classList.add('error');
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    errEmail.textContent = lang === 'fa' ? 'ایمیل معتبر وارد کنید.' : 'Enter a valid email address.';
    emailEl.classList.add('error');
    valid = false;
  }

  if (!msgVal || msgVal.length < 10) {
    errMsg.textContent = lang === 'fa'
      ? 'پیام باید حداقل ۱۰ کاراکتر باشد.'
      : 'Message must be at least 10 characters.';
    msgEl.classList.add('error');
    valid = false;
  }

  if (!valid) return;

  /* simulate send */
  const btn     = document.querySelector('.form-submit');
  const btnSpan = btn.querySelector('span');
  btn.classList.add('loading');
  btnSpan.textContent = lang === 'fa' ? 'در حال ارسال...' : 'Sending...';

  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    const success = document.getElementById('formSuccess');
    success.style.display = 'flex';
    success.querySelector('.form-success-title').textContent =
      lang === 'fa' ? 'پیام ارسال شد!' : 'Message Sent!';
    success.querySelector('p').textContent =
      lang === 'fa'
        ? 'ظرف ۲۴ ساعت با شما در تماس خواهیم بود.'
        : "We'll be in touch within 24 hours.";
  }, 1800);
}

/* =========================================
   LANGUAGE SWITCH
   ========================================= */
function setLang(lang) {
  currentLang = lang;

  const body = document.body;
  const html = document.documentElement;

  if (lang === 'fa') {
    body.classList.add('fa');
    html.setAttribute('lang', 'fa');
    html.setAttribute('dir', 'rtl');
  } else {
    body.classList.remove('fa');
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
  }

  /* swap all data-en / data-fa text nodes */
  document.querySelectorAll('[data-en]').forEach((el) => {
    el.textContent = el.getAttribute('data-' + lang) || el.textContent;
  });

  /* active button */
  document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`)
    ?.classList.add('active');

  /* portfolio arrows */
  document.querySelectorAll('.portfolio-arrow').forEach((a) => {
    a.textContent = lang === 'fa' ? '←' : '→';
  });

  /* select options */
  document.querySelectorAll('select option[data-en]').forEach((opt) => {
    opt.textContent = opt.getAttribute('data-' + lang) || opt.textContent;
  });

  /* filter buttons */
  document.querySelectorAll('.pf-btn[data-en]').forEach((btn) => {
    btn.textContent = btn.getAttribute('data-' + lang);
  });

  /* re-render open FAQ answer in new lang */
  document.querySelectorAll('.faq-item.open .faq-a').forEach((a) => {
    const text = a.getAttribute('data-' + lang);
    if (text) a.textContent = text;
  });
}
