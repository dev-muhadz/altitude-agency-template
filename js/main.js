/* ==========================================================================
   ALTITUDE — Digital Agency & Corporate Template
   Core JavaScript (Vanilla ES6+, no dependencies)
   --------------------------------------------------------------------------
   This single file is shared across all four pages. Every feature checks
   for the presence of its DOM hooks before running, so it is safe to
   include on pages that don't use a given component.

   Table of contents:
     1. Utilities
     2. Mobile Navigation Toggle
     3. Scroll Reveal (IntersectionObserver)
     4. Animated Statistics Counter
     5. Tabbed Process Timeline (services.html)
     6. Feature Comparison Toggle (services.html)
     7. Modal System (team bios + case studies)
     8. Testimonial Slider (index.html)
     9. Contact Form Validation (contact.html)
     10. Header Scroll State + Active Nav Link
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

/**
 * Shallow query-selector helper. Returns null gracefully instead of
 * throwing, so callers can safely `if (el)` guard.
 */
function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/**
 * Debounce: limits how often a function can fire. Used on scroll/resize
 * listeners to keep the UI smooth on lower-powered mobile devices.
 */
function debounce(fn, wait = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}


/* ==========================================================================
   2. MOBILE NAVIGATION TOGGLE
   --------------------------------------------------------------------------
   Accessible hamburger menu: toggles aria-expanded, traps nothing (menu is
   a simple off-canvas drawer, not a full dialog) but does restore focus to
   the toggle button on close and closes on Escape / outside click.
   ========================================================================== */
function initMobileNav() {
  const toggle = qs('.nav-toggle');
  const nav = qs('#primary-nav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('modal-open');
  };

  const openNav = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open'); // reuse scroll-lock utility
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });

  // Close the drawer whenever a nav link is tapped (mobile UX expectation)
  qsa('a', nav).forEach((link) => link.addEventListener('click', closeNav));

  // Close on Escape key for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });

  // Close when the viewport is resized past the desktop breakpoint
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 960) closeNav();
  }, 150));
}


/* ==========================================================================
   3. SCROLL REVEAL
   --------------------------------------------------------------------------
   Adds `.is-visible` to any element carrying `.reveal` once it enters the
   viewport. Pure presentation — respects prefers-reduced-motion via CSS.
   ========================================================================== */
function initScrollReveal() {
  const targets = qsa('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback for very old browsers: just show everything immediately.
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // animate once, then stop observing
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el) => observer.observe(el));
}


/* ==========================================================================
   4. ANIMATED STATISTICS COUNTER
   --------------------------------------------------------------------------
   Any element with [data-counter-target] animates its textContent from 0
   up to the target number when it scrolls into view. Supports an optional
   [data-counter-suffix] (e.g. "%", "+", "M") appended after the number.
   Example markup:
     <span class="stat__value" data-counter-target="150" data-counter-suffix="%">0</span>
   ========================================================================== */
function initStatsCounters() {
  const counters = qsa('[data-counter-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-counter-target'), 10) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 1600; // ms — total animation length
    const startTime = performance.now();

    // Ease-out-quad easing for a natural "settle" feel at the end of the count
    const easeOutQuad = (t) => t * (2 - t);

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.round(target * eased);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString() + suffix; // snap to exact value
      }
    }

    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target); // count up once per page view
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => observer.observe(el));
}


/* ==========================================================================
   5. TABBED PROCESS TIMELINE (services.html)
   --------------------------------------------------------------------------
   Click-through tabs revealing one workflow step at a time. Fully keyboard
   operable (arrow keys move between tabs, following the WAI-ARIA Tabs
   pattern) and syncs aria-selected / hidden panels.
   ========================================================================== */
function initProcessTabs() {
  const tabs = qsa('.process-tab');
  const panels = qsa('.process-panel');
  if (!tabs.length || !panels.length) return;

  const activate = (index) => {
    tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));

    // Arrow-key navigation between tabs, per ARIA authoring practices
    tab.addEventListener('keydown', (e) => {
      let newIndex = null;
      if (e.key === 'ArrowRight') newIndex = (index + 1) % tabs.length;
      if (e.key === 'ArrowLeft') newIndex = (index - 1 + tabs.length) % tabs.length;
      if (newIndex !== null) {
        e.preventDefault();
        tabs[newIndex].focus();
        activate(newIndex);
      }
    });
  });

  activate(0); // first step is open by default
}


