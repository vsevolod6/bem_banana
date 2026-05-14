const body = document.body;
const header = document.querySelector('.header');
const navToggle = document.querySelector('.header__toggle');
const navMenu = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__link');
const animatedItems = document.querySelectorAll('[data-animate]');
const parallaxItems = document.querySelectorAll('[data-parallax]');
const forms = document.querySelectorAll('[data-form]');
const pressableCards = document.querySelectorAll('.facts__item');

const closeMenu = () => {
  body.classList.remove('page--locked');
  navToggle?.classList.remove('header__toggle--active');
  navToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('header__nav--open');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('header__nav--open');
  navToggle.classList.toggle('header__toggle--active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  body.classList.toggle('page--locked', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('header--scrolled', window.scrollY > 18);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
  rootMargin: '0px 0px -60px',
});

animatedItems.forEach((item) => observer.observe(item));

const moveParallax = () => {
  const y = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0.08);
    item.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
};

moveParallax();
window.addEventListener('scroll', moveParallax, { passive: true });

forms.forEach((form) => {
  const status = form.querySelector('.form__status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submit = form.querySelector('[type="submit"]');
    submit?.setAttribute('disabled', 'disabled');

    if (status) {
      status.textContent = 'Готово! Мы получили сообщение и скоро ответим.';
      status.classList.add('form__status--visible');
    }

    window.setTimeout(() => {
      form.reset();
      submit?.removeAttribute('disabled');
    }, 900);
  });
});

pressableCards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.remove('is-pressed');
    window.requestAnimationFrame(() => {
      card.classList.add('is-pressed');
    });

    window.setTimeout(() => {
      card.classList.remove('is-pressed');
    }, 260);
  });
});
