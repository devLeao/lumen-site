"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Star, Flame } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Hero() {
  // Ainda precisamos do estado para saber quando o mouse está sobre a logo
  const [mouseNaLogo, setMouseNaLogo] = useState(false);

  return (
    <section className="relative w-full flex flex-col items-center">
      
      {/* --- FUNDO COM IMAGEM NOVA --- */}
      <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden pointer-events-none">
        <img 
          // MUDANÇA AQUI: Sua nova imagem local
          src="/fotos/santos.png" 
          alt="Santos" 
          // Mantive o ajuste de posição para PC para não cortar cabeças, se precisar ajuste o '35%'
          className="w-full h-full object-cover md:object-[center_35%] opacity-60 dark:opacity-20 transition-opacity duration-500"
        />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent transition-colors duration-300"></div>
      </div>

      {/* (REMOVIDO O DIV DO HOLOFOTE AQUI) */}

      {/* --- NAVBAR --- */}
      <nav className="relative z-10 w-full max-w-6xl px-6 py-6 flex justify-between items-center">
        
        {/* LADO ESQUERDO: LOGO (COM EFEITO DE LUZ PRÓPRIA) */}
        <Link 
          href="/" 
          className="hover:opacity-90 transition-opacity relative z-20"
          onMouseEnter={() => setMouseNaLogo(true)} // Detecta mouse entrando
          onMouseLeave={() => setMouseNaLogo(false)} // Detecta mouse saindo
        >
          <img 
            src="/fotos/logo.jpg" 
            alt="Lumen" 
            // AQUI ESTÁ O EFEITO: Se o mouse estiver em cima, aplica o drop-shadow dourado
            className={`h-20 w-auto object-contain transition-all duration-500 ${mouseNaLogo ? 'drop-shadow-[0_0_25px_rgba(251,191,36,0.8)] scale-105' : ''}`} 
          />
        </Link>

        {/* LADO DIREITO: VELA + TEMA */}
        <div className="flex items-center gap-2 relative z-20">
          <Link href="/vela">
            <button className="bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-slate-800 transition-colors" title="Acender uma vela">
              <Flame size={20} fill="currentColor" className="opacity-80" />
            </button>
          </Link>

          <div className="bg-white/50 dark:bg-slate-900/50 p-1 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-700">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* --- CONTEÚDO DE TEXTO (VOLTOU AO NORMAL) --- */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mt-8 mb-24 px-6">
        
        <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-xs font-bold tracking-wider mb-6 border border-amber-200 dark:border-amber-700 shadow-sm backdrop-blur-sm">
          <Star size={12} fill="currentColor" /> Ó Maria concebida sem pecado
        </div>
        
        {/* Título estático novamente, sem efeitos de hover */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-sky-950 dark:text-white mb-6 leading-tight drop-shadow-sm">
          Ilumine sua caminhada <br/>
          <span className="text-sky-600 dark:text-sky-400 italic">
            espiritual.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
          Um refúgio digital sob o manto sagrado. Liturgia, santos e orações organizados para fortalecer sua fé.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/terco">
            <button className="bg-sky-600 hover:bg-sky-500 dark:bg-sky-700 dark:hover:bg-sky-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-sky-200 dark:shadow-none flex items-center justify-center gap-2 w-full sm:w-auto">
              Rezar o Terço <ChevronRight size={20} />
            </button>
          </Link>
          
          <Link href="/liturgia">
            <button className="bg-white/80 hover:bg-white dark:bg-slate-800/60 dark:hover:bg-slate-800 text-sky-800 dark:text-sky-100 border border-sky-100 dark:border-slate-600 px-8 py-4 rounded-full font-bold transition-all backdrop-blur-sm shadow-sm w-full sm:w-auto">
              Liturgia de Hoje
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}