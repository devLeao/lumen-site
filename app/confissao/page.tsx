"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Download, CheckCircle2, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

// --- DADOS DO EXAME DE CONSCIÊNCIA ---
// Estrutura: Mandamento -> Lista de Pecados (Pergunta + Texto para Confissão)
const MANDAMENTOS = [
  {
    titulo: "1. Amar a Deus sobre todas as coisas",
    pecados: [
      { id: 101, pergunta: "Neguei a minha fé ou tive vergonha de me declarar católico?", confissao: "Neguei a minha fé e tive vergonha de me declarar católico." },
      { id: 102, pergunta: "Descuidei da minha vida de oração?", confissao: "Descuidei da minha vida de oração diária." },
      { id: 103, pergunta: "Pratiquei superstições (horóscopo, adivinhações, amuletos)?", confissao: "Pratiquei superstições (horóscopo/adivinhações)." },
    ]
  },
  {
    titulo: "2. Não tomar seu Santo Nome em vão",
    pecados: [
      { id: 201, pergunta: "Falei o nome de Deus sem respeito, em piadas ou raiva?", confissao: "Pronunciei o santo nome de Deus sem respeito ou em momentos de raiva." },
      { id: 202, pergunta: "Jurei falso ou prometi coisas a Deus e não cumpri?", confissao: "Jurei falso ou não cumpri promessas feitas a Deus." },
    ]
  },
  {
    titulo: "3. Guardar domingos e festas",
    pecados: [
      { id: 301, pergunta: "Faltei à Missa aos domingos ou dias santos por preguiça?", confissao: "Faltei à Missa dominical ou em dias de preceito por culpa própria." },
      { id: 302, pergunta: "Cheguei atrasado ou não prestei atenção na Missa?", confissao: "Cheguei atrasado ou fiquei distraído voluntariamente durante a Missa." },
    ]
  },
  {
    titulo: "4. Honrar pai e mãe",
    pecados: [
      { id: 401, pergunta: "Desobedeci ou faltei com o respeito aos meus pais?", confissao: "Desobedeci ou faltei com o respeito aos meus pais." },
      { id: 402, pergunta: "Deixei de ajudar minha família em suas necessidades?", confissao: "Negligenciei a ajuda e o cuidado com minha família." },
    ]
  },
  {
    titulo: "5. Não matar (e não ferir)",
    pecados: [
      { id: 501, pergunta: "Guardei ódio, rancor ou desejo de vingança?", confissao: "Guardei ódio, rancor e desejo de vingança no coração." },
      { id: 502, pergunta: "Fui violento, briguei ou ofendi o próximo?", confissao: "Fui violento, agredi ou ofendi o próximo com palavras duras." },
      { id: 503, pergunta: "Coloquei minha vida ou a de outros em risco (bebida, imprudência)?", confissao: "Coloquei vidas em risco por imprudência." },
    ]
  },
  {
    titulo: "6 e 9. Castidade e Pureza",
    pecados: [
      { id: 601, pergunta: "Consenti em pensamentos ou desejos impuros?", confissao: "Consenti em pensamentos e desejos impuros." },
      { id: 602, pergunta: "Vi pornografia ou conteúdos imorais?", confissao: "Consumi pornografia ou conteúdos imorais." },
      { id: 603, pergunta: "Pratiquei atos impuros sozinho ou com outra pessoa?", confissao: "Pequei contra a castidade (atos impuros)." },
    ]
  },
  {
    titulo: "7 e 10. Não roubar e não cobiçar",
    pecados: [
      { id: 701, pergunta: "Peguei algo que não era meu?", confissao: "Peguei coisas que não me pertenciam." },
      { id: 702, pergunta: "Prejudiquei alguém nos negócios ou no trabalho?", confissao: "Fui desonesto ou prejudiquei outros no trabalho/negócios." },
      { id: 703, pergunta: "Sou muito apegado aos bens materiais?", confissao: "Fui excessivamente apegado aos bens materiais e avarento." },
    ]
  },
  {
    titulo: "8. Não levantar falso testemunho",
    pecados: [
      { id: 801, pergunta: "Menti?", confissao: "Menti." },
      { id: 802, pergunta: "Falei mal dos outros (fofoca) ou julguei?", confissao: "Fiz fofocas, calúnias ou julgamentos temerários sobre o próximo." },
    ]
  }
];

