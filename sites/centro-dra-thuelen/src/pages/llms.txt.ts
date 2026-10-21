import type { APIRoute } from 'astro';
import { BRAND, UNITS, TREATMENTS, CREDENTIALS, FAQ } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const body = `# ${BRAND.name}

> Consultório odontológico em Brusque - SC, com duas unidades (Centro e Paquetá). Responsável técnica: ${BRAND.doctor}, ${BRAND.role}, ${BRAND.cro}. Atendimento particular para crianças e adultos, com recibos e laudos para reembolso de plano de saúde.

## Sobre a ${BRAND.doctor}
${CREDENTIALS.map((c) => `- ${c.k} ${c.label}: ${c.text}`).join('\n')}
- Habilitada em sedação para crianças e adultos; experiência com laser de alta e baixa potência.
- Planejamento de sorriso (Smile Design) com fotografia profissional, simulação digital de antes e depois e escolha de cor em escala.
- Atualização internacional: esteve no King's College London, referência mundial em Odontologia.
- Instagram da Dra.: ${BRAND.instagramDra}

## Unidades
${UNITS.map((u) => `- ${u.name}: ${u.street} – ${u.district}, Brusque - SC${u.postalCode ? `, ${u.postalCode}` : ''}. WhatsApp: ${u.phoneLabel} (https://wa.me/${u.whatsapp}). ${u.perks.join('. ')}.`).join('\n')}
- Região atendida: ${BRAND.areaServed.join(', ')}.

## Tratamentos
${TREATMENTS.map((t) => `- [${t.title}](${base}/tratamentos/${t.slug}/): ${t.text}`).join('\n')}
- Odontopediatria: abordagem lúdica e acolhedora para crianças crescerem sem trauma de dentista.

## Perguntas frequentes
${FAQ.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Links
- Site: ${base}/
- Instagram: ${BRAND.instagram}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
