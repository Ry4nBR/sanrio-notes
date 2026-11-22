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
