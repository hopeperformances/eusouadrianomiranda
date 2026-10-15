# Centro Dra. Thuelen Mellão — redesign 2026-10

Site estático (HTML + CSS inline, ~2 KB de JS), substitui a SPA React em https://centrodrathuelen.netlify.app/.

- `src/template.html`, `src/casos.json`, `src/build.py` → fonte
- `dist/` → pasta publicável no Netlify (publish directory)
- Build: `python3 src/build.py`

Deploy manual: Netlify → site centrodrathuelen → Deploys → arraste a pasta `dist/`.

Pendências com a cliente: horários por unidade, convênios aceitos, domínio próprio (atualizar canonical/sitemap/schema), coordenadas exatas das unidades (geo no schema), link do perfil no Google.
