const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const selector = link.getAttribute('href');
    if (!selector || selector === '#') return;

    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();

    const headerOffset = document.querySelector('.topbar')?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });

    // Keep the public URL clean: section navigation never adds #works/#about/etc.
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
});

// Clean up old bookmarked/hash URLs and make a reload return to the page start.
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
  window.scrollTo(0, 0);
}
