"use client";
import React, { useEffect, useState } from "react";
import { Curriculo } from "@/lib/schema";
import { gerarPdf } from "@/lib/export";

export default function Preview({ c }: { c: Curriculo }) {
  const [url, setUrl] = useState<string>();
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let cancelado = false;
    const t = setTimeout(async () => {
      try {
        const blob = await gerarPdf(c);
        if (cancelado) return;
        const novo = URL.createObjectURL(blob);
        setErro(false);
        setUrl((antigo) => { if (antigo) URL.revokeObjectURL(antigo); return novo; });
      } catch { if (!cancelado) setErro(true); }
    }, 700);
    return () => { cancelado = true; clearTimeout(t); };
  }, [c]);

  if (erro) return <p className="vazio" role="alert">Não foi possível atualizar o preview. Seus dados continuam salvos.</p>;
  if (!url) return <p className="vazio">Gerando preview…</p>;
  return <iframe className="preview" title="Preview do currículo" src={`${url}#toolbar=0&navpanes=0`} />;
}
