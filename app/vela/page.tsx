"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Flame, X, Sparkles, Plus } from "lucide-react";

type Oracao = { id: number; texto: string; leftOffset: number; };

export default function VelaPage() {
  const [acesa, setAcesa] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [inputTemp, setInputTemp] = useState("");
  const [oracoesSubindo, setOracoesSubindo] = useState<Oracao[]>([]);
  const [rotacaoChama, setRotacaoChama] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- FÍSICA (VENTO DO MOUSE) ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !acesa) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = e.clientX - centerX;
    // Aumentei um pouco a sensibilidade do vento para ficar mais dinâmico
    const rotacao = Math.min(Math.max(deltaX * 0.08, -25), 25);
    setRotacaoChama(rotacao);
  };

  const handleMouseLeave = () => { setRotacaoChama(0); };

  const enviarIntencao = () => {
    if (!inputTemp.trim()) return;
    if (!acesa) setAcesa(true);
    const novaOracao: Oracao = {
      id: Date.now(),
      texto: inputTemp,
      leftOffset: Math.random() * 60 - 30,
    };
    setOracoesSubindo((prev) => [...prev, novaOracao]);
    setInputTemp("");
    setModalAberto(false);
    setTimeout(() => {
      setOracoesSubindo((prev) => prev.filter(o => o.id !== novaOracao.id));
    }, 14000);
  };

  return (
    <main 
      className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* --- NOVAS ANIMAÇÕES REALISTAS --- */}
      <style jsx global>{`
        /* 1. Movimento Orgânico do Fogo (Corpo) */
        @keyframes organicFire {
          0%, 100% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform: scale(1) rotate(-2deg); }
          25% { border-radius: 55% 45% 50% 50% / 55% 65% 40% 40%; transform: scale(1.05) rotate(3deg) translateY(-3px); }
          50% { border-radius: 45% 55% 60% 40% / 65% 60% 35% 45%; transform: scale(0.95) rotate(-1deg); }
          75% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform: scale(1.02) rotate(1deg) translateY(-2px); }
        }
        .animate-fire { animation: organicFire 1.2s infinite alternate ease-in-out; }

        /* 2. Tremeluzir Rápido do Núcleo Branco */
        @keyframes flickerCore {
           0%, 100% { opacity: 1; transform: scale(1) translateY(0); }
           50% { opacity: 0.8; transform: scale(0.9) translateY(3px); }
        }
        .animate-flicker-core { animation: flickerCore 0.15s infinite alternate; }

        /* 3. Oração Subindo e Embaçando (Ajustado) */
        @keyframes subirFumacaSinuosa {
          0% { 
            transform: translateY(0) translateX(0) scale(0.8); 
            opacity: 0; 
            filter: blur(4px); 
          }
          10% { 
            opacity: 1; 
            transform: translateY(-50px) translateX(-10px) scale(1);
            filter: blur(0px); /* Nítido para ler */
          }
          40% {
            transform: translateY(-250px) translateX(10px) scale(1.05);
            filter: blur(0px); /* Ainda nítido */
          }
          65% {
            transform: translateY(-450px) translateX(-5px) scale(1.1);
            opacity: 0.9;
            filter: blur(5px); /* Começa a embaçar forte */
          }
          85% {
             opacity: 0.5;
             filter: blur(15px); /* TOTALMENTE EMBAÇADO antes de sair */
          }
          100% {
            transform: translateY(-800px) translateX(0) scale(1.2);
            opacity: 0;
            filter: blur(30px); /* Dissolvido */
          }
        }
        .animacao-fumaca { animation: subirFumacaSinuosa 14s ease-out forwards; }
      `}</style>

      {/* --- FUNDO AMBIENTADO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/fotos/altar.jpg" 
          alt="Altar" 
          className={`w-full h-full object-cover transition-opacity duration-2000 ${acesa ? 'opacity-50' : 'opacity-10'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/90"></div>

        {/* Jesus Eucarístico */}
        <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-3000 delay-500 ${acesa ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-md'}`}>
          <div className="w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          <div className="relative drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]">
            <svg width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
              <path d="M90 20L90 5M90 235L90 220M20 120L5 120M175 120L160 120M40.5 40.5L29.8934 29.8934M150.107 199.607L139.5 189M40.5 199.607L29.8934 210.213M150.107 40.5L139.5 51.1066" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round"/>
              <path d="M90 120m-70 0a70 70 0 1 0 140 0a70 70 0 1 0 -140 0" stroke="url(#paint1_linear)" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M90 220V180M90 60V40" stroke="#B45309" strokeWidth="4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M90 180C123.137 180 150 153.137 150 120C150 86.8629 123.137 60 90 60C56.8629 60 30 86.8629 30 120C30 153.137 56.8629 180 90 180ZM90 165C114.853 165 135 144.853 135 120C135 95.1472 114.853 75 90 75C65.1472 75 45 95.1472 45 120C45 144.853 65.1472 165 90 165Z" fill="url(#paint2_radial)"/>
              <path d="M75 220H105L115 240H65L75 220Z" fill="#78350F"/>
              <circle cx="90" cy="120" r="35" fill="#FFFBEB" stroke="#FEF3C7" strokeWidth="2"/>
              <circle cx="90" cy="120" r="30" fill="white" className="animate-pulse-slow"/>
              <defs>
                <linearGradient id="paint0_linear" x1="90" y1="120" x2="90" y2="5" gradientUnits="userSpaceOnUse"><stop stopColor="#F59E0B" stopOpacity="0"/><stop offset="1" stopColor="#FCD34D"/></linearGradient>
                <linearGradient id="paint1_linear" x1="90" y1="50" x2="90" y2="190" gradientUnits="userSpaceOnUse"><stop stopColor="#B45309"/><stop offset="1" stopColor="#F59E0B"/></linearGradient>
                <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(90 120) rotate(90) scale(60)"><stop stopColor="#FBBF24"/><stop offset="0.8" stopColor="#B45309"/><stop offset="1" stopColor="#78350F"/></radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Botão Voltar */}
      <Link href="/" className="absolute top-6 left-6 p-3 rounded-full bg-black/50 text-slate-400 hover:text-white border border-white/10 transition-colors z-50 backdrop-blur-md">
        <ArrowLeft size={24} />
      </Link>

      {/* --- A VELA INTERATIVA --- */}
      <div ref={containerRef} className="relative z-10 flex flex-col items-center mt-40 md:mt-52">
        
        {/* ÁREA DAS ORAÇÕES SUBINDO */}
        <div className="absolute bottom-[350px] left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          {oracoesSubindo.map((oracao) => (
            <div
              key={oracao.id}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center w-[500px] text-center animacao-fumaca"
              style={{ marginLeft: `${oracao.leftOffset}px` }}
            >
              <span className="font-serif text-amber-50 text-xl md:text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-shadow-glow leading-tight px-4 tracking-wide">
                {oracao.texto}
              </span>
            </div>
          ))}
        </div>

        {/* ÁREA DA CHAMA (NOVA E REALISTA) */}
        <div className="relative z-10 mb-2 pointer-events-none">
          {/* O container da chama que reage ao vento (mouse) */}
          <div 
            className={`w-24 h-40 transition-all duration-300 origin-bottom ease-out ${acesa ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{ transform: `rotate(${rotacaoChama}deg)` }}
          >
            {/* 1. Aura Externa (Brilho grande) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 h-56 bg-amber-600/20 rounded-full blur-[50px] animate-pulse-slow"></div>
            
            {/* 2. Corpo da Chama (Dança organicamente) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-36 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-200 shadow-[0_0_80px_30px_rgba(251,191,36,0.5)] animate-fire blur-[3px]"></div>

            {/* 3. Núcleo Branco (Tremeluz rápido) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-20 bg-white rounded-full animate-flicker-core blur-[2px]"></div>
            
            {/* 4. Base Azulada (Quente) */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600/50 rounded-full blur-md animate-pulse"></div>
          </div>
        </div>

        {/* O PAVIO */}
        <button 
          onClick={() => setAcesa(!acesa)}
          className="w-2 h-5 bg-stone-800 cursor-pointer hover:bg-stone-700 transition-colors relative z-20 rounded-t-sm"
        ></button>

        {/* O CORPO DA VELA */}
        <div 
          onClick={() => setAcesa(!acesa)}
          className={`w-36 h-72 bg-gradient-to-b from-[#fffefb] via-[#f2e8d5] to-[#e6dfd1] rounded-t-xl shadow-2xl relative cursor-pointer transition-all duration-1000
            ${acesa ? 'shadow-[inset_0_10px_20px_rgba(251,191,36,0.4),_0_0_120px_rgba(251,191,36,0.4)] brightness-110' : 'brightness-40 shadow-none'}
          `}
        >
           <div className="absolute top-0 left-0 w-full h-8 bg-white/80 rounded-full blur-[2px]"></div>
           <div className="absolute top-6 right-6 w-4 h-24 bg-white/50 rounded-full blur-[3px] border-r border-white/20"></div>
           <div className="absolute top-8 left-8 w-3 h-12 bg-white/40 rounded-full blur-[3px]"></div>
        </div>
      </div>

      {/* --- CONTROLES INFERIORES --- */}
      <div className="absolute bottom-12 z-30 flex flex-col items-center gap-6 w-full px-6">
        <button 
          onClick={() => setModalAberto(true)}
          className="group relative flex items-center justify-center gap-3 w-full max-w-md px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-lg shadow-amber-900/50 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          <div className="bg-white/20 p-1.5 rounded-full"><Plus size={20} /></div>
          <span className="font-bold tracking-wide text-lg font-serif">Elevar Oração</span>
        </button>

        <div className={`transition-all duration-500 ${acesa ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button onClick={() => setAcesa(false)} className="text-sm text-slate-500 hover:text-rose-400 transition-colors uppercase tracking-widest flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
            <X size={14} /> Apagar chama
          </button>
        </div>
      </div>

      {/* --- MODAL --- */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900/90 w-full max-w-lg p-8 rounded-[2rem] shadow-2xl border border-slate-700/50 animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="font-bold text-white text-2xl flex items-center gap-3 font-serif">
                <div className="bg-amber-500/20 p-2 rounded-full"><Flame className="text-amber-500" fill="currentColor" size={24} /></div>
                Sua Intenção
              </h3>
              <button onClick={() => setModalAberto(false)} className="text-slate-500 hover:text-white transition-colors bg-slate-800 p-2 rounded-full"><X size={20}/></button>
            </div>
            <p className="text-slate-300 text-base mb-6 leading-relaxed">Escreva seu pedido ou agradecimento.</p>
            <textarea
              placeholder="Ex: Pela cura de..., Agradeço por..."
              className="w-full h-40 p-5 rounded-2xl bg-slate-800/80 text-amber-50 border border-slate-700 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 resize-none mb-6 font-serif text-xl placeholder:text-slate-600 shadow-inner"
              value={inputTemp}
              onChange={(e) => setInputTemp(e.target.value)}
              autoFocus
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviarIntencao(); } }}
            />
            <div className="flex justify-end gap-3 relative z-10">
              <button onClick={() => setModalAberto(false)} className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-slate-800">Cancelar</button>
              <button onClick={enviarIntencao} className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-xl font-bold shadow-lg shadow-amber-900/30 transform active:scale-95 transition-all flex items-center gap-2">
                <Sparkles size={18} /> Enviar Oração
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}