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

Copie `.env.example` para `.env`. `CORS_ORIGIN` aceita uma lista separada por virgulas.

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
