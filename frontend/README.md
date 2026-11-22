# Sanrio Notes - Front-end

Interface React e Vite do bloco de notas Sanrio Notes.

## Executar

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Configure `VITE_API_URL` com a URL da API.

## Deploy na Vercel

- URL: https://sanrio-notes.vercel.app
- Root Directory: `frontend`
- Variável de produção `VITE_API_URL`: `https://sanrio-notes-api.onrender.com`

## Build

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.jsx`: estado principal e CRUD
- `src/data/characters.js`: catalogo de personagens
- `src/services/`: cliente HTTP e serviços de notas
- `src/styles/`: estilos globais e identidade visual
- `public/images/`: ilustrações SVG locais

Consulte [documentacao/frontend.md](../documentacao/frontend.md) para detalhes do fluxo, estados e limitações de teste.

## Testes

Não há suíte automatizada configurada no frontend. Valide o build com:

```bash
npm run build
```