/* ==========================================================================
   6. FEATURE COMPARISON TOGGLE (services.html)
   --------------------------------------------------------------------------
   Optional monthly/annual billing toggle above the comparison cards. Swaps
   the displayed price using data attributes on each price element:
     <span class="compare-card__price" data-monthly="$2,400" data-annual="$1,900">
   ========================================================================== */
function initComparisonToggle() {
  const toggle = qs('#billing-toggle');
  const prices = qsa('[data-monthly][data-annual]');
  if (!toggle || !prices.length) return;

  const applyPeriod = (isAnnual) => {
    prices.forEach((el) => {
      const value = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      const numberNode = el.firstChild; // preserve the trailing <span>/month unit
      if (numberNode) numberNode.textContent = value;
    });
  };

  toggle.addEventListener('change', () => applyPeriod(toggle.checked));
  applyPeriod(toggle.checked);
}


/* ==========================================================================
   7. MODAL SYSTEM (team bios + case studies)
   --------------------------------------------------------------------------
   A single reusable overlay is populated from data attributes on whichever
   trigger card was clicked, so no duplicate markup is needed per person or
   project. Traps focus within the modal while open and restores focus to
   the trigger element on close.
   Trigger markup example:
     <button class="team-card" data-modal-trigger
             data-name="Jordan Blake" data-role="Creative Director"
             data-bio="..." data-photo-initials="JB">
   ========================================================================== */
function initModals() {
  const overlay = qs('#modal-overlay');
  if (!overlay) return;

  const modal = qs('.modal', overlay);
  const closeBtn = qs('.modal-close', overlay);
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
    if (metricEls.length) {
      metricsWrap.style.display = 'grid';
      metricsWrap.innerHTML = metricEls.map((m) => `
        <div>
          <div class="modal__metric-value">${m.getAttribute('data-metric')}</div>
          <div class="modal__metric-label">${m.getAttribute('data-metric-label')}</div>
        </div>
      `).join('');
    } else {
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
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  };

  qsa('[data-modal-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger));
  });

  closeBtn.addEventListener('click', closeModal);

  // Click on the dimmed backdrop (not the modal itself) closes it
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Escape key closes the modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });

  // Basic focus trap: keep Tab cycling within the modal while open
  overlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !overlay.classList.contains('is-open')) return;
    const focusable = qsa('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])', modal);
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
   --------------------------------------------------------------------------
   Lightweight, dependency-free slider. Auto-advances every 7s, pauses on
   hover/focus, and is fully controllable via the prev/next arrows and dot
   navigation.
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

  // Build dot navigation dynamically based on the number of slides present
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(next, 7000);
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  nextBtn?.addEventListener('click', () => { next(); startAutoplay(); });
  prevBtn?.addEventListener('click', () => { prev(); startAutoplay(); });

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', startAutoplay);

  render();
  startAutoplay();
}


/* ==========================================================================
   9. CONTACT FORM VALIDATION (contact.html)
   --------------------------------------------------------------------------
   Client-side validation only (no backend wired up — swap the fetch() stub
   with a real endpoint). Validates on submit and re-validates a field on
   blur once the user has already tried to submit once.
   ========================================================================== */
function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  const statusBox = qs('.form-status', form);
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
    const errorEl = qs('.field-error', wrapper);

    if (result === true) {
      wrapper.classList.remove('has-error');
      return true;
    }

    wrapper.classList.add('has-error');
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  // Re-validate individual fields as the user fixes them, but only after
  // they've made a first submit attempt (avoids scolding users too early).
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
      // Move focus to the first invalid field for accessibility
      const firstInvalid = form.querySelector('.has-error input, .has-error textarea');
      firstInvalid?.focus();
      return;
    }

    // ---- Submission stub -------------------------------------------------
    // Replace this block with a real fetch() call to your form backend
    // (e.g. Formspree, Netlify Forms, or a custom API endpoint).
    const submitBtn = qs('button[type="submit"]', form);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      statusBox.textContent = "Thanks — your message is in. We'll reply within one business day.";
      statusBox.classList.add('is-visible');
    }, 900);
  });
}


/* ==========================================================================
   10. HEADER SCROLL STATE + ACTIVE NAV LINK
   --------------------------------------------------------------------------
   Adds a subtle elevation to the sticky header once the page scrolls, and
   marks the nav link matching the current page with aria-current="page"
   (falls back gracefully if a page isn't in the link list).
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
