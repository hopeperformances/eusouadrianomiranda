# PROMPT 1 — Instalar as melhores skills de design (anti "cara de IA")

Copie tudo abaixo da linha e cole no Astra.

---

Você vai montar meu kit de skills de design para construir sites que NÃO tenham "cara de IA". Trabalhe direto no GitHub e no sistema de arquivos do projeto.

## Objetivo
Baixar, revisar e instalar skills de design de site de alta qualidade, com licença permissiva (MIT/Apache), na pasta de skills do agente (`.claude/skills/` ou a pasta equivalente que você usa), prontas para usar em todos os projetos de site da agência.

## Repositórios a instalar (prioridade nesta ordem)
1. **pbakaus/impeccable** (Apache 2.0) — pasta `.claude/skills/impeccable`. Auditoria e acabamento: `audit`, `critique`, `polish`, `typeset`, `colorize`, `bolder`, `quieter`, `layout`, `animate`. Tem detector determinístico de anti-padrões de IA.
2. **Nutlope/hallmark** (MIT) — pasta `skills/hallmark`. Variedade estrutural: 21 temas e 21 macroestruturas. Verbo `study <URL>` extrai o DNA visual de um site de referência.
3. **leonxlnx/taste-skill** (MIT) — pastas `skills/taste-skill` (instalar como `design-taste-frontend`) e `skills/redesign-skill` (instalar como `redesign-existing-projects`). Direção de arte baseada em 247 sites premiados, com inspeção em navegador real e ciclo de screenshot.
4. **anthropics/skills** (Apache 2.0) — pasta `skills/frontend-design`. Base oficial da Anthropic.
5. **emilkowalski/skill** (MIT) — pasta `skills/emil-design-eng`. Microinterações e motion com critério.

Antes de instalar, pesquise no GitHub se surgiu algo melhor e mais bem avaliado (mais estrelas, commits recentes, licença permissiva). Busque por "anti AI slop design skill", "claude code design skill", "frontend design skill". Avalie também superdesigndev/superdesign-skill e oil-oil/oil-ui. Só adicione um repositório novo se ele for claramente superior a algum da lista; justifique a troca.

## Regras de instalação
- Clone raso (`--depth 1`) numa pasta temporária. Nunca rode scripts de dentro do repositório baixado durante a instalação.
- Copie só a pasta da skill, mais o `LICENSE` do repositório de origem dentro dela.
- O nome da pasta deve bater com o campo `name:` do `SKILL.md`.
- Leia os scripts que vêm junto e me diga o que cada um acessa na rede. Já sei de dois: o taste-skill busca fotos de domínio público (Openverse, Wikimedia, Met) e o impeccable baixa o próprio binário das releases do GitHub.
- Anote o commit (hash) de cada skill instalada.

## Entregáveis
1. As skills instaladas e funcionando, conferidas listando as skills disponíveis.
2. Um `README.md` na pasta de skills com: tabela (skill, origem, licença, quando usar), commits instalados, fluxo recomendado e o **Gate técnico Hope** abaixo.
3. Commit e push com mensagem clara.

## Fluxo recomendado (escreva no README)
1. Fazer o briefing de entidade: serviço, cidade, cliente ideal (ICP), prova real e diferencial.
2. `hallmark study` em 1–2 sites de referência que o cliente admira, se houver.
3. `design-taste-frontend` ou `hallmark` para definir direção e estrutura. Gerar no mínimo 3 direções diferentes e deixar eu escolher antes de construir.
4. `impeccable audit` para caçar os anti-padrões de IA.
5. `impeccable polish` + `emil-design-eng` no acabamento.
6. Passar pelo Gate técnico Hope antes do deploy.

## Gate técnico Hope (inegociável sobre qualquer decisão estética)
- Core Web Vitals no mobile: LCP < 2.5s, CLS < 0.1, INP < 200ms. No máximo 2 famílias de fonte, `font-display: swap`. Imagem herói em WebP/AVIF com `width`/`height` e `fetchpriority="high"`.
- Motion só com `transform`/`opacity`, sempre respeitando `prefers-reduced-motion`.
- Conteúdo legível sem JavaScript: H1 único, H2 em formato de pergunta, resposta de 40–60 palavras no topo de cada bloco, perguntas e respostas visíveis.
- JSON-LD (`LocalBusiness`/subtipo, `Organization`, `Person`, `BreadcrumbList`) batendo com o texto visível e com nome, endereço e telefone do Google Meu Negócio.
- CTA de WhatsApp/telefone visível na primeira tela do celular. Prova social perto do topo.
- Acessibilidade: contraste AA e alvos de toque ≥ 44px.
- `robots.txt` liberando GPTBot, PerplexityBot, ClaudeBot e Google-Extended; `sitemap.xml`; `llms.txt`.
