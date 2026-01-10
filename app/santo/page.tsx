"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Scroll, Shield, Quote, HeartHandshake, Clock } from "lucide-react";

// --- BANCO DE DADOS DOS SANTOS ---
const listaSantos = [
  {
    nome: "São José",
    titulo: "Patrono das Famílias e dos Trabalhadores",
    imagem: "/santos/sao-jose.jpg",
    padroeiro: "Famílias, Pais, Trabalhadores e da Boa Morte.",
    historia: "José foi o pai adotivo de Jesus e esposo da Virgem Maria. Homem do silêncio e da obediência, protegeu a Sagrada Família contra herodes e ensinou o ofício de carpinteiro a Jesus. É modelo de pai amoroso e trabalhador justo.",
    citacao: "Não tenha medo de acolher os planos de Deus. No silêncio e no trabalho, Ele está construindo sua vitória.",
    oracao: "Ó glorioso São José, a quem foi dado o poder de tornar possíveis as coisas humanamente impossíveis, vinde em nosso auxílio nas dificuldades em que nos achamos. Tomai sob vossa proteção a causa importante que vos confiamos, para que tenha uma solução favorável. Amém."
  },
  {
    nome: "São Miguel Arcanjo",
    titulo: "Príncipe da Milícia Celeste",
    imagem: "/santos/sao-miguel.jpg",
    padroeiro: "Policias, Paraquedistas e da Igreja contra o mal.",
    historia: "Miguel, cujo nome significa 'Quem como Deus?', é o líder dos exércitos celestiais. Foi ele quem expulsou Lúcifer e os anjos rebeldes do céu. É o grande defensor dos fiéis nas batalhas espirituais e na hora da morte.",
    citacao: "Quem como Deus? Ninguém! Confie na proteção divina, pois nenhuma maldade resiste à luz da verdade.",
    oracao: "São Miguel Arcanjo, defendei-nos no combate. Sede o nosso refúgio contra as maldades e ciladas do demônio. Ordena-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e aos outros espíritos malignos que andam pelo mundo para perder as almas. Amém."
  },
  {
    nome: "Santa Teresinha",
    titulo: "Doutora da Igreja",
    imagem: "/santos/santa-teresinha.jpg",
    padroeiro: "Missões, Floristas e Jardineiros.",
    historia: "Teresinha do Menino Jesus entrou no Carmelo aos 15 anos. Viveu a 'Pequena Via', ensinando que a santidade se alcança fazendo as pequenas coisas do dia a dia com muito amor. Prometeu passar seu céu fazendo o bem na terra.",
    citacao: "Para mim, a oração é um impulso do coração, é um simples olhar lançado ao céu, é um grito de gratidão e de amor.",
    oracao: "Santa Teresinha, derramai sobre nós a vossa chuva de rosas. Ensinai-nos o vosso 'Pequeno Caminho' de confiança e abandono a Deus. Fazei com que amemos a Jesus como vós o amastes. Amém."
  },
  {
    nome: "Santo Antônio",
    titulo: "Martelo dos Hereges",
    imagem: "/santos/santo-antonio.jpg",
    padroeiro: "Pobres, Casais, Coisas Perdidas.",
    historia: "Frade franciscano português, famoso por sua pregação eloquente e pelos inúmeros milagres. É conhecido como o santo que ajuda a encontrar o que foi perdido, seja objetos ou a fé, e por abençoar os casamentos.",
    citacao: "É viva a palavra quando são as obras que falam. Cessem as palavras, falem as obras.",
    oracao: "Glorioso Santo Antônio, tu que tens o poder de encontrar o que está perdido, ajuda-me a reencontrar a paz e a graça de Deus. Abençoa minha vida afetiva e socorre-me em minhas necessidades. Amém."
  },
  {
    nome: "Padre Pio",
    titulo: "São Pio de Pietrelcina",
    imagem: "/santos/padre-pio.jpg",
    padroeiro: "Voluntários da defesa civil, Adolescentes católicos.",
    historia: "Sacerdote capuchinho que recebeu os estigmas de Cristo. Passava horas no confessionário e tinha dons místicos de cura e bilocação. Fundou a 'Casa Alívio do Sofrimento', um grande hospital para os pobres.",
    citacao: "Reze, espere e não se preocupe. A agitação não serve para nada. Deus é misericordioso e ouvirá sua oração.",
    oracao: "Fica, Senhor, comigo, pois preciso da tua presença para não te esquecer. Tu sabes quão facilmente posso te abandonar. Fica, Senhor, comigo, pois sou fraco e preciso da tua força para não cair tantas vezes. Amém."
  },
  {
    nome: "São Bento",
    titulo: "Pai do Monaquismo Ocidental",
    imagem: "/santos/sao-bento.jpg",
    padroeiro: "Europa, Estudantes, contra venenos e feitiçarias.",
    historia: "Fundador da Ordem Beneditina, criou a regra 'Ora et Labora' (Reza e Trabalha). Sua medalha é um poderoso sacramental de proteção contra o mal. Viveu em oração constante e venceu muitas ciladas do inimigo.",
    citacao: "Que a paz de Cristo reine em sua casa e afaste toda inveja e discórdia.",
    oracao: "A Cruz Sagrada seja a minha luz, não seja o dragão o meu guia. Retira-te, satanás! Nunca me aconselhes coisas vãs. É mau o que tu me ofereces, bebe tu mesmo o teu veneno! Amém."
  },
  {
    nome: "Nossa Senhora das Graças",
    titulo: "A Imaculada da Medalha Milagrosa",
    imagem: "/santos/ns-gracas.jpg",
    padroeiro: "Todos os que buscam graças divinas.",
    historia: "Apareceu a Santa Catarina Labouré em Paris, pedindo que se cunhasse uma medalha. Prometeu que 'grandes graças serão derramadas sobre as pessoas que a usarem com confiança'.",
    citacao: "Tenha confiança! Eu derramarei graças abundantes sobre aqueles que as pedirem com fé.",
    oracao: "Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós. Mãe Imaculada, dai-nos as graças que tanto precisamos e livrai-nos de todo perigo. Amém."
  },
  {
    nome: "São Francisco de Assis",
    titulo: "O Pobre de Assis",
    imagem: "/santos/sao-francisco.jpg",
    padroeiro: "Animais, Meio Ambiente, Paz.",
    historia: "Jovem rico que abdicou de tudo para viver a pobreza evangélica. Reconstrutor da Igreja através da humildade, via em cada criatura um irmão. Recebeu os estigmas e cantou o amor de Deus pela criação.",
    citacao: "Comece fazendo o que é necessário, depois o que é possível, e de repente você estará fazendo o impossível.",
    oracao: "Senhor, fazei-me instrumento de vossa paz. Onde houver ódio, que eu leve o amor; Onde houver ofensa, que eu leve o perdão; Onde houver discórdia, que eu leve a união. Amém."
  },
  {
    nome: "Santa Rita de Cássia",
    titulo: "Santa dos Impossíveis",
    imagem: "/santos/santa-rita.jpg",
    padroeiro: "Causas Impossíveis, Viúvas.",
    historia: "Esposa, mãe e depois monja. Sofreu muito na vida familiar, mas converteu seu esposo pela oração. Recebeu um estigma de espinho na testa, unindo-se à Paixão de Cristo. É invocada nos casos desesperados.",
    citacao: "Não há causa perdida para Deus. Mantenha a esperança, pois o impossível é especialidade do Céu.",
    oracao: "Ó poderosa Santa Rita, chamada Santa dos Impossíveis, advogada dos casos desesperados, socorrei-me nesta aflição (fazer o pedido). Tenho confiança em vossa poderosa intercessão junto ao trono de Deus. Amém."
  },
  {
    nome: "Nossa Senhora Aparecida",
    titulo: "Rainha e Padroeira do Brasil",
    imagem: "/santos/ns-aparecida.jpg",
    padroeiro: "Brasil, Crianças.",
    historia: "Encontrada no Rio Paraíba por três pescadores simples em 1717. Primeiro veio o corpo, depois a cabeça. Após o encontro, a pesca foi abundante. É o maior símbolo de fé do povo brasileiro.",
    citacao: "Cubra-se com meu manto de amor. Como mãe, eu cuido de cada detalhe da sua vida.",
    oracao: "Ó incomparável Senhora da Conceição Aparecida, Mãe de Deus, Rainha dos Anjos, Advogada dos pecadores, refúgio e consolação dos aflitos e atribulados, lançai sobre nós o vosso olhar bondoso. Amém."
  },
  {
    nome: "Nossa Senhora de Fátima",
    titulo: "Senhora do Rosário",
    imagem: "/santos/ns-fatima.jpg",
    padroeiro: "Conversão dos pecadores.",
    historia: "Apareceu a três pastorinhos em Portugal, pedindo oração e penitência pela paz no mundo. Em sua última aparição, realizou o 'Milagre do Sol'. Pediu insistentemente a oração do Santo Terço.",
    citacao: "Rezem o Terço todos os dias para alcançarem a paz para o mundo e o fim da guerra.",
    oracao: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem. Nossa Senhora de Fátima, rogai por nós."
  },
  {
    nome: "São Jorge",
    titulo: "O Grande Mártir",
    imagem: "/santos/sao-jorge.jpg",
    padroeiro: "Guerreiros, Soldados, Escoteiros.",
    historia: "Soldado romano cristão que desafiou o imperador para defender sua fé. A lenda de Jorge matando o dragão simboliza a fé vencendo o mal e a idolatria. É símbolo de coragem e proteção contra inimigos.",
    citacao: "Eu andarei vestido e armado com as armas de São Jorge para que meus inimigos, tendo pés não me alcancem, tendo mãos não me peguem.",
    oracao: "Ó São Jorge, meu guerreiro, invencível na Fé em Deus, que trazeis em vosso rosto a esperança e a confiança, abri os meus caminhos. Que eu ande vestido e armado com vossas armas para que o mal não me atinja. Amém."
  }
];

