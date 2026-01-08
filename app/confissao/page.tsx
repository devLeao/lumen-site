"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileDown, Trash2, ShieldCheck, Scroll } from "lucide-react";
import { jsPDF } from "jspdf";

// --- 1. EXAME DE CONSCIÊNCIA (BASEADO NOS MANDAMENTOS) ---
const MANDAMENTOS = [
  {
    id: 1,
    titulo: "1. Amar a Deus sobre todas as coisas",
    perguntas: [
      "Neguei a minha fé ou tive vergonha de me declarar católico?",
      "Deixei de rezar por muito tempo?",
      "Envolvi-me com superstições, horóscopos ou ocultismo?",
      "Duvidei da misericórdia ou do poder de Deus?"
    ]
  },
  {
    id: 2,
    titulo: "2. Não tomar seu Santo Nome em vão",
    perguntas: [
      "Falei o nome de Deus sem respeito, em piadas ou raiva?",
      "Jurei falso ou prometi algo a Deus e não cumpri?",
      "Blasfemei contra Deus ou os Santos?"
    ]
  },
  {
    id: 3,
    titulo: "3. Guardar domingos e festas",
    perguntas: [
      "Faltei à Missa aos domingos ou dias santos por preguiça?",
      "Cheguei tarde à Missa por culpa própria?",
      "Trabalhei desnecessariamente aos domingos, esquecendo o descanso?"
    ]
  },
  {
    id: 4,
    titulo: "4. Honrar pai e mãe",
    perguntas: [
      "Desobedeci ou faltei com o respeito aos meus pais?",
      "Deixei de ajudar minha família quando precisavam?",
      "Fui motivo de tristeza ou discórdia em casa?"
    ]
  },
  {
    id: 5,
    titulo: "5. Não matar (e não ferir)",
    perguntas: [
      "Guardei ódio, rancor ou desejo de vingança?",
      "Feri alguém com palavras duras, ofensas ou fofocas?",
      "Fui violento ou perdi a paciência agredindo alguém?",
      "Cometi abusos com álcool, drogas ou gula?",
      "Induzi alguém a pecar?"
    ]
  },
  {
    id: 6,
    titulo: "6 e 9. Castidade e Pureza",
    perguntas: [
      "Consentí em pensamentos ou desejos impuros?",
      "Vi pornografia ou conteúdos imorais?",
      "Cometi atos impuros comigo mesmo ou com outros?",
      "Faltei com a fidelidade ao meu esposo(a) (em atos ou pensamentos)?",
      "Usei roupas ou atitudes para provocar os outros?"
    ]
  },
  {
    id: 7,
    titulo: "7 e 10. Não roubar e não cobiçar",
    perguntas: [
      "Peguei algo que não era meu?",
      "Deixei de pagar dívidas ou salários justos?",
      "Estraguei propriedade alheia ou pública?",
      "Tive inveja dos bens ou do sucesso dos outros?",
      "Fui avarento, apegado demais ao dinheiro?"
    ]
  },
  {
    id: 8,
    titulo: "8. Não levantar falso testemunho",
    perguntas: [
      "Menti?",
      "Fiz fofoca ou calúnia (falar mal dos outros)?",
      "Revelei segredos que deveria guardar?",
      "Julguei mal as intenções dos outros?"
    ]
  }
];

