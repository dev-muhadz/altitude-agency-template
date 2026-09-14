/* ========================================================================== 
   ALTITUDE — Digital Agency & Corporate Template
   Core JavaScript (Vanilla ES6+, no dependencies)
   --------------------------------------------------------------------------
   Shared by all pages. Every feature checks for its DOM hooks before running.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const mobileUxStyles = document.createElement('link');
  mobileUxStyles.rel = 'stylesheet';
  mobileUxStyles.href = 'css/mobile-ux.css';
  document.head.appendChild(mobileUxStyles);

  initMobileNav();
  initScrollReveal();
  initStatsCounters();
  initProcessTabs();
  initComparisonToggle();
  initModals();
  initTestimonialSlider();
  initContactForm();
  initHeaderScrollState();
});

/* ========================================================================== 
   1. UTILITIES
   ========================================================================== */
function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function debounce(fn, wait = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/* ========================================================================== 
   2. MOBILE NAVIGATION
   --------------------------------------------------------------------------
   Keeps keyboard focus inside the open mobile menu, moves focus into the
   menu when opened, restores focus to the toggle on close, and closes on
   Escape, link activation, or tapping outside the drawer.
   ========================================================================== */
function initMobileNav() {
  const toggle = qs('.nav-toggle');
  const nav = qs('#primary-nav');
  if (!toggle || !nav) return;

  const getLinks = () => qsa('a', nav);

  const closeNav = (restoreFocus = false) => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('modal-open');
    if (restoreFocus) toggle.focus();
  };

  const openNav = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open');

    const firstLink = getLinks()[0];
    firstLink?.focus({ preventScroll: true });
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeNav(true) : openNav();
  });

  getLinks().forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    closeNav(true);
  });

  document.addEventListener('keydown', (e) => {
    if (!nav.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeNav(true);
      return;
    }

    if (e.key !== 'Tab') return;

    const links = getLinks();
    if (!links.length) return;

    const first = links[0];
    const last = links[links.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 960 && nav.classList.contains('is-open')) {
      closeNav();
    }
  }, 150));
}

/* ========================================================================== 
   3. SCROLL REVEAL
   ========================================================================== */
function initScrollReveal() {
  const targets = qsa('.reveal');
  if (!targets.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el) => observer.observe(el));
}

/* ========================================================================== 
   4. ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounters() {
  const counters = qsa('[data-counter-target]');
  if (!counters.length) return;

  const setCounterValue = (el) => {
    const target = parseFloat(el.getAttribute('data-counter-target'), 10) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '';
    el.textContent = target.toLocaleString() + suffix;
  };

  const animateCounter = (el) => {
    if (prefersReducedMotion()) {
      setCounterValue(el);
      return;
    }

    const target = parseFloat(el.getAttribute('data-counter-target'), 10) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 1600;
    const startTime = performance.now();
    const easeOutQuad = (t) => t * (2 - t);

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.round(target * easeOutQuad(progress));
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setCounterValue(el);
      }
    }

    requestAnimationFrame(tick);
  };

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    counters.forEach(setCounterValue);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => observer.observe(el));
}

/* ========================================================================== 
   5. TABBED PROCESS TIMELINE (services.html)
   --------------------------------------------------------------------------
   Adds the missing ARIA relationships between tabs and their panels while
   preserving the existing click and arrow-key behavior.
   ========================================================================== */
function initProcessTabs() {
  const tabs = qsa('.process-tab');
  const panels = qsa('.process-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab, index) => {
    const tabId = tab.id || `process-tab-${index + 1}`;
    const panel = panels[index];
    if (!panel) return;

    const panelId = panel.id || `process-panel-${index + 1}`;
    tab.id = tabId;
    panel.id = panelId;
    tab.setAttribute('aria-controls', panelId);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.tabIndex = 0;
  });

  const activate = (index) => {
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel, i) => {
      const isActive = i === index;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));

    tab.addEventListener('keydown', (e) => {
      let newIndex = null;

      if (e.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') newIndex = 0;
      if (e.key === 'End') newIndex = tabs.length - 1;

      if (newIndex !== null) {
        e.preventDefault();
        activate(newIndex);
        tabs[newIndex].focus();
      }
    });
  });

  activate(0);
}

/* ========================================================================== 
   6. FEATURE COMPARISON TOGGLE (services.html)
   ========================================================================== */
function initComparisonToggle() {
  const toggle = qs('#billing-toggle');
  const prices = qsa('[data-monthly][data-annual]');
  if (!toggle || !prices.length) return;

  const applyPeriod = (isAnnual) => {
    prices.forEach((el) => {
      const value = isAnnual
        ? el.getAttribute('data-annual')
        : el.getAttribute('data-monthly');
      const numberNode = el.firstChild;
      if (numberNode) numberNode.textContent = value;
    });
  };

  toggle.addEventListener('change', () => applyPeriod(toggle.checked));
  applyPeriod(toggle.checked);
}

/* ========================================================================== 
   7. MODAL SYSTEM (team bios + case studies)
   --------------------------------------------------------------------------
   Modal sizing and scroll containment are handled responsively in CSS.
   ========================================================================== */
