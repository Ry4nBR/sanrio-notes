# Sanrio Notes API

API REST em Node.js e Express para gerenciar notas persistidas em `data.json`.

## Instalação

```bash
cd backend
npm install
```

## Executar

```bash
npm start
```

O servidor usa `PORT=3000` por padrão.

## Variáveis

O servidor lê `PORT` e `CORS_ORIGIN` do ambiente. `CORS_ORIGIN` aceita uma lista separada por vírgulas. As origens locais `http://localhost:5173` e `http://127.0.0.1:5173` também são aceitas.

O projeto não carrega arquivos `.env` automaticamente; definir variáveis em `backend/.env` não tem efeito por si só. Defina-as no terminal ou no painel do serviço de hospedagem. O valor padrão de `PORT` é `3000`.

## Endpoints

- `GET /health`
- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

As respostas são JSON, exceto `204 No Content` na exclusão.

## Testes

```bash
npm test
```

## Deploy no Render

- URL: https://sanrio-notes-api.onrender.com
- Verificados: `GET /health` e `GET /api/notes` respondem HTTP 200.
- `CORS_ORIGIN` no Render permite `https://sanrio-notes.vercel.app`.
- O plano Free hiberna após inatividade e não inclui disco persistente. Como as notas são gravadas em `data.json`, não há garantia de persistência entre reinícios ou novos deploys.
