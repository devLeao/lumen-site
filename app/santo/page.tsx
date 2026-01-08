"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Calendar, BookOpen, Heart, Repeat } from "lucide-react";

// --- 1. BANCO DE DADOS (Mantendo o conteúdo rico) ---
const SANTOS = [
  { 
    nome: "São Bento", 
    titulo: "O Protetor", 
    historia: "Pai do monaquismo ocidental. Sua medalha e sua Regra ('Ora et Labora') são escudos poderosos contra o mal.",
    frase: "A Cruz Sagrada seja a minha luz.",
    cor: "bg-amber-600",
    textCor: "text-amber-600",
    img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop",
    oracao: "A Cruz Sagrada seja a minha luz, não seja o dragão o meu guia. Retira-te, Satanás! Nunca me aconselhes coisas vãs. É mau o que tu me ofereces, bebe tu mesmo os teus venenos! Rogai por nós, São Bento. Amém."
  },
  { 
    nome: "Santa Teresinha", 
    titulo: "Das Rosas", 
    historia: "Viveu a 'Pequena Via': fazer as pequenas coisas com grande amor. Prometeu derramar uma chuva de graças sobre a terra.",
    frase: "Vou passar meu céu fazendo o bem na terra.",
    cor: "bg-rose-500", 
    textCor: "text-rose-500",
    img: "https://images.unsplash.com/photo-1543615699-270830cb6459?q=80&w=2000&auto=format&fit=crop",
    oracao: "Ó Santa Teresinha, enviai sobre mim uma chuva de graças, para que eu possa amar a Deus como vós o amastes e confiar nele com a simplicidade de uma criança. Amém."
  },
  { 
    nome: "São Francisco", 
    titulo: "De Assis", 
    historia: "Despojou-se de toda riqueza para seguir o Cristo pobre. Ensinou ao mundo que é perdoando que se é perdoado.",
    frase: "Comece fazendo o necessário, depois o possível...",
    cor: "bg-emerald-600", 
    textCor: "text-emerald-600",
    img: "https://images.unsplash.com/photo-1628109673525-242385b03517?q=80&w=1974&auto=format&fit=crop",
    oracao: "Senhor, fazei de mim um instrumento de vossa paz. Onde houver ódio, que eu leve o amor; Onde houver dúvida, que eu leve a fé; Onde houver tristeza, que eu leve a alegria. Amém."
  },
  { 
    nome: "Nossa Sra. das Graças", 
    titulo: "Mãe Amorosa", 
    historia: "Revelou a Medalha Milagrosa a Santa Catarina Labouré, prometendo grandes graças a quem a usar com confiança.",
    frase: "Tenha confiança. Eu estarei convosco.",
    cor: "bg-sky-500", 
    textCor: "text-sky-500",
    img: "https://images.unsplash.com/photo-1568222998337-97594ae89b88?q=80&w=2070&auto=format&fit=crop",
    oracao: "Ó Maria concebida sem pecado, rogai por nós que recorremos a vós. Mãe de misericórdia, alcançai-nos de Deus a graça que tanto precisamos. Amém."
  },
  { 
    nome: "Santo Agostinho", 
    titulo: "Doutor da Igreja", 
    historia: "Após anos de busca inquieta, encontrou a verdade em Deus. Ensina que nosso coração só descansa no Senhor.",
    frase: "A medida do amor é amar sem medida.",
    cor: "bg-red-700", 
    textCor: "text-red-700",
    img: "https://images.unsplash.com/photo-1555696958-c5049b866f6f?q=80&w=1974&auto=format&fit=crop",
    oracao: "Vinde, Espírito Santo! Respirai em mim, para que eu pense o que é santo. Fortalecei-me, para que eu guarde o que é santo. Guardai-me, para que eu não perca o que é santo. Amém."
  },
  { 
    nome: "São José", 
    titulo: "Patrono Universal", 
    historia: "O homem do silêncio e da obediência. Como pai adotivo de Jesus, é o modelo de proteção e providência para as famílias.",
    frase: "Exemplo de silêncio e fé.",
    cor: "bg-yellow-600", 
    textCor: "text-yellow-600",
    img: "https://images.unsplash.com/photo-1563207038-d621b181283c?q=80&w=2070&auto=format&fit=crop",
    oracao: "A vós, São José, recorremos em nossa tribulação. Protegei a Sagrada Família e protegei também a nós. Sede nosso fortíssimo sustentáculo. Amém."
  },
  { 
    nome: "Santa Rita", 
    titulo: "Das Causas Impossíveis", 
    historia: "Carregou os estigmas da paixão e superou sofrimentos familiares com fé inabalável. É o refúgio nos casos desesperados.",
    frase: "O amor tudo vence.",
    cor: "bg-purple-600", 
    textCor: "text-purple-600",
    img: "https://images.unsplash.com/photo-1610459563286-981249b6574f?q=80&w=2070&auto=format&fit=crop",
    oracao: "Ó Santa Rita, advogada dos casos desesperados, auxiliadora da última hora: com toda a confiança em vosso poder, a vós recorro. Atendei meu pedido. Amém."
  },
  { 
    nome: "São Miguel Arcanjo", 
    titulo: "Defensor", 
    historia: "Príncipe da milícia celeste que venceu o mal com o brado 'Quem como Deus?'. É nosso grande defensor nas batalhas espirituais.",
    frase: "Quem como Deus? Ninguém!",
    cor: "bg-blue-800", 
    textCor: "text-blue-800",
    img: "https://images.unsplash.com/photo-1517457997632-6a7f34842e47?q=80&w=2071&auto=format&fit=crop",
    oracao: "São Miguel Arcanjo, defendei-nos no combate. Sede o nosso refúgio contra as maldades e ciladas do demônio. Pela virtude divina, precipitai no inferno a satanás. Amém."
  }
];