function initModals() {
  const overlay = qs('#modal-overlay');
  if (!overlay) return;

  const modal = qs('.modal', overlay);
  const closeBtn = qs('.modal-close', overlay);
  if (!modal || !closeBtn) return;

  let lastFocusedTrigger = null;

  const populateTeamModal = (trigger) => {
    qs('[data-field="eyebrow"]', modal).textContent = 'Team member';
    qs('[data-field="title"]', modal).textContent = trigger.getAttribute('data-name') || '';
    qs('[data-field="subtitle"]', modal).textContent = trigger.getAttribute('data-role') || '';
    qs('[data-field="body"]', modal).innerHTML = `<p>${trigger.getAttribute('data-bio') || ''}</p>`;
    qs('[data-field="media"]', modal).textContent = trigger.getAttribute('data-photo-initials') || '';
    qs('[data-field="metrics"]', modal).style.display = 'none';
  };

  const populateCaseModal = (trigger) => {
    qs('[data-field="eyebrow"]', modal).textContent = trigger.getAttribute('data-tag') || 'Case study';
    qs('[data-field="title"]', modal).textContent = trigger.getAttribute('data-name') || '';
    qs('[data-field="subtitle"]', modal).textContent = trigger.getAttribute('data-role') || '';
    qs('[data-field="body"]', modal).innerHTML = `<p>${trigger.getAttribute('data-bio') || ''}</p>`;
    qs('[data-field="media"]', modal).textContent = trigger.getAttribute('data-photo-initials') || '';

    const metricsWrap = qs('[data-field="metrics"]', modal);
    const metricEls = qsa('[data-metric]', trigger);
    if (metricsWrap && metricEls.length) {
      metricsWrap.style.display = 'grid';
      metricsWrap.innerHTML = metricEls.map((m) => `
        <div>
          <div class="modal__metric-value">${m.getAttribute('data-metric')}</div>
          <div class="modal__metric-label">${m.getAttribute('data-metric-label')}</div>
        </div>
      `).join('');
    } else if (metricsWrap) {
      metricsWrap.style.display = 'none';
    }
  };

  const openModal = (trigger) => {
    lastFocusedTrigger = trigger;
    const type = trigger.getAttribute('data-modal-type');
    type === 'case-study' ? populateCaseModal(trigger) : populateTeamModal(trigger);

    overlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    overlay.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    overlay.setAttribute('aria-hidden', 'true');

    if (lastFocusedTrigger?.isConnected) {
      lastFocusedTrigger.focus();
    }
  };

  qsa('[data-modal-trigger]').forEach((trigger) => {
    // Team cards are already buttons. Case-study cards are articles, so give
    // non-interactive triggers keyboard semantics without changing markup.
    if (trigger.tagName !== 'BUTTON' && trigger.tagName !== 'A') {
      trigger.tabIndex = 0;
      trigger.setAttribute('role', 'button');
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    }

    trigger.addEventListener('click', () => openModal(trigger));
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  overlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !overlay.classList.contains('is-open')) return;

    const focusable = qsa(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      modal
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ========================================================================== 
   8. TESTIMONIAL SLIDER (index.html)
   ========================================================================== */
function initTestimonialSlider() {
  const root = qs('.testimonial-slider');
  if (!root) return;

  const slides = qsa('.testimonial-slide', root);
  const dotsWrap = qs('.testimonial-dots', root);
  const prevBtn = qs('[data-testimonial-prev]', root);
  const nextBtn = qs('[data-testimonial-next]', root);
  if (!slides.length) return;

  let current = 0;
  let autoplayId = null;

  const dots = dotsWrap
    ? slides.map((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
        return dot;
      })
    : [];

  function render() {
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    if (prefersReducedMotion()) return;
    stopAutoplay();
    autoplayId = setInterval(next, 7000);
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  nextBtn?.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn?.addEventListener('click', () => { prev(); startAutoplay(); });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) startAutoplay();
  });

  render();
  startAutoplay();
}

/* ========================================================================== 
   9. CONTACT FORM VALIDATION (contact.html)
   ========================================================================== */
function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  const statusBox = qs('.form-status');
  let hasAttemptedSubmit = false;

  const validators = {
    name: (value) => value.trim().length >= 2 || 'Please enter your full name.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
    message: (value) => value.trim().length >= 10 || 'Tell us a little more (10 characters minimum).',
  };

  function validateField(field) {
    const validator = validators[field.name];
    if (!validator) return true;

    const result = validator(field.value);
    const wrapper = field.closest('.field');
    const errorEl = wrapper ? qs('.field-error', wrapper) : null;

    if (result === true) {
      wrapper?.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }

    wrapper?.classList.add('has-error');
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  qsa('input, textarea', form).forEach((field) => {
    field.addEventListener('blur', () => {
      if (hasAttemptedSubmit) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hasAttemptedSubmit = true;

    const fields = qsa('input[name], textarea[name]', form);
    const isValid = fields.map(validateField).every(Boolean);

    if (!isValid) {
      const firstInvalid = form.querySelector('.has-error input, .has-error textarea');
      firstInvalid?.focus();
      return;
    }

    const submitBtn = qs('button[type="submit"]', form);
    if (!submitBtn) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      if (statusBox) {
        statusBox.textContent = "Thanks — your message is in. We'll reply within one business day.";
        statusBox.classList.add('is-visible');
      }
    }, 900);
  });
}

/* ========================================================================== 
   10. HEADER SCROLL STATE + ACTIVE NAV LINK
   ========================================================================== */
function initHeaderScrollState() {
  const header = qs('.site-header');
  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    updateHeaderState();
    window.addEventListener('scroll', debounce(updateHeaderState, 20));
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.nav__list a').forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
