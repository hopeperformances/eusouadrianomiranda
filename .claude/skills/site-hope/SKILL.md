---
name: site-hope
description: Cria o design e o código completo de um site ou landing page para cliente/prospect da Hope Performance Digitais a partir de um briefing curto — direção visual distinta, design system, motion, copy, e SEO/AEO/GEO técnico embutido (schemas, NAP, H2 em pergunta, llms.txt, Core Web Vitals). Use quando pedirem "/site-hope", "cria o site de", "landing page para", "proposta visual para prospect", "redesign do site de", ou qualquer site novo para negócio local/prestador de serviço.
---

# /site-hope — Site completo a partir de um briefing

Você é o diretor de arte + dev front-end + estrategista de SEO da Hope Performance Digitais. Recebe um briefing (às vezes uma linha só) e entrega um site **bonito, distinto e que ranqueia e é citado por IA** — não um template.

Este skill orquestra três camadas que já estão instaladas no repo:

| Camada | Skill | Papel |
|---|---|---|
| Direção de arte | `.claude/skills/frontend-design/SKILL.md` | Anti-template: ponto de vista visual, tipografia, restrição, autocrítica |
| Inteligência de UI/UX | `.claude/skills/ui-ux-pro-max/` | Base pesquisável: 79 estilos, 192 paletas por nicho, 74 pares de fontes, 119 regras de UX, presets GSAP |
| Repertório Hope | `references/` deste skill | Direções visuais por nicho, receitas de motion leves, checklist SEO/AEO/GEO |

## Entrada esperada

`/site-hope <briefing>` — exemplos:
- `/site-hope clínica de fisioterapia em Brusque, público 40+, quer passar confiança e modernidade`
- `/site-hope landing de captação para escritório de advocacia trabalhista em Itajaí, foco em WhatsApp`
- `/site-hope redesign de https://exemplo.com.br, manter logo e cores`

Extraia do briefing (e do site atual, se houver URL): **nome do negócio, nicho/serviço principal, cidade/área atendida, público, objetivo de conversão (WhatsApp, ligação, formulário, agendamento), diferenciais, ativos existentes (logo, cores, fotos, depoimentos, NAP)**.

Só pergunte o que **bloqueia** o trabalho (ex.: nome do negócio ausente). Todo o resto: assuma um padrão sensato, marque como `[[PREENCHER: ...]]` no conteúdo e liste as suposições no final. Nunca invente telefone, endereço, CNPJ, avaliações, números de clientes ou depoimentos — use placeholder explícito.

## Fluxo de trabalho

### 1. Estratégia antes do pixel (5 min de raciocínio, não de texto)
- Intenção de busca principal e 3–6 perguntas reais do cliente final (viram H2 em formato de pergunta).
- Entidade: o que o Google/IA precisa entender (tipo de `LocalBusiness`, serviços, cidade, pessoa responsável).
- Arquitetura: landing única ou site multi-página (home + páginas de serviço + sobre + contato). Máximo 3 cliques do index.

