import Link from "next/link";
import { ArrowLeft, BookOpen, Share2 } from "lucide-react";

async function getLiturgia() {
  try {
    const res = await fetch('https://liturgia.up.railway.app/', { 
      next: { revalidate: 3600 } 
    });
    if (!res.ok) throw new Error("Falha ao buscar");
    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function LiturgiaPage() {
  const dados = await getLiturgia();

  if (!dados) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-slate-950 text-slate-500">
        Não foi possível carregar a liturgia. Verifique sua conexão.
      </div>
    );
  }

  return (
    // Fundo da TELA (Stone/Cinza Suave) para descansar o olho
    <main className="min-h-screen bg-stone-100 dark:bg-slate-950 transition-colors duration-500 py-8 md:py-12">
      
      {/* CABEÇALHO FLUTUANTE */}
      <header className="fixed top-0 left-0 w-full z-50 bg-stone-100/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 transition-all">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="p-2 -ml-2 text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="text-center">
            <h1 className="text-sm font-bold uppercase tracking-widest text-sky-900 dark:text-sky-100">
              Liturgia Diária
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{dados.data}</p>
          </div>
          <button className="p-2 -mr-2 text-slate-400 hover:text-sky-600 transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      {/* --- A "FOLHA DE PAPEL" --- */}
      <article className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-stone-200 dark:shadow-none p-8 md:p-16 mt-16 md:mt-12 flex flex-col gap-16 border border-stone-100 dark:border-slate-800">
        
        {/* DATA E COR LITÚRGICA */}
        <div className="flex flex-col items-center gap-4 border-b border-stone-100 dark:border-slate-800 pb-8">
          <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-sky-100 dark:border-sky-800">
            {dados.liturgia || "Tempo Comum"}
          </span>
        </div>

        {/* 1. PRIMEIRA LEITURA */}
        <section>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-sky-500 rounded-full"></div>
              <div>
                <h2 className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest text-xs">
                  Primeira Leitura
                </h2>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                  {dados.primeiraLeitura.referencia}
                </p>
              </div>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900 dark:text-white mt-4 leading-tight">
              {dados.primeiraLeitura.titulo}
            </h3>
          </header>
          {/* Texto mais escuro (slate-800) para melhor contraste */}
          <div className="font-serif text-lg md:text-xl leading-loose text-slate-800 dark:text-slate-300 text-justify">
            {dados.primeiraLeitura.texto}
          </div>
          <p className="mt-4 text-sm font-bold text-slate-400 dark:text-slate-500">— Palavra do Senhor.</p>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">— Graças a Deus.</p>
        </section>

        {/* 2. SALMO (Destaque Visual) */}
        <section className="bg-stone-50 dark:bg-slate-800/50 -mx-8 md:-mx-16 px-8 md:px-16 py-12 border-y border-stone-100 dark:border-slate-800">
          <header className="mb-8 text-center">
            <h2 className="text-amber-600 dark:text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">
              Salmo Responsorial
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-medium mb-6">
              {dados.salmo.referencia}
            </p>
            <div className="inline-block px-8 py-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-stone-200 dark:border-slate-700">
              <p className="font-serif text-lg text-amber-900 dark:text-amber-100 italic text-center font-medium">
                <span className="text-amber-500 mr-2">R.</span> 
                {dados.salmo.refrao}
              </p>
            </div>
          </header>
          <div className="font-serif text-lg leading-loose text-slate-700 dark:text-slate-300 text-center whitespace-pre-line max-w-xl mx-auto">
            {dados.salmo.texto}
          </div>
        </section>

        {/* 3. SEGUNDA LEITURA (Se houver) */}
        {dados.segundaLeitura && (
          <section>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-sky-500 rounded-full"></div>
                <div>
                  <h2 className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest text-xs">
                    Segunda Leitura
                  </h2>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                    {dados.segundaLeitura.referencia}
                  </p>
                </div>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-slate-900 dark:text-white mt-4 leading-tight">
                {dados.segundaLeitura.titulo}
              </h3>
            </header>
            <div className="font-serif text-lg md:text-xl leading-loose text-slate-800 dark:text-slate-300 text-justify">
              {dados.segundaLeitura.texto}
            </div>
            <p className="mt-4 text-sm font-bold text-slate-400 dark:text-slate-500">— Palavra do Senhor.</p>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">— Graças a Deus.</p>
          </section>
        )}

        {/* 4. EVANGELHO */}
        <section>
          <div className="flex justify-center mb-8">
             <BookOpen size={48} className="text-sky-200 dark:text-sky-800" />
          </div>
          
          <header className="mb-10 text-center">
            <span className="bg-sky-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-lg shadow-sky-200 dark:shadow-none">
              Evangelho
            </span>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-2 mb-4">
              {dados.evangelho.referencia}
            </p>
            <h3 className="font-serif text-3xl md:text-5xl text-sky-950 dark:text-white font-bold leading-tight">
              {dados.evangelho.titulo}
            </h3>
          </header>

          <div className="font-serif text-xl md:text-2xl leading-relaxed text-slate-800 dark:text-slate-200 text-justify">
            <span className="text-6xl float-left mr-3 mt-[-10px] font-bold text-sky-200 dark:text-sky-800 font-serif">
              {dados.evangelho.texto.charAt(0)}
            </span>
            {dados.evangelho.texto.substring(1)}
          </div>

          <div className="mt-16 p-8 bg-sky-50 dark:bg-slate-800/50 rounded-2xl text-center border border-sky-100 dark:border-slate-700">
            <p className="text-sky-900 dark:text-sky-300 font-bold font-serif text-xl italic">
              — Palavra da Salvação.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-bold mt-2">
              — Glória a vós, Senhor.
            </p>
          </div>
        </section>

      </article>

      {/* RODAPÉ DO SITE */}
      <footer className="text-center text-slate-400 text-xs py-12">
        <p>Liturgia fornecida pela CNBB via API da Comunidade</p>
      </footer>
    </main>
  );
}