
  (function () {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const showFrom = 250; 

    function onScroll() {
      if (window.scrollY > showFrom) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    function scrollToTop(e) {
      e.preventDefault();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', scrollToTop);

    onScroll();
  })();

