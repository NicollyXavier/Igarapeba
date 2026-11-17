# Gerador de Currículos

Aplicação web para criação e personalização de currículos profissionais, com visualização em tempo real e exportação em PDF ou Word.

O projeto foi desenvolvido para facilitar a elaboração de currículos de forma simples, organizada e acessível, permitindo que o usuário preencha suas informações, personalize a aparência e acompanhe o resultado antes de baixar o documento.

## Funcionalidades

- **Dados pessoais:** cadastro de nome, título profissional, e-mail, telefone, cidade e LinkedIn.
- **Resumo profissional:** campo para apresentação do perfil e dos objetivos profissionais.
- **Experiência profissional:** adição, edição, remoção e organização das experiências.
- **Formação acadêmica:** cadastro de cursos, instituições e períodos.
- **Habilidades e idiomas:** inclusão de competências e conhecimentos linguísticos.
- **Personalização visual:** escolha entre três modelos de currículo:
  - Moderno
  - Clássico
  - Minimalista
- **Cores personalizadas:** seleção de cores para personalizar a identidade visual do documento.
- **Visualização em tempo real:** acompanhamento das alterações no currículo durante o preenchimento.
- **Exportação em PDF:** geração e download do currículo em PDF.
- **Exportação em Word:** geração e download do currículo em formato DOCX.
- **Validação de dados:** verificação dos campos obrigatórios antes da exportação.
- **Salvamento automático:** os dados são armazenados localmente no navegador, permitindo continuar a edição posteriormente.

## Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| Next.js 14 | Framework da aplicação |
| React 18 | Construção da interface |
| TypeScript | Tipagem estática e organização do código |
| CSS3 | Estilização e identidade visual |
| Zod | Validação e estruturação dos dados |
| @react-pdf/renderer | Geração de documentos PDF |
| docx | Geração de documentos Word |
| LocalStorage | Persistência local dos dados |

## Como executar o projeto

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- npm (incluído na instalação do Node.js)
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/NicollyXavier/gerador-de-curriculos.git
```

### 2. Acesse a pasta do projeto

```bash
cd gerador-de-curriculos
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute em ambiente de desenvolvimento

```bash
npm run dev
```

### 5. Acesse a aplicação

Abra o navegador no endereço:

```text
http://localhost:3000
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão otimizada para produção |
| `npm run start` | Inicia a aplicação em modo de produção |

## Estrutura do projeto

```text
gerador-de-curriculos/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Form.tsx
│   │   └── Preview.tsx
│   │
│   ├── hooks/
│   │   └── useCurriculo.ts
│   │
│   └── lib/
│       ├── export.tsx
│       ├── pdf.tsx
│       └── schema.ts
│
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Organização dos diretórios

- **`app/`**: contém a página principal, o layout e os estilos globais.
- **`components/`**: reúne os componentes responsáveis pelo formulário e pela visualização do currículo.
- **`hooks/`**: concentra a lógica de gerenciamento e persistência dos dados do currículo.
- **`lib/`**: contém os esquemas de dados, validações e funções de geração e exportação dos documentos.
- **`public/`**: diretório destinado aos arquivos estáticos da aplicação.

## Armazenamento de dados

O projeto utiliza o LocalStorage do navegador para armazenar automaticamente as informações preenchidas.

Isso significa que:

- Os dados permanecem disponíveis no mesmo navegador e dispositivo.
- Não é necessário criar uma conta para utilizar a aplicação.
- Os dados não são enviados para um banco de dados da aplicação.
- Limpar os dados do navegador pode remover as informações armazenadas.

**Importante:** recomenda-se baixar uma cópia do currículo para manter um backup das informações.

## Validação

Antes de permitir a exportação, a aplicação verifica alguns campos obrigatórios:

- Nome completo;
- Título profissional;
- E-mail válido;
- Telefone.

Caso exista alguma informação inválida ou ausente, o usuário recebe mensagens para corrigir os dados.

## Desenvolvimento

O projeto passou por uma migração de sua implementação inicial em HTML, CSS e JavaScript para uma arquitetura baseada em React, TypeScript e Next.js.

Essa atualização teve como objetivo melhorar a organização do código, a reutilização de componentes, a tipagem dos dados e a manutenção da aplicação.

## Autor

Desenvolvido por **Nicolly Xavier**.

- GitHub: [@NicollyXavier](https://github.com/NicollyXavier)
- Repositório: [gerador-de-curriculos](https://github.com/NicollyXavier/gerador-de-curriculos)

---

Se este projeto foi útil para você, considere deixar uma ⭐ no repositório!
