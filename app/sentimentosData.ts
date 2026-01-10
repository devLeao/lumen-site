// app/sentimentosData.ts

export interface MensagemDia {
  biblia: string;
  ref: string;
  oracao: string;
  imagem: string;
}

export interface SentimentosDB {
  [key: string]: MensagemDia[];
}

export const sentimentosDB: SentimentosDB = {
  // ========================================================================
  // Categoria: ANSIOSO (8 Variações)
  // Imagem: /fotos/ansiedade.jpg
  // ========================================================================
  ansioso: [
    {
      biblia: "Não andeis ansiosos por coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças.",
      ref: "Filipenses 4:6",
      oracao: "Senhor, acalma meu coração agitado. Tira de mim essa aflição que me consome e me impede de ver a Tua luz. Entrego em Tuas mãos o meu futuro, pois sei que cuidas de mim. Troco o meu medo pela Tua paz. Amém.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "Lança o teu cuidado sobre o Senhor, e ele te susterá; nunca permitirá que o justo seja abalado.",
      ref: "Salmo 55:22",
      oracao: "Pai, sinto um peso enorme no peito. Ajuda-me a confiar que Tu estás no controle de tudo. Não quero carregar o mundo nas costas. Toma minha ansiedade e me dá o Teu descanso sagrado.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "Quando a ansiedade já me dominava no íntimo, o teu consolo trouxe alívio à minha alma.",
      ref: "Salmo 94:19",
      oracao: "Espírito Santo, consolador, vem sobre mim agora. Quando meus pensamentos viram um turbilhão e não consigo dormir, sê Tu a minha calmaria e o meu refúgio seguro. Silencia as vozes do medo.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "Portanto, não se preocupem com o amanhã, pois o amanhã trará as suas próprias preocupações. Basta a cada dia o seu próprio mal.",
      ref: "Mateus 6:34",
      oracao: "Senhor, ensina-me a viver o hoje. Liberta-me da prisão do 'e se...' e ajuda-me a ver as bênçãos que já colocaste diante de mim neste exato momento. Eu confio na Tua providência diária.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
      ref: "João 14:27",
      oracao: "Jesus, Príncipe da Paz, eu recebo a Tua paz agora. Que ela guarde a minha mente e o meu coração. Expulsa todo terror noturno e toda angústia do dia. Eu escolho confiar em Ti.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "Humilhem-se, portanto, sob a poderosa mão de Deus, para que ele os exalte no tempo devido. Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês.",
      ref: "1 Pedro 5:6-7",
      oracao: "Deus Poderoso, reconheço que não posso controlar tudo. Humildemente solto as rédeas da minha vida e as entrego a Ti. Cuida do que eu não posso cuidar e resolve o que eu não posso resolver.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores.",
      ref: "Salmo 34:4",
      oracao: "Senhor, eu Te busco no meio desta tempestade. Responde-me com o Teu amor. Que a certeza da Tua presença seja maior do que qualquer medo que tente me paralisar. Eu sou livre em Ti.",
      imagem: "/fotos/ansiedade.jpg"
    },
    {
      biblia: "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
      ref: "Salmo 27:1",
      oracao: "Pai, Tu és a minha luz. Dissipa as sombras da dúvida e da incerteza. Fortalece o meu espírito para que eu possa enfrentar os desafios de cabeça erguida, sabendo que a vitória já é garantida em Teu nome.",
      imagem: "/fotos/ansiedade.jpg"
    }
  ],

  // ========================================================================
  // Categoria: GRATO (8 Variações)
  // Imagem: /fotos/gratidao.jpg
  // ========================================================================
  grato: [
    {
      biblia: "Deem graças ao Senhor, porque ele é bom. O seu amor dura para sempre!",
      ref: "Salmo 136:1",
      oracao: "Pai Amado, hoje meu coração transborda de gratidão. Obrigado pelo dom da vida, pelos livramentos que não vi e pelas bênçãos que recebi. Que minha vida seja um eterno cântico de louvor a Ti.",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
      ref: "1 Tessalonicenses 5:18",
      oracao: "Jesus, obrigado não só pelas alegrias, mas também pelos momentos difíceis que me fizeram crescer. Obrigado por nunca desistires de mim e por me amares incondicionalmente todos os dias.",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.",
      ref: "Salmo 103:2",
      oracao: "Senhor, perdoa-me quando reclamo e esqueço de tudo o que já fizeste por mim. Hoje, escolho lembrar da Tua fidelidade. Obrigado pelo pão na mesa, pelo teto sobre mim e pelo ar que respiro.",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.",
      ref: "Salmo 118:24",
      oracao: "Deus Criador, obrigado por este novo dia. É um presente Teu. Prometo vivê-lo com alegria e propósito, espalhando a gratidão por onde eu passar, como um reflexo do Teu amor.",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "Entrai pelas portas dele com gratidão, e em seus átrios com louvor; louvai-o, e bendizei o seu nome.",
      ref: "Salmo 100:4",
      oracao: "Santo Deus, entro na Tua presença com ações de graças. Tu és digno de toda honra. Obrigado pela minha família, pelos meus amigos e pela oportunidade de Te conhecer e Te servir.",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "Graças a Deus pelo seu dom inefável!",
      ref: "2 Coríntios 9:15",
      oracao: "Pai, obrigado pelo maior de todos os presentes: Teu Filho Jesus. Obrigado pela salvação, pelo perdão dos pecados e pela esperança da vida eterna. Nada se compara à Tua graça.",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "Te louvo, Pai, Senhor do céu e da terra, porque escondeste estas coisas aos sábios e cultos, e as revelaste aos pequeninos.",
      ref: "Mateus 11:25",
      oracao: "Senhor, obrigado por Te revelares a mim na simplicidade. Não preciso de grandes sinais, pois vejo o Teu cuidado nos pequenos detalhes do dia a dia. Meu coração se alegra em ser Teu filho(a).",
      imagem: "/fotos/gratidao.jpg"
    },
    {
      biblia: "O Senhor é a minha força e o meu escudo; nele confiou o meu coração, e fui socorrido; assim o meu coração salta de prazer, e com o meu canto o louvarei.",
      ref: "Salmo 28:7",
      oracao: "Deus Forte, obrigado por seres meu escudo e proteção. Quando olhei para trás, vi que Tu me sustentaste em cada passo. Minha gratidão é a minha oferta de amor a Ti hoje e sempre.",
      imagem: "/fotos/gratidao.jpg"
    }
  ],

  // ========================================================================
  // Categoria: CANSADO (8 Variações)
  // Imagem: /fotos/cansaco.jpg
  // ========================================================================
  cansado: [
    {
      biblia: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
      ref: "Mateus 11:28",
      oracao: "Jesus, sinto minhas forças se esgotarem. O peso do dia a dia está grande demais. Peço Teu descanso sagrado. Renova minhas energias, restaura minha esperança e deixa-me repousar em Teu abraço seguro.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
      ref: "Isaías 40:31",
      oracao: "Senhor, eu espero em Ti. Não tenho mais força humana, preciso da Tua força divina. Levanta-me, restaura-me e faz-me voar acima desta exaustão. Sopra Teu fôlego de vida sobre mim.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "Em paz me deito e logo adormeço, pois só tu, Senhor, me fazes viver em segurança.",
      ref: "Salmo 4:8",
      oracao: "Pai, minha mente não para e meu corpo reclama. Dá-me um sono reparador. Desligo-me agora dos problemas e ligo-me na Tua proteção. Guarda meu sono e prepara-me para um novo amanhecer.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "O Senhor é o meu pastor; de nada terei falta. Em verdes pastagens me faz repousar e conduz-me a águas tranquilas.",
      ref: "Salmo 23:1-2",
      oracao: "Bom Pastor, guia-me para as águas tranquilas. Minha alma tem sede de paz. Faz-me repousar na certeza de que Tu estás provendo tudo o que preciso, para que eu possa descansar sem preocupações.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "Não tenhas medo, que Eu estou contigo. Não te assustes, que Sou o teu Deus. Eu te dou coragem, sim, eu te ajudo.",
      ref: "Isaías 41:10",
      oracao: "Deus, estou exausto de lutar sozinho. Obrigado por me lembrares que estás comigo. Aceito a Tua ajuda, aceito a Tua coragem. Segura minha mão e caminha comigo quando meus pés falharem.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "Satisfarei à alma cansada, e toda a alma desfalecida saciarei.",
      ref: "Jeremias 31:25",
      oracao: "Senhor, Tu vês o meu cansaço profundo, aquele que o sono não cura. Vem saciar minha alma com Tua presença. Enche-me do Teu Espírito e devolve o brilho aos meus olhos.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "A minha presença irá contigo, e eu te darei descanso.",
      ref: "Êxodo 33:14",
      oracao: "Pai, não quero dar mais nenhum passo se a Tua presença não for comigo. O meu verdadeiro descanso não é um lugar, és Tu. Envolva-me na Tua glória e faz meu coração se aquietar.",
      imagem: "/fotos/cansaco.jpg"
    },
    {
      biblia: "Fizeste-nos para Ti, Senhor, e o nosso coração está inquieto enquanto não descansar em Ti.",
      ref: "Santo Agostinho",
      oracao: "Deus Eterno, parei de procurar descanso nas coisas do mundo. Volto-me para Ti, minha origem e meu fim. Que eu encontre em Teu amor o repouso que minha alma tanto anseia.",
      imagem: "/fotos/cansaco.jpg"
    }
  ],

  // ========================================================================
  // Categoria: TRISTE (8 Variações)
  // Imagem: /fotos/tristeza.jpg
  // ========================================================================
  triste: [
    {
      biblia: "Perto está o Senhor dos que têm o coração quebrantado e salva os de espírito oprimido.",
      ref: "Salmo 34:18",
      oracao: "Senhor, Tu conheces a dor que carrego no peito e as lágrimas que derramo em silêncio. Vem consolar minha alma, curar minhas feridas e transformar meu lamento em dança. Confio no Teu amor.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "O choro pode durar uma noite, mas a alegria vem pela manhã.",
      ref: "Salmo 30:5",
      oracao: "Deus de esperança, eu sei que essa dor vai passar. Dá-me paciência para atravessar essa noite escura, confiando que o sol da Tua alegria brilhará novamente em minha vida. Eu creio no amanhã.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "Bem-aventurados os que choram, pois serão consolados.",
      ref: "Mateus 5:4",
      oracao: "Jesus, recebo a Tua promessa de consolo. Enxuga minhas lágrimas com Teu manto de amor. Que o Teu Espírito Santo seja o bálsamo que cicatriza minha dor e me devolve o sorriso.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "Bendito seja o Deus... Pai das misericórdias e Deus de toda consolação, que nos consola em todas as nossas tribulações.",
      ref: "2 Coríntios 1:3-4",
      oracao: "Pai das Misericórdias, eu me refugio em Teu colo. O mundo não entende minha dor, mas Tu entendes. Abraça-me forte e deixa-me sentir que não estou sozinho(a) neste vale.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "Ele enxugará dos seus olhos toda lágrima. Não haverá mais morte, nem tristeza, nem choro, nem dor.",
      ref: "Apocalipse 21:4",
      oracao: "Senhor, anseio pelo dia em que a dor não existirá mais. Enquanto esse dia não chega, dá-me a visão do céu para suportar as dores da terra. Renova minha esperança na vida eterna.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "Por que você está assim tão triste, ó minha alma? Por que está assim tão perturbada dentro de mim? Ponha a sua esperança em Deus!",
      ref: "Salmo 42:5",
      oracao: "Minha alma, ouça a voz de Deus! Ele é a minha salvação. Senhor, eu ordeno à minha tristeza que saia em Teu nome. Eu escolho louvar-Te mesmo em meio à dor, pois és minha rocha.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
      ref: "1 Pedro 5:7",
      oracao: "Pai, esta tristeza trouxe muita ansiedade. Eu lanço tudo aos Teus pés agora. Cuida do meu coração ferido, restaura meus sonhos e ajuda-me a ver as cores da vida novamente.",
      imagem: "/fotos/tristeza.jpg"
    },
    {
      biblia: "O Senhor é o meu pastor; de nada terei falta. Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum.",
      ref: "Salmo 23:4",
      oracao: "Bom Pastor, estou no vale escuro, mas não temerei, pois o Teu cajado me consola. Guia-me para fora desta tristeza e conduz-me de volta à alegria da Tua salvação.",
      imagem: "/fotos/tristeza.jpg"
    }
  ],

  // ========================================================================
  // Categoria: CONFUSO (8 Variações)
  // Imagem: /fotos/confuso.jpg
  // ========================================================================
  confuso: [
    {
      biblia: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
      ref: "Provérbios 3:5-6",
      oracao: "Espírito Santo, luz da minha alma, dissipa as trevas da dúvida. Não sei qual caminho seguir. Dá-me sabedoria, clareza e discernimento. Que eu ouça a Tua voz e tenha coragem para obedecer.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.",
      ref: "Jeremias 33:3",
      oracao: "Senhor, eu clamo por direção! O barulho do mundo me confunde. Mostra-me o próximo passo. Não preciso ver a escada inteira, apenas o degrau onde devo pisar agora. Ilumina meus passos.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "Se algum de vocês tem falta de sabedoria, peça-a a Deus, que a todos dá livremente, de boa vontade; e lhe será concedida.",
      ref: "Tiago 1:5",
      oracao: "Deus de Sabedoria, confesso minha ignorância. Estou perdido e indeciso. Peço a sabedoria que vem do alto, pura e pacífica. Ajuda-me a tomar decisões que honrem o Teu nome.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.",
      ref: "Salmo 119:105",
      oracao: "Pai, volto-me para a Tua Palavra. Que ela seja meu mapa e minha bússola. Quando tudo parecer confuso, que a Tua verdade seja o chão firme onde posso pisar com segurança.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "Eu o instruirei e o ensinarei no caminho que você deve seguir; eu o aconselharei e cuidarei de você.",
      ref: "Salmo 32:8",
      oracao: "Senhor, aceito Teu conselho. Quebra meu orgulho e faz-me dócil à Tua instrução. Abre meus olhos espirituais para ver as portas que Tu abres e as que Tu fechas.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "Porque Deus não é Deus de confusão, senão de paz.",
      ref: "1 Coríntios 14:33",
      oracao: "Deus de Paz, rejeito todo espírito de confusão na minha mente. Ordeno clareza e ordem aos meus pensamentos. Que a Tua paz seja o árbitro em meu coração para decidir o que é certo.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "Entrega o teu caminho ao Senhor; confia nele, e ele o fará.",
      ref: "Salmo 37:5",
      oracao: "Pai, paro de tentar entender tudo racionalmente. Entrego esta situação a Ti. Confio que, mesmo sem eu entender o 'como', Tu farás o melhor acontecer. Descanso na Tua soberania.",
      imagem: "/fotos/confuso.jpg"
    },
    {
      biblia: "E os teus ouvidos ouvirão a palavra do que está por detrás de ti, dizendo: Este é o caminho, andai nele.",
      ref: "Isaías 30:21",
      oracao: "Amado Mestre, aguço meus ouvidos para Ti. Fala comigo. Dize-me: 'Vá por aqui'. Prometo seguir Tua voz, mesmo que ela vá contra a lógica do mundo. Tua vontade é perfeita.",
      imagem: "/fotos/confuso.jpg"
    }
  ],

  // ========================================================================
  // Categoria: SOZINHO (8 Variações)
  // Imagem: /fotos/sozinho.jpg
  // ========================================================================
  sozinho: [
    {
      biblia: "E eis que estou convosco todos os dias, até a consumação dos séculos.",
      ref: "Mateus 28:20",
      oracao: "Meu Deus, sinto-me só, mas sei que nunca me abandonas. Preenche este vazio com a Tua presença. Sê meu amigo fiel, meu companheiro constante e lembra-me que sou amado(a) por Ti com um amor eterno.",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Porque, se o meu pai e a minha mãe me desampararem, o Senhor me acolherá.",
      ref: "Salmo 27:10",
      oracao: "Pai, mesmo que as pessoas me decepcionem ou se afastem, eu sei que o Teu colo está sempre aberto. Aquece meu coração com Teu abraço e afasta a frieza da solidão. Sou Teu filho(a) amado(a).",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Não te deixarei, nem te desampararei.",
      ref: "Josué 1:5",
      oracao: "Senhor, agarro-me a esta promessa. Tu estás aqui, agora, neste quarto comigo. Não sou invisível para Ti. Obrigado por seres a companhia que nunca falha e o amigo que nunca vai embora.",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo.",
      ref: "Salmo 23:4",
      oracao: "Jesus, a solidão parece um vale escuro, mas Tu caminhas ao meu lado. Tua presença dissipa o medo. Ajuda-me a sentir Teu toque e a ouvir Tua voz suave me chamando pelo nome.",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Deus faz com que o solitário viva em família.",
      ref: "Salmo 68:6",
      oracao: "Deus de comunhão, Tu não me criaste para o isolamento. Peço que tragas pessoas piedosas para minha vida. Mas, acima de tudo, que eu encontre minha plenitude primeiro em Ti.",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Olha para mim, e tem piedade de mim, porque estou solitário e aflito.",
      ref: "Salmo 25:16",
      oracao: "Senhor, rasgo meu coração diante de Ti. A solidão dói. Vem preencher cada espaço vazio da minha alma com o Teu Espírito Santo. Que o Teu amor seja suficiente para mim.",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Visto que és precioso aos meus olhos, e digno de honra, eu te amo.",
      ref: "Isaías 43:4",
      oracao: "Pai, quando me sinto rejeitado pelo mundo, lembro-me que sou precioso para Ti. Teu amor me define, não a minha solidão. Obrigado por me escolheres e me amares todos os dias.",
      imagem: "/fotos/sozinho.jpg"
    },
    {
      biblia: "Já não vos chamo servos... mas tenho-vos chamado amigos.",
      ref: "João 15:15",
      oracao: "Jesus, que honra ser chamado Teu amigo! Quero cultivar essa amizade contigo. Converso contigo agora, partilho meu dia e ouço Teu coração. Contigo, nunca estou verdadeiramente só.",
      imagem: "/fotos/sozinho.jpg"
    }
  ]
};