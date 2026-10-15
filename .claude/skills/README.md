# Kit de design da Hope Performance Digitais

Skills versionadas neste repositório. Toda sessão do Claude Code aberta com este repo carrega estas skills automaticamente — não precisa instalar nada.

| Comando | O que faz | Origem |
|---|---|---|
| `/site-hope <briefing>` | Fluxo completo: estratégia → design system → plano anti-template → código → QA com screenshots → entrega tripartite (Site / GMN / Ads) | Hope (este repo) |
| `/frontend-design` | Direção de arte distinta, tipografia, restrição, autocrítica | [anthropics/skills](https://github.com/anthropics/skills) — Apache 2.0 (commit `dbd4588`) |
| `/ui-ux-pro-max` | Base pesquisável offline: estilos, paletas por nicho, pares de fontes, regras de UX, presets GSAP, guias por stack | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — MIT (commit `56ea9cf`) |

Normalmente basta o `/site-hope`; ele chama os outros dois.

## Exemplos
```
/site-hope clínica de fisioterapia em Brusque, público 40+, passar confiança e modernidade, conversão por WhatsApp
/site-hope landing de captação para advocacia trabalhista em Itajaí
/site-hope redesign de https://exemplo.com.br mantendo logo e cores
```
Os projetos saem em `projetos/<slug-do-cliente>/`.

## Comandos diretos úteis
```bash
# Design system para um nicho
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dental clinic premium trust" --design-system -p "Cliente" --variance 5 --motion 3

# Pares de fontes / paletas / animações
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant editorial" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "law firm" --domain color
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "scroll pin section" --domain gsap

# QA com screenshots mobile/desktop
node .claude/skills/site-hope/scripts/qa.mjs projetos/<slug>/index.html
```

## Atualizar as skills de terceiros
Copie de novo a pasta da skill do repositório de origem, revise o diff (`git diff .claude/skills`) e reaplique o ajuste de caminho do script no `ui-ux-pro-max/SKILL.md` (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py`).
