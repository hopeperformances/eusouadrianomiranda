// Fonte única de verdade. Tudo aqui veio do site validado pela clínica.
// Não acrescentar dados (horários, notas, preços, coordenadas) sem confirmação no GMN.

import alinhadores from '../assets/img/alinhadores-invisiveis-brusque.webp';
import aparelhos from '../assets/img/aparelhos-ortodonticos-brusque.webp';
import facetas from '../assets/img/facetas-brusque.webp';
import implante from '../assets/img/implante-brusque.webp';
import lentes from '../assets/img/lentes-de-contato-brusque.webp';
import limpeza from '../assets/img/limpeza-brusque.webp';
import ronco from '../assets/img/ronco-brusque.webp';
import canal from '../assets/img/tratamento-de-canal-brusque.webp';

export const BRAND = {
  name: 'Centro Dra. Thuelen',
  doctor: 'Dra. Thuelen Mellão',
  role: 'Cirurgiã-Dentista',
  cro: 'CRO-SC 17911',
  city: 'Brusque',
  region: 'SC',
  instagram: 'https://www.instagram.com/centrodrathuelen/',
  areaServed: ['Brusque', 'Guabiruba', 'Botuverá', 'Nova Trento', 'Gaspar', 'São João Batista'],
};

export type Unit = {
  id: 'centro' | 'paqueta';
  name: string;
  short: string;
  street: string;
  district: string;
  postalCode?: string;
  whatsapp: string; // E.164 sem "+"
  phoneLabel: string;
  mapsUrl: string;
  embedUrl: string;
};

export const UNITS: Unit[] = [
  {
    id: 'centro',
    name: 'Unidade Centro',
    short: 'Centro',
    street: 'R. Rodrigues Alves, 249',
    district: 'Centro 1',
    postalCode: '88350-160',
    whatsapp: '5547996378901',
    phoneLabel: '(47) 99637-8901',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Rodrigues+Alves,+249+-+Centro+1,+Brusque+-+SC,+88350-160',
    embedUrl:
      'https://maps.google.com/maps?hl=pt-BR&q=R.+Rodrigues+Alves,+249+-+Centro+1,+Brusque+-+SC,+88350-160&t=&z=16&ie=UTF8&iwloc=B&output=embed',
  },
  {
    id: 'paqueta',
    name: 'Unidade Paquetá',
    short: 'Paquetá',
    street: 'R. Padre Antônio Eising, 262',
    district: 'Paquetá',
    whatsapp: '5547992499571',
    phoneLabel: '(47) 99249-9571',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Padre+Ant%C3%B4nio+Eising,+262+-+Paquet%C3%A1,+Brusque+-+SC',
    embedUrl:
      'https://maps.google.com/maps?hl=pt-BR&q=R.+Padre+Ant%C3%B4nio+Eising,+262+-+Paquet%C3%A1,+Brusque+-+SC&t=&z=16&ie=UTF8&iwloc=B&output=embed',
  },
];

export const wa = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const DEFAULT_WA = wa(UNITS[0].whatsapp, 'Olá! Vim pelo site e gostaria de agendar uma avaliação com a Dra. Thuelen.');

export const CREDENTIALS = [
  {
    kicker: '4 áreas',
    title: 'Formação Sólida',
    text: 'Especialista em quatro áreas, mestranda e MBA. Pesquisadora, gestora e empresária.',
  },
  {
    kicker: 'Sedação',
    title: 'Odontologia Sem Medo',
    text: 'Habilitada em sedação para crianças e adultos, oferecendo acolhimento sem traumas.',
  },
  {
    kicker: 'Laser',
    title: 'Tecnologia',
    text: 'Ampla experiência com laser de alta e baixa potência para conforto e recuperação.',
  },
  {
    kicker: '2 centros',
    title: 'Referência em Brusque',
    text: 'Dois centros odontológicos com bloco cirúrgico próprio, recebendo pacientes de todo o Brasil.',
  },
];

export const DIFFERENTIALS = [
  { title: 'Atendimento Humanizado', text: 'Você é ouvido e respeitado em todas as etapas, com acolhimento genuíno e muita empatia.' },
  { title: 'Ambiente Acolhedor', text: 'Uma clínica planejada para que você se sinta em casa, reduzindo toda a tensão do consultório.' },
  { title: 'Atenção aos Detalhes', text: 'Planejamento minucioso de cada caso, garantindo segurança estética e funcional irrepreensível.' },
  { title: 'Atendimento Infantil', text: 'Abordagem lúdica e cuidadosa para que as crianças cresçam sem traumas do dentista.' },
  { title: 'Explicações Claras', text: 'Sem termos difíceis. Você entende exatamente o que será feito e o porquê de cada etapa.' },
  { title: 'Acompanhamento Próximo', text: 'Estaremos ao seu lado antes, durante e após o tratamento para garantir os melhores resultados.' },
];

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  tag: string;
  text: string;
  img: ImageMetadata;
  alt: string;
  seoTitle: string;
  seoDesc: string;
  question: string;
};

