# Sanrio Notes - Status do projeto

## Projeto

- Nome: Sanrio Notes
- Escopo: Atividade 02 - API REST e aplicacao de bloco de notas

## Historico de execucao

- Repositorio vazio inicialmente, branch `main` e sem commits.
- Remote configurado: `https://github.com/Ry4nBR/Sanrio-Notes.git`
- Branch `main` publicada no GitHub em 22/11/2026.
- 02.1.1 - Inspecao concluida sem alteracao de arquivos.
- 02.1.2 - README inicial criado.
- 02.1.3 - Documento de acompanhamento criado.
- 02.1.4 - Estrutura principal definida em `backend/`, `frontend/`, `postman/` e `documentacao/`; o README registra essa arquitetura.
- 02.1.5 - Regras iniciais do `.gitignore` configuradas e validadas.

## Commits de referência

Os commits abaixo destacam a preparação inicial; o histórico completo está no GitHub.

| Atividade | Hash | Mensagem |
|---|---|---|
| 02.1.2 | 42c3072 | docs: cria readme inicial do sanrio notes |
| 02.1.3 | 841ec7d | docs: cria acompanhamento da execucao |
| 02.1.5 | e21a0a1 | chore: configura gitignore do projeto |
| Ilustrações dos personagens | 15c5d0d | fix: publica ilustracoes atualizadas dos personagens |

## Testes

- Backend: testes de dados e CRUD aprovados.
- Front-end: build de produção aprovado.
- Integração local: API `/health` e página inicial do Vite responderam HTTP 200.
- Coleção Postman: JSON exportado validado.
- Correção CORS: origens `http://localhost:5173` e `http://127.0.0.1:5173` validadas com HTTP 200.
- Testes adicionais: nota inválida 400, ID ausente 404, JSON malformado 400; `backend/data.json` permaneceu inalterado.

## Deploy
- Render: concluído. API publicada em `https://sanrio-notes-api.onrender.com`.
  - `GET /health`: HTTP 200, `{"status":"ok"}`.
  - `GET /api/notes`: HTTP 200. Na auditoria de 22/11/2026 havia nove notas genéricas preexistentes; nenhuma foi criada, editada ou excluída durante a auditoria.
  - `CORS_ORIGIN` configurada para `https://sanrio-notes.vercel.app`; acesso a `/api/notes` com essa origem confirmado em HTTP 200.
  - Plano Free hiberna após inatividade e não possui disco persistente; a persistência em `data.json` não é garantida entre reinícios/deploys.
- Vercel: concluído. Front-end publicado em `https://sanrio-notes.vercel.app`; página respondeu HTTP 200 e carregou a lista de notas da API.

## Coleção Postman

- Coleção importada com cinco requisições e `baseUrl` apontando para a API publicada no Render.
- Documentação pública CRUD publicada: https://documenter.getpostman.com/view/52845937/2sBYPv3CLw
- O botão `Share` para compartilhamento direto exige plano pago. A listagem na Public API Network também não está disponível para o papel atual do workspace; nenhum upgrade foi iniciado.

## Pendencias

- Compartilhamento direto da coleção ou listagem na Public API Network: pendente. O botão `Share` exige plano pago e a mudança para um workspace público não está permitida pelo papel atual. A documentação pública acima continua acessível e mostra as cinco requisições.

## Evidencias

- Capturas reais da aplicacao publicada:
  - [Tela inicial](documentacao/evidencias/tela-inicial-producao.png)
  - [Código das rotas CRUD](documentacao/evidencias/codigo-rotas-api.png)
  - [Editor de nova nota](documentacao/evidencias/editor-nova-nota-producao.png)
  - [Cartões](documentacao/evidencias/listagem-cartoes-producao.png)
  - [Responsivo mobile](documentacao/evidencias/responsivo-mobile-producao.png)
  - [Edição](documentacao/evidencias/edicao-nota-producao.png)
  - [Confirmação de exclusão](documentacao/evidencias/confirmacao-exclusao-producao.png)
  - [API](documentacao/evidencias/api-listagem-producao.png)
  - [Postman - CRUD](documentacao/evidencias/postman-documentacao-crud-publica.png)
  - [Postman - continuação](documentacao/evidencias/postman-documentacao-crud-continua.png)
- Relatório completo: [ENTREGA.md](ENTREGA.md)
- Documento focado na atividade Postman, preparado para Canva: [documentacao/entrega-canva.md](documentacao/entrega-canva.md)
- Relatório de entrega complementar: [documentacao/entrega.md](documentacao/entrega.md)

## Resultado da auditoria de aceite

- Checklist: 82 critérios — 65 concluídos, 14 parciais e 3 não concluídos.
- Coleção Postman CRUD local: 6 requisições e 10 asserções aprovadas contra uma cópia temporária do backend.
- Ressalvas principais: o envio do documento ao Canva aguarda acesso à conta; o compartilhamento direto da coleção Postman permanece limitado por plano/permissões; a interface está concentrada em `frontend/src/App.jsx`.
- Status: pronto com ressalvas, não 100% concluído. Consulte [ENTREGA.md](ENTREGA.md) para a matriz critério por critério.
