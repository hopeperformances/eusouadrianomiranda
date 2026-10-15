# Centro Dra. Thuelen Mellão — redesign 2026-10

Site estático (HTML + CSS inline, ~2 KB de JS), substitui a SPA React em https://centrodrathuelen.netlify.app/.

- `src/template.html`, `src/casos.json`, `src/build.py` → fonte
- `dist/` → pasta publicável no Netlify (publish directory)
- Build: `python3 src/build.py`

Deploy: Netlify site id b6f05d80-312e-4e63-9ec8-9e782175f12c (centrodrathuelen). Publicar a pasta `dist/` (contém netlify.toml sem build). Último deploy: 6ad1015aa5c451f24efcfd67 (2026-10-15).

Pendências com a cliente: horários por unidade, convênios aceitos, domínio próprio (atualizar canonical/sitemap/schema), coordenadas exatas das unidades (geo no schema), link do perfil no Google.
