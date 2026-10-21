// Interações do site. Vanilla, sem dependências, tudo passivo e com rAF.
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
);
$$('[data-reveal], [data-split]').forEach((el) => io.observe(el));

/* ---------- liga animações contínuas só quando visíveis ---------- */
const animIO = new IntersectionObserver((es) => { for (const e of es) e.target.classList.toggle('play', e.isIntersecting); });
const startAnims = () => $$('[data-anim]').forEach((el) => animIO.observe(el));
if (document.readyState === 'complete') setTimeout(startAnims, 1200);
else addEventListener('load', () => setTimeout(startAnims, 1200), { once: true });

/* ---------- header + progresso + barra mobile + linha da jornada ---------- */
const hdr = $('[data-hdr]');
const mbar = $('[data-mbar]');
const progress = $('.progress');
const steps = $('[data-steps]');
const mono = $<SVGPathElement>('.creds__mono path');
let lastY = 0;
let ticking = false;
const onScroll = () => {
  const y = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress?.style.setProperty('--p', String(max > 0 ? y / max : 0));
  hdr?.classList.toggle('is-solid', y > 40);
  hdr?.classList.toggle('is-hidden', y > 500 && y > lastY && !document.body.classList.contains('menu-open'));
  mbar?.classList.toggle('is-on', y > innerHeight * 0.55);
  if (steps) {
    const r = steps.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.25)));
    steps.style.setProperty('--draw', p.toFixed(3));
  }
  if (mono) {
    const r = (mono.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height * 0.4)));
    mono.style.setProperty('--dash', (1 - p).toFixed(3));
  }
  lastY = y;
  ticking = false;
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
requestAnimationFrame(onScroll);

/* ---------- menu mobile ---------- */
const burger = $('[data-burger]');
const toggleMenu = (open?: boolean) => {
  const on = open ?? !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', on);
  burger?.setAttribute('aria-expanded', String(on));
  burger?.setAttribute('aria-label', on ? 'Fechar menu' : 'Abrir menu');
};
burger?.addEventListener('click', () => toggleMenu());
$$('#mnav a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });

/* ---------- palavra rotativa do hero ---------- */
const rot = $('[data-rot]');
if (rot && !reduce) {
  const words = $$('span', rot);
  let i = 0;
  setInterval(() => {
    const cur = words[i];
    cur.classList.remove('is-on');
    cur.classList.add('is-off');
    i = (i + 1) % words.length;
    const nxt = words[i];
    nxt.classList.remove('is-off');
    void nxt.offsetWidth;
    nxt.classList.add('is-on');
    setTimeout(() => cur.classList.remove('is-off'), 900);
  }, 2600);
}

/* ---------- contador ---------- */
$$('[data-count]').forEach((el) => {
  const to = Number(el.dataset.count);
  if (reduce) return;
  el.textContent = '0';
  const ob = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    ob.disconnect();
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1600);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 4))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.6 });
  ob.observe(el);
});

