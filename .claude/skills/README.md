# Skills de Design — Hope Performance Digitais

Skills de design anti-"cara de IA" para construção e redesign de sites. Ficam em `.claude/skills/`, então o Claude Code as carrega automaticamente em qualquer sessão aberta neste repositório (invocar por nome: `/impeccable`, `/hallmark` etc.).

## O que tem aqui

| Skill | Origem | Licença | Quando usar |
|---|---|---|---|
| `design-taste-frontend` | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) (`skills/taste-skill`) | MIT | **Site novo / landing page.** Direção de arte tirada de 247 sites premiados (Awwwards, One Page Love). Sorteia 3 direções visuais, você escolhe, e ele valida em navegador real com screenshots. |
| `hallmark` | [Nutlope/hallmark](https://github.com/Nutlope/hallmark) | MIT | **Variedade estrutural.** 21 temas + 21 macroestruturas (bento, manifesto, stat-led, FAQ conversacional, mapa…). Evita o ritmo "hero → 3 cards → CTA → rodapé". Verbos: `audit`, `redesign`, `study <URL/print>` (extrai o DNA de um site de referência). |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache 2.0 | **Auditoria e acabamento.** Comandos `audit`, `critique`, `polish`, `typeset`, `colorize`, `bolder`, `quieter`, `layout`, `animate`, `optimize`. Detector determinístico de anti-padrões (gradiente roxo, card dentro de card, espaçamento apertado…). |
| `redesign-existing-projects` | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) (`skills/redesign-skill`) | MIT | **Redesign de site de cliente já no ar**, preservando estrutura, rotas e conteúdo. |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | Apache 2.0 | Base oficial da Anthropic: tipografia com intenção, direção estética definida antes de codar. |
| `emil-design-eng` | [emilkowalski/skill](https://github.com/emilkowalski/skill) | MIT | Microinterações e animação com critério (autor do Sonner/Vaul). Usar na fase de polimento. |

Versões copiadas em 2026-10-15 (commits: impeccable `8a0e198`, hallmark `13ac0ec`, taste-skill `f624f37`, anthropics/skills `dbd4588`, emilkowalski/skill `2d22863`).

## Fluxo recomendado (site novo)

1. **Briefing de entidade** primeiro: serviço, cidade, ICP, prova social, diferencial real. A ideia visual sai do negócio, não de um template.
2. `design-taste-frontend` ou `hallmark` → direção de arte + estrutura da página.
3. `impeccable audit` → caça de anti-padrões de IA.
4. `impeccable polish` + `emil-design-eng` → acabamento e motion.
5. Gate técnico Hope (abaixo) antes do deploy.

Referência visual de um site que o cliente admira: `hallmark study https://exemplo.com.br` (extrai paleta, tipografia e macroestrutura sem copiar pixels).

## Gate técnico Hope — inegociável sobre qualquer skill

As skills cuidam da estética. Nenhuma decisão visual pode quebrar o seguinte:

- **CWV**: LCP < 2.5s, CLS < 0.1, INP < 200ms no mobile. Fonte display: no máximo 2 famílias, `font-display: swap`, preload só da usada acima da dobra. Imagem herói em WebP/AVIF com `width`/`height` e `fetchpriority="high"`.
- **Motion**: só `transform`/`opacity`, sempre com `prefers-reduced-motion`. Nada de biblioteca de animação pesada para efeito decorativo.
- **Conteúdo extraível sem JS**: H1 único, H2 em formato de pergunta, resposta de 40–60 palavras no topo do bloco, Q&A visível. Layout criativo não pode esconder texto em canvas, imagem ou carrossel.
- **Schema**: `LocalBusiness`/`Organization`/`BreadcrumbList` batendo com o texto visível e com o NAP do GMN.
- **Conversão**: CTA (WhatsApp/telefone) visível na primeira dobra mobile e prova social perto do topo.
- **Acessibilidade**: contraste AA, alvos de toque ≥ 44px.

## Observações

- Os scripts são opcionais e rodam só quando a skill é invocada. `design-taste-frontend/scripts/assets.mjs` busca fotos de domínio público (Openverse, Wikimedia, Met, Art Institute of Chicago) — para negócio local, **prefira sempre fotos reais do cliente** (também alimentam o GMN). `impeccable/scripts/impeccable` baixa o binário do detector das releases do GitHub do projeto na primeira execução.
- Para atualizar: clonar o repositório de origem e substituir a pasta correspondente, mantendo o `LICENSE`.
