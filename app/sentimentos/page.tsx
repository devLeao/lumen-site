"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Heart, X, Smile, Frown, CloudRain, Sun, Zap, Coffee } from "lucide-react";

// --- 1. BANCO DE DADOS DE EMOÇÕES ---
const SENTIMENTOS = {
  ansioso: {
    titulo: "Ansiedade",
    icone: <Zap size={40} />,
    cor: "bg-violet-500",
    biblia: "Não andeis ansiosos por coisa alguma; em tudo, porém, sejam conhecidas, diante de Deus, as vossas petições, pela oração e pela súplica, com ações de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações.",
    ref: "Filipenses 4:6-7",
    oracao: "Senhor, acalma meu coração agitado. Tira de mim essa aflição que me consome e me impede de ver a Tua luz. Entrego em Tuas mãos o meu futuro, pois sei que cuidas de mim. Troco o meu medo pela Tua paz. Amém."
  },
  cansado: {
    titulo: "Cansaço",
    icone: <Coffee size={40} />,
    cor: "bg-amber-600",
    biblia: "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei. Tomai sobre vós o meu jugo e aprendei de mim, que sou manso e humilde de coração; e achareis descanso para as vossas almas.",
    ref: "Mateus 11:28-29",
    oracao: "Jesus, sinto minhas forças se esgotarem. O peso do dia a dia está grande demais. Peço Teu descanso sagrado. Renova minhas energias, restaura minha esperança e deixa-me repousar em Teu abraço seguro. Amém."
  },
  grato: {
    titulo: "Gratidão",
    icone: <Sun size={40} />,
    cor: "bg-amber-400",
    biblia: "Deem graças ao Senhor, porque ele é bom. O seu amor dura para sempre!",
    ref: "Salmo 136:1",
    oracao: "Pai Amado, hoje meu coração transborda de gratidão. Obrigado pelo dom da vida, pelos livramentos que não vi e pelas bênçãos que recebi. Que minha vida seja um eterno cântico de louvor a Ti. Amém."
  },
  triste: {
    titulo: "Tristeza",
    icone: <CloudRain size={40} />,
    cor: "bg-slate-500",
    biblia: "Perto está o Senhor dos que têm o coração quebrantado e salva os de espírito oprimido.",
    ref: "Salmo 34:18",
    oracao: "Senhor, Tu conheces a dor que carrego no peito e as lágrimas que derramo em silêncio. Vem consolar minha alma, curar minhas feridas e transformar meu lamento em dança. Confio no Teu amor que nunca falha. Amém."
  },
  confuso: {
    titulo: "Confusão",
    icone: <Frown size={40} />,
    cor: "bg-rose-500",
    biblia: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    ref: "Provérbios 3:5-6",
    oracao: "Espírito Santo, luz da minha alma, dissipa as trevas da dúvida. Não sei qual caminho seguir. Dá-me sabedoria, clareza e discernimento. Que eu ouça a Tua voz e tenha coragem para obedecer. Amém."
  },
  sozinho: {
    titulo: "Solidão",
    icone: <Heart size={40} />,
    cor: "bg-sky-500",
    biblia: "E eis que estou convosco todos os dias, até a consumação dos séculos.",
    ref: "Mateus 28:20",
    oracao: "Meu Deus, sinto-me só, mas sei que nunca me abandonas. Preenche este vazio com a Tua presença. Sê meu amigo fiel, meu companheiro constante e lembra-me que sou amado(a) por Ti com um amor eterno. Amém."
  }
};

function SentimentosContent() {
  const searchParams = useSearchParams();
  const humorInicial = searchParams.get("humor"); // Pega o ?humor=ansioso da URL
  
  const [selecionado, setSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (humorInicial && SENTIMENTOS[humorInicial as keyof typeof SENTIMENTOS]) {
      setSelecionado(humorInicial);
    }
  }, [humorInicial]);

  const handleSelect = (chave: string) => {
    setSelecionado(chave);
  };

  const currentData = selecionado ? SENTIMENTOS[selecionado as keyof typeof SENTIMENTOS] : null;

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10">
      
      {/* TÍTULO INICIAL */}
      {!selecionado && (
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block p-3 bg-white dark:bg-slate-800 rounded-full shadow-md mb-4 text-rose-500">
            <Heart size={32} fill="currentColor" />
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-sky-950 dark:text-white font-bold mb-4">
            Como está seu coração?
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Selecione o que você está sentindo para receber um remédio espiritual.
          </p>
        </div>
      )}

      {/* GRADE DE OPÇÕES (Só aparece se nada estiver selecionado) */}
      {!selecionado && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {Object.entries(SENTIMENTOS).map(([chave, dados]) => (
            <button
              key={chave}
              onClick={() => handleSelect(chave)}
              className="bg-white dark:bg-slate-900/80 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4 group"
            >
              <div className={`p-4 rounded-full ${dados.cor} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {dados.icone}
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-200 text-lg capitalize">
                {dados.titulo}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* VISUALIZAÇÃO DO REMÉDIO (Overlay) */}
      {selecionado && currentData && (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
          
          {/* Cabeçalho Colorido */}
          <div className={`${currentData.cor} p-8 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-8 opacity-20 transform rotate-12 scale-150">
              {currentData.icone}
            </div>
            
            <button 
              onClick={() => setSelecionado(null)}
              className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="mt-8 text-center">
              <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-full mb-4 shadow-inner">
                {currentData.icone}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                Para sua {currentData.titulo}
              </h2>
              <p className="opacity-90 font-medium">Um remédio do céu.</p>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-8 md:p-12">
            
            {/* Versículo */}
            <div className="mb-10 text-center">
              <p className="font-serif text-xl md:text-2xl text-slate-700 dark:text-slate-200 italic leading-relaxed mb-4">
                "{currentData.biblia}"
              </p>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {currentData.ref}
              </span>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 my-8"></div>

            {/* Oração */}
            <div className="bg-slate-50 dark:bg-slate-950/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-center gap-2">
                <Heart size={14} className="text-rose-500" fill="currentColor" /> Oração
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify md:text-center text-lg">
                {currentData.oracao}
              </p>
            </div>

            <button 
              onClick={() => setSelecionado(null)}
              className="w-full mt-8 py-4 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <X size={18} /> Escolher outro sentimento
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

// Página Principal
export default function SentimentosPage() {
  return (
    <main className="min-h-screen bg-stone-100 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500">
      
      {/* Botão Home Fixo */}
      <Link href="/" className="absolute top-6 left-6 p-3 rounded-full bg-white dark:bg-slate-900 shadow-sm hover:scale-110 transition-transform text-slate-400 z-50">
        <ArrowLeft size={24} />
      </Link>

      <Suspense fallback={<div>Carregando...</div>}>
        <SentimentosContent />
      </Suspense>
    </main>
  );
}