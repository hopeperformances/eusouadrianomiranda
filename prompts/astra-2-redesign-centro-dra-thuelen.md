# PROMPT 2 — Reformulação do site Centro Dra. Thuelen Mellão

Copie tudo abaixo da linha e cole no Astra (depois de rodar o Prompt 1).

---

Você vai reformular por completo o site do **Centro Dra. Thuelen Mellão**, clínica odontológica em Brusque - SC. Use as skills de design instaladas (`hallmark`, `design-taste-frontend`, `impeccable`, `frontend-design`, `emil-design-eng`, `redesign-existing-projects`).

## Contexto do pedido
O site atual está em https://centrodrathuelen.netlify.app/ (SPA React/Vite). Quando perguntada o que mudaria, a Dra. respondeu **"eu mudaria simplesmente tudo"** e especificou: **"a estrutura"**. O problema não é só imagem nem cor: é a arquitetura da página. Hoje a sequência é a de template (hero → números → sobre → diferenciais em cards → grid de especialidades → infantil → carrossel de resultados → depoimentos → FAQ → endereço → CTA → rodapé), com serifa itálica verde, que lê como "site de IA". O objetivo é superar a expectativa dela.

## Direção já testada e REPROVADA (não repetir)
Uma primeira versão foi feita e reprovada pelo dono da agência. Não reproduza esta linha:
- Hero escuro (quase preto) com título gigante em grotesca pesada "Dentista não é só sobre estética." e foto de paciente ao lado.
- Casos como faixas horizontais de arrastar, com o texto colado na lateral e numeração "CASO 01".
- Lista de tratamentos numerada por "dor" em tabela tipográfica.
- Bloco rosa de odontopediatria com foto em moldura polaroid e anotações em fonte manuscrita (Caveat).
- Paleta preto + bege + verde-azulado + rosa, com fonte Schibsted Grotesk.
Busque uma direção realmente diferente.

## Processo obrigatório
1. Rode `hallmark study https://centrodrathuelen.netlify.app/` para diagnosticar o atual.
2. Proponha **3 direções visuais e estruturais distintas** (moodboard em texto + wireframe da ordem das seções + paleta + par tipográfico + 1 screenshot de hero de cada). **Pare e espere eu escolher.**
3. Construa a direção escolhida.
4. Faça o loop de screenshot (desktop 1440 e mobile 390) e rode `impeccable audit` e `polish`.
5. **Publique primeiro como deploy de rascunho/preview** (não produção) e me mande o link. Só publique em produção quando eu aprovar.

## Stack e entrega
- HTML/CSS estático com o mínimo de JS (vanilla). Conteúdo legível sem JavaScript; nada de SPA.
- Deploy: Netlify, site `centrodrathuelen` (site id `b6f05d80-312e-4e63-9ec8-9e782175f12c`). Inclua `netlify.toml` com publish da pasta e sem build, se for estático.
- ⚠️ O Netlify desse site injeta sozinho um selo "Hope Performances Digitais" no rodapé (snippet com `class="hope-credit"`). **Não** coloque esse selo no HTML, senão aparece duplicado. Confira no deploy que existe só um.
- Salve o código-fonte num repositório Git e faça commit e push.

