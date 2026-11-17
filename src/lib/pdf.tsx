import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
type Style = Record<string, string | number>;
import { Curriculo, lista } from "./schema";

const st = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1b1b1b", lineHeight: 1.35 },
  b: { fontFamily: "Helvetica-Bold" },
  i: { fontFamily: "Helvetica-Oblique" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  bloco: { marginBottom: 10 },
  item: { marginBottom: 7 },
});

const contatos = (c: Curriculo) => [c.email, c.telefone, c.cidade, c.linkedin].filter(Boolean);

function Corpo({ c, h2, upper, extras }: { c: Curriculo; h2: Style; upper?: boolean; extras: boolean }) {
  const T = (s: string) => (upper ? s.toUpperCase() : s);
  const exps = c.experiencias.filter((e) => e.cargo.trim());
  const fors = c.formacoes.filter((f) => f.curso.trim());
  const hab = lista(c.habilidades), idi = lista(c.idiomas);
  return (
    <View>
      {c.resumo ? (<View style={st.bloco}><Text style={h2}>{T("Resumo")}</Text><Text>{c.resumo}</Text></View>) : null}
      {exps.length > 0 && (
        <View style={st.bloco}>
          <Text style={h2}>{T("Experiência")}</Text>
          {exps.map((e) => (
            <View key={e.id} style={st.item} wrap={false}>
              <View style={st.row}><Text style={st.b}>{e.cargo}</Text><Text style={{ color: "#666" }}>{[e.inicio, e.fim].filter(Boolean).join(" - ")}</Text></View>
              {e.empresa ? <Text style={[st.i, { color: c.cor }]}>{e.empresa}</Text> : null}
              {e.descricao ? <Text style={{ marginTop: 2 }}>{e.descricao}</Text> : null}
            </View>
          ))}
        </View>
      )}
      {fors.length > 0 && (
        <View style={st.bloco}>
          <Text style={h2}>{T("Formação")}</Text>
          {fors.map((f) => (
            <View key={f.id} style={st.item} wrap={false}>
              <View style={st.row}><Text style={st.b}>{f.curso}</Text><Text style={{ color: "#666" }}>{[f.inicio, f.fim].filter(Boolean).join(" - ")}</Text></View>
              {f.instituicao ? <Text style={[st.i, { color: c.cor }]}>{f.instituicao}</Text> : null}
            </View>
          ))}
        </View>
      )}
      {extras && hab.length > 0 && (<View style={st.bloco}><Text style={h2}>{T("Habilidades")}</Text><Text>{hab.join("  •  ")}</Text></View>)}
      {extras && idi.length > 0 && (<View style={st.bloco}><Text style={h2}>{T("Idiomas")}</Text><Text>{idi.join("  •  ")}</Text></View>)}
    </View>
  );
}

function Modern({ c }: { c: Curriculo }) {
  const w: Style = { color: "#fff" };
  const rot: Style = { ...w, fontFamily: "Helvetica-Bold", fontSize: 9, marginTop: 14, marginBottom: 4 };
  return (
    <Page size="A4" style={[st.page, { paddingLeft: 195, paddingRight: 30, paddingVertical: 36 }]}>
      <View fixed style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 165, backgroundColor: c.cor }} />
      <View style={{ position: "absolute", left: 18, top: 36, width: 132 }}>
        <Text style={[w, { fontFamily: "Helvetica-Bold", fontSize: 19, lineHeight: 1.15 }]}>{c.nome}</Text>
        <Text style={[w, { fontSize: 11, marginTop: 6 }]}>{c.titulo}</Text>
        <Text style={rot}>Contato</Text>
        {contatos(c).map((x, i) => (<Text key={i} style={[w, { fontSize: 9, marginBottom: 3 }]}>{x}</Text>))}
        {lista(c.habilidades).length > 0 && <Text style={rot}>Habilidades</Text>}
        {lista(c.habilidades).map((x, i) => (<Text key={i} style={[w, { fontSize: 9, marginBottom: 2 }]}>• {x}</Text>))}
        {lista(c.idiomas).length > 0 && <Text style={rot}>Idiomas</Text>}
        {lista(c.idiomas).map((x, i) => (<Text key={i} style={[w, { fontSize: 9, marginBottom: 2 }]}>• {x}</Text>))}
      </View>
      <Corpo c={c} extras={false} h2={{ fontFamily: "Helvetica-Bold", fontSize: 13, color: c.cor, marginBottom: 5 }} />
    </Page>
  );
}

function Classic({ c }: { c: Curriculo }) {
  return (
    <Page size="A4" style={[st.page, { padding: 40 }]}>
      <View style={{ alignItems: "center", marginBottom: 14, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 22 }}>{c.nome}</Text>
        <Text style={{ color: c.cor, fontSize: 12, marginTop: 3 }}>{c.titulo}</Text>
        <Text style={{ fontSize: 9, marginTop: 5 }}>{contatos(c).join("  •  ")}</Text>
      </View>
      <Corpo c={c} upper extras h2={{ fontFamily: "Helvetica-Bold", fontSize: 11, color: c.cor, marginBottom: 5, paddingBottom: 2, borderBottomWidth: 0.5, borderBottomColor: c.cor }} />
    </Page>
  );
}

function Minimal({ c }: { c: Curriculo }) {
  return (
    <Page size="A4" style={[st.page, { paddingHorizontal: 56, paddingVertical: 52 }]}>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 28 }}>{c.nome}</Text>
      <Text style={{ color: c.cor, fontSize: 14, marginTop: 4 }}>{c.titulo}</Text>
      <Text style={{ fontSize: 9, color: "#555", marginTop: 10, marginBottom: 22 }}>{contatos(c).join("   •   ")}</Text>
      <Corpo c={c} extras h2={{ fontFamily: "Helvetica-Bold", fontSize: 14, marginBottom: 6, marginTop: 4 }} />
    </Page>
  );
}

export function ResumePDF({ c }: { c: Curriculo }) {
  return (
    <Document title={`Currículo - ${c.nome}`} author={c.nome}>
      {c.template === "modern" ? <Modern c={c} /> : c.template === "classic" ? <Classic c={c} /> : <Minimal c={c} />}
    </Document>
  );
}