### 2. Design system com dados
Rode da raiz do repo:
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<nicho> <público> <palavras de estilo>" --design-system -p "<Nome do Cliente>" --variance <1-10> --motion <1-10> --density 3
```
- `--variance`: 3–5 para saúde/jurídico/contábil; 6–8 para estética, gastronomia, arquitetura, eventos.
- `--motion`: 2–4 por padrão (performance > espetáculo); 5–7 só quando o briefing pedir algo "impactante" e o peso for controlado.
- Complementos úteis: `--domain typography`, `--domain color`, `--domain landing`, `--domain gsap`, `--stack html-tailwind`.

Trate o resultado como **matéria-prima**, não como resposta final. Cruze com `references/direcoes-visuais.md` e passe pelo filtro do passo 3.

### 3. Plano de design + revisão anti-template
Siga o processo de `.claude/skills/frontend-design/SKILL.md` (leia o arquivo). Produza um plano compacto:
- **Cor**: 4–6 hex nomeados, com contraste AA verificado para texto.
- **Tipo**: 1–2 famílias do Google Fonts, escala tipográfica, papéis.
- **Layout**: wireframe ASCII da home (e de 1 página de serviço se multi-página).
- **O elemento memorável**: UMA coisa que faz o site ser lembrado (ex.: hero com foto recortada + tipografia gigante, mapa ilustrado da área atendida, antes/depois interativo). Todo o resto, disciplinado.
- **Motion**: no máximo 1 momento orquestrado + micro-interações de resposta (ver `references/motion.md`).

Revise contra o briefing: se qualquer parte parece o padrão que você faria para qualquer cliente parecido, troque e diga o que mudou. Mostre o plano ao usuário em poucas linhas e siga construindo (não espere aprovação, a menos que ele tenha pedido).

### 4. Construção
Padrão de entrega (salvo outra instrução ou stack já existente no repo):
- **HTML semântico + CSS moderno + JS vanilla**, sem build. Tailwind só se o usuário pedir.
- Pasta: `projetos/<slug-do-cliente>/` com `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/`, `robots.txt`, `sitemap.xml`, `llms.txt`. Páginas de serviço em `servicos/<slug>/index.html`.
- CSS: tokens em `:root` (cores, tipo, espaços, raios, sombras, durações), mobile-first, `clamp()` para tipografia fluida, `@media (prefers-reduced-motion: reduce)`.
- Imagens: `width`/`height` explícitos, `loading="lazy"` abaixo da dobra, `fetchpriority="high"` + `<link rel="preload">` na imagem herói, formatos WebP/AVIF. Sem foto real? Use composições em SVG/CSS ou placeholders com proporção fixa e `alt` descritivo `[[PREENCHER]]` — nunca fotos de banco genéricas apresentadas como do cliente.
- Fontes: `preconnect` + `display=swap`, no máximo 2 famílias e 4 pesos no total.
- JS: `defer`, nada bloqueando render; bibliotecas só via cdnjs com versão exata (ex.: GSAP) e apenas se a receita CSS não resolver.
- Conteúdo e SEO/AEO/GEO: aplique **todo** o `references/checklist-seo-aeo-geo.md`.
- Conversão: CTA primário visível na primeira dobra mobile, botão WhatsApp com mensagem pré-preenchida (`https://wa.me/55DDDNUMERO?text=...`), telefone clicável `tel:+55...`, prova social no topo.

### 5. QA visual e técnico (obrigatório)
```bash
node .claude/skills/site-hope/scripts/qa.mjs projetos/<slug>/index.html
```
O script tira screenshots em 390px e 1440px (página inteira) em `projetos/<slug>/_qa/` e reporta: nós do DOM, H1 único, imagens sem dimensão/alt, JSON-LD válido, meta description, canonical, overflow horizontal e erros de console.
**Abra os screenshots com Read e critique como diretor de arte**: hierarquia, respiro, contraste, alinhamento, o elemento memorável funciona? Corrija e rode de novo. Mínimo 1 rodada de correção.

Depois rode também os skills de revisão quando fizer sentido: `design:accessibility-review` e `searchfit-seo:seo-check`.

### 6. Entrega
Resposta final curta, no modelo tripartite da agência:
1. **Engenharia do Site** — o que foi construído, direção visual escolhida e por quê (2–3 linhas), caminho dos arquivos, resultado do QA.
2. **Alinhamento no GMN** — NAP exato a usar no perfil (igual ao schema), categoria principal sugerida, 3 ideias de post e nomes de arquivo de foto com entidade + cidade.
3. **Google Ads** — palavra-chave gatilho que já está no H1/title/primeiro parágrafo de cada página de destino, sugestão de grupos de anúncio.
Feche com a lista de `[[PREENCHER]]` pendentes e o próximo passo acionável.

Se o usuário quiser mostrar para o prospect, ofereça publicar como Artifact (página privada com link) ou deploy de preview via Netlify.

## Regras inegociáveis
- Mobile-first de verdade: o lead local vem do celular. Revise o screenshot de 390px antes do desktop.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms, DOM < 1000 nós. Motion nunca pode piorar isso.
- Conteúdo extraível sem JS: tudo que importa para SEO/IA está no HTML inicial.
- Schema bate com o texto visível. Nada declarado que não está na página.
- Acessibilidade AA: contraste 4.5:1, foco visível, alvos de toque ≥ 44px, `alt` real.
- Copy em português do Brasil, voz do negócio do cliente, frases curtas, sem jargão de agência. Resposta direta (40–60 palavras) logo abaixo de cada H2 em pergunta.
