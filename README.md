# Sanrio Notes

Sanrio Notes e um bloco de notas web organizado por personagens do universo Sanrio.

## Objetivo

Criar uma aplicacao didatica completa com API REST, interface React e persistencia em arquivo JSON para cadastrar, consultar, editar e excluir notas.

## Tecnologias

- Node.js e Express para a API
- Arquivo JSON para persistencia
- React e Vite para o front-end
- Postman para documentacao e testes da API

## Funcionalidades

- API REST para gerenciamento de notas
- Interface responsiva com notas decoradas por oito personagens
- Criacao, listagem, edicao, exclusao, pesquisa e filtro de notas
- Testes automatizados da API e build de producao do frontend
- Deploy no [Render](https://sanrio-notes-api.onrender.com) e na [Vercel](https://sanrio-notes.vercel.app)

## Identidade visual

A interface usa uma paleta pastel e oito personagens: Cinnamoroll, Hello Kitty, My Melody, Kuromi, Pompompurin, Pochacco, Keroppi e Badtz-Maru.

## Estrutura do projeto

```text
Sanrio Notes/
├── README.md
├── ENTREGA.md
├── STATUS_DO_PROJETO.md
├── backend/
├── frontend/
├── postman/
└── documentacao/
```

## Como executar

### API

```bash
cd backend
npm install
npm start
```

### Front-end

```bash
cd frontend
npm install
npm run dev
```

O backend usa valores padrão locais para iniciar; suas variáveis podem ser definidas no terminal ou no serviço de hospedagem. O servidor não carrega arquivos `.env` automaticamente. O frontend usa `VITE_API_URL`, que pode ser definida em `frontend/.env` para o Vite.

## Documentação

- [Relatório de entrega e auditoria](./ENTREGA.md)
- [Status do projeto](./STATUS_DO_PROJETO.md)
- [Documentação técnica do frontend](./documentacao/frontend.md)
