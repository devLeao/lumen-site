"use client";

import { useState, useEffect } from "react";
import { BookOpen, Calendar, Heart, ChevronRight, Star, ShieldCheck, Flame, Book, Scroll, Cross, Church, Library } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

// --- 1. FUNÇÃO PARA BUSCAR A LITURGIA ---
async function getLiturgia() {
  try {
    const res = await fetch('https://liturgia.up.railway.app/', { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) throw new Error("Falha ao buscar liturgia");
    
    return await res.json();
  } catch (error) {
    console.error(error);
    return {
      liturgia: "Liturgia Diária",
      evangelho: {
        referencia: "Leituras do Dia",
        titulo: "Evangelho do Dia",
        texto: "Clique para ler a liturgia completa."
      }
    };
  }
}

// --- 2. COMPONENTE PRINCIPAL (HOME) ---
export default function Home() {
  const [liturgia, setLiturgia] = useState<any>(null);

  // Carrega Liturgia
  useEffect(() => {
    getLiturgia().then(dados => setLiturgia(dados));
  }, []);

  // Dados provisórios enquanto carrega
  const tituloEvangelho = liturgia?.evangelho?.titulo || "Carregando Evangelho...";
  const refEvangelho = liturgia?.evangelho?.referencia || "Aguarde...";
  const textoEvangelho = liturgia?.evangelho?.texto || "";

  return (
    <main className="min-h-screen flex flex-col items-center bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* --- 1. HERO SECTION (Topo) --- */}
      <section className="relative w-full flex flex-col items-center mb-10">
        <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden">
          <img 
            src="/fotos/santos.png" 
            alt="Céu" 
            className="w-full h-full object-cover md:object-[center_35%] opacity-60 dark:opacity-20 transition-opacity duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent transition-colors duration-300"></div>
        </div>

        <nav className="relative z-10 w-full max-w-6xl px-6 py-6 flex justify-between items-center">
          <Link href="/" className="group relative z-20">
            <img 
              src="/fotos/logo.jpg" 
              alt="Lumen" 
              className="h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]" 
            />
          </Link>

          <div className="flex items-center gap-2">
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

        <div className="relative z-10 text-center max-w-3xl mx-auto mt-8 px-6">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-xs font-bold tracking-wider mb-6 border border-amber-200 dark:border-amber-700 shadow-sm backdrop-blur-sm">
            <Star size={12} fill="currentColor" /> Ó Maria concebida sem pecado
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-sky-950 dark:text-white mb-6 leading-tight drop-shadow-sm">
            Ilumine sua caminhada <br/>
            <span className="text-sky-600 dark:text-sky-400 italic">espiritual.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            Um refúgio digital sob o manto sagrado. Liturgia, santos e orações organizados para fortalecer sua fé.
          </p>
        </div>
      </section>

      {/* --- 2. DESTAQUES DO DIA (Bento Grid) --- */}
      <section className="w-full max-w-6xl px-6 mb-16 z-10 relative">
        <h2 className="font-bold text-xl text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-2">
          <Star size={20} className="text-sky-500" fill="currentColor" /> Destaques do Dia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Liturgia */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-6 -right-6 p-4 opacity-5 text-sky-900 dark:text-sky-100 group-hover:opacity-10 transition-all duration-500 rotate-12 group-hover:rotate-6 group-hover:scale-110">
              <BookOpen size={160} />
            </div>
            <div className="relative z-10 max-w-[85%] md:max-w-[70%]">
              <h3 className="text-sky-600 dark:text-sky-400 font-bold text-sm mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400"></div> Liturgia Diária
              </h3>
              <h2 className="font-serif text-3xl text-slate-800 dark:text-white mb-2 line-clamp-2 leading-tight">
                {tituloEvangelho}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">{refEvangelho}</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2 italic opacity-80">"{textoEvangelho}"</p>
            </div>
            <div className="relative z-10 mt-auto">
              <Link href="/liturgia">
                <span className="text-sm font-bold text-sky-700 dark:text-sky-300 hover:text-sky-500 dark:hover:text-sky-200 flex items-center gap-1 transition-colors">
                  Ler evangelho completo <ChevronRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          {/* Santo */}
          <Link href="/santo" className="group md:col-span-1">
            <div className="h-full bg-gradient-to-br from-sky-900 to-sky-800 dark:from-blue-950 dark:to-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-sky-900/20 hover:shadow-sky-900/30 transition-all cursor-pointer relative overflow-hidden border border-transparent dark:border-sky-900 flex flex-col justify-between">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl group-hover:bg-amber-400/30 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sky-200 font-bold text-sm uppercase tracking-wide">Santo Intercessor</h3>
                  <Calendar size={20} className="text-sky-200" />
                </div>
                <h2 className="font-serif text-3xl mb-3 text-white font-bold leading-tight">Descubra seu guia.</h2>
                <p className="text-sky-100 text-sm mb-6 opacity-90 leading-relaxed">Receba uma mensagem espiritual de um santo para hoje.</p>
                <div className="flex items-center gap-2 text-sm font-bold text-sky-200 group-hover:text-white transition-colors">
                  Revelar carta <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </Link>

          {/* Sentimentos */}
          <div className="md:col-span-2 bg-[#fffbeb] dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-amber-100 dark:border-amber-900/30 shadow-lg shadow-amber-100/50 dark:shadow-none hover:shadow-xl transition-shadow cursor-default flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-200/50 dark:bg-amber-900/50 rounded-lg text-amber-800 dark:text-amber-200">
                  <Heart size={20} fill="currentColor" className="opacity-20" />
                </div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100">Como você está?</h3>
              </div>
              <p className="text-amber-800/70 dark:text-slate-400 text-sm mb-6 font-medium">Encontre um remédio espiritual para o seu momento atual.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link href="/sentimentos?humor=ansioso">
                <span className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-full text-xs font-bold text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors cursor-pointer inline-block">
                  Ansioso
                </span>
              </Link>
              <Link href="/sentimentos?humor=grato">
                <span className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-full text-xs font-bold text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors cursor-pointer inline-block">
                  Grato
                </span>
              </Link>
              <Link href="/sentimentos?humor=cansado">
                <span className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-amber-200 dark:border-slate-700 rounded-full text-xs font-bold text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-slate-700 transition-colors cursor-pointer inline-block">
                  Cansado
                </span>
              </Link>
              <Link href="/sentimentos">
                <span className="px-5 py-2.5 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 rounded-full text-xs font-bold text-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors cursor-pointer inline-block">
                  + Opções
                </span>
              </Link>
            </div>
          </div>

          {/* Confissão (Ferramenta) */}
          <Link href="/confissao" className="group md:col-span-1">
            <div className="h-full bg-violet-50 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-violet-100 dark:border-violet-900/30 shadow-lg shadow-violet-100/50 dark:shadow-none hover:shadow-xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -bottom-4 -right-4 text-violet-200 dark:text-violet-900/20 opacity-50 transform rotate-12 group-hover:rotate-0 transition-transform duration-500"><ShieldCheck size={120} /></div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-violet-200/50 dark:bg-violet-900/50 rounded-lg text-violet-800 dark:text-violet-200"><ShieldCheck size={20} /></div>
                  <h3 className="font-bold text-violet-900 dark:text-violet-100">Confissão</h3>
                </div>
                <h2 className="font-serif text-2xl mb-2 text-slate-800 dark:text-white font-medium leading-tight">Exame de Consciência</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 font-medium leading-relaxed">Prepare sua alma com nosso guia seguro e privado.</p>
              </div>
              <div className="relative z-10 mt-auto">
                <span className="text-sm font-bold text-violet-700 dark:text-violet-300 group-hover:text-violet-500 dark:group-hover:text-violet-200 flex items-center gap-1 transition-colors">Abrir guia <ChevronRight size={16} /></span>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* --- 3. GUIAS DE FÉ (Com suas Imagens Locais) --- */}
      <section className="w-full max-w-6xl px-6 mb-16 relative z-10">
        <h2 className="font-bold text-xl text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-2">
          <Book size={20} className="text-amber-500" fill="currentColor" /> Guias de Aprendizado
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Guia da Santa Missa */}
          <div className="group relative overflow-hidden rounded-3xl h-64 cursor-pointer shadow-lg hover:shadow-xl transition-all">
            {/* AGORA PUXANDO DA PASTA /fotos/missa.jpg */}
            <img 
              src="/fotos/missa.jpg" 
              alt="Missa" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Tutorial</span>
              <h3 className="text-white font-serif text-2xl font-bold mb-1">Guia da Santa Missa</h3>
              <p className="text-slate-200 text-sm opacity-90">Entenda cada parte da celebração.</p>
            </div>
          </div>

        {/* Card 2: Guia de Confissão */}
          <div className="group relative overflow-hidden rounded-3xl h-64 cursor-pointer shadow-lg hover:shadow-xl transition-all">
            {/* AGORA PUXANDO DA PASTA /fotos/confissao.jpg */}
            <img 
              src="/fotos/confissao.jpg" 
              alt="Confissão" 
              // ALTERAÇÃO AQUI: Removidas as classes 'grayscale' e 'group-hover:grayscale-0'
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Aprenda</span>
              <h3 className="text-white font-serif text-2xl font-bold mb-1">Como se Confessar</h3>
              <p className="text-violet-100 text-sm opacity-90">Como se preparar e o que dizer.</p>
            </div>
          </div>

          {/* Card 3: Guia do Terço */}
          <div className="group relative overflow-hidden rounded-3xl h-64 cursor-pointer shadow-lg hover:shadow-xl transition-all">
            {/* AGORA PUXANDO DA PASTA /fotos/terco.jpg */}
            <img 
              src="/fotos/terco.jpg" 
              alt="Terço" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-sky-900/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">Devoção</span>
              <h3 className="text-white font-serif text-2xl font-bold mb-1">Aprenda a Rezar</h3>
              <p className="text-sky-100 text-sm opacity-90">Guia completo do Santo Rosário.</p>
            </div>
          </div>

        </div>
      </section>

      {/* --- 4. BIBLIOTECA E ORAÇÕES (Última Seção) --- */}
      <section className="w-full max-w-6xl px-6 mb-20 relative z-10">
        <h2 className="font-bold text-xl text-slate-700 dark:text-slate-200 mb-6 flex items-center gap-2">
           <Library size={20} className="text-slate-500" fill="currentColor" /> Biblioteca e Orações
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Card: Bíblia */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer group hover:border-sky-200">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 transition-colors">
              <Book size={24} />
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Bíblia Sagrada</span>
          </div>

          {/* Card: Novenas */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer group hover:border-amber-200">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:text-amber-600 group-hover:bg-amber-50 transition-colors">
              <Scroll size={24} />
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Novenas</span>
          </div>

          {/* Card: Orações */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer group hover:border-rose-200">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:text-rose-600 group-hover:bg-rose-50 transition-colors">
              <Church size={24} />
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Orações</span>
          </div>

          {/* Card: Rosário */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer group hover:border-violet-200">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 group-hover:text-violet-600 group-hover:bg-violet-50 transition-colors">
              <Cross size={24} />
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Rosário</span>
          </div>

        </div>
      </section>

      {/* --- 5. FOOTER (Mantido) --- */}
      <footer className="w-full bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2 opacity-80 mb-2">
               <img src="/fotos/logo.jpg" className="h-8 w-auto grayscale opacity-50" alt="Lumen" />
               <span className="font-serif font-bold text-slate-700 dark:text-slate-300">Lumen</span>
             </div>
             <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
               Um projeto dedicado a iluminar vidas através da tecnologia e da fé católica.
             </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
             <div className="flex gap-4 mb-2">
                <Link href="/terco" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Terço</Link>
                <Link href="/liturgia" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Liturgia</Link>
                <Link href="/vela" className="text-sm text-slate-500 hover:text-sky-600 transition-colors">Vela</Link>
             </div>
             <p className="text-xs text-slate-400">© 2026 Lumen App. Ad Majorem Dei Gloriam.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}