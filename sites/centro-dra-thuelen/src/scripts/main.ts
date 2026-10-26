// Interações do site. Vanilla, sem dependências.
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));

/* ---------- reveal ---------- */
const io = new IntersectionObserver((es) => {
  for (const e of es) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
$$('[data-reveal]').forEach((el) => io.observe(el));

/* ---------- header + barra mobile ---------- */
const hdr = $('[data-hdr]');
const mbar = $('[data-mbar]');
let ticking = false;
const onScroll = () => {
  ticking = false;
  const y = scrollY;
  hdr?.classList.toggle('is-solid', y > innerHeight * 0.6);
  mbar?.classList.toggle('is-on', y > innerHeight * 0.7);
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
requestAnimationFrame(onScroll);

/* ---------- menu ---------- */
const burger = $('[data-burger]');
const burgerLabel = $('[data-burger-label]');
const setMenu = (on: boolean) => {
  document.body.classList.toggle('menu-open', on);
  burger?.setAttribute('aria-expanded', String(on));
  if (burgerLabel) burgerLabel.textContent = on ? 'Fechar' : 'Menu';
};
burger?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
$$('#mnav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------- reel do topo (sem pausa, padrão da casa) ---------- */
const reel = $('[data-reel]');
if (reel) {
  const slides = $$('[data-slide]', reel);
  const bars = $$<HTMLButtonElement>('[data-bar]', reel);
  const cap = $('[data-reel-cap]', reel);
  const DUR = 6000;
  let i = 0, timer = 0;
  const load = (k: number) => {
    const img = $<HTMLImageElement>('img', slides[k]);
    if (img?.dataset.src) { img.srcset = img.dataset.srcset!; img.src = img.dataset.src; delete img.dataset.src; }
  };
  const go = (n: number) => {
    i = (n + slides.length) % slides.length;
    load(i); load((i + 1) % slides.length);
    slides.forEach((s, k) => s.classList.toggle('is-on', k === i));
    bars.forEach((b, k) => { b.classList.remove('on'); b.classList.toggle('done', k < i); });
    void bars[i].offsetWidth;
    bars[i].style.setProperty('--dur', `${DUR}ms`);
    bars[i].classList.add('on');
    if (cap) cap.textContent = slides[i].dataset.cap || '';
    clearTimeout(timer);
    if (!reduce) timer = window.setTimeout(() => go(i + 1), DUR);
  };
  bars.forEach((b, k) => b.addEventListener('click', () => go(k)));
  const start = () => { load(1); go(0); };
  if (document.readyState === 'complete') start(); else addEventListener('load', start, { once: true });
}

/* ---------- escolha de unidade ---------- */
const sheet = $<HTMLDialogElement>('[data-sheet]');
const unitLinks = $$<HTMLAnchorElement>('[data-unit-link]');
if (sheet && typeof sheet.showModal === 'function') {
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('[data-pick]');
    if (!a) return;
    e.preventDefault();
    const base = a.dataset.msg || 'Olá! Vim pelo site e gostaria de agendar uma avaliação com a Dra. Thuelen.';
    unitLinks.forEach((l) => {
      const n = l.href.match(/wa\.me\/(\d+)/)?.[1];
      const unit = $('b', l)?.textContent ?? '';
      l.href = `https://wa.me/${n}?text=${encodeURIComponent(`${base} Prefiro a ${unit}.`)}`;
    });
    sheet.showModal();
  });
  sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });
  unitLinks.forEach((l) => l.addEventListener('click', () => setTimeout(() => sheet.close(), 200)));
}

idle(() => {
  /* ---------- formulário: monta a mensagem ---------- */
  const form = $<HTMLFormElement>('[data-msgform]');
  if (form) {
    const units: { id: string; name: string; whatsapp: string; phoneLabel: string }[] = JSON.parse($('[data-units]')!.textContent || '[]');
    const prev = $('[data-msgprev]')!;
    const to = $('[data-msgto]')!;
    const send = $<HTMLAnchorElement>('[data-msgsend]', form)!;
    const build = () => {
      const f = new FormData(form);
      const t = String(f.get('t'));
      const kid = f.get('p') === 'filho';
      const u = units.find((x) => x.id === f.get('u')) || units[0];
      const name = String(f.get('n') || '').trim();
      const obs = String(f.get('o') || '').trim();
      const what = t.startsWith('Ainda') ? 'uma avaliação' : `uma avaliação de ${t.toLowerCase()}`;
      let msg = `Olá! ${name ? `Meu nome é ${name}. ` : ''}Vim pelo site e gostaria de agendar ${what}${kid ? ' para meu filho(a)' : ''} com a Dra. Thuelen na ${u.name}.`;
      if (obs) msg += `\n\n${obs}`;
      prev.textContent = msg;
      to.textContent = `Vai para o WhatsApp da ${u.name}: ${u.phoneLabel}`;
      send.href = `https://wa.me/${u.whatsapp}?text=${encodeURIComponent(msg)}`;
    };
    form.addEventListener('input', build);
    form.addEventListener('change', build);
    form.addEventListener('submit', (e) => e.preventDefault());
    build();
  }

  /* ---------- checklist da mordida infantil ---------- */
  const signs = $('[data-signs]');
  if (signs) {
    const out = $('[data-signs-out]', signs)!;
    const send = $<HTMLAnchorElement>('[data-signs-send]', signs)!;
    const base = send.dataset.msg!;
    signs.addEventListener('click', (e) => {
      const b = (e.target as Element).closest<HTMLButtonElement>('[data-sign]');
      if (!b) return;
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      const on = $$('[data-sign][aria-pressed="true"]', signs).map((x) => x.textContent!.trim());
      out.textContent = on.length ? 'Vale avaliar. Quanto antes, mais o crescimento ajuda no tratamento.' : '';
      send.dataset.msg = on.length ? `${base} Percebi: ${on.join('; ').toLowerCase()}.` : base;
    });
  }

  /* ---------- vídeo da clínica sob demanda ---------- */
  $$<HTMLVideoElement>('[data-lazyvideo]').forEach((v) => {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const s = $<HTMLSourceElement>('source', v);
        if (s && !s.src) { s.src = s.dataset.src!; v.load(); }
        if (!reduce) v.play().catch(() => {});
      } else v.pause();
    }, { threshold: 0.3 }).observe(v);
  });

  /* ---------- mapas sob demanda ---------- */
  $$('[data-map-load]').forEach((b) => b.addEventListener('click', () => {
    const box = b.closest<HTMLElement>('[data-map]')!;
    const f = document.createElement('iframe');
    f.src = box.dataset.map!;
    f.title = 'Mapa da unidade';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    box.appendChild(f);
  }));
});
