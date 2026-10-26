// Fonte única de verdade. Fatos vêm do site validado pela clínica e dos posts
// públicos de @centrodrathuelen e @dentistathuelen. Não acrescentar dados
// (horários, notas, preços, coordenadas) sem confirmação no GMN.

import imgLentes from '../assets/img/real/paciente-teste-sorriso-espelho-dra-thuelen.jpg';
import imgFacetas from '../assets/img/real/escolha-de-cor-lentes-facetas-brusque.jpg';
import imgAlinhadores from '../assets/img/real/escaneamento-intraoral-digital-dra-thuelen.jpg';
import imgImplantes from '../assets/img/real/consultorio-odontologico-centro-brusque.jpg';
import imgAparelhos from '../assets/img/real/ortopedia-funcional-maxilares-mordida-cruzada.jpg';
import imgOrtopedia from '../assets/img/real/ortopedia-funcional-maxilares-crianca-brusque.jpg';
import imgLimpeza from '../assets/img/real/consultorio-odontologico-unidade-centro.jpg';
import imgCanal from '../assets/img/real/sala-de-atendimento-dra-thuelen-brusque.jpg';
import imgRonco from '../assets/img/real/dra-thuelen-consulta-avaliacao-brusque.jpg';

import res1 from '../assets/img/real/resultado-sorriso-natural-paciente-1-brusque.jpg';
import res2 from '../assets/img/real/resultado-sorriso-natural-paciente-2-brusque.jpg';
import res3 from '../assets/img/real/resultado-sorriso-natural-paciente-3-brusque.jpg';
import res4 from '../assets/img/real/resultado-sorriso-natural-paciente-4-brusque.jpg';

export const BRAND = {
  name: 'Centro Dra. Thuelen',
  doctor: 'Dra. Thuelen Mellão',
  role: 'Cirurgiã-Dentista',
  cro: 'CRO-SC 17911',
  city: 'Brusque',
  region: 'SC',
  instagram: 'https://www.instagram.com/centrodrathuelen/',
  instagramDra: 'https://www.instagram.com/dentistathuelen/',
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
  perks: string[];
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
    perks: ['Estacionamento próprio', 'Espaço kids com brinquedoteca'],
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
    perks: ['Mesmo padrão de atendimento'],
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Padre+Ant%C3%B4nio+Eising,+262+-+Paquet%C3%A1,+Brusque+-+SC',
    embedUrl:
      'https://maps.google.com/maps?hl=pt-BR&q=R.+Padre+Ant%C3%B4nio+Eising,+262+-+Paquet%C3%A1,+Brusque+-+SC&t=&z=16&ie=UTF8&iwloc=B&output=embed',
  },
];

export const wa = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const DEFAULT_WA = wa(UNITS[0].whatsapp, 'Olá! Vim pelo site e gostaria de agendar uma avaliação com a Dra. Thuelen.');

// Frases da campanha "Luxo é..." publicada pela clínica, uma por retrato real de paciente.
export const RESULTS = [
  { img: res1, quote: 'Luxo é sorrir com segurança, sem precisar tapar a boca.', alt: 'Paciente sorrindo com naturalidade após tratamento com a Dra. Thuelen em Brusque' },
  { img: res2, quote: 'Luxo é ter um resultado que complementa o seu rosto, não que rouba toda a atenção.', alt: 'Paciente com sorriso harmônico e natural, resultado do Centro Dra. Thuelen' },
  { img: res3, quote: 'É preservar o máximo possível da estrutura natural.', alt: 'Paciente sorrindo, tratamento estético que preserva a estrutura natural do dente' },
  { img: res4, quote: 'É ter dentes que respeitam seus lábios, seu sorriso e os traços do seu rosto.', alt: 'Paciente sorrindo com dentes proporcionais aos lábios e ao rosto' },
];

export const CREDENTIALS = [
  { k: '4', label: 'áreas de especialização', text: 'Especialista em quatro áreas, mestranda e MBA. Pesquisadora, gestora e empresária.' },
  { k: '10+', label: 'anos na saúde', text: 'Mais de 10 anos dedicados à área da saúde, com a odontologia como verdadeira paixão.' },
  { k: '2', label: 'centros em Brusque', text: 'Duas unidades com bloco cirúrgico próprio, recebendo pacientes de todo o Brasil.' },
];

export type Treatment = {
  slug: string;
  title: string;
  short: string;
  tag: string;
  hook: string; // resumo factual em uma frase
  text: string; // descrição validada
  forYou: string[]; // derivado do texto validado
  img: ImageMetadata;
  alt: string;
  seoTitle: string;
  seoDesc: string;
  question: string;
};