export default function ConfissaoPage() {
  // Guarda os IDs dos pecados selecionados
  const [selecionados, setSelecionados] = useState<number[]>([]);

  // --- FUNÇÃO DE TOGGLE (MARCAR/DESMARCAR) ---
  const togglePecado = (id: number) => {
    setSelecionados((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- GERAR PDF COM OS TEXTOS DE CONFISSÃO ---
  const gerarPDF = () => {
    const doc = new jsPDF();
    const margemEsquerda = 20;
    let y = 20; // Posição vertical inicial

    // Título
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("Minha Confissão", margemEsquerda, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, margemEsquerda, y);

    y += 15;

    // Se não tiver nada marcado
    if (selecionados.length === 0) {
      doc.setFontSize(12);
      doc.text("Nenhum pecado apontado neste exame.", margemEsquerda, y);
    } else {
      // Loop pelos Mandamentos
      MANDAMENTOS.forEach((grupo) => {
        // Filtra os pecados deste grupo que foram selecionados
        const pecadosDoGrupo = grupo.pecados.filter(p => selecionados.includes(p.id));

        if (pecadosDoGrupo.length > 0) {
          // Verifica se cabe na página
          if (y > 270) { doc.addPage(); y = 20; }

          // Título do Mandamento
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(50, 50, 50); // Cinza escuro
          doc.text(grupo.titulo, margemEsquerda, y);
          y += 7;

          // Lista os Pecados (USANDO O TEXTO DE CONFISSÃO)
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0); // Preto

          pecadosDoGrupo.forEach((pecado) => {
             // Quebra de linha automática se o texto for longo
             const textoQuebrado = doc.splitTextToSize(`• ${pecado.confissao}`, 170);
             
             if (y + (textoQuebrado.length * 5) > 280) { doc.addPage(); y = 20; }
             
             doc.text(textoQuebrado, margemEsquerda, y);
             y += (textoQuebrado.length * 6); // Espaçamento
          });

          y += 5; // Espaço entre grupos
        }
      });
    }

    // Ato de Contrição no Final
    if (y > 240) { doc.addPage(); y = 20; }
    
    y += 10;
    doc.setDrawColor(200);
    doc.line(margemEsquerda, y, 190, y); // Linha divisória
    y += 10;
    
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.text("Ato de Contrição:", margemEsquerda, y);
    y += 8;
    
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    const atocon = "Meu Deus, eu me arrependo de todo o coração de vos ter ofendido, porque sois tão bom e amável. Prometo, com a vossa graça, nunca mais pecar. Meu Jesus, misericórdia!";
    const atoQuebrado = doc.splitTextToSize(atocon, 170);
    doc.text(atoQuebrado, margemEsquerda, y);

    // Salva o arquivo
    doc.save("minha-confissao-lumen.pdf");
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-10 px-4">
      
      {/* HEADER */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-10">
        <Link href="/" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:scale-105 transition-transform">
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-300" />
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck size={28} className="text-violet-600 dark:text-violet-400" />
          <h1 className="font-serif text-2xl font-bold text-slate-800 dark:text-white">Exame de Consciência</h1>
        </div>
        <div className="w-10"></div> {/* Espaçador */}
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-center max-w-lg mb-8 text-sm">
        Marque com sinceridade o que pesa em seu coração. <br/>
        Ao final, gere seu guia privado para levar à confissão.
      </p>

      {/* --- LISTA DE MANDAMENTOS E PECADOS --- */}
      <div className="w-full max-w-2xl space-y-8 mb-32">
        {MANDAMENTOS.map((grupo, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-violet-700 dark:text-violet-300 mb-4 text-lg border-b border-slate-100 dark:border-slate-800 pb-2">
              {grupo.titulo}
            </h3>
            
            <div className="space-y-3">
              {grupo.pecados.map((item) => {
                const isSelected = selecionados.includes(item.id);
                return (
                  <div 
                    key={item.id} 
                    onClick={() => togglePecado(item.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border
                      ${isSelected 
                        ? 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700' 
                        : 'bg-slate-50 dark:bg-slate-950 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${isSelected 
                        ? 'bg-violet-600 border-violet-600 text-white' 
                        : 'border-slate-300 dark:border-slate-600 text-transparent'
                      }
                    `}>
                      <CheckCircle2 size={14} strokeWidth={4} />
                    </div>
                    
                    {/* AQUI MOSTRAMOS A PERGUNTA (NA TELA) */}
                    <p className={`text-sm md:text-base leading-relaxed select-none
                      ${isSelected ? 'text-violet-900 dark:text-violet-100 font-medium' : 'text-slate-600 dark:text-slate-400'}
                    `}>
                      {item.pergunta}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* --- BARRA FIXA INFERIOR --- */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          
          <div className="text-sm">
            <span className="font-bold text-slate-800 dark:text-white">{selecionados.length}</span>
            <span className="text-slate-500"> itens marcados</span>
          </div>

          <div className="flex gap-3">
            {selecionados.length > 0 && (
              <button 
                onClick={() => setSelecionados([])}
                className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-colors"
                title="Limpar tudo"
              >
                <Trash2 size={20} />
              </button>
            )}
            
            <button 
              onClick={gerarPDF}
              disabled={selecionados.length === 0}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-violet-200 dark:shadow-none transition-all active:scale-95"
            >
              <Download size={20} />
              Baixar Guia PDF
            </button>
          </div>

        </div>
      </div>

    </main>
  );
}