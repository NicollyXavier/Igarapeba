import React from "react";
import { Curriculo, lista } from "./schema";

export async function gerarPdf(c: Curriculo): Promise<Blob> {
  const { pdf } = await import("@react-pdf/renderer");
  const { ResumePDF } = await import("./pdf");
  return pdf(<ResumePDF c={c} />).toBlob();
}

export async function gerarDocx(c: Curriculo): Promise<Blob> {
  const { Document, Packer, Paragraph, TextRun, BorderStyle, TabStopType } = await import("docx");
  const cor = c.cor.replace("#", "");
  const h = (t: string) =>
    new Paragraph({
      spacing: { before: 240, after: 100 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: cor, space: 1 } },
      children: [new TextRun({ text: t.toUpperCase(), bold: true, color: cor, size: 24 })],
    });
  const p = (t: string) => new Paragraph({ children: [new TextRun({ text: t, size: 21 })] });
  const linha = (esq: string, dir: string) =>
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: 9600 }],
      children: [new TextRun({ text: esq, bold: true, size: 22 }), new TextRun({ text: "\t" + dir, size: 20, color: "666666" })],
    });
  const sub = (t: string) => new Paragraph({ children: [new TextRun({ text: t, italics: true, color: cor, size: 21 })] });

  const f: InstanceType<typeof Paragraph>[] = [
    new Paragraph({ children: [new TextRun({ text: c.nome, bold: true, size: 44 })] }),
    new Paragraph({ children: [new TextRun({ text: c.titulo, color: cor, size: 28 })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: [c.email, c.telefone, c.cidade, c.linkedin].filter(Boolean).join("  •  "), size: 19, color: "555555" })] }),
  ];
  if (c.resumo) f.push(h("Resumo"), ...c.resumo.split("\n").map(p));

  const exps = c.experiencias.filter((e) => e.cargo.trim());
  if (exps.length) {
    f.push(h("Experiência"));
    exps.forEach((e) => {
      f.push(linha(e.cargo, [e.inicio, e.fim].filter(Boolean).join(" - ")));
      if (e.empresa) f.push(sub(e.empresa));
      if (e.descricao) f.push(...e.descricao.split("\n").map(p));
      f.push(p(""));
    });
  }
  const fors = c.formacoes.filter((x) => x.curso.trim());
  if (fors.length) {
    f.push(h("Formação"));
    fors.forEach((x) => {
      f.push(linha(x.curso, [x.inicio, x.fim].filter(Boolean).join(" - ")));
      if (x.instituicao) f.push(sub(x.instituicao));
    });
  }
  if (lista(c.habilidades).length) f.push(h("Habilidades"), p(lista(c.habilidades).join("  •  ")));
  if (lista(c.idiomas).length) f.push(h("Idiomas"), p(lista(c.idiomas).join("  •  ")));

  const doc = new Document({
    sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1100, right: 1100 } } }, children: f }],
  });
  return Packer.toBlob(doc);
}

export function baixar(blob: Blob, nome: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
