"""Gera dist/ do site Centro Dra. Thuelen Mellão a partir de template.html + dados."""
import html, json, pathlib, shutil, urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, DIST = ROOT / "src", ROOT / "dist"
URL = "https://centrodrathuelen.netlify.app/"
PHONE = "5547991214110"


def wa(msg):
    return f"https://wa.me/{PHONE}?text=" + urllib.parse.quote(msg)


ICON_WA = ('<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.7 17.8L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.4A11.8 11.8 0 0 0 20.4 3.6z"/></svg>')

TRATS = [
    ("Perdi um ou mais dentes", "Implantes e próteses", "Implante, prótese fixa ou prótese móvel bem planejada. Nem todo paciente quer ou pode fazer implante, e existem caminhos para cada realidade."),
    ("Não gosto da cor ou da forma dos meus dentes", "Lentes de contato, facetas e clareamento", "O objetivo é um branco com textura e translucidez, que pareça seu. Às vezes a melhor solução nem é faceta."),
    ("Meus dentes estão tortos ou abriram espaço", "Alinhadores invisíveis e aparelhos", "Alinhadores transparentes ou aparelho ortodôntico, conforme o caso, para alinhar e fechar espaços com estabilidade."),
    ("Ronco, range os dentes ou sinto dor na mandíbula", "Ronco, bruxismo e DTM", "Diagnóstico e tratamento do ronco, do bruxismo e das disfunções da articulação (DTM), que afetam sono, dor de cabeça e desgaste dos dentes."),
    ("Sinto dor ou sensibilidade", "Canal e restaurações", "Tratamento de canal e restaurações para resolver a causa da dor, não só o sintoma."),
    ("Quero manter tudo saudável", "Limpeza e prevenção", "Consultas de rotina, limpeza profissional e acompanhamento para evitar tratamentos maiores no futuro."),
    ("Tenho medo de dentista", "Atendimento com sedação", "Sedação para adultos e crianças, conduzida por profissional habilitada, para tratar com tranquilidade."),
]

FAQ = [
    ("Como funciona a primeira avaliação?", "É o momento de ouvir você. A Dra. faz uma avaliação cuidadosa para entender o que incomoda, tirar dúvidas e montar um planejamento por etapas, focado na sua saúde e no seu conforto. Você sai sabendo o que será feito e por quê."),
    ("Tenho muito medo de dentista. Vocês atendem com sedação?", "Sim. A Dra. Thuelen Mellão é habilitada em sedação para crianças e adultos. Para quem tem medo ou precisa de um tratamento mais longo, a sedação permite fazer o procedimento com tranquilidade e segurança."),
    ("Qual a diferença entre lente de contato dental e faceta?", "As duas cobrem a face visível do dente. A lente é uma lâmina mais fina, indicada para mudanças sutis de cor e forma. A faceta é mais espessa e corrige alterações maiores. A indicação depende do seu caso, e às vezes nenhuma das duas é a melhor opção, como em espaços que reabrem entre os dentes."),
    ("Quanto custa lente de contato dental em Brusque?", "O valor depende de quantos dentes entram no plano, do material e do preparo necessário. Por isso o orçamento é feito depois da avaliação, com todas as etapas explicadas antes de começar."),
    ("Implante ou prótese: qual é melhor?", "Depende da sua saúde, dos seus objetivos e da sua realidade. O implante é fixo e muito estável. Uma prótese bem planejada também devolve conforto, função e estética. Na avaliação você conhece as opções e decide junto com a Dra."),
    ("Vocês atendem crianças?", "Sim. O atendimento infantil é lúdico e paciente, pensado para que a criança tenha uma boa memória do dentista. Quando necessário, há a opção de sedação."),
    ("Em quais unidades posso ser atendido?", "Em duas unidades em Brusque: no Centro (R. Rodrigues Alves, 249) e no Paquetá (R. Padre Antônio Eising, 262, sala 01)."),
    ("Vocês aceitam convênio?", "Convênios e formas de pagamento são confirmados diretamente com a equipe pelo WhatsApp (47) 99121-4110."),
]


def casos_html():
    casos = json.loads((SRC / "casos.json").read_text())
    out = []
    for k, c in enumerate(casos):
        imgs = []
        for j in range(1, c["n"] + 1):
            alt = html.escape(c["alts"][j - 1] if j - 1 < len(c["alts"]) else c["titulo"])
            lazy = "" if (k == 0 and j == 1) else ' loading="lazy"'
            imgs.append(f'<img src="/img/casos/caso-{c["id"]}-{j}.webp" width="600" height="800" alt="{alt}"{lazy} decoding="async">')
        chips = "".join(f"<li>{html.escape(t)}</li>" for t in c["tags"])
        hidden = " hidden" if k >= 4 else ""
        out.append(f'''    <article class="caso" id="caso-{c["id"]}"{hidden}>
      <div class="caso-txt">
        <span class="caso-n">CASO {k + 1:02d}</span>
        <h3>{html.escape(c["titulo"])}</h3>
        <p>{html.escape(c["resumo"])}</p>
        <ul class="chips">{chips}</ul>
      </div>
      <div class="strip-wrap">
        <div class="strip" tabindex="0" aria-label="Fotos do caso: {html.escape(c["titulo"])}">{"".join(imgs)}</div>
        <div class="strip-ctl"><button type="button" data-d="-1" aria-label="Foto anterior">←</button><button type="button" data-d="1" aria-label="Próxima foto">→</button><span>1 / {c["n"]}</span></div>
      </div>
    </article>''')
    return "\n".join(out)


