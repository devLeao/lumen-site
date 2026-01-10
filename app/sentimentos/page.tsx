"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Heart, Share2, Quote, Zap, Coffee, Sun, CloudRain, Frown 
} from "lucide-react";
// Certifique-se que o caminho da importação está correto para onde você salvou o arquivo acima
import { sentimentosDB } from "../sentimentosData"; 

// --- CONFIGURAÇÃO VISUAL (Cores e Ícones do Menu) ---
const SENTIMENTOS_CONFIG = {
  ansioso: {
    titulo: "Ansiedade",
    icone: <Zap size={40} />,
    cor: "bg-violet-500",
  },
  cansado: {
    titulo: "Cansaço",
    icone: <Coffee size={40} />,
    cor: "bg-amber-600",
  },
  grato: {
    titulo: "Gratidão",
    icone: <Sun size={40} />,
    cor: "bg-amber-400",
  },
  triste: {
    titulo: "Tristeza",
    icone: <CloudRain size={40} />,
    cor: "bg-slate-500",
  },
  confuso: {
    titulo: "Confusão",
    icone: <Frown size={40} />,
    cor: "bg-rose-500",
  },
  sozinho: {
    titulo: "Solidão",
    icone: <Heart size={40} />,
    cor: "bg-sky-500",
  }
};

// Função para calcular o dia do ano (rotação diária)
function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function SentimentosContent() {
  const searchParams = useSearchParams();
  const humorInicial = searchParams.get("humor");
  
  const [selecionado, setSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (humorInicial && SENTIMENTOS_CONFIG[humorInicial as keyof typeof SENTIMENTOS_CONFIG]) {
      setSelecionado(humorInicial);
    }
  }, [humorInicial]);

  const handleSelect = (chave: string) => {
    setSelecionado(chave);
  };

  // --- LÓGICA DE SELEÇÃO DA MENSAGEM ---
  let mensagemDeHoje = null;
  let configVisual = null;

  if (selecionado) {
    // 1. Pega a lista de mensagens (fallback para 'ansioso' se der erro)
    const listaMensagens = sentimentosDB[selecionado] || sentimentosDB['ansioso'];
    
    // 2. Calcula qual mensagem mostrar hoje (Rotação)
    const indice = getDayOfYear() % listaMensagens.length;
    mensagemDeHoje = listaMensagens[indice];

    // 3. Pega configuração visual (ícone, título)
    configVisual = SENTIMENTOS_CONFIG[selecionado as keyof typeof SENTIMENTOS_CONFIG];
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
      
      {/* --- TELA 1: MENU DE ESCOLHA (Se nada selecionado) --- */}
      {!selecionado && (
        <>
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block p-3 bg-white dark:bg-slate-800 rounded-full shadow-md mb-4 text-rose-500">
              <Heart size={32} fill="currentColor" />
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-sky-950 dark:text-white font-bold mb-4">
              Como está seu coração?
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Selecione o que você está sentindo hoje.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            {Object.entries(SENTIMENTOS_CONFIG).map(([chave, dados]) => (
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
        </>
      )}

      {/* --- TELA 2: CARD COMPLETO (Se selecionado) --- */}
      {selecionado && mensagemDeHoje && configVisual && (
        <div className="relative w-full max-w-md mx-auto min-h-[680px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-500 flex flex-col">
          
          {/* IMAGEM DE FUNDO FIXA DA CATEGORIA */}
          <img
            src={mensagemDeHoje.imagem}
            alt={configVisual.titulo}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[30s] hover:scale-110"
          />

          {/* OVERLAY ESCURO E GRADIENTE */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"></div>

          {/* CONTEÚDO DO CARD */}
          <div className="relative z-10 h-full flex flex-col flex-grow p-8 text-white">
            
            {/* Cabeçalho do Card */}
            <div className="flex justify-between items-center mb-8">
              <button 
                onClick={() => setSelecionado(null)}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
                 <span className="text-white">
                    {configVisual.icone && <div className="scale-75">{configVisual.icone}</div>}
                 </span>
                 <span className="uppercase tracking-widest text-[10px] font-bold">
                  {configVisual.titulo}
                </span>
              </div>
            </div>

            {/* SEÇÃO 1: VERSÍCULO BÍBLICO */}
            <div className="flex flex-col gap-3 text-center mb-8">
              <Quote size={28} className="text-white/40 mx-auto rotate-180" />
              <h2 className="font-serif text-2xl leading-relaxed italic font-medium text-amber-50 drop-shadow-sm">
                "{mensagemDeHoje.biblia}"
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mt-2">
                — {mensagemDeHoje.ref}
              </span>
            </div>

            {/* Divisória Suave */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

            {/* SEÇÃO 2: ORAÇÃO (Card de Vidro) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg mb-6 flex-grow flex flex-col justify-center">
               <h3 className="text-[10px] font-bold uppercase text-white/60 mb-3 flex items-center justify-center gap-2 tracking-widest">
                 <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span> Oração
               </h3>
               <p className="text-white/95 leading-relaxed text-center font-light text-lg">
                 {mensagemDeHoje.oracao}
               </p>
               <p className="text-center mt-4 text-xs font-bold text-white/40 uppercase tracking-widest">Amém</p>
            </div>

            {/* Rodapé: Botão Compartilhar */}
            <div className="mt-auto">
              <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                <Share2 size={18} /> Compartilhar Benção
              </button>
            </div>

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
      
      {/* Botão Voltar para Home (Fixo no topo esquerdo da tela) */}
      <Link href="/" className="absolute top-6 left-6 p-3 rounded-full bg-white dark:bg-slate-900 shadow-sm hover:scale-110 transition-transform text-slate-400 z-50">
        <ArrowLeft size={24} />
      </Link>

      <Suspense fallback={<div className="text-slate-400 animate-pulse">Buscando inspiração...</div>}>
        <SentimentosContent />
      </Suspense>
    </main>
  );
}