export const TREATMENTS: Treatment[] = [
  {
    slug: 'lentes-de-contato-dental',
    title: 'Lentes de contato',
    short: 'Lentes',
    tag: 'Estética',
    hook: 'Porcelana feita sob medida para mudar formato, cor e tamanho dos dentes, preservando o dente natural.',
    text: 'Lâminas ultrafinas de porcelana pura, confeccionadas sob medida em laboratório para desenhar um sorriso harmonioso. Corrigem desgastes, formatos insatisfatórios, fraturas leves e espaçamentos (diastemas), preservando ao máximo a estrutura original do dente.',
    forYou: ['Seus dentes estão desgastados ou com formato que te incomoda', 'Existem espaços (diastemas) entre os dentes', 'Você quer mudar o sorriso preservando o dente natural'],
    img: imgLentes,
    alt: 'Paciente testando o novo sorriso no espelho durante o planejamento com a Dra. Thuelen',
    seoTitle: 'Lentes de Contato Dental em Brusque | Dra. Thuelen',
    seoDesc: 'Lentes de contato dental em porcelana pura, feitas sob medida em Brusque - SC. Sorriso natural que combina com o seu rosto, preservando o dente. Agende pelo WhatsApp.',
    question: 'O que são lentes de contato dental?',
  },
  {
    slug: 'facetas-esteticas',
    title: 'Facetas estéticas',
    short: 'Facetas',
    tag: 'Estética',
    hook: 'Correção feita dente a dente no consultório, com resultado na mesma sessão.',
    text: 'Escultura manual feita dente a dente, diretamente no consultório. É a opção mais ágil para corrigir imperfeições de formato, pequenas fraturas e tonalidades, renovando a estética do sorriso com excelente custo-benefício e resultados imediatos.',
    forYou: ['Um dente lascou ou tem formato irregular', 'A cor de alguns dentes não combina com o resto', 'Você busca um resultado rápido e com bom custo-benefício'],
    img: imgFacetas,
    alt: 'Escala de cores usada para escolher o tom ideal de facetas e lentes no Centro Dra. Thuelen',
    seoTitle: 'Facetas Estéticas em Brusque | Centro Dra. Thuelen',
    seoDesc: 'Facetas estéticas esculpidas dente a dente no consultório, em Brusque - SC. Corrigem formato, pequenas fraturas e cor com resultado imediato. Agende sua avaliação.',
    question: 'Como funcionam as facetas estéticas?',
  },
  {
    slug: 'alinhadores-invisiveis',
    title: 'Alinhadores invisíveis',
    short: 'Alinhadores',
    tag: 'Ortodontia digital',
    hook: 'Placas transparentes e removíveis, planejadas a partir do escaneamento 3D da sua boca.',
    text: 'A tecnologia mais moderna e discreta para alinhar os dentes. Placas transparentes e personalizadas, produzidas a partir do escaneamento digital 3D da sua boca, que permitem alimentação livre, higienização perfeita e previsibilidade nos resultados.',
    forYou: ['Você quer alinhar os dentes sem aparelho aparente', 'Prefere poder comer e escovar normalmente', 'Gosta de saber, antes de começar, onde o tratamento vai chegar'],
    img: imgAlinhadores,
    alt: 'Dra. Thuelen fazendo escaneamento intraoral digital 3D em paciente',
    seoTitle: 'Alinhadores Invisíveis em Brusque | Dra. Thuelen',
    seoDesc: 'Alinhadores invisíveis planejados por escaneamento digital 3D em Brusque - SC. Discretos, removíveis e previsíveis. Agende sua avaliação pelo WhatsApp.',
    question: 'Como funcionam os alinhadores invisíveis?',
  },
  {
    slug: 'ortopedia-funcional-dos-maxilares',
    title: 'Ortopedia funcional dos maxilares',
    short: 'Ortopedia infantil',
    tag: 'Crescimento facial',
    hook: 'Avaliação do crescimento da maxila e da mandíbula em crianças, enquanto ainda dá para direcionar esse crescimento.',
    text: 'Dentes nascendo amontoados ou os dentes de baixo à frente dos de cima podem ser sinal de que a maxila e a mandíbula não estão se desenvolvendo como deveriam. Na infância, o crescimento é um grande aliado do tratamento: identificar essas alterações cedo pode fazer toda a diferença nas possibilidades de correção.',
    forYou: ['Os dentes do seu filho estão nascendo sem espaço, amontoados', 'Os dentes de baixo ficam à frente dos de cima ao morder', 'Você quer entender se existe uma janela de tratamento agora'],
    img: imgOrtopedia,
    alt: 'Perfil de criança com radiografia lateral usada na avaliação de ortopedia funcional dos maxilares',
    seoTitle: 'Ortopedia Funcional dos Maxilares em Brusque | Dra. Thuelen',
    seoDesc: 'Avaliação de ortopedia funcional dos maxilares para crianças em Brusque - SC. Dentes amontoados e mordida invertida podem ser tratados durante o crescimento. Agende.',
    question: 'O que é ortopedia funcional dos maxilares?',
  },
  {
    slug: 'implantes-dentarios',
    title: 'Implantes dentários',
    short: 'Implantes',
    tag: 'Reabilitação',
    hook: 'Reposição de dentes perdidos com pino de titânio, feita no bloco cirúrgico da própria clínica.',
    text: 'Pinos de titânio fixados no osso que funcionam como raízes artificiais firmes e seguras para novos dentes. Devolvem a capacidade de mastigar, ajudam a prevenir a perda óssea e trazem de volta a segurança no dia a dia, com bloco cirúrgico próprio na clínica.',
    forYou: ['Você perdeu um ou mais dentes', 'Evita sorrir ou mastigar de um lado por insegurança', 'Quer uma solução fixa, sem prótese removível'],
    img: imgImplantes,
    alt: 'Consultório odontológico da Unidade Centro do Centro Dra. Thuelen em Brusque',
    seoTitle: 'Implante Dentário em Brusque | Centro Dra. Thuelen',
    seoDesc: 'Implantes dentários de titânio com bloco cirúrgico próprio em Brusque - SC. Recupere a mastigação e a segurança para sorrir. Agende sua avaliação.',
    question: 'O que é um implante dentário?',
  },
  {
    slug: 'aparelhos-ortodonticos',
    title: 'Aparelhos ortodônticos',
    short: 'Aparelhos',
    tag: 'Ortodontia',
    hook: 'Aparelho fixo metálico, de safira ou autoligável para corrigir mordida, dentes tortos e espaços.',
    text: 'Correção precisa de problemas de mordida, apinhamentos ou espaçamentos. Desde bráquetes tradicionais (metálicos ou de safira) até sistemas autoligáveis modernos, para realinhar a arcada, aliviar tensões na face e melhorar a mastigação.',
    forYou: ['Seus dentes estão tortos ou encavalados', 'A mordida não encaixa bem', 'Você prefere um aparelho fixo, metálico ou estético'],
    img: imgAparelhos,
    alt: 'Dra. Thuelen mostrando em um modelo odontológico como deve ser o encaixe da mordida',
    seoTitle: 'Aparelho Ortodôntico em Brusque | Dra. Thuelen',
    seoDesc: 'Aparelhos ortodônticos metálicos, de safira e autoligáveis em Brusque - SC. Corrija mordida, apinhamento e espaçamentos. Agende pelo WhatsApp.',
    question: 'Quais tipos de aparelho ortodôntico existem?',
  },
  {
    slug: 'limpeza-e-prevencao',
    title: 'Limpeza e prevenção',
    short: 'Limpeza',
    tag: 'Prevenção',
    hook: 'Limpeza com ultrassom para remover tártaro, placa e manchas e prevenir problemas na gengiva.',
    text: 'Profilaxia profissional essencial para a saúde bucal. Remove com ultrassom placas bacterianas invisíveis, manchas e tártaro endurecido, prevenindo doenças na gengiva, sensibilidade e cáries.',
    forYou: ['Faz tempo desde a sua última limpeza', 'Sua gengiva sangra ao escovar', 'Você percebe manchas ou tártaro'],
    img: imgLimpeza,
    alt: 'Cadeira e equipamentos do consultório da Unidade Centro em Brusque',
    seoTitle: 'Limpeza Dental em Brusque | Centro Dra. Thuelen',
    seoDesc: 'Limpeza dental profissional com ultrassom em Brusque - SC. Remove tártaro, manchas e placa e previne doenças na gengiva. Agende sua profilaxia.',
    question: 'O que é feito na limpeza dental profissional?',
  },
  {
    slug: 'tratamento-de-canal',
    title: 'Tratamento de canal',
    short: 'Canal',
    tag: 'Endodontia',
    hook: 'Tratamento para salvar o dente quando a cárie ou um trauma atinge o nervo.',
    text: 'Anestesia localizada avançada e tecnologia para salvar o dente cuja parte interna (o “nervinho”) foi atingida por cárie profunda ou trauma. Restaura a saúde do dente de forma segura e confortável.',
    forYou: ['Você sente dor forte ou latejante em um dente', 'O dente fica sensível ao quente ou ao frio por muito tempo', 'Já tentou soluções temporárias e a dor voltou'],
    img: imgCanal,
    alt: 'Sala de atendimento do Centro Dra. Thuelen com cadeira odontológica e poltronas',
    seoTitle: 'Tratamento de Canal em Brusque | Dra. Thuelen',
    seoDesc: 'Tratamento de canal com anestesia avançada em Brusque - SC para salvar o dente com segurança e conforto. Agende sua avaliação pelo WhatsApp.',
    question: 'Quando é preciso fazer tratamento de canal?',
  },
  {
    slug: 'ronco-e-bruxismo',
    title: 'Ronco e bruxismo',
    short: 'Ronco e bruxismo',
    tag: 'Sono e DTM',
    hook: 'Placa miorrelaxante para quem range os dentes e aparelho intraoral para ronco e apneia.',
    text: 'Tratamento para desordens do sono, tensões musculares e dores de cabeça ao acordar. Placas miorrelaxantes personalizadas protegem os dentes do desgaste do bruxismo, e aparelhos intraorais ajudam no controle do ronco e da apneia, devolvendo noites tranquilas.',
    forYou: ['Você range ou aperta os dentes à noite', 'Acorda com dor de cabeça ou na mandíbula', 'Alguém reclama do seu ronco'],
    img: imgRonco,
    alt: 'Dra. Thuelen explicando o plano de tratamento ao paciente em sua mesa de atendimento',
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
    q: 'Como é a primeira consulta?',
    a: 'A Dra. Thuelen conversa com você sobre o que te incomoda, examina com calma e, quando precisa, faz fotos ou escaneamento digital. No fim, explica o que pode ser feito, em quantas etapas e por quê.',
  },
  {
    q: 'Quanto custa o tratamento?',
    a: 'Depende do que for indicado para o seu caso, por isso o valor é passado depois da avaliação. Os atendimentos são particulares.',
  },
  {
    q: 'Vocês atendem convênio?',
    a: 'Não. O atendimento é particular, mas a clínica fornece recibo e laudo para você pedir reembolso ao seu plano de saúde.',
  },
  {
    q: 'As lentes de contato deixam o sorriso artificial?',
    a: 'Não precisam deixar. O formato é planejado de acordo com os seus lábios e o seu rosto, a cor é escolhida na escala junto com você e a ideia é preservar o máximo possível do dente natural.',
  },
  {
    q: 'Tenho medo de dentista. Tem sedação?',
    a: 'Tem. A Dra. Thuelen é habilitada em sedação para crianças e adultos e usa laser de alta e baixa potência para mais conforto. Avise sobre o medo no agendamento.',
  },
  {
    q: 'Com que idade levar meu filho para avaliar a mordida?',
    a: 'Não precisa esperar todos os dentes permanentes. Se os dentes estão nascendo amontoados ou os de baixo ficam à frente dos de cima ao morder, vale avaliar logo, porque o crescimento ajuda no tratamento.',
  },
  {
    q: 'Onde ficam as unidades? Tem estacionamento?',
    a: 'Unidade Centro: R. Rodrigues Alves, 249, Centro 1, com estacionamento próprio. Unidade Paquetá: R. Padre Antônio Eising, 262. As duas ficam em Brusque.',
  },
  {
    q: 'Como agendo?',
    a: 'Pelo WhatsApp da unidade que for mais prática para você. A equipe responde e combina o horário.',
  },
];

