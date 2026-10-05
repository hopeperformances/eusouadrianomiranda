(() => {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.hope-carousel-track');
    const nav = carousel.querySelector('.hope-carousel-nav');
    const prev = nav.querySelector('[data-direction="-1"]');
    const next = nav.querySelector('[data-direction="1"]');
    const status = nav.querySelector('.hope-carousel-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const step = () => track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      nav.hidden = max < 3;
      prev.disabled = track.scrollLeft < 3;
      next.disabled = track.scrollLeft >= max - 3;
      status.textContent = `${Math.min(track.children.length, Math.round(track.scrollLeft / step()) + 1)} / ${track.children.length}`;
    };
    const move = direction => track.scrollBy({left:direction * step(), behavior:reducedMotion.matches ? 'instant' : 'smooth'});
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    track.addEventListener('scroll', update, {passive:true});
    track.addEventListener('keydown', event => {
      if (event.target !== track) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    new ResizeObserver(update).observe(track);
    update();
  });
  document.querySelectorAll('.hope-video-poster').forEach(button => {
    button.addEventListener('click', () => {
      const container = button.closest('[data-video]');
      const frame = document.createElement('iframe');
      frame.title = container.dataset.title;
      frame.src = `https://www.youtube-nocookie.com/embed/${container.dataset.video}?autoplay=1&playsinline=1&rel=0&hl=pt-BR`;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      container.replaceChildren(frame);
      frame.focus();
    }, {once:true});
  });
})();