def trats_html():
    out = []
    for i, (dor, nome, desc) in enumerate(TRATS, 1):
        link = wa(f"Olá! Vim pelo site e quero conversar sobre: {nome.lower()}.")
        out.append(f'''      <li><a class="trat-row" href="{html.escape(link)}" target="_blank" rel="noopener">
        <span class="i">{i:02d}</span><h3>{dor}</h3><p><b>{nome}</b>{desc}</p><span class="go">Conversar →</span>
      </a></li>''')
    return "\n".join(out)


def faq_html():
    return "\n".join(f'      <details{" open" if i == 0 else ""}><summary>{q}</summary><p>{a}</p></details>' for i, (q, a) in enumerate(FAQ))


def schema():
    org_id = URL + "#clinica"
    person = {"@type": "Person", "@id": URL + "#dra-thuelen", "name": "Thuelen Mellão", "honorificPrefix": "Dra.",
              "jobTitle": "Cirurgiã-dentista", "image": URL + "img/dra-thuelen-mellao.webp",
              "identifier": {"@type": "PropertyValue", "propertyID": "CRO-SC", "value": "17911"},
              "worksFor": {"@id": org_id}, "sameAs": ["https://www.instagram.com/dentistathuelen/"]}
    services = [n for _, n, _ in TRATS] + ["Odontopediatria"]
    def unit(uid, name, street, district, cep):
        return {"@type": "Dentist", "@id": URL + uid, "name": name, "parentOrganization": {"@id": org_id},
                "telephone": "+" + PHONE, "url": URL,
                "address": {"@type": "PostalAddress", "streetAddress": street, "addressLocality": "Brusque",
                            "addressRegion": "SC", "postalCode": cep, "addressCountry": "BR"},
                "areaServed": {"@type": "City", "name": "Brusque"}}
    org = {"@type": "Dentist", "@id": org_id, "name": "Centro Dra. Thuelen Mellão",
           "legalName": "Centro de Tratamento Avançado Odontológico Dra. Thuelen Mellão Ltda",
           "url": URL, "logo": URL + "img/logo-512.png", "image": URL + "img/recepcao-centro-dra-thuelen.webp",
           "telephone": "+" + PHONE, "priceRange": "$$",
           "address": {"@type": "PostalAddress", "streetAddress": "R. Rodrigues Alves, 249", "addressLocality": "Brusque",
                       "addressRegion": "SC", "postalCode": "88350-160", "addressCountry": "BR"},
           "areaServed": {"@type": "City", "name": "Brusque"},
           "founder": {"@id": person["@id"]}, "employee": {"@id": person["@id"]},
           "sameAs": ["https://www.instagram.com/centrodrathuelen/"],
           "knowsAbout": services,
           "subOrganization": [{"@id": URL + "#unidade-centro"}, {"@id": URL + "#unidade-paqueta"}]}
    graph = [org, person,
             unit("#unidade-centro", "Centro Dra. Thuelen Mellão · Unidade Centro", "R. Rodrigues Alves, 249", "Centro I", "88350-160"),
             unit("#unidade-paqueta", "Centro Dra. Thuelen Mellão · Unidade Paquetá", "R. Padre Antônio Eising, 262, Sala 01", "Paquetá", "88353-470"),
             {"@type": "WebSite", "@id": URL + "#site", "url": URL, "name": "Centro Dra. Thuelen Mellão", "inLanguage": "pt-BR", "publisher": {"@id": org_id}}]
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=1)


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()
    t = (SRC / "template.html").read_text()
    t = (t.replace("{{CASOS}}", casos_html()).replace("{{TRATS}}", trats_html()).replace("{{FAQ}}", faq_html())
          .replace("{{SCHEMA}}", schema()).replace("{{ICON_WA}}", ICON_WA)
          .replace("{{WA_KIDS}}", html.escape(wa("Olá! Vim pelo site e quero agendar uma avaliação para meu filho.")))
          .replace("{{WA}}", html.escape(wa("Olá! Vim pelo site e quero agendar uma avaliação."))))
    assert "{{" not in t, "placeholder sem substituir"
    (DIST / "index.html").write_text(t)
    shutil.copytree(ROOT / "img", DIST / "img")
    for f in ["favicon-32.png", "apple-touch-icon.png"]:
        shutil.copy(ROOT / f, DIST / f)
    for f in (SRC / "static").iterdir():
        shutil.copy(f, DIST / f.name)
    print("ok", (DIST / "index.html").stat().st_size, "bytes")


main()