// Capítulos da home (padrão SPS): categoria + foto em tela cheia + serviços.
export const CHAPTERS = [
  { id: 'estetica', title: 'Lentes de contato e facetas', text: 'Lentes de porcelana feitas em laboratório ou facetas esculpidas no consultório para corrigir formato, cor, desgaste, pequenas fraturas e espaços entre os dentes.', items: ['lentes-de-contato-dental', 'facetas-esteticas'], extra: ['Smile Design'] },
  { id: 'ortodontia', title: 'Alinhadores e aparelhos', text: 'Alinhadores transparentes planejados pelo escaneamento 3D da boca, ou aparelho fixo metálico, de safira ou autoligável.', items: ['alinhadores-invisiveis', 'aparelhos-ortodonticos'], extra: [] },
  { id: 'infantil', title: 'Dentista infantil e ortopedia', text: 'Consulta com tempo para a criança se adaptar, espaço kids e avaliação do crescimento da maxila e da mandíbula.', items: ['ortopedia-funcional-dos-maxilares'], extra: ['Odontopediatria', 'Sedação infantil'] },
  { id: 'implantes', title: 'Implantes dentários', text: 'Reposição de dentes perdidos com implante de titânio, feita no bloco cirúrgico da própria clínica.', items: ['implantes-dentarios'], extra: [] },
  { id: 'geral', title: 'Limpeza, canal e check-up', text: 'Limpeza com ultrassom, tratamento de canal com anestesia localizada e acompanhamento da saúde da boca.', items: ['limpeza-e-prevencao', 'tratamento-de-canal'], extra: [] },
  { id: 'sono', title: 'Ronco e bruxismo', text: 'Placa miorrelaxante para quem range ou aperta os dentes e aparelho intraoral para ronco e apneia.', items: ['ronco-e-bruxismo'], extra: [] },
];
