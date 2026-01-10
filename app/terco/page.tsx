"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Home, RotateCcw, CheckCircle2, Star, Flame, ArrowLeft } from "lucide-react";
import Link from "next/link";

// --- 1. DADOS DAS ORAÇÕES ---
const ORACOES = {
  sinalDaCruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  oferecimento: "Divino Jesus, eu vos ofereço este terço (Rosário) que vou rezar, contemplando os mistérios de nossa Redenção. Concedei-me, pela intercessão de Maria, vossa Mãe Santíssima, a quem me dirijo, as graças necessárias para bem rezá-lo para ganhar as indulgências desta santa devoção. Ofereço-Vos também em reparação aos Corações de Jesus e Maria, nas intenções do Imaculado Coração de Maria, nas intenções do Santo Padre e por toda a Igreja, pela santificação do clero e das famílias, pelas vocações sacerdotais, religiosas, missionárias e leigas, pela Paz no mundo, pelo Brasil.",
  credo: "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos; creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  paiNosso: "Pai nosso que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  aveMaria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.",
  gloria: "Glória ao Pai, e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
  jaculatoria: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem da vossa infinita misericordia.",
  infinitasGracas: "Infinitas graças vos damos, soberana Rainha, pelos benefícios que recebemos todos os dias de vossas mãos liberais, dignai-vos agora e para sempre tomar-nos debaixo de vosso poderoso amparo, e para mais vos alegrar vos saudamos com uma Salve-Rainha:",
  salveRainha: "Salve Rainha! Mãe de misericórdia, vida, doçura, esperança nossa, Salve! A vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. O clemente, ó piedosa, ó doce, sempre Virgem Maria. Rogai por nós Santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo. Amém!"
};

// --- 2. DADOS DOS MISTÉRIOS ---
const misterios = {
  gozosos: { nome: "Mistérios Gozosos", dias: [1, 6], lista: ["No Primeiro Mistério contemplamos a Anunciação do Anjo a Maria.", "No Segundo Mistério contemplamos a Visitação de Maria a Isabel.", "No Terceiro Mistério contemplamos o Nascimento de Jesus em Belém.", "No Quarto Mistério contemplamos a Apresentação do Menino Jesus no Templo.", "No Quinto Mistério contemplamos a Perda e o Encontro de Jesus no Templo."] },
  dolorosos: { nome: "Mistérios Dolorosos", dias: [2, 5], lista: ["No Primeiro Mistério contemplamos a Agonia de Jesus no Horto.", "No Segundo Mistério contemplamos a Flagelação de Jesus.", "No Terceiro Mistério contemplamos a Coroação de Espinhos.", "No Quarto Mistério contemplamos Jesus carregando a Cruz.", "No Quinto Mistério contemplamos a Crucifixão e Morte de Jesus."] },
  gloriosos: { nome: "Mistérios Gloriosos", dias: [0, 3], lista: [
    "No Primeiro Mistério contemplamos a Ressurreição de Jesus Cristo.",
    "No Segundo Mistério contemplamos a Ascensão de Jesus aos Céus.",
    "No Terceiro Mistério contemplamos a descida do Espírito Santo sobre Nossa Senhora e os Apóstolos no Cenáculo.",
    "No Quarto Mistério contemplamos a Assunção de Nossa Senhora aos Céus.",
    "No Quinto Mistério contemplamos a gloriosa coroação de Maria Santíssima como Rainha do Céu e da Terra."
  ]},
  luminosos: { nome: "Mistérios Luminosos", dias: [4], lista: ["No Primeiro Mistério contemplamos o Batismo de Jesus.", "No Segundo Mistério contemplamos as Bodas de Caná.", "No Terceiro Mistério contemplamos o Anúncio do Reino.", "No Quarto Mistério contemplamos a Transfiguração.", "No Quinto Mistério contemplamos a Instituição da Eucaristia."] },
};