## Dados verificados da clínica
- **Nome:** Centro Dra. Thuelen Mellão. Razão social: Centro de Tratamento Avançado Odontológico Dra. Thuelen Mellão Ltda.
- **Responsável técnica:** Dra. Thuelen Caroline Mellão, cirurgiã-dentista, **CRO-SC 17911**.
- **Unidade Centro:** R. Rodrigues Alves, 249 - Centro I, Brusque - SC, 88350-160.
- **Unidade Paquetá:** R. Padre Antônio Eising, 262, Sala 01 - Paquetá, Brusque - SC, 88353-470. Um diretório antigo cita o nº 95, anexo do Hospital Azambuja; use o 262.
- **WhatsApp do site atual:** (47) 99121-4110 → `https://wa.me/5547991214110`. Um diretório lista (47) 9637-8901: **não use**, deixe como pendência.
- **Instagram da clínica:** @centrodrathuelen. Nome no perfil: "CENTRO DRA THUELEN MELLÃO | BRUSQUE"; 7,5 mil seguidores, 224 posts. Bio: "🏆 CENTRO AVANÇADO · Implante | Prótese | Lentes | Alinhadores | Ronco e DTM · Atend. especializado adulto e infantil · CEO @dentistathuelen".
- **Instagram/Threads pessoal:** @dentistathuelen (posta reels de humor/meme).
- **Dados que vêm do site atual (fornecidos pela clínica):**
  - especialista em 4 áreas, mestranda e MBA; pesquisadora, gestora e empresária;
  - habilitada em sedação para crianças e adultos;
  - laser de alta e baixa potência;
  - dois centros com bloco cirúrgico próprio, recebendo pacientes de todo o Brasil;
  - "mais de 10 anos na área da saúde".
- **Formação (fonte acadêmica, Escavador):** monografia de especialização em Dentística pela ABO-SC. Só use se a clínica confirmar.
- **Avaliação em diretório:** 4,9 com 73 avaliações. **Não publique sem conferir no Google Meu Negócio.**

## Serviços (da bio + site)
Implantes, próteses (fixa e móvel), lentes de contato dentais, facetas, clareamento, alinhadores invisíveis, aparelhos ortodônticos, ronco/bruxismo/DTM, tratamento de canal, limpeza e prevenção, odontopediatria, sedação.

## Voz da marca (tirada do Instagram dela, use como norte)
- Frase da Dra.: *"Desde sempre, sou fascinada pelo corpo humano. Ele é uma máquina perfeita... e o sorriso é a porta de entrada."* e *"Acredito que cada sorriso tem uma história."*
- Bordões dos posts:
  - "Dentista não é só sobre estética. Mas SIM sobre devolver: segurança, identidade, função, autoestima, qualidade de vida."
  - "Nem sempre a faceta é a melhor solução."
  - "Dente branco é muito diferente de dente artificial."
  - "Você não precisa fazer implantes para voltar a sorrir com segurança."
  - "Há coisas na vida tão bem feitas que a gente jura que sempre estiveram ali."