export default function SantoPage() {
  const [revelado, setRevelado] = useState(false);
  const [santo, setSanto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aba, setAba] = useState<"mensagem" | "oracao">("mensagem"); // Controle das abas

  // Lógica de Sorteio e Persistência
  useEffect(() => {
    const hoje = new Date().toLocaleDateString();
    const salvo = localStorage.getItem("lumen_santo_v2"); // Mudei a chave para 'v2' para limpar bugs antigos

    if (salvo) {
      const dados = JSON.parse(salvo);
      if (dados.data === hoje) {
        setSanto(dados.santo);
        setRevelado(true);
      }
    }
    setLoading(false);
  }, []);

  const sortear = () => {
    const aleatorio = SANTOS[Math.floor(Math.random() * SANTOS.length)];
    const hoje = new Date().toLocaleDateString();
    
    // Simula tempo de embaralhar
    setTimeout(() => {
      localStorage.setItem("lumen_santo_v2", JSON.stringify({ data: hoje, santo: aleatorio }));
      setSanto(aleatorio);
      setRevelado(true);
    }, 1000);
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-stone-100 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      
      {/* Botão Voltar */}
      <Link href="/" className="absolute top-6 left-6 p-3 rounded-full bg-white dark:bg-slate-900 shadow-sm hover:scale-110 transition-transform text-slate-400 z-50">
        <ArrowLeft size={24} />
      </Link>

      {/* --- ESTADO INICIAL: BARALHO --- */}
      {!revelado && (
        <div className="text-center animate-in fade-in zoom-in duration-700">
          <div className="mb-8">
            <span className="inline-block p-4 bg-white dark:bg-slate-900 rounded-full shadow-lg mb-4 text-amber-500">
              <Sparkles size={32} />
            </span>
            <h1 className="font-serif text-3xl font-bold text-sky-950 dark:text-white mb-2">
              Seu Intercessor
            </h1>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Toque na carta para descobrir qual santo escolheu caminhar com você hoje.
            </p>
          </div>

          <button 
            onClick={sortear}
            className="group relative w-72 h-96 bg-gradient-to-br from-sky-600 to-sky-800 rounded-3xl shadow-2xl border-[6px] border-white dark:border-slate-800 cursor-pointer hover:-translate-y-2 transition-transform"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-40 h-40 border-4 border-dashed border-white rounded-full animate-spin-slow"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-2xl tracking-widest opacity-90">
              LUMEN
            </div>
          </button>
        </div>
      )}

      {/* --- ESTADO REVELADO: O NOVO CARD --- */}
      {revelado && santo && (
        <div className="w-full max-w-sm animate-in zoom-in-95 duration-500">
          
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            
            {/* 1. IMAGEM DE TOPO (Hero) */}
            <div className="h-64 w-full relative">
              <img src={santo.img} alt={santo.nome} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {/* Nome sobre a imagem */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">{santo.titulo}</p>
                <h2 className="font-serif text-4xl font-bold leading-none">{santo.nome}</h2>
              </div>
            </div>

            {/* 2. ABAS DE NAVEGAÇÃO (Tabs) */}
            <div className="flex p-2 gap-2 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => setAba("mensagem")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all
                  ${aba === "mensagem" 
                    ? "bg-white dark:bg-slate-800 shadow-sm text-sky-600 dark:text-sky-400" 
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
              >
                <BookOpen size={16} /> Mensagem
              </button>
              <button 
                onClick={() => setAba("oracao")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all
                  ${aba === "oracao" 
                    ? "bg-white dark:bg-slate-800 shadow-sm text-sky-600 dark:text-sky-400" 
                    : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
              >
                <Heart size={16} /> Oração
              </button>
            </div>

            {/* 3. CONTEÚDO (Muda conforme a aba) */}
            <div className="p-8 min-h-[280px] flex flex-col justify-center">
              
              {aba === "mensagem" && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  {/* Citação */}
                  <div className="mb-6 relative">
                    <span className={`absolute -top-4 -left-2 text-6xl opacity-20 font-serif ${santo.textCor}`}>“</span>
                    <p className="font-serif text-xl italic text-slate-700 dark:text-slate-200 leading-relaxed text-center px-4">
                      {santo.frase}
                    </p>
                  </div>
                  
                  {/* História Resumida */}
                  <div className="bg-stone-50 dark:bg-slate-800/50 p-4 rounded-xl border-l-4 border-stone-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                      {santo.historia}
                    </p>
                  </div>
                </div>
              )}

              {aba === "oracao" && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Reze com Fé
                  </h3>
                  <p className="font-serif text-lg text-slate-800 dark:text-slate-200 leading-relaxed text-center">
                    "{santo.oracao}"
                  </p>
                  <div className="mt-6 flex justify-center">
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                      Amém
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>
          
          {/* Rodapé Pequeno */}
          <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
             <Calendar size={12} /> Válido por hoje
          </p>

        </div>
      )}

    </main>
  );
}