export default function SantoPage() {
  const [santoDoDia, setSantoDoDia] = useState<typeof listaSantos[0] | null>(null);
  const [virarCarta, setVirarCarta] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  useEffect(() => {
    // LÓGICA DO SANTO FIXO DO DIA
    const hoje = new Date().toLocaleDateString("pt-BR"); // Data atual
    const dadosSalvos = localStorage.getItem("lumen_santo_dia");
    
    if (dadosSalvos) {
      const { data, nomeSanto } = JSON.parse(dadosSalvos);
      if (data === hoje) {
        const santoEncontrado = listaSantos.find(s => s.nome === nomeSanto);
        if (santoEncontrado) {
          setSantoDoDia(santoEncontrado);
          return; 
        }
      }
    }

    // Sorteia e Salva
    const novoIndice = Math.floor(Math.random() * listaSantos.length);
    const novoSanto = listaSantos[novoIndice];
    setSantoDoDia(novoSanto);
    localStorage.setItem("lumen_santo_dia", JSON.stringify({
      data: hoje,
      nomeSanto: novoSanto.nome
    }));

  }, []);

  const revelarCarta = () => {
    if (!virarCarta) {
      setVirarCarta(true);
      setTimeout(() => setMostrarDetalhes(true), 600);
    }
  };

  if (!santoDoDia) return null;

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center py-10 px-4 relative overflow-y-auto overflow-x-hidden">
      
      {/* Fundo Místico */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Botão Voltar */}
      <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors z-30 bg-black/20 p-2 rounded-full backdrop-blur-sm">
        <ArrowLeft size={24} />
      </Link>

      <div className="z-10 flex flex-col items-center max-w-lg w-full mb-20">
        
        <h1 className="font-serif text-3xl text-amber-100 mb-2 drop-shadow-md text-center">Santo do Dia</h1>
        <p className={`text-slate-400 text-sm mb-8 transition-opacity ${virarCarta ? 'opacity-0' : 'opacity-100'}`}>
          Toque na carta para revelar seu intercessor de hoje
        </p>

        {/* --- ÁREA DA CARTA --- */}
        <div 
          className="group perspective-1000 w-72 h-[420px] cursor-pointer mb-8"
          onClick={revelarCarta}
        >
          <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${virarCarta ? 'rotate-y-180' : ''}`}>
            
            {/* VERSO (CAPA) */}
            <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
               <div className="absolute inset-2 border border-amber-500/20 rounded-xl"></div>
               {/* Padrão decorativo de fundo */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200 to-transparent"></div>
               
               <div className="text-center relative z-10">
                 <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                   <Sparkles className="text-amber-400 animate-pulse" size={40} />
                 </div>
                 <p className="font-serif text-amber-100 text-2xl tracking-wide">Lumen</p>
                 <p className="text-amber-500/60 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Oraculum</p>
               </div>
            </div>

            {/* FRENTE (IMAGEM) */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.2)] overflow-hidden bg-slate-900 border border-amber-900/50">
              <img 
                src={santoDoDia.imagem} 
                alt={santoDoDia.nome} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 w-full p-6 text-center">
                 <h2 className="font-serif text-3xl text-white font-bold drop-shadow-lg mb-1">
                  {santoDoDia.nome}
                </h2>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wide drop-shadow-md">
                  {santoDoDia.titulo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- ÁREA DE CONTEÚDO (HISTÓRIA E ORAÇÃO) --- */}
        <div className={`w-full transition-all duration-1000 ease-out transform ${mostrarDetalhes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          
          {/* Citação em Destaque */}
          <div className="bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl mb-8 relative">
            <Quote className="absolute top-4 left-4 text-amber-500/20" size={40} />
            <p className="text-amber-100 text-lg font-serif italic text-center relative z-10">
              "{santoDoDia.citacao}"
            </p>
          </div>

          {/* História e Padroeiro */}
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 mb-6 shadow-xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sky-900/30 rounded-lg text-sky-400"><Scroll size={20}/></div>
                <h3 className="text-white font-bold text-lg">História de Fé</h3>
             </div>
             <p className="text-slate-300 leading-relaxed text-sm mb-6">
               {santoDoDia.historia}
             </p>
             
             <div className="flex items-start gap-3 pt-4 border-t border-slate-800">
                <div className="p-2 bg-emerald-900/30 rounded-lg text-emerald-400 mt-1"><Shield size={16}/></div>
                <div>
                  <span className="text-slate-500 text-xs uppercase font-bold block mb-1">Padroeiro</span>
                  <p className="text-slate-200 text-sm">{santoDoDia.padroeiro}</p>
                </div>
             </div>
          </div>

          {/* Oração */}
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-8 border border-amber-900/30 shadow-lg relative overflow-hidden">
             {/* Efeito de luz decorativo */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
             
             <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
                <HeartHandshake className="text-amber-500" size={24} />
                <h3 className="text-amber-500 font-serif text-xl font-bold">Oração Poderosa</h3>
             </div>
             
             <p className="text-amber-50/90 text-center font-serif leading-relaxed text-lg relative z-10">
               {santoDoDia.oracao}
             </p>
          </div>

          {/* MENSAGEM FINAL (VOLTE AMANHÃ) */}
          <div className="mt-12 mb-10 text-center opacity-70">
            <p className="text-amber-200/60 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 mb-2">
              <Clock size={16} />
              Volte Amanhã
            </p>
            <p className="text-slate-400 text-xs max-w-xs mx-auto">
              Este santo caminhará com você hoje. Um novo intercessor será revelado à meia-noite.
            </p>
          </div>

        </div>

      </div>

      {/* CSS Utilitários */}
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

    </main>
  );
}