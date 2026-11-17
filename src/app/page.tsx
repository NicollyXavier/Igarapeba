"use client";
import React, { useState } from "react";
import Form from "@/components/Form";
import Preview from "@/components/Preview";
import { useCurriculo } from "@/hooks/useCurriculo";
import { baixar, gerarDocx, gerarPdf } from "@/lib/export";
import { validar, vazio } from "@/lib/schema";

const slug = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "curriculo";

export default function Home() {
  const { c, set, setC, pronto } = useCurriculo();
  const [erros, setErros] = useState<string[]>([]);
  const [ocupado, setOcupado] = useState(false);

  async function exportar(tipo: "pdf" | "docx") {
    const e = validar(c);
    setErros(e);
    if (e.length) return;
    setOcupado(true);
    try {
      const blob = tipo === "pdf" ? await gerarPdf(c) : await gerarDocx(c);
      baixar(blob, `curriculo-${slug(c.nome)}.${tipo}`);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <div className="app" style={{ ["--acc" as string]: c.cor }}>
      <header className="topo">
        <div>
          <h1>Gerador de currículo</h1>
          <p>Seus dados ficam salvos neste navegador.</p>
        </div>
        <div className="acoes">
          <button type="button" className="sec" onClick={() => { if (confirm("Apagar todos os dados do currículo?")) setC(vazio()); }}>Limpar tudo</button>
          <button type="button" className="sec" disabled={ocupado} onClick={() => exportar("docx")}>Baixar Word</button>
          <button type="button" className="pri" disabled={ocupado} onClick={() => exportar("pdf")}>Baixar PDF</button>
        </div>
      </header>
      {erros.length > 0 && (
        <div className="erros" role="alert">
          <strong>Corrija antes de baixar:</strong>
          <ul>{erros.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      )}
      <main className="grade">
        {pronto ? <Form c={c} set={set} /> : <p className="vazio">Carregando…</p>}
        <aside className="lado">{pronto && <Preview c={c} />}</aside>
      </main>
    </div>
  );
}
