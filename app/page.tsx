import { BookOpen, Calendar, Heart, ChevronRight, Star, ShieldCheck, Flame } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

// --- 1. FUNÇÃO PARA BUSCAR A LITURGIA (API) ---
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
export default async function Home() {
  const dados = await getLiturgia();

  const tituloEvangelho = dados.evangelho?.titulo || "Evangelho do Dia";
  const refEvangelho = dados.evangelho?.referencia || "Sagrada Escritura";
  const textoEvangelho = dados.evangelho?.texto || "";

  return (
    <main className="min-h-screen flex flex-col items-center bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* --- HERO SECTION (TOPO DO SITE) --- */}
      <section className="relative w-full flex flex-col items-center">
        
        {/* Fundo com Imagem */}
        <div className="absolute top-0 left-0 w-full h-[600px] z-0 overflow-hidden">
          <img 
            src="/fotos/santos.png" 
            alt="Céu" 
            // Ajuste de posição para PC (md:object-[center_35%]) para não cortar cabeças
            className="w-full h-full object-cover md:object-[center_35%] opacity-60 dark:opacity-20 transition-opacity duration-500"
          />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent transition-colors duration-300"></div>
        </div>

        {/* --- NAVBAR CLEAN (SÓ A LOGO) --- */}
        <nav className="relative z-10 w-full max-w-6xl px-6 py-6 flex justify-between items-center">
          
          {/* LADO ESQUERDO: Logo com Efeito de Luz (CSS Puro) */}
          <Link href="/" className="group relative z-20">
            <img 
              src="/fotos/logo.jpg" 
              alt="Lumen" 
              // AQUI ESTÁ A MÁGICA: group-hover ativa o brilho quando passa o mouse no link
              className="h-20 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]" 
            />
          </Link>

          {/* LADO DIREITO: Vela + Tema */}
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

        {/* CONTEÚDO HERO (TEXTOS E BOTÕES GRANDES) */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mt-8 mb-24 px-6">
          
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

      {/* --- BENTO GRID (OS CARDS) --- */}
      <section className="w-full max-w-6xl px-6 mb-20 z-10 relative -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: LITURGIA DIÁRIA (2 Colunas) */}
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
              <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
                {refEvangelho}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-2 italic opacity-80">
                "{textoEvangelho}"
              </p>
            </div>

            <div className="relative z-10 mt-auto">
              <Link href="/liturgia">
                <span className="text-sm font-bold text-sky-700 dark:text-sky-300 hover:text-sky-500 dark:hover:text-sky-200 flex items-center gap-1 transition-colors">
                  Ler evangelho completo <ChevronRight size={16} />
                </span>
              </Link>
            </div>
          </div>

          {/* CARD 2: SANTO DO DIA (1 Coluna) */}
          <Link href="/santo" className="group md:col-span-1">
            <div className="h-full bg-gradient-to-br from-sky-900 to-sky-800 dark:from-blue-950 dark:to-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-sky-900/20 hover:shadow-sky-900/30 transition-all cursor-pointer relative overflow-hidden border border-transparent dark:border-sky-900 flex flex-col justify-between">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl group-hover:bg-amber-400/30 transition-all"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sky-200 font-bold text-sm uppercase tracking-wide">Santo Intercessor</h3>
                  <Calendar size={20} className="text-sky-200" />
                </div>
                <h2 className="font-serif text-3xl mb-3 text-white font-bold leading-tight">
                  Descubra seu guia.
                </h2>
                <p className="text-sky-100 text-sm mb-6 opacity-90 leading-relaxed">
                  Receba uma mensagem espiritual de um santo para hoje.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-sky-200 group-hover:text-white transition-colors">
                  Revelar carta <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </Link>

          {/* CARD 3: SENTIMENTOS (2 Colunas) */}
          <div className="md:col-span-2 bg-[#fffbeb] dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-amber-100 dark:border-amber-900/30 shadow-lg shadow-amber-100/50 dark:shadow-none hover:shadow-xl transition-shadow cursor-default flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-200/50 dark:bg-amber-900/50 rounded-lg text-amber-800 dark:text-amber-200">
                  <Heart size={20} fill="currentColor" className="opacity-20" />
                </div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100">Como você está?</h3>
              </div>
              <p className="text-amber-800/70 dark:text-slate-400 text-sm mb-6 font-medium">
                Encontre um remédio espiritual para o seu momento atual.
              </p>
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

          {/* CARD 4: CONFISSÃO (1 Coluna) */}
          <Link href="/confissao" className="group md:col-span-1">
            <div className="h-full bg-violet-50 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-violet-100 dark:border-violet-900/30 shadow-lg shadow-violet-100/50 dark:shadow-none hover:shadow-xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between">
              
              <div className="absolute -bottom-4 -right-4 text-violet-200 dark:text-violet-900/20 opacity-50 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <ShieldCheck size={120} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-violet-200/50 dark:bg-violet-900/50 rounded-lg text-violet-800 dark:text-violet-200">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-bold text-violet-900 dark:text-violet-100">Confissão</h3>
                </div>
                
                <h2 className="font-serif text-2xl mb-2 text-slate-800 dark:text-white font-medium leading-tight">
                  Exame de Consciência
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 font-medium leading-relaxed">
                  Prepare sua alma com nosso guia seguro e privado.
                </p>
              </div>
              
              <div className="relative z-10 mt-auto">
                <span className="text-sm font-bold text-violet-700 dark:text-violet-300 group-hover:text-violet-500 dark:group-hover:text-violet-200 flex items-center gap-1 transition-colors">
                  Abrir guia <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}