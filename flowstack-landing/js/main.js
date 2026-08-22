// FlowStack landing page interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // close menu after clicking a link
    header.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => header.classList.remove('nav-open'));
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';

      // close all other items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      item.setAttribute('data-open', String(!isOpen));
      question.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---- Pricing monthly / yearly toggle ---- */
  const switchEl = document.querySelector('.switch');
  const amounts = document.querySelectorAll('[data-monthly][data-yearly]');
  if (switchEl) {
    switchEl.addEventListener('click', () => {
      const isYearly = switchEl.getAttribute('aria-checked') === 'true';
      switchEl.setAttribute('aria-checked', String(!isYearly));
      amounts.forEach(el => {
        el.textContent = !isYearly ? el.dataset.yearly : el.dataset.monthly;
      });
      document.querySelectorAll('.price-period').forEach(el => {
        el.textContent = !isYearly ? '/ mo, billed yearly' : '/ month';
      });
    });
  }

  /* ---- Trial signup modal ---- */
  const modal = document.getElementById('trial-modal');
  const form = document.getElementById('trial-form');

  const setModalState = (state) => {
    modal.querySelectorAll('.modal-body').forEach(panel => {
      panel.hidden = panel.dataset.state !== state;
    });
  };

  const openModal = () => {
    setModalState('form');
    modal.hidden = false;
    // next tick so the transition actually plays
    requestAnimationFrame(() => modal.setAttribute('data-visible', 'true'));
    document.body.style.overflow = 'hidden';
    const firstField = form.querySelector('input[name="name"]');
    if (firstField) firstField.focus();
  };

  const closeModal = () => {
    modal.setAttribute('data-visible', 'false');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 200);
  };

  document.querySelectorAll('.js-open-trial').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modal) {
    modal.querySelectorAll('.modal-close, .modal-close-success').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('data-visible') === 'true') closeModal();
    });
    const retryBtn = modal.querySelector('.modal-retry');
    if (retryBtn) retryBtn.addEventListener('click', () => setModalState('form'));
  }

  /* Submit the form to Netlify Forms via fetch, so the visitor never
     leaves the page. Falls back to a normal POST (and the action=
     redirect to thank-you.html) if JavaScript fails for any reason. */
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      const data = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
        .then(() => {
          setModalState('success');
          if (window.lucide) window.lucide.createIcons();
          form.reset();
        })
        .catch(() => {
          setModalState('error');
        })
        .finally(() => {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
        });
    });
  }

  /* ---- Lucide icons ---- */
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
