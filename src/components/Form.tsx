"use client";
import React, { useId } from "react";
import { Curriculo, Experiencia, Formacao, TEMPLATES, novaExp, novaForm } from "@/lib/schema";

const CORES = ["#2563eb", "#0f766e", "#7c3aed", "#be123c", "#c2410c", "#334155"];
const NOMES: Record<(typeof TEMPLATES)[number], string> = { modern: "Moderno", classic: "Clássico", minimal: "Minimalista" };

type CampoProps = { label: string; value: string; onChange: (v: string) => void; tipo?: string; area?: boolean; placeholder?: string; obrigatorio?: boolean };

function Campo({ label, value, onChange, tipo = "text", area, placeholder, obrigatorio }: CampoProps) {
  const id = useId();
  return (
    <div className="campo">
      <label htmlFor={id}>{label}{obrigatorio ? " *" : ""}</label>
      {area ? (
        <textarea id={id} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type={tipo} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Lista<T extends { id: string }>({ titulo, itens, onChange, criar, rotuloAdd, render }: {
  titulo: string; itens: T[]; onChange: (v: T[]) => void; criar: () => T; rotuloAdd: string;
  render: (item: T, patch: (p: Partial<T>) => void) => React.ReactNode;
}) {
  const mover = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= itens.length) return;
    const n = [...itens];
    [n[i], n[j]] = [n[j], n[i]];
    onChange(n);
  };
  return (
    <section className="secao">
      <h2>{titulo}</h2>
      {itens.length === 0 && <p className="dica">Nada por aqui ainda. Adicione o primeiro item.</p>}
      {itens.map((it, i) => (
        <div className="item" key={it.id}>
          <div className="item-acoes">
            <button type="button" className="mini" onClick={() => mover(i, -1)} disabled={i === 0} aria-label="Mover para cima">↑</button>
            <button type="button" className="mini" onClick={() => mover(i, 1)} disabled={i === itens.length - 1} aria-label="Mover para baixo">↓</button>
            <button type="button" className="mini perigo" onClick={() => onChange(itens.filter((x) => x.id !== it.id))}>Remover</button>
          </div>
          {render(it, (p) => onChange(itens.map((x) => (x.id === it.id ? { ...x, ...p } : x))))}
        </div>
      ))}
      <button type="button" className="add" onClick={() => onChange([...itens, criar()])}>{rotuloAdd}</button>
    </section>
  );
}

export default function Form({ c, set }: { c: Curriculo; set: <K extends keyof Curriculo>(k: K, v: Curriculo[K]) => void }) {
  return (
    <div className="form">
      <section className="secao">
        <h2>Aparência</h2>
        <div className="campo">
          <span className="rotulo">Cor do tema</span>
          <div className="cores">
            {CORES.map((cor) => (
              <button key={cor} type="button" className="cor" style={{ background: cor }} aria-label={`Cor ${cor}`} aria-pressed={c.cor === cor} onClick={() => set("cor", cor)} />
            ))}
          </div>
        </div>
        <div className="campo">
          <span className="rotulo">Modelo</span>
          <div className="seg" role="radiogroup" aria-label="Modelo">
            {TEMPLATES.map((t) => (
              <button key={t} type="button" role="radio" aria-checked={c.template === t} onClick={() => set("template", t)}>{NOMES[t]}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <h2>Dados pessoais</h2>
        <Campo obrigatorio label="Nome completo" value={c.nome} onChange={(v) => set("nome", v)} />
        <Campo obrigatorio label="Título profissional" value={c.titulo} placeholder="Ex.: Desenvolvedora front-end" onChange={(v) => set("titulo", v)} />
        <div className="duas">
          <Campo obrigatorio label="E-mail" tipo="email" value={c.email} onChange={(v) => set("email", v)} />
          <Campo obrigatorio label="Telefone" tipo="tel" value={c.telefone} onChange={(v) => set("telefone", v)} />
        </div>
        <div className="duas">
          <Campo label="Cidade" value={c.cidade} onChange={(v) => set("cidade", v)} />
          <Campo label="LinkedIn" value={c.linkedin} placeholder="linkedin.com/in/seu-perfil" onChange={(v) => set("linkedin", v)} />
        </div>
        <Campo area label="Resumo profissional" value={c.resumo} placeholder="Duas ou três linhas sobre você e o que busca." onChange={(v) => set("resumo", v)} />
      </section>

      <Lista<Experiencia>
        titulo="Experiência profissional" itens={c.experiencias} criar={novaExp} rotuloAdd="Adicionar experiência"
        onChange={(v) => set("experiencias", v)}
        render={(e, p) => (
          <>
            <div className="duas">
              <Campo label="Cargo" value={e.cargo} onChange={(v) => p({ cargo: v })} />
              <Campo label="Empresa" value={e.empresa} onChange={(v) => p({ empresa: v })} />
            </div>
            <div className="duas">
              <Campo label="Início" value={e.inicio} placeholder="Jan/2024" onChange={(v) => p({ inicio: v })} />
              <Campo label="Fim" value={e.fim} placeholder="Atual" onChange={(v) => p({ fim: v })} />
            </div>
            <Campo area label="Descrição" value={e.descricao} placeholder="Uma conquista ou responsabilidade por linha." onChange={(v) => p({ descricao: v })} />
          </>
        )}
      />

      <Lista<Formacao>
        titulo="Formação acadêmica" itens={c.formacoes} criar={novaForm} rotuloAdd="Adicionar formação"
        onChange={(v) => set("formacoes", v)}
        render={(f, p) => (
          <>
            <div className="duas">
              <Campo label="Curso" value={f.curso} onChange={(v) => p({ curso: v })} />
              <Campo label="Instituição" value={f.instituicao} onChange={(v) => p({ instituicao: v })} />
            </div>
            <div className="duas">
              <Campo label="Início" value={f.inicio} placeholder="2022" onChange={(v) => p({ inicio: v })} />
              <Campo label="Conclusão" value={f.fim} placeholder="Cursando" onChange={(v) => p({ fim: v })} />
            </div>
          </>
        )}
      />

      <section className="secao">
        <h2>Habilidades e idiomas</h2>
        <Campo area label="Habilidades (separe por vírgula)" value={c.habilidades} placeholder="React, TypeScript, Next.js, Figma" onChange={(v) => set("habilidades", v)} />
        <Campo area label="Idiomas (separe por vírgula)" value={c.idiomas} placeholder="Português (nativo), Inglês (intermediário)" onChange={(v) => set("idiomas", v)} />
      </section>
    </div>
  );
}
