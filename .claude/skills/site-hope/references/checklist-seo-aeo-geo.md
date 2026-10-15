# Checklist SEO / AEO / GEO embutido no design

Aplicar em toda página entregue pelo `/site-hope`. Item não aplicável → justificar na entrega.

## Head
- [ ] `<html lang="pt-BR">`, `<meta charset>`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<title>` 50–60 caracteres: serviço principal + cidade + marca (ex.: `Fisioterapia em Brusque - SC | Clínica Movimento`)
- [ ] `<meta name="description">` única, 140–160 caracteres, com benefício + CTA
- [ ] `<link rel="canonical">` absoluto, apontando para a própria URL
- [ ] Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:url`, `og:locale` = `pt_BR`) e `twitter:card`
- [ ] Favicon SVG + `apple-touch-icon`
- [ ] Preload da imagem herói e `preconnect` das fontes

## Estrutura e conteúdo
- [ ] Um único H1 com a palavra-chave gatilho (a mesma usada no Google Ads) + cidade
- [ ] Primeiro parágrafo repete a keyword de forma natural e responde "o que é / para quem / onde"
- [ ] H2 em formato de pergunta real do cliente, cada um seguido de resposta direta de 40–60 palavras
- [ ] Bloco de perguntas frequentes **visível** (`<details>/<summary>` ou lista), 4–8 perguntas, incluindo "quanto custa" e "como funciona"
- [ ] Ao menos uma tabela ou lista objetiva (serviços, preços "a partir de", prazos, áreas atendidas) — formato que IA extrai
- [ ] Seção "Sobre" com pessoa responsável: nome, credencial (CRM/CREFITO/OAB/CRC…), experiência — E-E-A-T
- [ ] Prova social no topo (avaliação do Google com nota e quantidade reais, ou `[[PREENCHER]]`)
- [ ] Breadcrumb visível em páginas internas
- [ ] Links internos entre serviços do mesmo cluster; nenhuma página órfã
- [ ] Rodapé com NAP idêntico ao GMN, caractere a caractere, horário de atendimento e área atendida

## JSON-LD (um `<script type="application/ld+json">` com `@graph`)
- [ ] `LocalBusiness` (subtipo mais específico: `MedicalClinic`, `Dentist`, `LegalService`, `AccountingService`, `HomeAndConstructionBusiness`, `AutoRepair`, `Restaurant`, `BeautySalon`…) com `@id` = `<url>#business`, `name`, `url`, `telephone` em E.164 (`+5547…`), `address` (`PostalAddress` completo), `geo` (lat/long decimais), `areaServed`, `openingHoursSpecification`, `image`, `priceRange`, `sameAs`
- [ ] `Organization` / `WebSite` com `logo` e `sameAs` (Instagram, Facebook, LinkedIn, GMN `https://maps.google.com/?cid=…`)
- [ ] `Person` do responsável técnico, ligado via `founder`/`employee` ou `author`
- [ ] `Service` por serviço principal, com `provider` → `@id` do negócio e `areaServed`
- [ ] `BreadcrumbList` em páginas internas
- [ ] `aggregateRating` **somente** se as avaliações estiverem visíveis na página e forem reais
- [ ] Nada no schema que não esteja no texto visível; validar no Rich Results Test antes do deploy

## Arquivos de raiz
- [ ] `robots.txt` liberando `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Bingbot`, com `Sitemap:` absoluto
- [ ] `sitemap.xml` só com URLs canônicas 200
- [ ] `llms.txt` (formato llmstxt.org): `# Nome`, `> resumo de 1–2 frases com serviço + cidade`, seções com links para as páginas principais e uma linha de descrição cada

## Performance e acessibilidade
- [ ] Imagens com `width`/`height`, `alt` descritivo, nome de arquivo com entidade + cidade (`fisioterapia-ombro-brusque-sc.webp`)
- [ ] Abaixo da dobra: `loading="lazy"` e `decoding="async"`
- [ ] DOM < 1000 nós; JS com `defer`; nenhum CSS/JS de terceiro bloqueando render
- [ ] Contraste AA, foco visível, alvos ≥ 44px, `prefers-reduced-motion`
- [ ] Sem overflow horizontal em 360–390px

## Conversão
- [ ] CTA primário na primeira dobra mobile (WhatsApp com texto pré-preenchido ou ligação)
- [ ] CTA repetido após prova social e após FAQ
- [ ] Eventos prontos para GA4 (`data-event="whatsapp_click"`, `phone_click`, `form_submit`) para virar conversão no Ads