/* ---------- efeitos de ponteiro (desktop) ---------- */
if (finePointer && !reduce) {
  $$('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.transform = `translate(${(x - r.width / 2) * 0.18}px, ${(y - r.height / 2) * 0.28}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
  $$('[data-spot]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
  const tilt = $('[data-tilt]');
  const arch = tilt && $('.arch', tilt);
  if (tilt && arch) {
    tilt.addEventListener('pointermove', (e) => {
      const r = tilt.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      arch.style.setProperty('--ry', `${px * 8}deg`);
      arch.style.setProperty('--rx', `${-py * 6}deg`);
    });
    tilt.addEventListener('pointerleave', () => { arch.style.setProperty('--ry', '0deg'); arch.style.setProperty('--rx', '0deg'); });
  }
}

// Tudo abaixo da dobra inicializa em tempo ocioso, fora do caminho crítico.
const idle = (fn: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
idle(() => {
  /* ---------- capítulos: sticky no desktop, carrossel com chips no mobile ---------- */
  const chapters = $('[data-chapters]');
  if (chapters) {
    const figs = $$('[data-ch-fig]', chapters);
    const items = $$('[data-ch]', chapters);
    const list = $('[data-ch-list]', chapters)!;
    const count = $('[data-ch-count]', chapters);
    const chips = $$<HTMLButtonElement>('[data-chip]');
    const dots = $$('[data-ch-dot]');
    const chipBar = $('[data-chips]');
    const desktop = matchMedia('(min-width: 1000px)');
    let cur = -1;
    const set = (i: number) => {
      if (i === cur) return;
      cur = i;
      figs.forEach((f, k) => f.classList.toggle('is-on', k === i));
      items.forEach((f, k) => f.classList.toggle('is-on', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
      chips.forEach((c, k) => c.setAttribute('aria-current', String(k === i)));
      if (count) count.textContent = String(i + 1).padStart(2, '0');
      const chip = chips[i];
      if (chip && chipBar && !desktop.matches) chipBar.scrollTo({ left: chip.offsetLeft - chipBar.clientWidth / 2 + chip.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    };
    let cob: IntersectionObserver | null = null;
    const bind = () => {
      cob?.disconnect();
      cob = desktop.matches
        ? new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) set(Number((e.target as HTMLElement).dataset.ch)); }, { rootMargin: '-45% 0px -45% 0px' })
        : new IntersectionObserver((es) => { for (const e of es) if (e.intersectionRatio > 0.6) set(Number((e.target as HTMLElement).dataset.ch)); }, { root: list, threshold: [0.6] });
      items.forEach((el) => cob!.observe(el));
    };
    desktop.addEventListener('change', bind);
    bind();
    set(0);
    chips.forEach((c, k) => c.addEventListener('click', () => {
      list.scrollTo({ left: items[k].offsetLeft - parseFloat(getComputedStyle(list).paddingLeft), behavior: reduce ? 'auto' : 'smooth' });
      set(k);
    }));
  }

  /* ---------- escolha de unidade (sheet) ---------- */
  const sheet = $<HTMLDialogElement>('[data-sheet]');
  const unitLinks = $$<HTMLAnchorElement>('[data-unit-link]');
  const baseMsg = 'Olá! Vim pelo site e gostaria de agendar uma avaliação com a Dra. Thuelen';
  if (sheet && typeof sheet.showModal === 'function') {
    document.addEventListener('click', (e) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('[data-pick]');
      if (!a) return;
      e.preventDefault();
      const custom = a.dataset.msg;
      unitLinks.forEach((l, i) => {
        const n = l.href.match(/wa\.me\/(\d+)/)?.[1];
        const unit = $('b', l)?.textContent ?? '';
        const msg = custom ? `${custom} Prefiro a ${unit}.` : `${baseMsg} na ${unit}.`;
        l.href = `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
        void i;
      });
      sheet.showModal();
    });
    sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });
    unitLinks.forEach((l) => l.addEventListener('click', () => setTimeout(() => sheet.close(), 200)));
  }

  /* ---------- ferramenta: monte sua avaliação ---------- */
  const planner = $('[data-planner]');
  if (planner) {
    type PD = { needs: { id: string; label: string; t: string[] }[]; when: { id: string; label: string }[]; units: { id: string; name: string; whatsapp: string; street: string }[]; treatments: Record<string, string> };
    const data: PD = JSON.parse($('[data-pdata]', planner)!.textContent || '{}');
    const stepsEl = $$('[data-pstep]', planner);
    const bars = $$('.planner__bar span', planner);
    const next = $<HTMLButtonElement>('[data-pnext]', planner)!;
    const back = $<HTMLButtonElement>('[data-pback]', planner)!;
    const send = $<HTMLAnchorElement>('[data-psend]', planner)!;
    const nameIn = $<HTMLInputElement>('[data-pname]', planner)!;
    const state = { step: 0, needs: new Set<string>(), when: '', unit: '' };

    const valid = () => (state.step === 0 ? state.needs.size > 0 : state.step === 1 ? !!state.when : state.step === 2 ? !!state.unit : true);
    const render = () => {
      stepsEl.forEach((s, i) => s.classList.toggle('is-on', i === state.step));
      bars.forEach((b, i) => b.classList.toggle('is-done', i <= state.step));
      back.hidden = state.step === 0;
      next.hidden = state.step === 3;
      send.hidden = state.step !== 3;
      next.disabled = !valid();
      if (state.step === 3) build();
    };
    const build = () => {
      const needs = data.needs.filter((n) => state.needs.has(n.id));
      const unit = data.units.find((u) => u.id === state.unit)!;
      const when = data.when.find((w) => w.id === state.when)!;
      const slugs = [...new Set(needs.flatMap((n) => n.t))];
      const sum = $('[data-psum]', planner)!;
      sum.innerHTML = '';
      const li = (html: string) => { const el = document.createElement('li'); el.innerHTML = html; sum.appendChild(el); };
      slugs.forEach((s) => li(`<a href="/tratamentos/${s}/">${data.treatments[s]}</a>`));
      if (state.needs.has('filho')) li('Odontopediatria com abordagem lúdica');
      if (state.needs.has('medo')) li('Atendimento com sedação e laser, se indicado');
      if (state.needs.has('dor')) li('Avaliação do incômodo e diagnóstico');
      li('Avaliação completa e planejamento personalizado');
      const name = nameIn.value.trim();
      const msg =
        `Olá! ${name ? `Meu nome é ${name}. ` : ''}Vim pelo site e gostaria de agendar uma avaliação com a Dra. Thuelen na ${unit.name}.\n\n` +
        `Quero resolver: ${needs.map((n) => n.label.toLowerCase()).join('; ')}.\n` +
        `Prazo: ${when.label.toLowerCase()}.`;
      $('[data-pmsg]', planner)!.textContent = msg;
      $('[data-punit]', planner)!.textContent = unit.name;
      send.href = `https://wa.me/${unit.whatsapp}?text=${encodeURIComponent(msg)}`;
    };

    planner.addEventListener('click', (e) => {
      const opt = (e.target as Element).closest<HTMLButtonElement>('.opt');
      if (!opt) return;
      if (opt.dataset.need) {
        const id = opt.dataset.need;
        state.needs.has(id) ? state.needs.delete(id) : state.needs.add(id);
        opt.setAttribute('aria-pressed', String(state.needs.has(id)));
      } else {
        const key = opt.dataset.when ? 'when' : 'unit';
        state[key] = (opt.dataset.when || opt.dataset.unit)!;
        $$('.opt', opt.parentElement!).forEach((o) => o.setAttribute('aria-pressed', String(o === opt)));
        // avança sozinho em escolhas únicas
        setTimeout(() => { if (state.step < 3) { state.step++; render(); } }, 260);
      }
      next.disabled = !valid();
    });
    next.addEventListener('click', () => { if (valid() && state.step < 3) { state.step++; render(); planner.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' }); } });
    back.addEventListener('click', () => { if (state.step > 0) { state.step--; render(); } });
    nameIn.addEventListener('input', build);
    render();
  }

  /* ---------- depoimentos ---------- */
  const quotes = $('[data-quotes]');
  if (quotes) {
    const qs = $$('[data-q]', quotes);
    const dots = $$('[data-qdot]', quotes);
    const DUR = 9000;
    let i = 0;
    let timer = 0;
    const go = (n: number) => {
      i = (n + qs.length) % qs.length;
      qs.forEach((q, k) => q.classList.toggle('is-on', k === i));
      dots.forEach((d, k) => {
        d.classList.remove('is-on');
        d.classList.toggle('is-past', k < i);
      });
      void dots[i].offsetWidth;
      dots[i].classList.add('is-on');
      dots[i].style.setProperty('--dur', `${DUR}ms`);
      clearTimeout(timer);
      if (!reduce) timer = window.setTimeout(() => go(i + 1), DUR);
    };
    $('[data-qnext]', quotes)?.addEventListener('click', () => go(i + 1));
    $('[data-qprev]', quotes)?.addEventListener('click', () => go(i - 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    let sx = 0;
    quotes.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    quotes.addEventListener('touchend', (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); }, { passive: true });
    const vis = new IntersectionObserver(([e]) => { if (e.isIntersecting) { vis.disconnect(); go(0); } }, { threshold: 0.3 });
    vis.observe(quotes);
  }

  /* ---------- unidades: abas + mapa sob demanda ---------- */
  const units = $('[data-units]');
  if (units) {
    const tabs = $$<HTMLButtonElement>('[data-utab]', units);
    const panels = $$('[data-upanel]', units);
    const pill = $('.units__pill', units);
    const place = (t: HTMLElement) => { if (pill) { pill.style.width = `${t.offsetWidth}px`; pill.style.transform = `translateX(${t.offsetLeft - 6}px)`; } };
    const sel = (k: number) => {
      tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === k)));
      panels.forEach((p, j) => p.classList.toggle('is-on', j === k));
      place(tabs[k]);
    };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => sel(k));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const n = (k + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        sel(n); tabs[n].focus();
      });
    });
    requestAnimationFrame(() => place(tabs[0]));
    addEventListener('resize', () => place(tabs.find((t) => t.getAttribute('aria-selected') === 'true')!), { passive: true });
    $$('[data-map-load]', units).forEach((b) => b.addEventListener('click', () => {
      const box = b.closest<HTMLElement>('[data-map]')!;
      const f = document.createElement('iframe');
      f.src = box.dataset.map!;
      f.title = 'Mapa da unidade';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      box.appendChild(f);
    }));
  }
});