export default function ConfissaoPage() {
  // Estado para guardar os itens marcados. Ex: ["1-0", "3-2"] (Mandamento 1, Pergunta 0)
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [gerando, setGerando] = useState(false);

  // Marca/Desmarca um item
  const toggleItem = (mandamentoId: number, perguntaIndex: number) => {
    const id = `${mandamentoId}-${perguntaIndex}`;
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter(item => item !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  };

  const limparTudo = () => {
    if (confirm("Deseja desmarcar tudo?")) {
      setSelecionados([]);
    }
  };

  // --- FUNÇÃO QUE GERA O PDF ---
  const gerarPDF = () => {
    setGerando(true);
    const doc = new jsPDF();

    // Configuração da Fonte
    doc.setFont("times", "normal");
    
    // Título
    doc.setFontSize(22);
    doc.text("Minha Confissão", 105, 20, { align: "center" });
    
    // Data
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 105, 28, { align: "center" });

    doc.line(20, 32, 190, 32); // Linha divisória

    // Lista de Pecados
    let y = 40; // Posição vertical inicial
    doc.setFontSize(12);

    if (selecionados.length === 0) {
      doc.text("Nenhum item marcado para esta confissão.", 20, y);
    } else {
      MANDAMENTOS.forEach((m) => {
        // Filtra quais perguntas desse mandamento foram marcadas
        const pecadosDesteMandamento = m.perguntas.filter((_, idx) => 
          selecionados.includes(`${m.id}-${idx}`)
        );

        if (pecadosDesteMandamento.length > 0) {
          // Título do Mandamento
          if (y > 270) { doc.addPage(); y = 20; } // Nova página se acabar o espaço
          doc.setFont("times", "bold");
          doc.text(m.titulo, 20, y);
          y += 7;

          // Os Pecados
          doc.setFont("times", "normal");
          pecadosDesteMandamento.forEach((p) => {
            if (y > 280) { doc.addPage(); y = 20; }
            // Quebra de linha manual simples para textos longos (se necessário)
            const splitText = doc.splitTextToSize(`- ${p}`, 170);
            doc.text(splitText, 20, y);
            y += (splitText.length * 6);
          });
          y += 4; // Espaço extra entre grupos
        }
      });
    }

    // Ato de Contrição no Final
    if (y > 240) { doc.addPage(); y = 20; }
    y += 10;
    doc.line(20, y, 190, y);
    y += 10;
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.text("Ato de Contrição:", 20, y);
    y += 6;
    const ato = "Meu Deus, eu me arrependo de todo o coração de vos ter ofendido, porque sois tão bom e amável. Prometo, com a vossa graça, nunca mais pecar. Meu Jesus, misericórdia!";
    const splitAto = doc.splitTextToSize(ato, 170);
    doc.text(splitAto, 20, y);

    // Salva o arquivo
    doc.save("minha-confissao-lumen.pdf");
    setGerando(false);
  };

  return (
    <main className="min-h-screen bg-stone-100 dark:bg-slate-950 transition-colors duration-500 pb-32">
      
      {/* Header Fixo */}
      <header className="sticky top-0 z-40 bg-stone-100/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="font-bold text-sky-900 dark:text-sky-100 leading-none">Exame de Consciência</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <ShieldCheck size={10} /> Privado e Seguro
            </p>
          </div>
        </div>
        
        {selecionados.length > 0 && (
          <button onClick={limparTudo} className="text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 p-2 rounded-full transition-colors" title="Limpar tudo">
            <Trash2 size={20} />
          </button>
        )}
      </header>

      {/* Lista de Mandamentos */}
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        
        <div className="bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 p-4 rounded-xl text-sm mb-6 flex gap-3 items-start border border-sky-200 dark:border-sky-800">
           <Scroll className="shrink-0 mt-0.5" size={18} />
           <p>Marque os pontos em que você falhou. Ao final, gere um PDF para levar ao sacerdote. Nada fica salvo no site.</p>
        </div>

        {MANDAMENTOS.map((m) => (
          <section key={m.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {m.id}
              </span>
              {m.titulo}
            </h2>
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-stone-200 dark:border-slate-800 overflow-hidden">
              {m.perguntas.map((pergunta, idx) => {
                const isChecked = selecionados.includes(`${m.id}-${idx}`);
                return (
                  <label 
                    key={idx} 
                    className={`flex items-start gap-4 p-4 border-b border-stone-100 dark:border-slate-800 last:border-0 cursor-pointer transition-colors
                      ${isChecked ? 'bg-sky-50 dark:bg-sky-900/10' : 'hover:bg-stone-50 dark:hover:bg-slate-800/50'}
                    `}
                  >
                    <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                      ${isChecked 
                        ? 'bg-sky-500 border-sky-500 text-white' 
                        : 'border-slate-300 dark:border-slate-600 bg-transparent'
                      }
                    `}>
                      {isChecked && <CheckCircle2 size={16} />}
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={isChecked} 
                        onChange={() => toggleItem(m.id, idx)}
                      />
                    </div>
                    <span className={`text-sm md:text-base ${isChecked ? 'text-slate-800 dark:text-sky-100 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                      {pergunta}
                    </span>
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* BARRA FIXA INFERIOR (AÇÃO) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {selecionados.length} {selecionados.length === 1 ? 'item marcado' : 'itens marcados'}
          </div>
          
          <button 
            onClick={gerarPDF}
            disabled={selecionados.length === 0 || gerando}
            className="bg-sky-600 hover:bg-sky-500 dark:bg-sky-700 dark:hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-sky-200/50 dark:shadow-none disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
          >
            {gerando ? 'Gerando...' : (
              <>
                <FileDown size={20} /> Baixar Confissão
              </>
            )}
          </button>
        </div>
      </div>

    </main>
  );
}