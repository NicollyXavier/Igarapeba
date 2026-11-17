"use client";
import { useCallback, useEffect, useState } from "react";
import { Curriculo, curriculoSchema, vazio } from "@/lib/schema";

const CHAVE = "curriculo:v1";

export function useCurriculo() {
  const [c, setC] = useState<Curriculo>(vazio);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) {
        const r = curriculoSchema.safeParse(JSON.parse(raw));
        if (r.success) setC(r.data);
      }
    } catch {}
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try { localStorage.setItem(CHAVE, JSON.stringify(c)); } catch {}
  }, [c, pronto]);

  const set = useCallback(
    <K extends keyof Curriculo>(k: K, v: Curriculo[K]) => setC((p) => ({ ...p, [k]: v })),
    []
  );
  return { c, set, setC, pronto };
}
