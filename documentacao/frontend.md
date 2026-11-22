# Documentação técnica do frontend

## Tecnologias e execução

O frontend usa React 18 e Vite. Para desenvolvimento:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Configure `VITE_API_URL` no ambiente Vite para apontar à API. Sem essa variável, o cliente usa `http://localhost:3000`. O build de produção é gerado com `npm run build`.

## Organização

- `src/App.jsx`: composição atual da tela, estado, pesquisa/filtro/ordenação e ações CRUD.
- `src/data/characters.js`: catálogo de personagens e URLs dos SVGs usando `import.meta.env.BASE_URL`.
- `src/services/api.js`: cliente HTTP e tratamento de respostas.
- `src/services/noteService.js`: operações da API de notas.
- `src/styles/`: estilos globais e estilos da interface.
- `public/images/`: oito ilustrações SVG servidas como `/images/<arquivo>.svg`.

Os elementos visuais descritos no roteiro (Header, NoteCard, NoteForm, Modal e outros) ainda não foram extraídos como componentes React independentes; a implementação permanece concentrada em `App.jsx`.

## Fluxo e estados

Na montagem da tela, `getNotes` carrega as notas. A lista visível combina pesquisa por título/conteúdo, filtro por personagem e ordenação pela data de atualização/criação. O formulário valida os campos antes de chamar `createNote` ou `updateNote`; a exclusão exige confirmação antes de chamar `deleteNote`.

A interface também apresenta estados de carregamento, vazio, erro recuperável e confirmação/toast. As ações de edição e exclusão foram verificadas visualmente em produção, mas não foram confirmadas por escrita durante a auditoria.

## Folha ilustrada e responsividade

Os cartões e o editor usam a ilustração quadrada como folha de fundo. A arte não recebe interação (`pointer-events: none`) e o conteúdo fica em camada superior, com espaço interno para a moldura. O layout foi verificado visualmente em larguras desktop, tablet e mobile.

## Testes e limitações

O `frontend/package.json` possui `dev`, `build` e `preview`, mas não possui script nem suíte automatizada de testes. `npm run build` foi validado. Um fluxo CRUD completo de interface deve ser testado em ambiente local isolado antes de declarar aceite ponta a ponta.
