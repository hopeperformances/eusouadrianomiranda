# Motion que impressiona sem derrubar Core Web Vitals

Ordem de preferência: **CSS puro → APIs nativas (Scroll-driven, View Transitions, IntersectionObserver) → GSAP via CDN**. Só suba de nível se o anterior não resolver.

Regras:
- Anime só `transform` e `opacity` (e `clip-path` com moderação). Nunca `width`, `height`, `top`, `left`, `margin`.
- Nunca esconda o conteúdo do LCP (H1 / imagem herói) com `opacity: 0` esperando JS. A animação de entrada do hero deve partir de um estado já visível ou ser só CSS.
- Sempre respeite `prefers-reduced-motion: reduce` mostrando o estado final.
- Durações: micro-interações 150–250ms; entradas 400–700ms; saída mais rápida que entrada.
- Um momento orquestrado por página. O resto é resposta à ação do usuário.

## 1. Tokens de motion
```css
:root {
  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --dur-fast: 180ms;
  --dur-base: 320ms;
  --dur-slow: 640ms;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 2. Revelação ao rolar — CSS scroll-driven (sem JS)
Suporte: Chromium e Safari 26+; nos demais o conteúdo simplesmente aparece (progressive enhancement).
```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
  @keyframes reveal {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: none; }
  }
}
```
Use em 2–3 blocos-chave, não em toda seção.

## 3. Hero orquestrado (CSS, sem atrasar LCP)
```css
.hero__title span {
  display: inline-block;
  animation: rise var(--dur-slow) var(--ease-out) both;
}
.hero__title span:nth-child(2) { animation-delay: 80ms; }
.hero__title span:nth-child(3) { animation-delay: 160ms; }
@keyframes rise { from { transform: translateY(.4em); } to { transform: none; } }
```
Só `transform` (sem opacity 0) → o texto já conta como pintado para o LCP.

## 4. Contadores de resultado (IntersectionObserver)
```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const el = e.target, end = Number(el.dataset.to), t0 = performance.now(), d = 1200;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = (t) => {
      const p = reduce ? 1 : Math.min((t - t0) / d, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    io.unobserve(el);
  }
}, { threshold: .6 });
document.querySelectorAll('[data-to]').forEach((el) => io.observe(el));
```
O HTML já deve conter o número final (`<span data-to="320">320</span>`) para SEO/IA e sem-JS.

## 5. Transição entre páginas (View Transitions, multi-página)
```css
@view-transition { navigation: auto; }
::view-transition-old(root), ::view-transition-new(root) { animation-duration: var(--dur-base); }
.servico-card img { view-transition-name: var(--vt-name); }
```
Defina `style="--vt-name: servico-x"` no card e na imagem herói da página de serviço → a imagem "voa" para a próxima página. Zero JS.

## 6. Micro-interações
```css
.btn { transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur-fast); }
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0) scale(.98); }
:focus-visible { outline: 3px solid var(--color-ring); outline-offset: 3px; }
```

## 7. Quando usar GSAP
Para pin/scrub de seção, SplitText em headline curta, ou timeline complexa. Carregue com `defer` do cdnjs com versão exata e só na página que usa:
```html
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
```
Presets prontos: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<efeito>" --domain gsap`.
Sempre envolva em `gsap.matchMedia()` com ramo para `(prefers-reduced-motion: reduce)` e meça o INP depois.