export const TREATMENTS: Treatment[] = [
  {
    slug: 'lentes-de-contato-dental',
    title: 'Lentes de Contato',
    short: 'Lentes',
    tag: 'Estética',
    text: 'Lâminas ultrafinas de porcelana pura confeccionadas sob medida em laboratório para desenhar um sorriso harmonioso. Corrigem desgastes, formatos insatisfatórios, fraturas leves e espaçamentos (diastemas), preservando ao máximo a estrutura original do dente.',
    img: lentes,
    alt: 'Sorriso harmonioso com lentes de contato dental de porcelana',
    seoTitle: 'Lentes de Contato Dental em Brusque | Dra. Thuelen',
    seoDesc: 'Lentes de contato dental em porcelana pura, feitas sob medida em Brusque - SC. Corrigem formato, desgastes e diastemas preservando o dente. Agende pelo WhatsApp.',
    question: 'O que são lentes de contato dental?',
  },
  {
    slug: 'facetas-esteticas',
    title: 'Facetas Estéticas',
    short: 'Facetas',
    tag: 'Estética',
    text: 'Escultura manual feita dente a dente diretamente no consultório pelo profissional. É a opção mais ágil para corrigir imperfeições de formato, pequenas fraturas e tonalidades, renovando a estética do sorriso com excelente custo-benefício e resultados imediatos.',
    img: facetas,
    alt: 'Aplicação de faceta estética em dente anterior com pinça clínica',
    seoTitle: 'Facetas Estéticas em Brusque | Centro Dra. Thuelen',
    seoDesc: 'Facetas estéticas esculpidas dente a dente no consultório, em Brusque - SC. Corrigem formato, pequenas fraturas e cor com resultado imediato. Agende sua avaliação.',
    question: 'Como funcionam as facetas estéticas?',
  },
  {
    slug: 'alinhadores-invisiveis',
    title: 'Alinhadores Invisíveis',
    short: 'Alinhadores',
    tag: 'Ortodontia digital',
    text: 'A tecnologia mais moderna e discreta para o alinhamento dos dentes. Placas transparentes e personalizadas produzidas a partir do escaneamento digital 3D da sua boca, permitindo alimentação livre, higienização perfeita e previsibilidade total nos resultados.',
    img: alinhadores,
    alt: 'Paciente encaixando alinhador invisível transparente nos dentes',
    seoTitle: 'Alinhadores Invisíveis em Brusque | Dra. Thuelen',
    seoDesc: 'Alinhadores invisíveis planejados por escaneamento digital 3D em Brusque - SC. Discretos, removíveis e previsíveis. Agende sua avaliação pelo WhatsApp.',
    question: 'Como funcionam os alinhadores invisíveis?',
  },
  {
    slug: 'implantes-dentarios',
    title: 'Implantes Dentários',
    short: 'Implantes',
    tag: 'Reabilitação',
    text: 'Pinos de titânio fixados no osso maxilar que atuam como raízes artificiais extremamente firmes e seguras para a colocação de novos dentes. Devolvem 100% da sua capacidade mastigatória, previnem a perda óssea e restabelecem a segurança no seu dia a dia.',
    img: implante,
    alt: 'Implante dentário de titânio com coroa sendo posicionada',
    seoTitle: 'Implante Dentário em Brusque | Centro Dra. Thuelen',
    seoDesc: 'Implantes dentários de titânio com bloco cirúrgico próprio em Brusque - SC. Recupere a mastigação e a segurança para sorrir. Agende sua avaliação.',
    question: 'O que é um implante dentário?',
  },
  {
    slug: 'aparelhos-ortodonticos',
    title: 'Aparelhos Ortodônticos',
    short: 'Aparelhos',
    tag: 'Ortodontia',
    text: 'Correção precisa de problemas de mordida, apinhamentos ou espaçamentos excessivos. Utilizamos desde bráquetes tradicionais (metálicos ou de safira) até sistemas autoligáveis modernos para realinhar a arcada dentária, aliviando tensões na face e melhorando a mastigação.',
    img: aparelhos,
    alt: 'Sorriso com aparelho ortodôntico fixo de bráquetes',
    seoTitle: 'Aparelho Ortodôntico em Brusque | Dra. Thuelen',
    seoDesc: 'Aparelhos ortodônticos metálicos, de safira e autoligáveis em Brusque - SC. Corrija mordida, apinhamento e espaçamentos. Agende pelo WhatsApp.',
    question: 'Quais tipos de aparelho ortodôntico existem?',
  },
  {
    slug: 'limpeza-e-prevencao',
    title: 'Limpeza e Prevenção',
    short: 'Limpeza',
    tag: 'Prevenção',
    text: 'Profilaxia clínica profissional essencial para a manutenção da saúde bucal. Realiza a remoção detalhada de placas bacterianas invisíveis, manchas e tártaro endurecido com ultrassom, prevenindo doenças gengivais graves, sensibilidade extrema e cáries.',
    img: limpeza,
    alt: 'Limpeza dental profissional com ultrassom e espelho clínico',
    seoTitle: 'Limpeza Dental em Brusque | Centro Dra. Thuelen',
    seoDesc: 'Limpeza dental profissional com ultrassom em Brusque - SC. Remove tártaro, manchas e placa e previne doenças gengivais. Agende sua profilaxia.',
    question: 'O que é feito na limpeza dental profissional?',
  },
  {
    slug: 'tratamento-de-canal',
    title: 'Tratamento de Canal',
    short: 'Canal',
    tag: 'Endodontia',
    text: 'Tecnologia de ponta e anestesia localizada avançada para salvar o elemento dentário cuja estrutura interna (nervinho) sofreu danos por cárie profunda ou traumas. Restaura a saúde do dente de forma totalmente segura, confortável e livre de dor.',
    img: canal,
    alt: 'Tratamento de canal com isolamento absoluto e lima endodôntica',
    seoTitle: 'Tratamento de Canal em Brusque | Dra. Thuelen',
    seoDesc: 'Tratamento de canal com anestesia avançada em Brusque - SC para salvar o dente com segurança e conforto. Agende sua avaliação pelo WhatsApp.',
    question: 'Quando é preciso fazer tratamento de canal?',
  },
  {
    slug: 'ronco-e-bruxismo',
    title: 'Ronco e Bruxismo',
    short: 'Ronco e bruxismo',
    tag: 'Sono e DTM',
    text: 'Tratamento especializado para desordens do sono, tensões musculares e dores de cabeça ao acordar. Desenvolvemos placas miorrelaxantes personalizadas de alta tecnologia para proteger seus dentes contra o desgaste do bruxismo, além de aparelhos intraorais avançados para o controle do ronco e da apneia, devolvendo noites tranquilas e revigorantes.',
    img: ronco,
    alt: 'Homem dormindo de boca aberta, sinal de ronco noturno',
    seoTitle: 'Tratamento de Ronco e Bruxismo em Brusque | Dra. Thuelen',
    seoDesc: 'Placas miorrelaxantes e aparelhos intraorais para bruxismo, ronco e apneia em Brusque - SC. Volte a dormir bem. Agende sua avaliação.',
    question: 'Dentista trata ronco e bruxismo?',
  },
];