- Estética dos posts: fotografia real de pacientes em fundo preto/escuro, close de sorriso, texto curto sobreposto, anotações em letra cursiva fina, assinatura "DRA. THUELEN MELLÃO // ODONTOLOGIA". O tom é humano, sem promessa milagrosa, focado em naturalidade e planejamento.
- Identidade: monograma "TM" rosa sobre verde-petróleo (#006D6A; rosa ≈ #D8B6BB). Recepção com tons bege/fendi, madeira clara e luz indireta.

## Ativos disponíveis (baixe do site atual)
Base: `https://centrodrathuelen.netlify.app`
- `/logo.png` (monograma, 720×720)
- `/dra-thuelen-clean.webp`: a Dra. sentada à mesa, blusa rosa, logo atrás
- `/hero-image-new.webp`: recepção da clínica
- `/odontopediatria.webp`: a Dra. abraçada a uma criança paciente
- `/especialidades/*.webp` (8 imagens: alinhadores_invisiveis, aparelhos_ortodonticos, facetas, implante, lentes_de_contato, limpeza, ronco, tratamento_de_canal). ⚠️ São closes de lábios com aspecto de banco de imagem ou IA: **evite ou use no mínimo**.
- `/resultados/{1..10}/{n}.webp`: carrosséis REAIS do Instagram, com o texto já embutido na imagem (900×1200). Mais `/resultados/7/7.mp4` (vídeo).

| Pasta | Arquivos | Do que se trata |
|---|---|---|
| 1 | 1–6 | Adolescente de 15 anos: "Doutora, meu espacinho voltou" (diastema reaberto após aparelho); "Nem sempre a faceta é a melhor solução" |
| 2 | 1–4 | "Dente branco ≠ dente artificial": facetas naturais, moça jovem |
| 3 | 1–8 | Homem maduro: "Dentista não é só sobre estética"; resultado "sem cara de lente", sem perder a masculinidade |
| 4 | 1–5 | Senhora loira: "Reabilitação total vai muito além da estética" (função, segurança, conforto, autoestima) |
| 5 | 1–6 | Facetas: ela "controlava a gargalhada", evitava fotos |
| 6 | 1–3 | Senhora idosa: "Transformar sorrisos é, no fundo, transformar vidas, inclusive a nossa" |
| 7 | 1–6, 8–10 (.webp) + 7.mp4 | "Esse é o Juliano": trabalha com o público, escondia o sorriso, mordida cruzada (função + estética) |
| 8 | 1–3 | Homem jovem: "sensação de pertencimento", resultado natural |
| 9 | 1–7 | Senhora: "Nem todo paciente quer implantes": prótese móvel bem planejada, conforto e dignidade |
| 10 | 1–2 | Antes e depois de um homem careca |

Converta para WebP otimizado (~600–900px de largura), com nomes de arquivo descritivos e ALT específico.

## Depoimentos reais (do Google, já no site atual)
- **Tainá de Souza:** "Excelente profissional! A Dra. é extremamente humana, atenciosa e cuidadosa em cada detalhe. Dá para perceber o quanto ela é perfeccionista e dedicada ao que faz... Atendimento impecável do início ao fim. Recomendo de olhos fechados!"
- **Gabriela Machado:** "Clínica completa e aconchegante, com profissionais extremamente capacitados. Dra Thuelen é excelente, sempre buscando se atualizar nos estudos, oferece um tratamento de qualidade e humano..."
- **André Luiz Mafra:** "Tive problemas com meu dente por algum tempo. Fui atendido por outras duas clínicas, que me deram apenas uma solução temporária... Após colocar a coroa de metal/porcelana não tive mais problemas com o dente. Excelente atendimento!"

## Requisitos de SEO/AEO/GEO
- `<title>` (50–60 caracteres) e meta description únicos, com "Dentista em Brusque".
- H1 único com entidade + cidade. H2 em formato de pergunta. Resposta direta de 40–60 palavras no topo: quem é a clínica, onde fica, o que trata, CRO.
- Perguntas e respostas visíveis. No mínimo:
  - Como funciona a primeira avaliação?
  - Atendem com sedação?
  - Lente ou faceta: qual a diferença?
  - Quanto custa lente de contato dental em Brusque? (sem inventar preço)
  - Implante ou prótese?
  - Atendem crianças?
  - Quais unidades?
  - Aceitam convênio? (direcionar ao WhatsApp)
- JSON-LD `@graph`:
  - `Dentist` (organização) com `legalName`, logo e `sameAs` do Instagram;
  - 2 `Dentist` (uma por unidade) com `PostalAddress` completo;
  - `Person` da Dra. com `identifier` CRO-SC 17911 e `sameAs` @dentistathuelen;
  - `WebSite`.
  - **Não** inclua `geo` nem `openingHours` sem dados confirmados.
- `robots.txt` liberando bots de IA, `sitemap.xml` e `llms.txt` com resumo da clínica.
- Canonical apontando para a URL de produção.
- CTA de WhatsApp com mensagem pré-preenchida, botão fixo no mobile.

## Nunca invente
Horários, preços, convênios, número de pacientes, anos de clínica além do informado, nota do Google, prêmios. Onde faltar dado, deixe a pendência listada no README.

## Pendências para eu levar à cliente (liste no final)
- Horários de cada unidade.
- Convênios aceitos.
- Confirmar o WhatsApp oficial.
- Autorização de uso de imagem dos pacientes.
- Domínio próprio.
- Link do perfil no Google Meu Negócio das duas unidades.
- Coordenadas exatas das unidades.
- Confirmar as 4 especialidades da Dra. para citar por nome.
