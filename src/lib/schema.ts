import { z } from "zod";

export const TEMPLATES = ["modern", "classic", "minimal"] as const;

export const curriculoSchema = z.object({
  nome: z.string(), titulo: z.string(), email: z.string(), telefone: z.string(),
  cidade: z.string(), linkedin: z.string(), resumo: z.string(),
  experiencias: z.array(z.object({
    id: z.string(), cargo: z.string(), empresa: z.string(),
    inicio: z.string(), fim: z.string(), descricao: z.string(),
  })),
  formacoes: z.array(z.object({
    id: z.string(), curso: z.string(), instituicao: z.string(),
    inicio: z.string(), fim: z.string(),
  })),
  habilidades: z.string(), idiomas: z.string(),
  cor: z.string(), template: z.enum(TEMPLATES),
});

export type Curriculo = z.infer<typeof curriculoSchema>;
export type Experiencia = Curriculo["experiencias"][number];
export type Formacao = Curriculo["formacoes"][number];

export const novoId = () => Math.random().toString(36).slice(2, 9);
export const novaExp = (): Experiencia => ({ id: novoId(), cargo: "", empresa: "", inicio: "", fim: "", descricao: "" });
export const novaForm = (): Formacao => ({ id: novoId(), curso: "", instituicao: "", inicio: "", fim: "" });

export const vazio = (): Curriculo => ({
  nome: "", titulo: "", email: "", telefone: "", cidade: "", linkedin: "", resumo: "",
  experiencias: [novaExp()], formacoes: [novaForm()],
  habilidades: "", idiomas: "", cor: "#2563eb", template: "modern",
});

export const lista = (s: string) => s.split(/[,\n]/).map((x) => x.trim()).filter(Boolean);

const obrigatorios = z.object({
  nome: z.string().trim().min(1, "Informe o nome completo."),
  titulo: z.string().trim().min(1, "Informe o título profissional."),
  email: z.string().email("Informe um e-mail válido."),
  telefone: z.string().trim().min(8, "Informe um telefone válido."),
});

export function validar(c: Curriculo): string[] {
  const r = obrigatorios.safeParse(c);
  return r.success ? [] : r.error.issues.map((i) => i.message);
}