export const REVIEWS = [
  {
    name: 'Tainá de Souza',
    text: 'Excelente profissional! A Dra. Tuellen é extremamente humana, atenciosa e cuidadosa em cada detalhe. Dá para perceber o quanto ela é perfeccionista e dedicada ao que faz, sempre buscando o melhor para os pacientes. Além de uma ótima dentista, é uma pessoa maravilhosa, acolhedora e transmite muita confiança. Atendimento impecável do início ao fim. Recomendo de olhos fechados!',
  },
  {
    name: 'Gabriela Machado',
    text: 'Clínica completa e aconchegante, com profissionais extremamente capacitados. Dra Thuelen é excelente, sempre buscando se atualizar nos estudos, oferece um tratamento de qualidade e humano. Se preocupa com os seus pacientes como se fossem da sua família, só tenho elogios! 🙏💗',
  },
  {
    name: 'André Luiz Mafra',
    text: 'Tive problemas com meu dente por algum tempo. Fui atendido por outras duas clínicas, que me deram apenas uma solução temporária, logo voltava a doer. Assim que fui atendido, logo já me passaram um diagnóstico e demos início ao tratamento. Após colocar a coroa de metal/porcelana não tive mais problemas com o dente. Excelente atendimento! Recomendo!',
  },
];

export const FAQ = [
  {
    q: 'Como funciona a primeira avaliação?',
    a: 'A primeira consulta é o momento de ouvir você. A Dra. Thuelen faz uma avaliação cuidadosa e detalhada para entender suas necessidades, tirar dúvidas e construir um planejamento estruturado, focado na sua saúde e no seu conforto.',
  },
  {
    q: 'Em quais unidades posso ser atendido em Brusque?',
    a: 'São dois endereços em Brusque: a Unidade Centro (R. Rodrigues Alves, 249) e a Unidade Paquetá (R. Padre Antônio Eising, 262). Você escolhe a opção mais conveniente no momento do agendamento.',
  },
  {
    q: 'Vocês aceitam convênios?',
    a: 'Os atendimentos são particulares, para garantir o tempo necessário de um atendimento atencioso e humano e o uso de materiais de alta qualidade. A clínica fornece toda a documentação (recibos e laudos) para você solicitar reembolso ao seu plano de saúde.',
  },
  {
    q: 'Como funciona o atendimento infantil?',
    a: 'O atendimento infantil é pautado pela paciência e pela adaptação. A abordagem é lúdica e acolhedora, para que a criança crie uma relação de confiança com o ambiente odontológico e cresça sem trauma de dentista.',
  },
  {
    q: 'Tenho medo de dentista. Existe alguma opção?',
    a: 'Sim. A Dra. Thuelen é habilitada em sedação para crianças e adultos e trabalha com laser de alta e baixa potência para mais conforto e uma recuperação mais tranquila. Fale sobre o seu medo na avaliação: o plano é montado a partir dele.',
  },
  {
    q: 'Como faço para agendar minha consulta?',
    a: 'Pelo WhatsApp. Toque em "Agendar avaliação", escolha a unidade de sua preferência e a equipe retorna para encontrar o melhor horário para você.',
  },
];