export default function TercoPage() {
  const [passoAtual, setPassoAtual] = useState(0);
  const [sequencia, setSequencia] = useState<any[]>([]);
  const [misterioDoDia, setMisterioDoDia] = useState<any>(null);
  
  // NOVO ESTADO: Controla se o terço acabou
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    const hoje = new Date().getDay();
    let m = misterios.gloriosos;
    if (misterios.gozosos.dias.includes(hoje)) m = misterios.gozosos;
    if (misterios.dolorosos.dias.includes(hoje)) m = misterios.dolorosos;
    if (misterios.luminosos.dias.includes(hoje)) m = misterios.luminosos;

    setMisterioDoDia(m);

    let seq = [];
    
    // GRUPO 0: INTRODUÇÃO
    seq.push({ grupo: 0, tipo: "inicio", titulo: "Sinal da Cruz", texto: ORACOES.sinalDaCruz });
    seq.push({ grupo: 0, tipo: "oferecimento", titulo: "Oferecimento", texto: ORACOES.oferecimento });
    seq.push({ grupo: 0, tipo: "credo", titulo: "Credo", texto: ORACOES.credo });
    seq.push({ grupo: 0, tipo: "painosso", titulo: "Pai Nosso", texto: ORACOES.paiNosso });
    seq.push({ grupo: 0, tipo: "avemaria", titulo: "1ª Ave Maria (Fé)", texto: ORACOES.aveMaria });
    seq.push({ grupo: 0, tipo: "avemaria", titulo: "2ª Ave Maria (Esperança)", texto: ORACOES.aveMaria });
    seq.push({ grupo: 0, tipo: "avemaria", titulo: "3ª Ave Maria (Caridade)", texto: ORACOES.aveMaria });
    seq.push({ grupo: 0, tipo: "gloria", titulo: "Glória", texto: ORACOES.gloria });

    // GRUPOS 1 a 5: MISTÉRIOS
    m.lista.forEach((mist: string, index: number) => {
      const grupo = index + 1;
      
      seq.push({ grupo, tipo: "misterio", titulo: `${grupo}º Mistério`, texto: mist, destaque: true });
      seq.push({ grupo, tipo: "painosso", titulo: "Pai Nosso", texto: ORACOES.paiNosso });
      
      for (let i = 1; i <= 10; i++) {
        seq.push({ grupo, tipo: "avemaria", titulo: `${i}ª Ave Maria`, texto: ORACOES.aveMaria });
      }
      
      seq.push({ grupo, tipo: "gloria", titulo: "Glória", texto: ORACOES.gloria });
      seq.push({ grupo, tipo: "jaculatoria", titulo: "Jaculatória", texto: ORACOES.jaculatoria });
    });

    // GRUPO 6: FINAL
    seq.push({ grupo: 6, tipo: "agradecimento", titulo: "Agradecimento", texto: ORACOES.infinitasGracas });
    seq.push({ grupo: 6, tipo: "salve", titulo: "Salve Rainha", texto: ORACOES.salveRainha });
    seq.push({ grupo: 6, tipo: "fim", titulo: "Sinal da Cruz", texto: ORACOES.sinalDaCruz });

    setSequencia(seq);
  }, []);

  // --- LÓGICA DE AVANÇAR ---
  const avancar = () => {
    if (passoAtual < sequencia.length - 1) {
      setPassoAtual(passoAtual + 1);
    } else {
      // Se chegou no fim, ativa a tela de conclusão
      setConcluido(true);
    }
  };

  const voltar = () => {
    if (passoAtual > 0) setPassoAtual(passoAtual - 1);
  };

  const reiniciar = () => {
    setPassoAtual(0);
    setConcluido(false);
  };

  if (sequencia.length === 0) return null;

  // --- TELA DE CONCLUSÃO (RENDERIZADA SE O TERÇO ACABOU) ---
  if (concluido) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        
        {/* Ícone de Sucesso */}
        <div className="w-24 h-24 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={50} className="text-sky-600 dark:text-sky-400" />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Oração Concluída
        </h1>
        
        <p className="text-slate-600 dark:text-slate-300 max-w-md mb-10 leading-relaxed">
          Que a paz de Cristo e o amor de Maria permaneçam em seu coração. Suas orações foram entregues ao céu.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          
          {/* AÇÃO PRINCIPAL: Acender Vela */}
          <Link href="/vela">
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg shadow-amber-200 dark:shadow-none transition-all flex items-center justify-center gap-2">
              <Flame size={20} fill="currentColor" /> Acender uma Vela
            </button>
          </Link>

          {/* AÇÃO SECUNDÁRIA: Voltar ao Início */}
          <Link href="/">
            <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 py-4 px-6 rounded-2xl font-bold transition-all border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
              <Home size={20} /> Voltar ao Início
            </button>
          </Link>

          {/* REINICIAR */}
          <button 
            onClick={reiniciar}
            className="text-slate-400 text-sm hover:text-slate-600 dark:hover:text-slate-300 mt-2 underline"
          >
            Rezar novamente
          </button>
        </div>

      </main>
    );
  }

  // --- TELA DO TERÇO (NORMAL) ---
  const oracaoAtual = sequencia[passoAtual];

  const renderBolinhasAtuais = () => {
    if (!oracaoAtual) return null;
    const grupoAtual = oracaoAtual.grupo;
    const passosDoGrupo = sequencia
      .map((s, idx) => ({ ...s, idxOriginal: idx }))
      .filter(s => s.grupo === grupoAtual);

    return (
      <div className="flex flex-col items-center w-full max-w-xl mx-auto px-4 mb-4">
        <span className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 font-bold">
          {grupoAtual === 0 ? "Introdução" : grupoAtual === 6 ? "Encerramento" : `${grupoAtual}º Mistério`}
        </span>
        <div className="flex flex-wrap justify-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all duration-500">
          {passosDoGrupo.map((passo) => {
            const isCompleted = passo.idxOriginal <= passoAtual;
            const isCurrent = passo.idxOriginal === passoAtual;
            let visual;

            if (passo.tipo === "misterio" || passo.tipo === "inicio" || passo.tipo === "agradecimento") {
               visual = (
                <div className={`p-1.5 rounded-full transition-all duration-300 ${isCurrent ? 'text-amber-500 scale-110' : isCompleted ? 'text-slate-400' : 'text-slate-200 dark:text-slate-700'}`}>
                   <Star size={14} fill="currentColor" />
                </div>
               );
            } 
            else if (passo.tipo === "painosso" || passo.tipo === "credo" || passo.tipo === "salve") {
              visual = (
                <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 
                  ${isCurrent 
                    ? 'bg-sky-500 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)] scale-110' 
                    : isCompleted 
                      ? 'bg-amber-400 border-amber-400' 
                      : 'bg-transparent border-slate-300 dark:border-slate-700'
                  }`}
                />
              );
            }
            else if (passo.tipo === "avemaria") {
              visual = (
                <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300
                  ${isCurrent 
                    ? 'bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] scale-125' 
                    : isCompleted 
                      ? 'bg-amber-400' 
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              );
            }
            else {
              visual = (
                <div className={`w-2 h-2 rounded-full transition-all duration-300
                  ${isCurrent ? 'bg-sky-300' : isCompleted ? 'bg-amber-200' : 'bg-slate-200 dark:bg-slate-800'}`}
                />
              );
            }
            return (
              <div key={passo.idxOriginal} title={passo.titulo} className="flex items-center justify-center">
                {visual}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-500">
      
      {/* HEADER */}
      <header className="p-4 flex justify-between items-center text-slate-400 dark:text-slate-600 sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <Link href="/" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-2">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest opacity-70 text-sky-900 dark:text-sky-100">
            {misterioDoDia?.nome}
          </span>
        </div>
        <button onClick={reiniciar} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-2" title="Reiniciar">
          <RotateCcw size={22} />
        </button>
      </header>

      {/* ÁREA DE CONTEÚDO */}
      <div className="flex-1 flex flex-col items-center pt-2 pb-40 w-full max-w-4xl mx-auto">
        {renderBolinhasAtuais()}
        <div className="w-full px-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h2 className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-6 mt-4">
            {oracaoAtual.titulo}
          </h2>
          <div className="min-h-[250px] flex items-center justify-center">
            <div className={`font-serif text-slate-800 dark:text-slate-100 leading-relaxed transition-all duration-300
              ${oracaoAtual.destaque 
                ? "text-3xl md:text-5xl text-amber-600 dark:text-amber-400 font-bold drop-shadow-sm" 
                : oracaoAtual.texto.length > 300 
                  ? "text-lg md:text-xl text-justify max-w-2xl" 
                  : "text-2xl md:text-4xl max-w-xl"
              }
            `}>
              {oracaoAtual.texto}
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE CONTROLE (RODAPÉ) */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-t border-slate-100 dark:border-slate-900 z-40">
        <div className="max-w-xl mx-auto flex gap-4 items-center">
          <button 
            onClick={voltar}
            disabled={passoAtual === 0}
            className="p-4 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-0 transition-all active:scale-90"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={avancar}
            className="flex-1 bg-sky-600 hover:bg-sky-500 text-white h-16 rounded-2xl font-bold text-lg shadow-lg shadow-sky-200/40 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            {passoAtual === sequencia.length - 1 ? (
              <>Concluir <CheckCircle2 size={24} /></>
            ) : (
              <>Amém / Próxima <ChevronRight size={20} /></>
            )}
          </button>
        </div>
      </div>

    </main>
  );
}